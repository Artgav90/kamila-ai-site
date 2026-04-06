import {
  coerceAdminEntity,
  coerceCrmActivitiesEntity,
  coerceLegacyCrmSlice,
  coerceSettingsEntity,
  parseAdminEntity,
  parseCrmActivitiesEntity,
  parseSettingsEntity
} from "../../domain/types/cloud";
import {
  CLOUD_ENTITY_IDS,
  fetchCloudEntity,
  saveCloudEntity,
  subscribeToCloudEntities,
  updateCloudEntity
} from "../../services/supabase.core";

function mergeCrmState(currentState, incomingState) {
  const current = coerceLegacyCrmSlice(currentState);
  const incoming = coerceLegacyCrmSlice(incomingState);
  const incomingActivities = Array.isArray(incoming.customActivities)
    ? incoming.customActivities
    : [];
  const currentActivities = Array.isArray(current.customActivities)
    ? current.customActivities
    : [];
  const mergedActivitiesMap = new Map();
  incomingActivities.forEach((activity) => {
    mergedActivitiesMap.set(activity.id, activity);
  });
  currentActivities.forEach((activity) => {
    if (!mergedActivitiesMap.has(activity.id)) {
      mergedActivitiesMap.set(activity.id, activity);
    }
  });

  return {
    ...current,
    ...incoming,
    monthlyRevenue:
      Number.isFinite(Number(incoming.monthlyRevenue))
        ? Number(incoming.monthlyRevenue)
        : Number(current.monthlyRevenue) || 0,
    checkinsTodayBoost: Math.max(
      Number(current.checkinsTodayBoost) || 0,
      Number(incoming.checkinsTodayBoost) || 0
    ),
    customActivities: Array.from(mergedActivitiesMap.values()).slice(0, 24),
    settings: {
      ...(current.settings ?? {}),
      ...(incoming.settings ?? {})
    }
  };
}

async function loadCrm() {
  const [rawAdminState, rawCustomActivities, rawSettings] = await Promise.all([
    fetchCloudEntity(CLOUD_ENTITY_IDS.admin),
    fetchCloudEntity(CLOUD_ENTITY_IDS.crmActivities),
    fetchCloudEntity(CLOUD_ENTITY_IDS.settings)
  ]);

  const adminState = parseAdminEntity(rawAdminState);
  const customActivities = parseCrmActivitiesEntity(rawCustomActivities);
  const settings = parseSettingsEntity(rawSettings);

  return mergeCrmState(
    {
      ...(adminState ?? {}),
      customActivities: customActivities ?? [],
      settings: settings?.crm ?? {}
    },
    {}
  );
}

async function saveCrm(nextState) {
  const safeCrmState = coerceLegacyCrmSlice(nextState);
  const { customActivities, settings, ...adminState } = safeCrmState;

  await Promise.all([
    saveCloudEntity(CLOUD_ENTITY_IDS.admin, coerceAdminEntity(adminState)),
    saveCloudEntity(CLOUD_ENTITY_IDS.crmActivities, coerceCrmActivitiesEntity(customActivities)),
    updateCloudEntity(CLOUD_ENTITY_IDS.settings, (currentSettings) => ({
      ...coerceSettingsEntity(currentSettings),
      crm: coerceSettingsEntity({ crm: settings }).crm ?? {}
    }))
  ]);
}

export const crmRepository = Object.freeze({
  load: loadCrm,

  save: saveCrm,

  subscribe(onChange) {
    if (typeof onChange !== "function") {
      return () => {};
    }

    return subscribeToCloudEntities(
      [
        CLOUD_ENTITY_IDS.admin,
        CLOUD_ENTITY_IDS.crmActivities,
        CLOUD_ENTITY_IDS.settings
      ],
      async () => {
        const nextState = await loadCrm();
        onChange(nextState);
      }
    );
  },

  merge(currentState, incomingState) {
    return mergeCrmState(currentState, incomingState);
  }
});
