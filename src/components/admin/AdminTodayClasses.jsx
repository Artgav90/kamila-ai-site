import { ChevronRightIcon } from "../home/HomeIcons";
import { useEffect, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { isSupabaseConfigured } from "../../services/supabase";
import { scheduleRepository } from "../../repositories/cloud";
import {
  createScheduleEntriesByTemplate,
  DEFAULT_WEEKLY_SCHEDULE_TEMPLATE,
  getScheduleEntriesForDate,
  normalizeWeeklyScheduleTemplate
} from "../schedule/scheduleData";

const typeColors = {
  KINDER: "rgb(245, 158, 11)",
  "PROF KINDER": "rgb(59, 130, 246)",
  LATINA: "rgb(255, 95, 160)",
  "HIGH HEELS": "rgb(147, 51, 234)"
};

function localizeClassType(type, t) {
  switch (type) {
    case "KINDER":
      return t("ui.95735930b3fe");
    case "PROF KINDER":
      return t("ui.7dcaa59a4d27");
    case "LATINA":
      return "Latina";
    case "HIGH HEELS":
      return "High Heels";
    default:
      return type;
  }
}

function resolveTodayClasses(scheduleState, shouldUseDefaultTemplate) {
  const hasWeeklyTemplate = Array.isArray(scheduleState?.weeklyTemplate);
  const weeklyTemplate = hasWeeklyTemplate
    ? normalizeWeeklyScheduleTemplate(scheduleState.weeklyTemplate, {
        fallbackToDefault: shouldUseDefaultTemplate
      })
    : shouldUseDefaultTemplate
      ? DEFAULT_WEEKLY_SCHEDULE_TEMPLATE
      : [];

  if (!weeklyTemplate.length) {
    return [];
  }

  const scheduleEntries = createScheduleEntriesByTemplate(weeklyTemplate, new Date(), 3);
  return getScheduleEntriesForDate(new Date(), scheduleEntries);
}

function AdminTodayClasses({ onOpenSchedule }) {
  const { t } = useLanguage();
  const [todayClasses, setTodayClasses] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const shouldUseDefaultTemplate = !isSupabaseConfigured();

    const syncTodayClasses = (scheduleState) => {
      if (!isMounted) {
        return;
      }

      setTodayClasses(resolveTodayClasses(scheduleState, shouldUseDefaultTemplate));
    };

    const hydrateTodayClasses = async () => {
      try {
        if (shouldUseDefaultTemplate) {
          syncTodayClasses({});
          return;
        }

        const cloudSchedule = await scheduleRepository.load();
        syncTodayClasses(cloudSchedule);
      } catch (error) {
        console.error("Admin today classes hydration failed:", error);
      }
    };

    hydrateTodayClasses();

    if (shouldUseDefaultTemplate) {
      return () => {
        isMounted = false;
      };
    }

    const unsubscribe = scheduleRepository.subscribe((nextScheduleState) => {
      syncTodayClasses(nextScheduleState);
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  return (
    <div className="mb-24 px-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-bold text-white">{t("ui.6951f0982232")}</h3>

        <button
          type="button"
          onClick={onOpenSchedule}
          className="flex items-center gap-1 text-xs font-medium"
          style={{ color: "rgb(255, 95, 160)" }}
        >
          {t("ui.1bb00cf04c23")}
          <ChevronRightIcon size={13} color="currentColor" />
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {todayClasses.length > 0 ? (
          todayClasses.map((scheduleClass) => (
            <div
              key={scheduleClass.id}
              className="flex items-center gap-3 rounded-2xl p-4"
              style={{
                background: "rgb(19, 19, 31)",
                border: "1px solid rgba(255, 255, 255, 0.07)"
              }}
            >
              <div
                className="w-1.5 self-stretch rounded-full"
                style={{
                  minHeight: "40px",
                  background: typeColors[scheduleClass.type] ?? "rgb(255, 95, 160)"
                }}
              />

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-white">
                    {localizeClassType(scheduleClass.type, t)}
                  </p>
                  <span
                    className="text-xs font-bold"
                    style={{ color: typeColors[scheduleClass.type] ?? "rgb(255, 95, 160)" }}
                  >
                    {`${scheduleClass.start} - ${scheduleClass.end}`}
                  </span>
                </div>

                <p className="mt-0.5 text-xs" style={{ color: "rgba(255, 255, 255, 0.45)" }}>
                  {t("ui.9e32c1c113fb")}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div
            className="rounded-2xl border px-4 py-5 text-center"
            style={{
              borderColor: "rgba(255, 255, 255, 0.08)",
              background: "rgba(18, 18, 28, 0.72)"
            }}
          >
            <p
              className="text-[11px] font-bold uppercase"
              style={{
                color: "rgba(255, 95, 160, 0.72)",
                letterSpacing: "0.1em"
              }}
            >
              {t("ui.91e575b09957")}
            </p>
            <p className="mt-2 text-sm text-white/58">
              {t("ui.ecd6eaf2e277")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminTodayClasses;
