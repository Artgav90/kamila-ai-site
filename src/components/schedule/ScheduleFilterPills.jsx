import { useLanguage } from "../../context/LanguageContext";
import { getScheduleFilterLabel, scheduleFilters } from "./scheduleData";

function ScheduleFilterPills({ activeFilter, availableFilters, onToggleFilter }) {
  const { t } = useLanguage();

  return (
    <div className="mb-4 flex gap-2 px-4">
      {scheduleFilters.map((filterLabel) => {
        const isAvailable = availableFilters.includes(filterLabel);
        const isActive = activeFilter === filterLabel;

        return (
          <button
            key={filterLabel}
            type="button"
            className="flex-1 rounded-xl py-1.5 transition-all active:scale-95"
            onClick={() => onToggleFilter(filterLabel)}
            style={{
              background:
                isActive
                  ? "linear-gradient(135deg, rgba(255, 95, 160, 0.16) 0%, rgba(168, 85, 247, 0.16) 100%)"
                  : "none",
              border:
                isActive
                  ? "1px solid rgba(255, 95, 160, 0.32)"
                  : isAvailable
                    ? "1px solid rgba(255, 255, 255, 0.08)"
                    : "1px solid rgba(255, 255, 255, 0.04)",
              boxShadow:
                isActive
                  ? "0 0 16px rgba(255, 95, 160, 0.12)"
                  : "none",
              opacity: isActive || isAvailable ? 1 : 0.55,
              cursor: "pointer"
            }}
          >
            <span
              className="block text-[9px] font-bold uppercase"
              style={{
                color: isActive
                  ? "rgb(255, 190, 221)"
                  : isAvailable
                    ? "rgba(255, 255, 255, 0.45)"
                    : "rgba(255, 255, 255, 0.25)",
                letterSpacing: "0.05em"
              }}
            >
              {getScheduleFilterLabel(filterLabel, t)}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default ScheduleFilterPills;
