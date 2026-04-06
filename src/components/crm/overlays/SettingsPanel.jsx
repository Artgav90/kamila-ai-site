import { useLanguage } from "../../../context/LanguageContext";
import {
  MUTED_TEXT,
  PanelShell,
  SURFACE_BACKGROUND,
  SURFACE_BORDER
} from "./shared";

export function CrmSettingsPanel({
  isOpen,
  onClose,
  onToggleSetting,
  settings,
  settingItems
}) {
  const { t } = useLanguage();

  if (!isOpen) {
    return null;
  }

  return (
    <PanelShell
      title={t("ui.0f4cca63c907")}
      subtitle={t("ui.8208e33d3042")}
      onClose={onClose}
    >
      <div className="flex flex-col gap-3">
        {settingItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onToggleSetting(item.id)}
            className="rounded-2xl p-4 text-left transition-all"
            style={{
              background: SURFACE_BACKGROUND,
              border: `1px solid ${
                settings[item.id] ? "rgba(255, 95, 160, 0.22)" : SURFACE_BORDER
              }`
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-white">
                  {item.id === "notifications"
                    ? t("ui.828b12873eec")
                    : item.id === "daily-report"
                      ? t("ui.d6da5177a8d7")
                      : t("ui.4644750cd2ad")}
                </p>
                <p className="mt-1 text-sm leading-6" style={{ color: MUTED_TEXT }}>
                  {item.id === "notifications"
                    ? t("ui.3ceacc1e9d6d")
                    : item.id === "daily-report"
                      ? t("ui.ee47414ea272")
                      : t("ui.33e4d174965f")}
                </p>
              </div>

              <div
                className="flex h-7 w-12 shrink-0 items-center rounded-full p-1 transition-all"
                style={{
                  background: settings[item.id]
                    ? "linear-gradient(135deg, rgb(255, 95, 160), rgb(168, 85, 247))"
                    : "rgba(255, 255, 255, 0.1)"
                }}
              >
                <div
                  className="h-5 w-5 rounded-full bg-white transition-all"
                  style={{
                    transform: settings[item.id] ? "translateX(20px)" : "translateX(0)"
                  }}
                />
              </div>
            </div>
          </button>
        ))}
      </div>
    </PanelShell>
  );
}
