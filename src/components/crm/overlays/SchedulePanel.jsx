import { useLanguage } from "../../../context/LanguageContext";
import {
  MUTED_TEXT,
  PanelShell,
  SURFACE_BACKGROUND,
  SURFACE_BORDER
} from "./shared";

export function CrmSchedulePanel({
  isOpen,
  onClose,
  onOpenSchedule,
  scheduleItems
}) {
  const { t } = useLanguage();

  if (!isOpen) {
    return null;
  }

  return (
    <PanelShell
      title={t("ui.1c8f85c7c43d")}
      subtitle={t("ui.d70ab647706a")}
      onClose={onClose}
    >
      <div className="flex flex-col gap-3">
        {scheduleItems.length > 0 ? (
          scheduleItems.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl p-4"
              style={{
                background: SURFACE_BACKGROUND,
                border: `1px solid ${SURFACE_BORDER}`
              }}
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-black text-white">
                    {item.title === "Kinder"
                      ? t("ui.95735930b3fe")
                      : item.title === "Prof Kinder"
                        ? t("ui.7dcaa59a4d27")
                        : item.title}
                  </p>
                  {item.room ? (
                    <p className="mt-1 text-xs" style={{ color: MUTED_TEXT }}>
                      {item.room.replace("Studio", t("ui.c58a8a497ebe"))}
                    </p>
                  ) : null}
                </div>
                <p className="text-sm font-bold text-white">{item.time}</p>
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
            {t("ui.d3a10785f09a")}
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={onOpenSchedule}
        className="mt-5 flex h-12 w-full items-center justify-center rounded-2xl text-sm font-bold text-white transition-all active:scale-[0.98]"
        style={{
          background: "linear-gradient(135deg, rgb(255, 95, 160), rgb(168, 85, 247))"
        }}
      >
        {t("ui.511544030fdc")}
      </button>
    </PanelShell>
  );
}
