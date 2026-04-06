import { useLanguage } from "../../../context/LanguageContext";
import { CrmIcon } from "../CrmIcons";
import {
  MUTED_TEXT,
  PanelShell,
  SECONDARY_TEXT,
  SURFACE_BACKGROUND,
  SURFACE_BORDER
} from "./shared";

export function CrmReportsPanel({
  isOpen,
  metrics,
  onClose,
  onDownloadReport
}) {
  const { t } = useLanguage();

  if (!isOpen) {
    return null;
  }

  return (
    <PanelShell
      title={t("ui.c33de8a649fe")}
      subtitle={t("ui.30ad31024cb9")}
      onClose={onClose}
    >
      <div className="grid grid-cols-2 gap-3">
        {metrics.map((metric) => (
          <div
            key={metric.id}
            className="rounded-2xl p-4"
            style={{
              background: SURFACE_BACKGROUND,
              border: `1px solid ${SURFACE_BORDER}`
            }}
          >
            <p className="text-[11px] uppercase tracking-[0.14em]" style={{ color: MUTED_TEXT }}>
              {metric.label}
            </p>
            <p className="mt-2 text-2xl font-black text-white">{metric.value}</p>
            <p className="mt-1 text-xs" style={{ color: SECONDARY_TEXT }}>
              {metric.note}
            </p>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={onDownloadReport}
        className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-2xl text-sm font-bold text-white transition-all active:scale-[0.98]"
        style={{
          background: "linear-gradient(135deg, rgb(255, 95, 160), rgb(168, 85, 247))"
        }}
      >
        <CrmIcon name="download" size={15} color="currentColor" />
        <span>{t("ui.3dc7f87622ab")}</span>
      </button>
    </PanelShell>
  );
}
