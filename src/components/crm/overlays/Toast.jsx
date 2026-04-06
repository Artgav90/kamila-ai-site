import { useLanguage } from "../../../context/LanguageContext";
import { CrmIcon } from "../CrmIcons";

export function CrmToast({ toast }) {
  const { t } = useLanguage();

  if (!toast) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed right-6 bottom-6 z-[70]">
      <div
        className="flex min-w-[320px] items-start gap-3 rounded-2xl px-4 py-3"
        style={{
          background: toast.tone === "error" ? "rgb(69, 20, 33)" : "rgb(24, 24, 39)",
          border: `1px solid ${
            toast.tone === "error" ? "rgba(239, 68, 68, 0.3)" : "rgba(168, 85, 247, 0.18)"
          }`,
          boxShadow: "0 20px 60px rgba(0,0,0,0.35)"
        }}
      >
        <div
          className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full"
          style={{
            background:
              toast.tone === "error"
                ? "rgba(239, 68, 68, 0.16)"
                : "rgba(16, 185, 129, 0.14)"
          }}
        >
          <CrmIcon
            name={toast.tone === "error" ? "x" : "circle-check"}
            size={12}
            color={toast.tone === "error" ? "rgb(239, 68, 68)" : "rgb(16, 185, 129)"}
          />
        </div>
        <div>
          <p className="text-sm font-bold text-white">
            {toast.tone === "error" ? t("ui.18385725241c") : t("ui.e3c6181d9137")}
          </p>
          <p className="mt-1 text-sm text-white/78">{toast.message}</p>
        </div>
      </div>
    </div>
  );
}
