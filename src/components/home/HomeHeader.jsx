import bellIcon from "../../assets/home/icon-bell.svg";
import { useLanguage } from "../../context/LanguageContext";
import { useStudentCheckIn } from "../../context/StudentCheckInContext";

function HomeHeader() {
  const { t } = useLanguage();
  const { profileIdentityView } = useStudentCheckIn();
  const firstName = String(profileIdentityView.name ?? "")
    .trim()
    .split(/\s+/)[0];

  return (
    <header className="flex items-start justify-between gap-4">
      <div>
        <p className="text-[12px] font-medium leading-4 text-white/45">
          {t("ui.b9ae66e5955e")}
        </p>
        <h1 className="mt-[1px] text-[18px] font-bold leading-7 text-white">
          {`${firstName || t("ui.0b46d5b0709f")} 👋`}
        </h1>
      </div>

      <button
        type="button"
        aria-label="Notifications"
        className="relative flex h-10 w-10 items-center justify-center rounded-2xl border border-white/7 bg-[#13131f]"
      >
        <img src={bellIcon} alt="" className="h-[18px] w-[18px]" />
        <span className="absolute right-[9px] top-[8px] h-2 w-2 rounded-[2px] bg-[#ff5fa0]" />
      </button>
    </header>
  );
}

export default HomeHeader;
