import {
  createScheduleEntriesByTemplate,
  DEFAULT_WEEKLY_SCHEDULE_TEMPLATE,
  getScheduleEntriesForDate
} from "../components/schedule/scheduleData";
import { isFiniteNonNegativeNumber, isSameCalendarDay, safeArray, safeLower } from "./runtimeGuards";

export const CRM_STORAGE_KEY = "topdance-crm-desktop-v1";
export const DEFAULT_CRM_SETTINGS = {
  notifications: true,
  "daily-report": true,
  "auto-open-students": false
};

export function countLowBalance(students) {
  return students.filter(
    (student) => student.classesCount <= 1 || /expired/i.test(student.membershipRenewal ?? "")
  ).length;
}

export function countTodayCheckIns(students) {
  return safeArray(students).reduce((count, student) => {
    return isSameCalendarDay(student?.lastCheckInAt) ? count + 1 : count;
  }, 0);
}

export function localizeClassType(type, lt) {
  switch (type) {
    case "KINDER":
      return lt("Дети", "Kinder");
    case "PROF KINDER":
      return lt("Проф Дети", "Prof Kinder");
    case "LATINA":
      return "Latina";
    case "HIGH HEELS":
      return "High Heels";
    default:
      return type;
  }
}

export function buildTodaySchedulePreview(weeklyTemplate, lt, options = {}) {
  const entriesByDate = createScheduleEntriesByTemplate(weeklyTemplate, new Date(), 3, options);
  const todayEntries = getScheduleEntriesForDate(new Date(), entriesByDate);

  return todayEntries.map((entry) => ({
    id: entry.id,
    title: localizeClassType(entry.type, lt),
    time: `${entry.start} - ${entry.end}`,
    room: ""
  }));
}

export function createTint(color) {
  const rgbValues = color.match(/\d+/g);
  if (!rgbValues) {
    return "rgba(255, 255, 255, 0.08)";
  }

  const [red, green, blue] = rgbValues.map(Number);
  return `rgba(${red}, ${green}, ${blue}, 0.094)`;
}

