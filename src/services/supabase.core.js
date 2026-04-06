import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL?.trim();
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

const STATE_TABLE = "app_state";
const LEGACY_STATE_ROW_ID = "student_checkins";
const CLOUD_STATE_VERSION = 1;
const CLOUD_STATE_MARKER = "__topdance_cloud_state";
export const CLOUD_ENTITY_IDS = Object.freeze({
  students: "students",
  admin: "admin",
  schedule: "schedule",
  crmActivities: "crm_activities",
  settings: "settings",
  users: "users"
});
const SUPPORTED_ENTITY_IDS = new Set(Object.values(CLOUD_ENTITY_IDS));
let cloudWriteQueue = Promise.resolve();

const isConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

export const supabase = isConfigured
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    })
  : null;

export function isSupabaseConfigured() {
  return isConfigured;
}

function isObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function queueCloudWrite(task) {
  cloudWriteQueue = cloudWriteQueue
    .catch(() => {
      // Keep the queue alive even if a previous write failed.
    })
    .then(task);

  return cloudWriteQueue;
}

function normalizeLegacyCloudPayload(rawPayload) {
  if (
    isObject(rawPayload) &&
    rawPayload[CLOUD_STATE_MARKER] === CLOUD_STATE_VERSION &&
    isObject(rawPayload.slices)
  ) {
    return rawPayload;
  }

  const normalizedPayload = {
    [CLOUD_STATE_MARKER]: CLOUD_STATE_VERSION,
    slices: {}
  };

  // Backward compatibility: legacy payload used to store student state directly.
  if (isObject(rawPayload) && isObject(rawPayload.studentsById)) {
    normalizedPayload.slices.student = rawPayload;
  }

  return normalizedPayload;
}

function extractLegacyEntityPayload(entityId, legacyPayload) {
  const legacySlices = legacyPayload?.slices;
  const legacyCrm = isObject(legacySlices?.crm) ? legacySlices.crm : null;

  if (entityId === CLOUD_ENTITY_IDS.students) {
    return legacySlices?.student ?? null;
  }

  if (entityId === CLOUD_ENTITY_IDS.schedule) {
    return legacySlices?.schedule ?? null;
  }

  if (entityId === CLOUD_ENTITY_IDS.admin) {
    if (!legacyCrm) {
      return null;
    }

    const { customActivities: _customActivities, settings: _settings, ...adminState } = legacyCrm;
    return adminState;
  }

  if (entityId === CLOUD_ENTITY_IDS.crmActivities) {
    return Array.isArray(legacyCrm?.customActivities) ? legacyCrm.customActivities : null;
  }

  if (entityId === CLOUD_ENTITY_IDS.settings) {
    const nextSettings = {};

    if (typeof legacySlices?.language === "string") {
      nextSettings.language = legacySlices.language;
    }

    if (isObject(legacyCrm?.settings)) {
      nextSettings.crm = legacyCrm.settings;
    }

    return Object.keys(nextSettings).length > 0 ? nextSettings : null;
  }

  if (entityId === CLOUD_ENTITY_IDS.users) {
    return null;
  }

  return null;
}

async function fetchRowPayload(rowId) {
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from(STATE_TABLE)
    .select("payload")
    .eq("id", rowId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data?.payload ?? null;
}

async function upsertRowPayload(rowId, payload) {
  if (!supabase) {
    return;
  }

  const { error } = await supabase
    .from(STATE_TABLE)
    .upsert({ id: rowId, payload }, { onConflict: "id" });

  if (error) {
    throw error;
  }
}

function assertEntityId(entityId) {
  if (!SUPPORTED_ENTITY_IDS.has(entityId)) {
    throw new Error(`Unsupported cloud entity id: ${entityId}`);
  }
}

export function isSupportedCloudEntityId(entityId) {
  return SUPPORTED_ENTITY_IDS.has(entityId);
}

export async function fetchLegacySlice(sliceKey) {
  const rawLegacyPayload = await fetchRowPayload(LEGACY_STATE_ROW_ID);
  const normalizedLegacyPayload = normalizeLegacyCloudPayload(rawLegacyPayload);
  return normalizedLegacyPayload.slices[sliceKey] ?? null;
}

export async function saveLegacySlice(sliceKey, sliceValue) {
  return queueCloudWrite(async () => {
    const rawLegacyPayload = await fetchRowPayload(LEGACY_STATE_ROW_ID);
    const normalizedLegacyPayload = normalizeLegacyCloudPayload(rawLegacyPayload);

    await upsertRowPayload(LEGACY_STATE_ROW_ID, {
      ...normalizedLegacyPayload,
      slices: {
        ...normalizedLegacyPayload.slices,
        [sliceKey]: sliceValue
      }
    });
  });
}

export async function fetchCloudEntity(entityId) {
  assertEntityId(entityId);

  const entityPayload = await fetchRowPayload(entityId);
  if (entityPayload !== null) {
    return entityPayload;
  }

  const rawLegacyPayload = await fetchRowPayload(LEGACY_STATE_ROW_ID);
  const normalizedLegacyPayload = normalizeLegacyCloudPayload(rawLegacyPayload);
  const migratedPayload = extractLegacyEntityPayload(entityId, normalizedLegacyPayload);

  if (migratedPayload === null) {
    return null;
  }

  return migratedPayload;
}

export async function saveCloudEntity(entityId, value) {
  assertEntityId(entityId);
  return queueCloudWrite(async () => {
    await upsertRowPayload(entityId, value);
  });
}

export function subscribeToCloudEntities(entityIds, onEntityPayload) {
  if (!supabase || typeof onEntityPayload !== "function") {
    return () => {};
  }

  const uniqueEntityIds = Array.from(
    new Set((Array.isArray(entityIds) ? entityIds : [entityIds]).filter(Boolean))
  );

  if (uniqueEntityIds.length === 0) {
    return () => {};
  }

  uniqueEntityIds.forEach(assertEntityId);

  const channelName = `topdance-app-state-${Date.now()}-${Math.random()
    .toString(16)
    .slice(2, 8)}`;
  const channel = supabase.channel(channelName);

  uniqueEntityIds.forEach((entityId) => {
    channel.on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: STATE_TABLE,
        filter: `id=eq.${entityId}`
      },
      (change) => {
        const nextPayload = change?.new?.payload ?? null;
        onEntityPayload(entityId, nextPayload, change);
      }
    );
  });

  channel.subscribe((status) => {
    if (status === "CHANNEL_ERROR") {
      console.error("Supabase realtime subscription failed for app_state.");
    }
  });

  return () => {
    supabase.removeChannel(channel).catch((error) => {
      console.error("Supabase realtime channel cleanup failed:", error);
    });
  };
}

export async function updateCloudEntity(entityId, updater) {
  assertEntityId(entityId);
  return queueCloudWrite(async () => {
    const currentValue = await fetchCloudEntity(entityId);
    const nextValue = typeof updater === "function" ? updater(currentValue) : updater;

    if (typeof nextValue === "undefined") {
      return;
    }

    await upsertRowPayload(entityId, nextValue);
  });
}

export const __cloudSyncTestUtils = {
  normalizeLegacyCloudPayload,
  extractLegacyEntityPayload,
  CLOUD_ENTITY_IDS
};
