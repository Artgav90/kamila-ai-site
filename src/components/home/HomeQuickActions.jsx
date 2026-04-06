import { FileTextIcon, ShieldIcon } from "./HomeIcons";
import { useLanguage } from "../../context/LanguageContext";

function HomeQuickActions() {
  const { t } = useLanguage();

  return (
    <div className="mt-5 flex gap-3 px-5">
      <button
        type="button"
        className="flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl transition-all active:scale-95"
        style={{
          background: "rgb(19, 19, 31)",
          border: "1px solid rgba(255, 255, 255, 0.07)",
          boxShadow: "0 2px 12px rgba(0, 0, 0, 0.3)"
        }}
      >
        <FileTextIcon color="#FF5FA0" />
        <span className="text-sm font-semibold text-white">{t("ui.03af95e157c6")}</span>
      </button>

      <button
        type="button"
        className="flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl transition-all active:scale-95"
        style={{
          background: "rgb(19, 19, 31)",
          border: "1px solid rgba(255, 255, 255, 0.07)",
          boxShadow: "0 2px 12px rgba(0, 0, 0, 0.3)"
        }}
      >
        <ShieldIcon color="#A855F7" />
        <span className="text-sm font-semibold text-white">{t("ui.17ef299ba2c8")}</span>
      </button>
    </div>
  );
}

export default HomeQuickActions;