export function createActivityRecord({ color, text, type }) {
  return {
    id: `crm-activity-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
    type,
    color,
    tint: createTint(color),
    text,
    time: "just-now"
  };
}

export function createCrmFallbackState() {
  return {
    monthlyRevenue: 0,
    checkinsTodayBoost: 0,
    customActivities: [],
    lastPanel: "dashboard",
    settings: DEFAULT_CRM_SETTINGS
  };
}

export function loadCrmStateFromStorage(storageKey = CRM_STORAGE_KEY) {
  const fallbackState = createCrmFallbackState();
  if (typeof window === "undefined") {
    return fallbackState;
  }

  try {
    const rawValue = window.localStorage.getItem(storageKey);
    if (!rawValue) {
      return fallbackState;
    }

    const parsed = JSON.parse(rawValue);
    return {
      ...fallbackState,
      monthlyRevenue: isFiniteNonNegativeNumber(parsed?.monthlyRevenue) ? Number(parsed.monthlyRevenue) : 0,
      checkinsTodayBoost: isFiniteNonNegativeNumber(parsed?.checkinsTodayBoost) ? Number(parsed.checkinsTodayBoost) : 0,
      customActivities: Array.isArray(parsed?.customActivities) ? parsed.customActivities : [],
      lastPanel: parsed?.lastPanel || "dashboard",
      settings: {
        ...DEFAULT_CRM_SETTINGS,
        ...(parsed?.settings ?? {})
      }
    };
  } catch {
    return fallbackState;
  }
}

export function normalizeCrmState(rawState) {
  return {
    monthlyRevenue: isFiniteNonNegativeNumber(rawState?.monthlyRevenue) ? Number(rawState.monthlyRevenue) : 0,
    checkinsTodayBoost: isFiniteNonNegativeNumber(rawState?.checkinsTodayBoost) ? Number(rawState.checkinsTodayBoost) : 0,
    customActivities: Array.isArray(rawState?.customActivities) ? rawState.customActivities : [],
    lastPanel: rawState?.lastPanel || "dashboard",
    settings: {
      ...DEFAULT_CRM_SETTINGS,
      ...(rawState?.settings ?? {})
    }
  };
}

export function saveCrmStateToStorage(nextState, storageKey = CRM_STORAGE_KEY) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(storageKey, JSON.stringify(nextState));
}

export function downloadJsonReport(filename, payload) {
  if (typeof window === "undefined") {
    return;
  }

  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json"
  });
  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = objectUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(objectUrl);
}

export function formatMetricValue(value) {
  return new Intl.NumberFormat("en-US").format(value);
}

export function localizeActivities(customActivities, lt) {
  return customActivities.map((activity) => ({
    ...activity,
    tint: activity.tint ?? createTint(activity.color),
    time:
      activity.time === "just-now"
        ? lt("Только что", "Gerade eben")
        : activity.time
  }));
}

export function filterStudentsBySearch(students, normalizedSearch) {
  if (!normalizedSearch) {
    return students;
  }

  return safeArray(students).filter(
    (student) =>
      safeLower(student?.name).includes(normalizedSearch) ||
      safeLower(student?.email).includes(normalizedSearch) ||
      safeLower(student?.studentId).includes(normalizedSearch)
  );
}

export function buildSearchCollections(students, activities, normalizedSearch) {
  if (!normalizedSearch) {
    return {
      visibleStudents: students,
      searchStudentResults: [],
      searchActivityResults: []
    };
  }

  const visibleStudents = filterStudentsBySearch(students, normalizedSearch);
  const searchStudentResults = visibleStudents.slice(0, 4);
  const searchActivityResults = safeArray(activities)
    .filter((activity) => safeLower(activity?.text).includes(normalizedSearch))
    .slice(0, 4);

  return {
    visibleStudents,
    searchStudentResults,
    searchActivityResults
  };
}

export function buildCrmMetrics({
  metricCards,
  students,
  checkinsTodayBoost,
  monthlyRevenue,
  lt
}) {
  const activeStudentsValue = safeArray(students).length;
  const checkinsTodayValue = countTodayCheckIns(students) + checkinsTodayBoost;
  const lowExpiredValue = countLowBalance(safeArray(students));

  return metricCards.map((metric) => {
    const localizedMetric = {
      ...metric,
      label:
        metric.id === "monthly-revenue"
          ? lt("Доход за месяц", "Monatsumsatz")
          : metric.id === "active-students"
            ? lt("Активные ученики", "Aktive Schüler")
            : metric.id === "checkins-today"
              ? lt("Чекины сегодня", "Check-ins heute")
              : lt("Низкий / истёкший", "Niedrig / Abgelaufen"),
      note:
        metric.id === "monthly-revenue"
          ? lt("Факт за текущий месяц", "Istwert für aktuellen Monat")
          : metric.id === "active-students"
            ? lt("Синхронизировано с облаком", "Mit Cloud synchronisiert")
            : metric.id === "checkins-today"
              ? lt("Только реальные чекины", "Nur echte Check-ins")
              : lt("Нужна проверка у администратора", "Benötigt Admin-Prüfung")
    };

    if (metric.id === "active-students") {
      return { ...localizedMetric, value: formatMetricValue(activeStudentsValue) };
    }

    if (metric.id === "checkins-today") {
      return { ...localizedMetric, value: formatMetricValue(checkinsTodayValue) };
    }

    if (metric.id === "low-expired") {
      return { ...localizedMetric, value: formatMetricValue(Math.max(0, lowExpiredValue)) };
    }

    return {
      ...localizedMetric,
      value: `€${formatMetricValue(Math.max(0, monthlyRevenue))}`,
      note: lt("Только фактические данные", "Nur tatsaechliche Daten")
    };
  });
}

export { DEFAULT_WEEKLY_SCHEDULE_TEMPLATE };
