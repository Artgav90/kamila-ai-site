import {
  coerceSettingsEntity,
  parseLanguage,
  parseSettingsEntity
} from "../../domain/types/cloud";
import {
  CLOUD_ENTITY_IDS,
  fetchCloudEntity,
  saveCloudEntity,
  subscribeToCloudEntities
} from "../../services/supabase.core";

function mergeSettings(currentState, incomingState) {
  const current = coerceSettingsEntity(currentState);
  const incoming = coerceSettingsEntity(incomingState);

  return {
    ...current,
    ...incoming,
    crm: {
      ...(current.crm ?? {}),
      ...(incoming.crm ?? {})
    }
  };
}

async function loadSettings() {
  return parseSettingsEntity(await fetchCloudEntity(CLOUD_ENTITY_IDS.settings));
}

async function saveSettings(nextState) {
  await saveCloudEntity(CLOUD_ENTITY_IDS.settings, coerceSettingsEntity(nextState));
}

export const settingsRepository = Object.freeze({
  load: loadSettings,

  save: saveSettings,

  subscribe(onChange) {
    if (typeof onChange !== "function") {
      return () => {};
    }

    return subscribeToCloudEntities([CLOUD_ENTITY_IDS.settings], async () => {
      const nextState = await loadSettings();
      onChange(nextState);
    });
  },

  merge(currentState, incomingState) {
    return mergeSettings(currentState, incomingState);
  },

  async loadLanguage() {
    const settings = await loadSettings();
    return parseLanguage(settings?.language);
  },

  async saveLanguage(language) {
    const normalizedLanguage = parseLanguage(language);
    if (!normalizedLanguage) {
      return;
    }

    const currentSettings = await loadSettings();
    const mergedSettings = mergeSettings(currentSettings, { language: normalizedLanguage });
    await saveSettings(mergedSettings);
  }
});
