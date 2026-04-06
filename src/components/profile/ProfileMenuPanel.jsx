import { useNavigate } from "react-router-dom";
import { useAppAccess } from "../../context/AppAccessContext";
import { useLanguage } from "../../context/LanguageContext";
import { profileMenuItems } from "./profileData";
import {
  BellIcon,
  ChevronRightIcon,
  HistoryIcon,
  SettingsIcon
} from "./ProfileIcons";

function getMenuIcon(icon) {
  switch (icon) {
    case "bell":
      return <BellIcon />;
    case "settings":
      return <SettingsIcon />;
    case "history":
    default:
      return <HistoryIcon />;
  }
}

function ProfileMenuPanel() {
  const navigate = useNavigate();
  const { revokeAccess } = useAppAccess();
  const { t } = useLanguage();

  const handleMenuClick = (itemId) => {
    if (itemId === "attendance-history") {
      navigate("/schedule");
    }
  };

  return (
    <>
      <section
        className="overflow-hidden rounded-2xl"
        style={{
          background: "rgb(19, 19, 31)",
          border: "1px solid rgba(255, 255, 255, 0.07)"
        }}
      >
        {profileMenuItems.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => handleMenuClick(item.id)}
            className="flex w-full items-center justify-between px-4 py-4 transition-opacity active:opacity-60"
            style={{
              borderBottom:
                index < profileMenuItems.length - 1
                  ? "1px solid rgba(255, 255, 255, 0.07)"
                  : "none"
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-xl"
                style={{ background: "rgba(255, 255, 255, 0.06)" }}
              >
                {getMenuIcon(item.icon)}
              </div>
              <span className="text-sm font-medium text-white">
                {item.id === "attendance-history"
                  ? t("ui.1d9632aec027")
                  : item.id === "notifications"
                    ? t("ui.bc251ad6e909")
                    : t("ui.0f4cca63c907")}
              </span>
            </div>

            <ChevronRightIcon />
          </button>
        ))}
      </section>

      <button
        type="button"
        onClick={() => {
          revokeAccess();
          navigate("/welcome", { replace: true });
        }}
        className="mt-4 h-12 w-full rounded-2xl text-sm font-bold transition-all active:scale-95"
        style={{
          background: "rgba(239, 68, 68, 0.1)",
          color: "rgb(239, 68, 68)",
          border: "1px solid rgba(239, 68, 68, 0.15)"
        }}
      >
        {t("ui.56c78442fb5a")}
      </button>
    </>
  );
}

export default ProfileMenuPanel;
