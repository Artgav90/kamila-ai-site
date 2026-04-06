export function isFiniteNonNegativeNumber(value) {
  const normalized = Number(value);
  return Number.isFinite(normalized) && normalized >= 0;
}

export function safeArray(value) {
  return Array.isArray(value) ? value : [];
}

export function safeString(value, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

export function safeLower(value) {
  return safeString(value).toLowerCase();
}

export function startOfToday(value = new Date()) {
  const date = value instanceof Date ? new Date(value) : new Date(value ?? Date.now());

  if (Number.isNaN(date.getTime())) {
    const fallback = new Date();
    fallback.setHours(0, 0, 0, 0);
    return fallback;
  }

  date.setHours(0, 0, 0, 0);
  return date;
}

export function isSameCalendarDay(input, baseDate = new Date()) {
  const date = new Date(input ?? "");
  if (Number.isNaN(date.getTime())) {
    return false;
  }

  const normalizedBase = startOfToday(baseDate);
  date.setHours(0, 0, 0, 0);
  return date.getTime() === normalizedBase.getTime();
}
