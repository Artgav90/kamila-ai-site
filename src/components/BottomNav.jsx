import { NavLink } from "react-router-dom";
import { navigationItems } from "../data/navigation";
import { useAppAccess } from "../context/AppAccessContext";
import { useLanguage } from "../context/LanguageContext";
import {
  CalendarDaysIcon,
  CircleUserIcon,
  HouseIcon,
  ShieldCheckIcon
} from "./home/HomeIcons";

function getNavIcon(icon, isActive) {
  const iconProps = {
    className: "h-[22px] w-[22px]",
    color: isActive ? "rgb(255, 95, 160)" : "rgba(255, 255, 255, 0.28)",
    strokeWidth: isActive ? 2 : 1.5
  };

  switch (icon) {
    case "schedule":
      return <CalendarDaysIcon {...iconProps} />;
    case "profile":
      return <CircleUserIcon {...iconProps} />;
    case "admin":
      return <ShieldCheckIcon {...iconProps} />;
    case "home":
    default:
      return <HouseIcon {...iconProps} />;
  }
}

function BottomNav({ floating = true }) {
  const { hasAdminAccess } = useAppAccess();
  const { t } = useLanguage();
  const visibleNavigationItems = hasAdminAccess
    ? navigationItems
    : navigationItems.filter((item) => item.to !== "/admin");
  const wrapperClassName = floating
    ? "fixed bottom-0 left-1/2 z-20 w-full max-w-[430px] -translate-x-1/2 px-5 pt-1 pb-[calc(20px+env(safe-area-inset-bottom))]"
    : "shrink-0 px-5 pt-1 pb-[calc(20px+env(safe-area-inset-bottom))]";

  return (
    <nav className={wrapperClassName}>
      <div
        className="relative flex h-16 items-center justify-around overflow-hidden rounded-[32px]"
        style={{
          background: "rgba(12, 12, 20, 0.88)",
          backdropFilter: "blur(44px) saturate(185%)",
          WebkitBackdropFilter: "blur(44px) saturate(185%)",
          border: "1px solid rgba(255, 255, 255, 0.11)",
          boxShadow:
            "0 14px 44px rgba(0, 0, 0, 0.62), 0 5px 16px rgba(0, 0, 0, 0.46), inset 0 1px 0 rgba(255, 255, 255, 0.07)"
        }}
      >
        <div
          className="pointer-events-none absolute left-8 right-8 top-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.14), transparent)" }}
        />

        {visibleNavigationItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className="relative flex h-full flex-1 flex-col items-center justify-center gap-[3px] transition-all duration-150 active:scale-[0.88]"
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <div
                    className="absolute"
                    style={{
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -60%)",
                      width: "44px",
                      height: "30px",
                      borderRadius: "12px",
                      background: "linear-gradient(135deg, rgba(255, 95, 160, 0.22) 0%, rgba(168, 85, 247, 0.22) 100%)",
                      border: "1px solid rgba(255, 95, 160, 0.24)",
                      boxShadow: "0 0 18px rgba(255, 95, 160, 0.28)"
                    }}
                  />
                )}

                <div
                  className="relative z-10 transition-all duration-200"
                  style={{
                    filter: isActive
                      ? "drop-shadow(0 0 8px rgba(255, 95, 160, 0.55)) drop-shadow(0 0 4px rgba(168, 85, 247, 0.34))"
                      : "none"
                  }}
                >
                  {getNavIcon(item.icon, isActive)}
                </div>

                <span
                  className="relative z-10 uppercase transition-all duration-200"
                  style={{
                    fontSize: "10px",
                    fontWeight: isActive ? 700 : 500,
                    letterSpacing: isActive ? "0.06em" : "0.03em",
                    color: isActive ? "rgb(255, 95, 160)" : "rgba(255, 255, 255, 0.34)",
                    opacity: isActive ? 0.96 : 0.84,
                    filter: isActive ? "drop-shadow(0 0 6px rgba(255, 95, 160, 0.42))" : "none"
                  }}
                >
                  {item.labelKey === "home"
                    ? t("ui.0c08a1cea602")
                    : item.labelKey === "schedule"
                      ? t("ui.515658be0c90")
                      : item.labelKey === "profile"
                        ? t("ui.383ff87f33a6")
                        : t("ui.a839ff6388af")}
                </span>

                <div
                  className="absolute bottom-2 left-1/2 -translate-x-1/2 transition-all duration-300"
                  style={
                    isActive
                      ? {
                          width: "18px",
                          height: "3px",
                          borderRadius: "99px",
                          background: "linear-gradient(90deg, rgb(255, 95, 160), rgb(168, 85, 247))",
                          boxShadow: "0 0 10px rgba(255, 95, 160, 0.55), 0 0 4px rgba(168, 85, 247, 0.34)",
                          opacity: 1
                        }
                      : {
                          width: "4px",
                          height: "3px",
                          borderRadius: "99px",
                          background: "rgba(255, 255, 255, 0.1)",
                          boxShadow: "none",
                          opacity: 0
                        }
                  }
                />
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export default BottomNav;
