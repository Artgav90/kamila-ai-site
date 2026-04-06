import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { useStudentCheckIn } from "../../context/StudentCheckInContext";
import { isSupabaseConfigured } from "../../services/supabase";
import { isSameCalendarDay } from "../../services/runtimeGuards";
import { crmRepository, scheduleRepository } from "../../repositories/cloud";
import {
  createScheduleEntriesByTemplate,
  DEFAULT_WEEKLY_SCHEDULE_TEMPLATE,
  getScheduleEntriesForDate,
  normalizeWeeklyScheduleTemplate
} from "../schedule/scheduleData";
import {
  ActivityIcon,
  CalendarCheckIcon,
  TrendingUpIcon,
  UsersIcon
} from "./AdminIcons";

function getMetricIcon(icon, color) {
  const commonProps = {
    size: 16,
    color,
    strokeWidth: 2
  };

  switch (icon) {
    case "activity":
      return <ActivityIcon {...commonProps} />;
    case "trending-up":
      return <TrendingUpIcon {...commonProps} />;
    case "calendar-check":
      return <CalendarCheckIcon {...commonProps} />;
    case "users":
    default:
      return <UsersIcon {...commonProps} />;
  }
}

function countTodayCheckIns(students) {
  return students.reduce((count, student) => {
    return isSameCalendarDay(student?.lastCheckInAt) ? count + 1 : count;
  }, 0);
}

function formatMetricValue(value) {
  return new Intl.NumberFormat("en-US").format(value);
}

function resolveClassesToday(scheduleState, shouldUseDefaultTemplate) {
  const hasWeeklyTemplate = Array.isArray(scheduleState?.weeklyTemplate);
  const weeklyTemplate = hasWeeklyTemplate
    ? normalizeWeeklyScheduleTemplate(scheduleState.weeklyTemplate, {
        fallbackToDefault: shouldUseDefaultTemplate
      })
    : shouldUseDefaultTemplate
      ? DEFAULT_WEEKLY_SCHEDULE_TEMPLATE
      : [];

  if (!weeklyTemplate.length) {
    return 0;
  }

  const scheduleEntries = createScheduleEntriesByTemplate(weeklyTemplate, new Date(), 3);
  return getScheduleEntriesForDate(new Date(), scheduleEntries).length;
}

