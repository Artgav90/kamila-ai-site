import { ArrowLeftIcon } from "./StudentManagementIcons";
import { useLanguage } from "../../../context/LanguageContext";

function StudentsScreenHeader({ title, subtitle, onBack }) {
  const { t } = useLanguage();

  return (
    <div className="flex items-center gap-3 px-5 pt-3 pb-4">
      <button
        type="button"
        onClick={onBack}
        aria-label={t("ui.9962b6d8b7c5")}
        className="flex h-10 w-10 items-center justify-center rounded-2xl transition-all active:scale-95"
        style={{
          background: "rgb(19, 19, 31)",
          border: "1px solid rgba(255, 255, 255, 0.07)"
        }}
      >
        <ArrowLeftIcon />
      </button>

      <div>
        <h2 className="text-xl font-black text-white">{title}</h2>
        <p className="text-xs" style={{ color: "rgba(255, 255, 255, 0.45)" }}>
          {subtitle}
        </p>
      </div>
    </div>
  );
}

export default StudentsScreenHeader;
