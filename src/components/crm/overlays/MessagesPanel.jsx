import { useLanguage } from "../../../context/LanguageContext";
import {
  MUTED_TEXT,
  PanelShell,
  SECONDARY_TEXT,
  SURFACE_BACKGROUND,
  SURFACE_BORDER
} from "./shared";

export function CrmMessagesPanel({ activities, isOpen, onClose }) {
  const { t } = useLanguage();

  if (!isOpen) {
    return null;
  }

  return (
    <PanelShell
      title={t("ui.bc251ad6e909")}
      subtitle={t("ui.f78fd6af1867")}
      onClose={onClose}
    >
      <div className="flex flex-col gap-3">
        {activities.length > 0 ? (
          activities.map((activity) => (
            <div
              key={activity.id}
              className="rounded-2xl p-4"
              style={{
                background: SURFACE_BACKGROUND,
                border: `1px solid ${SURFACE_BORDER}`
              }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full"
                  style={{ background: activity.tint ?? "rgba(255,255,255,0.06)" }}
                >
                  <div className="h-2.5 w-2.5 rounded-full" style={{ background: activity.color }} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm leading-6 text-white">{activity.text}</p>
                  <p className="mt-1 text-xs" style={{ color: SECONDARY_TEXT }}>
                    {activity.time}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div
            className="rounded-2xl p-4 text-sm"
            style={{
              background: SURFACE_BACKGROUND,
              border: `1px solid ${SURFACE_BORDER}`,
              color: MUTED_TEXT
            }}
          >
            {t("ui.9ba741338af0")}
          </div>
        )}
      </div>
    </PanelShell>
  );
}