function AdminMetricGrid() {
  const { lt, t } = useLanguage();
  const { adminStudentsView } = useStudentCheckIn();
  const [classesTodayValue, setClassesTodayValue] = useState(0);
  const [monthlyRevenueValue, setMonthlyRevenueValue] = useState(0);
  const [syncStatus, setSyncStatus] = useState(
    isSupabaseConfigured() ? "loading" : "local"
  );

  useEffect(() => {
    let isMounted = true;
    const shouldUseDefaultTemplate = !isSupabaseConfigured();

    const syncClassesFromSchedule = (scheduleState) => {
      if (!isMounted) {
        return;
      }

      setClassesTodayValue(resolveClassesToday(scheduleState, shouldUseDefaultTemplate));
    };

    const syncRevenueFromCrm = (crmState) => {
      if (!isMounted) {
        return;
      }

      setMonthlyRevenueValue(Math.max(0, Number(crmState?.monthlyRevenue) || 0));
    };

    const hydrateLiveMetrics = async () => {
      try {
        if (shouldUseDefaultTemplate) {
          syncClassesFromSchedule({});
          syncRevenueFromCrm({});
          setSyncStatus("local");
          return;
        }

        const [cloudSchedule, cloudCrm] = await Promise.all([
          scheduleRepository.load(),
          crmRepository.load()
        ]);

        syncClassesFromSchedule(cloudSchedule);
        syncRevenueFromCrm(cloudCrm);
        if (isMounted) {
          setSyncStatus("synced");
        }
      } catch (error) {
        console.error("Admin metrics hydration failed:", error);
        if (isMounted) {
          setSyncStatus("error");
        }
      }
    };

    hydrateLiveMetrics();

    if (shouldUseDefaultTemplate) {
      return () => {
        isMounted = false;
      };
    }

    const unsubscribeSchedule = scheduleRepository.subscribe((nextScheduleState) => {
      syncClassesFromSchedule(nextScheduleState);
      if (isMounted) {
        setSyncStatus("synced");
      }
    });
    const unsubscribeCrm = crmRepository.subscribe((nextCrmState) => {
      syncRevenueFromCrm(nextCrmState);
      if (isMounted) {
        setSyncStatus("synced");
      }
    });

    return () => {
      isMounted = false;
      unsubscribeSchedule();
      unsubscribeCrm();
    };
  }, []);

  const metrics = useMemo(
    () => [
      {
        id: "students",
        icon: "users",
        color: "rgb(255, 95, 160)",
        tint: "rgba(255, 95, 160, 0.12)",
        value: formatMetricValue(adminStudentsView.length),
        note: t("ui.9f38398397fd")
      },
      {
        id: "checkins",
        icon: "activity",
        color: "rgb(16, 185, 129)",
        tint: "rgba(16, 185, 129, 0.12)",
        value: formatMetricValue(countTodayCheckIns(adminStudentsView)),
        note: t("ui.fae0d7a8fe51")
      },
      {
        id: "revenue",
        icon: "trending-up",
        color: "rgb(168, 85, 247)",
        tint: "rgba(168, 85, 247, 0.12)",
        value: `€${formatMetricValue(monthlyRevenueValue)}`,
        note: t("ui.17076cb85ac4")
      },
      {
        id: "classes",
        icon: "calendar-check",
        color: "rgb(59, 130, 246)",
        tint: "rgba(59, 130, 246, 0.12)",
        value: formatMetricValue(classesTodayValue),
        note: t("ui.c6492787e8e1")
      }
    ],
    [adminStudentsView, classesTodayValue, monthlyRevenueValue, t]
  );

  return (
    <div className="mb-5 px-4">
      <div className="mb-2 flex justify-end">
        <div
          className="inline-flex items-center gap-2 rounded-xl border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em]"
          style={{
            borderColor:
              syncStatus === "error"
                ? "rgba(239, 68, 68, 0.35)"
                : syncStatus === "synced"
                  ? "rgba(16, 185, 129, 0.35)"
                  : "rgba(255, 255, 255, 0.12)",
            background:
              syncStatus === "error"
                ? "rgba(239, 68, 68, 0.08)"
                : syncStatus === "synced"
                  ? "rgba(16, 185, 129, 0.08)"
                  : "rgba(255, 255, 255, 0.04)",
            color:
              syncStatus === "error"
                ? "rgb(248, 113, 113)"
                : syncStatus === "synced"
                  ? "rgb(16, 185, 129)"
                  : "rgba(255, 255, 255, 0.72)"
          }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{
              background:
                syncStatus === "error"
                  ? "rgb(248, 113, 113)"
                  : syncStatus === "synced"
                    ? "rgb(16, 185, 129)"
                    : "rgba(255, 255, 255, 0.65)"
            }}
          />
          <span>
            {syncStatus === "error"
              ? lt("Ошибка синка", "Sync-Fehler")
              : syncStatus === "synced"
                ? lt("Синхронизировано с облаком", "Cloud synchronisiert")
                : syncStatus === "loading"
                  ? lt("Синхронизация...", "Synchronisierung...")
                  : lt("Локальный режим", "Lokaler Modus")}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {metrics.map((metric) => (
          <div
            key={metric.id}
            className="rounded-2xl p-4"
            style={{
              background: "rgb(19, 19, 31)",
              border: "1px solid rgba(255, 255, 255, 0.07)"
            }}
          >
            <div
              className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl"
              style={{ background: metric.tint }}
            >
              {getMetricIcon(metric.icon, metric.color)}
            </div>

            <p className="text-2xl font-black" style={{ color: metric.color }}>
              {metric.value}
            </p>
            <p className="mt-0.5 text-xs font-medium text-white">
              {metric.id === "students"
                ? t("ui.46fa4166bd70")
                : metric.id === "checkins"
                  ? t("ui.af9e904caca6")
                  : metric.id === "revenue"
                    ? t("ui.cd7a025664a5")
                    : t("ui.5c46cf2d1323")}
            </p>
            <p className="mt-1 text-[10px]" style={{ color: "rgba(255, 255, 255, 0.45)" }}>
              {metric.note}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminMetricGrid;
