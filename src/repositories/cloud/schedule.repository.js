import {
  coerceScheduleEntity,
  parseScheduleEntity
} from "../../domain/types/cloud";
import {
  CLOUD_ENTITY_IDS,
  fetchCloudEntity,
  saveCloudEntity,
  subscribeToCloudEntities
} from "../../services/supabase.core";

function mergeSchedule(currentState, incomingState) {
  const current = coerceScheduleEntity(currentState);
  const incoming = coerceScheduleEntity(incomingState);
  const mergedBookedClassKeys = Array.from(
    new Set([
      ...(Array.isArray(current.bookedClassKeys) ? current.bookedClassKeys : []),
      ...(Array.isArray(incoming.bookedClassKeys) ? incoming.bookedClassKeys : [])
    ])
  );

  return {
    ...current,
    ...incoming,
    bookedClassKeys: mergedBookedClassKeys,
    weeklyTemplate: Array.isArray(incoming.weeklyTemplate)
      ? incoming.weeklyTemplate
      : current.weeklyTemplate
  };
}

async function loadSchedule() {
  return parseScheduleEntity(await fetchCloudEntity(CLOUD_ENTITY_IDS.schedule));
}

async function saveSchedule(nextState) {
  await saveCloudEntity(CLOUD_ENTITY_IDS.schedule, coerceScheduleEntity(nextState));
}

export const scheduleRepository = Object.freeze({
  load: loadSchedule,

  save: saveSchedule,

  subscribe(onChange) {
    if (typeof onChange !== "function") {
      return () => {};
    }

    return subscribeToCloudEntities([CLOUD_ENTITY_IDS.schedule], async () => {
      const nextState = await loadSchedule();
      onChange(nextState);
    });
  },

  merge(currentState, incomingState) {
    return mergeSchedule(currentState, incomingState);
  }
});
