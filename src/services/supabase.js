import { crmRepository, scheduleRepository, settingsRepository, studentsRepository } from "../repositories/cloud";
import {
  __cloudSyncTestUtils,
  CLOUD_ENTITY_IDS,
  fetchCloudEntity,
  fetchLegacySlice,
  isSupportedCloudEntityId,
  isSupabaseConfigured,
  saveCloudEntity,
  saveLegacySlice,
  subscribeToCloudEntities,
  supabase,
  updateCloudEntity
} from "./supabase.core";

export {
  __cloudSyncTestUtils,
  CLOUD_ENTITY_IDS,
  fetchCloudEntity,
  isSupabaseConfigured,
  saveCloudEntity,
  subscribeToCloudEntities,
  supabase,
  updateCloudEntity
};

export async function fetchLanguageFromCloud() {
  return settingsRepository.loadLanguage();
}

export async function saveLanguageToCloud(language) {
  await settingsRepository.saveLanguage(language);
}

export async function fetchCrmStateFromCloud() {
  return crmRepository.load();
}

export async function saveCrmStateToCloud(crmState) {
  await crmRepository.save(crmState);
}

export async function fetchScheduleStateFromCloud() {
  return scheduleRepository.load();
}

export async function saveScheduleStateToCloud(scheduleState) {
  await scheduleRepository.save(scheduleState);
}

export async function fetchCloudSlice(sliceKey) {
  if (sliceKey === "student") {
    return fetchStudentStateFromCloud();
  }

  if (sliceKey === "schedule") {
    return fetchScheduleStateFromCloud();
  }

  if (sliceKey === "language") {
    return fetchLanguageFromCloud();
  }

  if (sliceKey === "crm") {
    return fetchCrmStateFromCloud();
  }

  if (isSupportedCloudEntityId(sliceKey)) {
    return fetchCloudEntity(sliceKey);
  }

  return fetchLegacySlice(sliceKey);
}

export async function saveCloudSlice(sliceKey, sliceValue) {
  if (sliceKey === "student") {
    return saveStudentStateToCloud(sliceValue);
  }

  if (sliceKey === "schedule") {
    return saveScheduleStateToCloud(sliceValue);
  }

  if (sliceKey === "language") {
    return saveLanguageToCloud(sliceValue);
  }

  if (sliceKey === "crm") {
    return saveCrmStateToCloud(sliceValue);
  }

  if (isSupportedCloudEntityId(sliceKey)) {
    return saveCloudEntity(sliceKey, sliceValue);
  }

  return saveLegacySlice(sliceKey, sliceValue);
}

export async function fetchStudentStateFromCloud() {
  return studentsRepository.load();
}

export async function saveStudentStateToCloud(state) {
  await studentsRepository.save(state);
}
