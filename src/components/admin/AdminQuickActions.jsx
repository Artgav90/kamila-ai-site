import { QrCodeIcon } from "../home/HomeIcons";
import { useLanguage } from "../../context/LanguageContext";
import { adminQuickActions } from "./adminData";
import { CalendarCogIcon, ContactCardIcon, UsersIcon } from "./AdminIcons";

function getQuickActionIcon(icon, color) {
  const commonProps = {
    size: 16,
    color,
    strokeWidth: 2
  };

  switch (icon) {
    case "users":
      return <UsersIcon {...commonProps} />;
    case "contact-card":
      return <ContactCardIcon {...commonProps} />;
    case "calendar-cog":
      return <CalendarCogIcon {...commonProps} />;
    case "qr-code":
    default:
      return <QrCodeIcon {...commonProps} />;
  }
}

function getActionStyle(variant) {
  switch (variant) {
    case "primary":
      return {
        color: "rgb(255, 255, 255)",
        background: "linear-gradient(135deg, rgb(255, 95, 160), rgb(168, 85, 247))",
        boxShadow: "0 6px 20px rgba(255, 95, 160, 0.3)"
      };
    case "accent":
      return {
        color: "rgb(255, 95, 160)",
        background: "rgba(255, 95, 160, 0.07)",
        border: "1px solid rgba(255, 95, 160, 0.2)"
      };
    case "default":
    default:
      return {
        color: "rgb(255, 255, 255)",
        background: "rgb(19, 19, 31)",
        border: "1px solid rgba(255, 255, 255, 0.07)"
      };
  }
}

function getActionIconColor(action) {
  if (action.variant === "primary" || action.variant === "accent") {
    return "currentColor";
  }

  if (action.id === "crm") {
    return "rgb(168, 85, 247)";
  }

  return "rgb(255, 95, 160)";
}

function AdminQuickActions({ onAction }) {
  const { t } = useLanguage();

  return (
    <div className="mb-5 px-5">
      <h3 className="mb-3 text-sm font-bold text-white">{t("ui.cb8cd424b3e0")}</h3>

      <div className="grid grid-cols-2 gap-3">
        {adminQuickActions.map((action) => (
          <button
            key={action.id}
            type="button"
            className={`flex h-14 items-center justify-center gap-2 rounded-2xl text-sm font-bold transition-all active:scale-95 ${action.span ?? ""}`}
            onClick={() => onAction?.(action.id)}
            style={getActionStyle(action.variant)}
          >
            {getQuickActionIcon(action.icon, getActionIconColor(action))}
            {action.id === "scan-qr"
              ? t("ui.920dd6fbb29e")
              : action.id === "students"
                ? t("ui.e161fcab4c90")
                : action.id === "crm"
                  ? "CRM"
                  : t("ui.f13a90864e53")}
          </button>
        ))}
      </div>
    </div>
  );
}

export default AdminQuickActions;
