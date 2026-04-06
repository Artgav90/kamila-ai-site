import { crmSidebarMainItems, crmSidebarUtilityItems } from "./crmData";
import { useLanguage } from "../../context/LanguageContext";
import { CrmIcon } from "./CrmIcons";

const SIDEBAR_BACKGROUND = "rgb(15, 15, 26)";
const SIDEBAR_BORDER = "rgba(255, 255, 255, 0.06)";
const SIDEBAR_MUTED = "rgba(255, 255, 255, 0.45)";
const SIDEBAR_ACTIVE_BORDER = "rgba(168, 85, 247, 0.2)";

function SidebarButton({ icon, label, isActive = false, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-all"
      style={
        isActive
          ? {
              background:
                "linear-gradient(135deg, rgba(255, 95, 160, 0.15), rgba(168, 85, 247, 0.15))",
              color: "rgb(255, 255, 255)",
              border: `1px solid ${SIDEBAR_ACTIVE_BORDER}`
            }
          : {
              color: SIDEBAR_MUTED,
              border: "1px solid transparent"
            }
      }
    >
      <span className="flex items-center gap-3">
        <CrmIcon
          name={icon}
          size={15}
          color={isActive ? "#FF5FA0" : SIDEBAR_MUTED}
        />
        <span>{label}</span>
      </span>
    </button>
  );
}

function UtilityButton({ icon, label, isActive = false, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all"
      style={
        isActive
          ? {
              background: "rgba(255, 255, 255, 0.06)",
              color: "rgb(255, 255, 255)"
            }
          : {
              color: SIDEBAR_MUTED
            }
      }
    >
      <CrmIcon
        name={icon}
        size={15}
        color={isActive ? "rgb(255, 255, 255)" : SIDEBAR_MUTED}
      />
      <span>{label}</span>
    </button>
  );
}

function CrmSidebar({
  activeItemId,
  onBackToApp,
  onSelectMainItem,
  onSelectUtilityItem
}) {
  const { t } = useLanguage();

  const localizeMainItem = (itemId, fallbackLabel) => {
    switch (itemId) {
      case "dashboard":
        return t("ui.09fa93e81a43");
      case "students":
        return t("ui.e161fcab4c90");
      case "pipeline":
        return t("ui.52a6b3840e7b");
      case "revenue":
        return t("ui.b446ace92a02");
      case "schedule":
        return t("ui.1c8f85c7c43d");
      case "messages":
        return t("ui.a472fff14de7");
      case "reports":
        return t("ui.c33de8a649fe");
      default:
        return fallbackLabel;
    }
  };

  const localizeUtilityItem = (itemId, fallbackLabel) => {
    if (itemId === "settings") {
      return t("ui.0f4cca63c907");
    }
    if (itemId === "logout") {
      return t("ui.56c78442fb5a");
    }
    return fallbackLabel;
  };

  return (
    <aside
      className="fixed top-0 left-0 z-10 flex h-full w-56 shrink-0 flex-col"
      style={{
        background: SIDEBAR_BACKGROUND,
        borderRight: `1px solid ${SIDEBAR_BORDER}`
      }}
    >
      <div
        className="flex items-center gap-3 px-5 py-4"
        style={{ borderBottom: `1px solid ${SIDEBAR_BORDER}` }}
      >
        <div
          className="flex h-8 w-8 items-center justify-center rounded-xl"
          style={{
            background: "linear-gradient(135deg, rgb(255, 95, 160), rgb(168, 85, 247))"
          }}
        >
          <CrmIcon name="zap" size={15} color="#fff" />
        </div>

        <div>
          <p className="text-sm font-black tracking-wide text-white">TOP.DANCE</p>
          <p className="text-[10px]" style={{ color: SIDEBAR_MUTED }}>
            {t("ui.1e7621b77c8d")}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onBackToApp}
        className="mx-3 mt-3 flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium transition-all hover:bg-white/5"
        style={{
          color: SIDEBAR_MUTED,
          border: `1px solid ${SIDEBAR_BORDER}`
        }}
      >
        <CrmIcon name="chevron-left" size={13} color="currentColor" />
        <span>{t("ui.9e62e5fcab92")}</span>
      </button>

      <nav className="flex flex-1 flex-col gap-0.5 px-3 py-3">
        {crmSidebarMainItems.map((item) => (
          <SidebarButton
            key={item.id}
            icon={item.icon}
            label={localizeMainItem(item.id, item.label)}
            isActive={activeItemId === item.id}
            onClick={() => onSelectMainItem(item.id)}
          />
        ))}
      </nav>

      <div
        className="flex flex-col gap-0.5 px-3 py-3"
        style={{ borderTop: `1px solid ${SIDEBAR_BORDER}` }}
      >
        {crmSidebarUtilityItems.map((item) => (
          <UtilityButton
            key={item.id}
            icon={item.icon}
            label={localizeUtilityItem(item.id, item.label)}
            isActive={activeItemId === item.id}
            onClick={() => onSelectUtilityItem(item.id)}
          />
        ))}

        <div className="mt-2 flex items-center gap-3 px-3 py-2">
          <div
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-black text-white"
            style={{
              background: "linear-gradient(135deg, rgb(255, 95, 160), rgb(168, 85, 247))"
            }}
          >
            A
          </div>

          <div className="min-w-0">
            <p className="truncate text-xs font-bold text-white">{t("ui.a839ff6388af")}</p>
            <p className="truncate text-[10px]" style={{ color: SIDEBAR_MUTED }}>
              {t("ui.6784659b7460")}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default CrmSidebar;
