const BLUE_DOT = "rgb(59, 130, 246)";
const PINK_DOT = "rgb(255, 95, 160)";
const PURPLE_DOT = "rgb(147, 51, 234)";
const AMBER_DOT = "rgb(245, 158, 11)";

function createDateFormatter(locale, options) {
  return new Intl.DateTimeFormat(locale, options);
}

function capitalizeFirstLetter(value) {
  const text = String(value ?? "");
  if (!text) {
    return text;
  }

  return text.charAt(0).toUpperCase() + text.slice(1);
}

function createLocalDate(year, monthIndex, day) {
  return new Date(year, monthIndex, day, 12, 0, 0, 0);
}

function normalizeDate(date) {
  return createLocalDate(date.getFullYear(), date.getMonth(), date.getDate());
}

function getDateKey(date) {
  const normalizedDate = normalizeDate(date);
  const year = normalizedDate.getFullYear();
  const month = String(normalizedDate.getMonth() + 1).padStart(2, "0");
  const day = String(normalizedDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function addDays(date, amount) {
  const nextDate = normalizeDate(date);
  nextDate.setDate(nextDate.getDate() + amount);
  return nextDate;
}

function addMonths(date, amount) {
  return createLocalDate(date.getFullYear(), date.getMonth() + amount, date.getDate());
}

function toIsoWeekday(date) {
  return ((date.getDay() + 6) % 7) + 1;
}

function parseTimeToMinutes(value) {
  const [hoursPart, minutesPart] = String(value ?? "")
    .trim()
    .split(":");

  const hours = Number.parseInt(hoursPart, 10);
  const minutes = Number.parseInt(minutesPart, 10);

  if (
    !Number.isFinite(hours) ||
    !Number.isFinite(minutes) ||
    hours < 0 ||
    hours > 23 ||
    minutes < 0 ||
    minutes > 59
  ) {
    return null;
  }

  return hours * 60 + minutes;
}

function formatMinutesToTime(totalMinutes) {
  const normalizedMinutes = Math.max(0, totalMinutes);
  const hours = Math.floor(normalizedMinutes / 60) % 24;
  const minutes = normalizedMinutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

function createClassId(date, type, start) {
  const slugType = type.toLowerCase().replace(/\s+/g, "-");
  const slugTime = start.replace(":", "");
  return `${getDateKey(date)}-${slugType}-${slugTime}`;
}

function toNumber(value, fallbackValue) {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : fallbackValue;
}

export function getWeekdayLabels(language) {
  if (language === "de") {
    return [
      { label: "M", weekend: false },
      { label: "D", weekend: false },
      { label: "M", weekend: false },
      { label: "D", weekend: false },
      { label: "F", weekend: false },
      { label: "S", weekend: true },
      { label: "S", weekend: true }
    ];
  }

  return [
    { label: "П", weekend: false },
    { label: "В", weekend: false },
    { label: "С", weekend: false },
    { label: "Ч", weekend: false },
    { label: "П", weekend: false },
    { label: "С", weekend: true },
    { label: "В", weekend: true }
  ];
}

export const scheduleFilters = ["KINDER", "PROF KINDER", "LATINA", "HIGH HEELS"];

export function getScheduleFilterLabel(filterId, t) {
  switch (filterId) {
    case "KINDER":
      return t("ui.m.schedule.filter.kinder");
    case "PROF KINDER":
      return t("ui.m.schedule.filter.profKinder");
    case "LATINA":
      return "LATINA";
    case "HIGH HEELS":
    default:
      return "HIGH HEELS";
  }
}

const scheduleTypeDotColor = {
  KINDER: AMBER_DOT,
  "PROF KINDER": BLUE_DOT,
  LATINA: PINK_DOT,
  "HIGH HEELS": PURPLE_DOT
};

const scheduleTypeClassStyle = {
  KINDER: {
    availabilityColor: "rgb(245, 158, 11)",
    progressBackground: "linear-gradient(90deg, rgb(168, 85, 247), rgb(255, 95, 160))"
  },
  "PROF KINDER": {
    availabilityColor: "rgb(59, 130, 246)",
    progressBackground: "linear-gradient(90deg, rgb(59, 130, 246), rgb(147, 51, 234))"
  },
  LATINA: {
    availabilityColor: "rgb(255, 95, 160)",
    progressBackground: "linear-gradient(90deg, rgb(255, 95, 160), rgb(245, 158, 11))"
  },
  "HIGH HEELS": {
    availabilityColor: "rgb(147, 51, 234)",
    progressBackground: "linear-gradient(90deg, rgb(147, 51, 234), rgb(255, 95, 160))"
  }
};

const typeDurationMinutes = {
  KINDER: 60,
  "PROF KINDER": 60,
  LATINA: 60,
  "HIGH HEELS": 60
};

const typeCapacity = {
  KINDER: 10,
  "PROF KINDER": 12,
  LATINA: 10,
  "HIGH HEELS": 10
};

export const DEFAULT_WEEKLY_SCHEDULE_TEMPLATE = [
  { weekday: 1, type: "KINDER", start: "17:00" },
  { weekday: 1, type: "LATINA", start: "18:00" },
  { weekday: 1, type: "LATINA", start: "19:00" },
  { weekday: 1, type: "HIGH HEELS", start: "20:00" },
  { weekday: 2, type: "PROF KINDER", start: "16:30" },
  { weekday: 2, type: "LATINA", start: "18:30" },
  { weekday: 2, type: "LATINA", start: "19:30" },
  { weekday: 3, type: "LATINA", start: "18:00" },
  { weekday: 3, type: "LATINA", start: "19:00" },
  { weekday: 3, type: "HIGH HEELS", start: "20:00" },
  { weekday: 4, type: "LATINA", start: "10:00" },
  { weekday: 4, type: "KINDER", start: "17:00" },
  { weekday: 4, type: "PROF KINDER", start: "17:00" },
  { weekday: 4, type: "LATINA", start: "18:00" },
  { weekday: 4, type: "LATINA", start: "19:00" },
  { weekday: 5, type: "KINDER", start: "17:00" },
  { weekday: 5, type: "PROF KINDER", start: "18:00" },
  { weekday: 5, type: "HIGH HEELS", start: "19:00" },
  { weekday: 6, type: "LATINA", start: "11:00" },
  { weekday: 6, type: "HIGH HEELS", start: "13:00" }
];

export function normalizeWeeklyScheduleTemplate(rawTemplate, options = {}) {
  const { fallbackToDefault = true } = options;
  const fallbackTemplate = fallbackToDefault ? DEFAULT_WEEKLY_SCHEDULE_TEMPLATE : [];

  if (!Array.isArray(rawTemplate)) {
    return fallbackTemplate;
  }

  const normalizedTemplate = [];
  const seenKeys = new Set();

  rawTemplate.forEach((slot) => {
    const weekday = toNumber(slot?.weekday, -1);
    const type = String(slot?.type ?? "").toUpperCase().trim();
    const start = String(slot?.start ?? "").trim();
    const startMinutes = parseTimeToMinutes(start);

    if (
      weekday < 1 ||
      weekday > 7 ||
      !scheduleFilters.includes(type) ||
      startMinutes === null
    ) {
      return;
    }

    const normalizedStart = formatMinutesToTime(startMinutes);
    const dedupeKey = `${weekday}-${type}-${normalizedStart}`;

    if (seenKeys.has(dedupeKey)) {
      return;
    }

    seenKeys.add(dedupeKey);
    normalizedTemplate.push({
      weekday,
      type,
      start: normalizedStart
    });
  });

  if (normalizedTemplate.length === 0) {
    return fallbackTemplate;
  }

  return normalizedTemplate.sort((a, b) => {
    if (a.weekday !== b.weekday) {
      return a.weekday - b.weekday;
    }

    const timeDiff = parseTimeToMinutes(a.start) - parseTimeToMinutes(b.start);
    if (timeDiff !== 0) {
      return timeDiff;
    }

    return a.type.localeCompare(b.type);
  });
}

function createScheduleClass(date, slot) {
  const startMinutes = parseTimeToMinutes(slot.start);
  const durationMinutes = typeDurationMinutes[slot.type] ?? 60;
  const endMinutes = startMinutes + durationMinutes;
  const capacity = typeCapacity[slot.type] ?? 10;
  const loadSeed = date.getDate() + date.getMonth() + startMinutes + slot.type.length;
  const takenSpots = Math.min(capacity - 1, loadSeed % capacity);
  const openSpots = Math.max(1, capacity - takenSpots);
  const progressPercent = Math.round((takenSpots / capacity) * 100);

  return {
    id: createClassId(date, slot.type, slot.start),
    type: slot.type,
    start: slot.start,
    end: formatMinutesToTime(endMinutes),
    duration: `${durationMinutes} min`,
    availability: `${openSpots} / ${capacity} spots open`,
    progress: `${progressPercent}%`,
    ...scheduleTypeClassStyle[slot.type]
  };
}

export function createScheduleEntriesByTemplate(
  weeklyTemplate = DEFAULT_WEEKLY_SCHEDULE_TEMPLATE,
  baseDate = new Date(),
  monthsAhead = 3,
  options = {}
) {
  const normalizedTemplate = normalizeWeeklyScheduleTemplate(weeklyTemplate, options);
  if (normalizedTemplate.length === 0) {
    return {};
  }
  const startDate = normalizeDate(baseDate);
  const exclusiveEndDate = addMonths(startDate, Math.max(1, monthsAhead));
  const entriesByDate = {};

  for (
    let cursor = normalizeDate(startDate);
    cursor < exclusiveEndDate;
    cursor = addDays(cursor, 1)
  ) {
    const weekday = toIsoWeekday(cursor);
    const daySlots = normalizedTemplate
      .filter((slot) => slot.weekday === weekday)
      .sort((firstSlot, secondSlot) => {
        const timeDiff =
          parseTimeToMinutes(firstSlot.start) - parseTimeToMinutes(secondSlot.start);
        if (timeDiff !== 0) {
          return timeDiff;
        }

        return firstSlot.type.localeCompare(secondSlot.type);
      });

    if (daySlots.length === 0) {
      continue;
    }

    const dateKey = getDateKey(cursor);
    entriesByDate[dateKey] = daySlots.map((slot) => createScheduleClass(cursor, slot));
  }

  return entriesByDate;
}

const defaultScheduleEntriesByDate = createScheduleEntriesByTemplate(
  DEFAULT_WEEKLY_SCHEDULE_TEMPLATE,
  new Date(),
  3
);

export function isSameDay(firstDate, secondDate) {
  return (
    firstDate.getFullYear() === secondDate.getFullYear() &&
    firstDate.getMonth() === secondDate.getMonth() &&
    firstDate.getDate() === secondDate.getDate()
  );
}

export function getInitialScheduleDate(
  weeklyTemplate = DEFAULT_WEEKLY_SCHEDULE_TEMPLATE,
  baseDate = new Date(),
  options = {}
) {
  const startDate = normalizeDate(baseDate);
  const scheduleEntries = createScheduleEntriesByTemplate(weeklyTemplate, startDate, 3, options);

  for (let offset = 0; offset <= 21; offset += 1) {
    const nextDate = addDays(startDate, offset);
    if (getScheduleEntriesForDate(nextDate, scheduleEntries).length > 0) {
      return nextDate;
    }
  }

  return startDate;
}

export function getMonthMeta(date, locale = "ru-RU") {
  const monthFormatter = createDateFormatter(locale, { month: "long" });
  return {
    month: capitalizeFirstLetter(monthFormatter.format(date)),
    year: String(date.getFullYear())
  };
}

export function getDayMeta(date, locale = "ru-RU") {
  const weekdayFormatter = createDateFormatter(locale, { weekday: "long" });
  const dateFormatter = createDateFormatter(locale, { month: "long", day: "numeric" });
  return {
    weekday: capitalizeFirstLetter(weekdayFormatter.format(date)),
    date: capitalizeFirstLetter(dateFormatter.format(date))
  };
}

export function getDaysInMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

export function shiftMonth(date, amount) {
  const shiftedDate = createLocalDate(date.getFullYear(), date.getMonth() + amount, 1);
  const safeDay = Math.min(date.getDate(), getDaysInMonth(shiftedDate));
  shiftedDate.setDate(safeDay);
  return shiftedDate;
}

export function buildScheduleDays(
  monthDate,
  selectedDate,
  activeFilter = null,
  scheduleEntriesByDate = defaultScheduleEntriesByDate
) {
  const monthStartDate = createLocalDate(monthDate.getFullYear(), monthDate.getMonth(), 1);
  const monthStartWeekday = (monthStartDate.getDay() + 6) % 7;
  const gridStartDate = addDays(monthStartDate, -monthStartWeekday);

  return Array.from({ length: 42 }, (_, index) => {
    const cellDate = addDays(gridStartDate, index);
    const insideCurrentMonth = cellDate.getMonth() === monthDate.getMonth();
    const isWeekend = cellDate.getDay() === 0 || cellDate.getDay() === 6;
    const allDayEntries = insideCurrentMonth
      ? getScheduleEntriesForDate(cellDate, scheduleEntriesByDate)
      : [];
    const dayEntries = activeFilter
      ? allDayEntries.filter((entry) => entry.type === activeFilter)
      : allDayEntries;
    const dots = Array.from(new Set(dayEntries.map((entry) => entry.type)))
      .slice(0, 3)
      .map((type) => scheduleTypeDotColor[type])
      .filter(Boolean);

    return {
      id: `${cellDate.getFullYear()}-${cellDate.getMonth()}-${cellDate.getDate()}`,
      date: cellDate,
      label: String(cellDate.getDate()),
      outsideMonth: !insideCurrentMonth,
      selected: isSameDay(cellDate, selectedDate),
      weekend: isWeekend,
      filteredOut: Boolean(activeFilter) && insideCurrentMonth && dayEntries.length === 0,
      dots
    };
  });
}

export function getScheduleEntriesForDate(date, scheduleEntriesByDate = defaultScheduleEntriesByDate) {
  return scheduleEntriesByDate[getDateKey(date)] ?? [];
}

export function getBookingKey(date, classId) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}:${classId}`;
}
