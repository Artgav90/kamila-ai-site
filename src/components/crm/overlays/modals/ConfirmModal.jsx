import { useLanguage } from "../../../../context/LanguageContext";
import { ModalShell, SURFACE_BORDER } from "../shared";

export function CrmConfirmModal({
  confirmLabel = "Confirm",
  isOpen,
  onClose,
  onConfirm,
  subtitle,
  title
}) {
  const { t } = useLanguage();
  const resolvedConfirmLabel =
    confirmLabel === "Confirm" ? t("ui.9b8abbd5a943") : confirmLabel;

  if (!isOpen) {
    return null;
  }

  return (
    <ModalShell title={title} subtitle={subtitle} onClose={onClose} className="max-w-[460px]">
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="h-12 rounded-2xl px-5 text-sm font-bold text-white transition-all active:scale-[0.98]"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: `1px solid ${SURFACE_BORDER}`
          }}
        >
          {t("ui.954dd077a89d")}
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="h-12 rounded-2xl px-5 text-sm font-bold text-white transition-all active:scale-[0.98]"
          style={{
            background: "linear-gradient(135deg, rgb(255, 95, 160), rgb(168, 85, 247))"
          }}
        >
          {resolvedConfirmLabel}
        </button>
      </div>
    </ModalShell>
  );
}
