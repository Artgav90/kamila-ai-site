import {
  profileIdentity,
  profileStats,
  profileSubscription
} from "../../components/profile/profileData";

export const STORAGE_KEY = "topdance-student-checkins-v2";

export function parseUsageMeta(usageLabel, classesLeft) {
  const usageMatch = String(usageLabel).match(/(\d+)\D+(\d+)/i);
  if (usageMatch) {
    return {
      usedClasses: Number(usageMatch[1]),
      totalClasses: Number(usageMatch[2])
    };
  }

  const safeClassesLeft = Number.parseInt(classesLeft, 10);
  if (Number.isFinite(safeClassesLeft) && safeClassesLeft >= 0) {
    return {
      usedClasses: 0,
      totalClasses: safeClassesLeft
    };
  }

  return {
    usedClasses: 0,
    totalClasses: 10
  };
}

export function normalizeStudentId(studentId) {
  return String(studentId ?? "")
    .trim()
    .toUpperCase();
}

export function slugifyName(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function calculateClassesLeft(student) {
  return Math.max(0, student.totalClasses - student.usedClasses);
}

export function createDefaultState() {
  return {
    studentsById: {}
  };
}

export function createFallbackCurrentStudent(currentStudentId, lt) {
  const usageMeta = parseUsageMeta(
    profileSubscription.usageLabel,
    profileSubscription.classesLeft
  );

  return {
    studentId: currentStudentId,
    name: lt("Профиль не заполнен", "Profil ist noch leer"),
    email: "",
    tier: "",
    membershipLabel: "",
    membershipRenewal: "",
    totalClasses: usageMeta.totalClasses,
    usedClasses: usageMeta.usedClasses,
    monthsInClub: Number.parseInt(profileStats[1]?.value, 10) || 0,
    totalVisits: Number.parseInt(profileStats[2]?.value, 10) || 0,
    joinedAt: null,
    lastCheckInAt: null,
    emergencyContact: "",
    emergencyPhone: "",
    notes: "",
    avatar: ""
  };
}

export function parseStudentIdFromQrPayload(payload) {
  const rawPayload = String(payload ?? "").trim();
  if (!rawPayload) {
    return null;
  }

  try {
    const parsedJson = JSON.parse(rawPayload);
    const jsonStudentId =
      parsedJson?.studentId ??
      parsedJson?.student ??
      parsedJson?.userId ??
      parsedJson?.user ??
      null;
    if (jsonStudentId) {
      return normalizeStudentId(jsonStudentId);
    }
  } catch {
    // Not a JSON payload, continue parsing other formats.
  }

  try {
    const parsedUrl = new URL(rawPayload);
    const studentIdFromUrl =
      parsedUrl.searchParams.get("student") ||
      parsedUrl.searchParams.get("studentId") ||
      parsedUrl.searchParams.get("userId") ||
      parsedUrl.searchParams.get("user");
    if (studentIdFromUrl) {
      return normalizeStudentId(studentIdFromUrl);
    }
  } catch {
    // Not an URL payload, continue parsing plain ids.
  }

  return normalizeStudentId(rawPayload);
}

export function resolveUserEntryByStudentId(usersState, studentId) {
  const normalizedStudentId = normalizeStudentId(studentId);
  if (!normalizedStudentId) {
    return null;
  }

  const usersById =
    usersState && typeof usersState === "object" && usersState.usersById
      ? usersState.usersById
      : {};

  if (usersById[normalizedStudentId]) {
    return {
      key: normalizedStudentId,
      user: usersById[normalizedStudentId]
    };
  }

  const matchedEntry = Object.entries(usersById).find(([storageKey, user]) => {
    return (
      normalizeStudentId(storageKey) === normalizedStudentId ||
      normalizeStudentId(user?.userId) === normalizedStudentId
    );
  });

  if (!matchedEntry) {
    return null;
  }

  return {
    key: matchedEntry[0],
    user: matchedEntry[1]
  };
}

function mergeStudentsById(fallbackStudentsById, rawStudentsById) {
  const merged = {
    ...fallbackStudentsById
  };

  Object.entries(rawStudentsById ?? {}).forEach(([rawStudentId, rawStudent]) => {
    const normalizedId = normalizeStudentId(rawStudentId || rawStudent?.studentId);
    if (!normalizedId || !rawStudent || typeof rawStudent !== "object") {
      return;
    }

    merged[normalizedId] = {
      ...(merged[normalizedId] ?? {}),
      ...rawStudent,
      studentId: normalizedId
    };
  });

  return merged;
}

export function loadPersistedState() {
  if (typeof window === "undefined") {
    return createDefaultState();
  }

  const fallback = createDefaultState();

  try {
    const rawValue = window.localStorage.getItem(STORAGE_KEY);
    if (!rawValue) {
      return fallback;
    }

    const parsed = JSON.parse(rawValue);
    if (
      !parsed ||
      typeof parsed !== "object" ||
      !parsed.studentsById ||
      typeof parsed.studentsById !== "object"
    ) {
      return fallback;
    }

    return {
      ...fallback,
      ...parsed,
      studentsById: mergeStudentsById(fallback.studentsById, parsed.studentsById)
    };
  } catch {
    return fallback;
  }
}

export function mergeStateWithFallback(rawState) {
  const fallback = createDefaultState();

  if (
    !rawState ||
    typeof rawState !== "object" ||
    !rawState.studentsById ||
    typeof rawState.studentsById !== "object"
  ) {
    return fallback;
  }

  return {
    ...fallback,
    ...rawState,
    studentsById: mergeStudentsById(fallback.studentsById, rawState.studentsById)
  };
}

export function formatDateTimeLabelByLocale(dateString, locale, lt) {
  if (!dateString) {
    return lt("Чекинов пока не было", "Noch kein Check-in");
  }

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return lt("Чекинов пока не было", "Noch kein Check-in");
  }

  return new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
}

export function createStudentRecordFromInput(input) {
  const joinedAt = new Date().toISOString();
  const slug = slugifyName(input.name) || "student";
  const suffix = Date.now().toString().slice(-4);
  const studentId = normalizeStudentId(`STD-${suffix}-${slug.slice(0, 2) || "NS"}`);

  return {
    id: `student-${slug || suffix}`,
    studentId,
    name: input.name.trim(),
    tier: input.tier,
    email: input.email.trim().toLowerCase(),
    phone: input.phone.trim(),
    avatar: "",
    membershipLabel: input.membershipLabel,
    membershipRenewal: input.membershipRenewal,
    totalClasses: input.totalClasses,
    usedClasses: 0,
    monthsInClub: 0,
    totalVisits: 0,
    joinedAt,
    lastCheckInAt: null,
    emergencyContact: input.emergencyContact,
    emergencyPhone: input.emergencyPhone,
    notes: input.notes
  };
}

export function localizeMembershipLabel(label, lt) {
  if (!String(label ?? "").trim()) {
    return lt("Абонемент не задан", "Abo nicht gesetzt");
  }

  switch (label) {
    case "10 Classes Pack":
      return lt("Пакет 10 занятий", "10er-Paket");
    case "6 Classes Pack":
      return lt("Пакет 6 занятий", "6er-Paket");
    case "16 Classes Pack":
      return lt("Пакет 16 занятий", "16er-Paket");
    case "Starter Pack":
      return lt("Стартовый пакет", "Starterpaket");
    case "8 Classes Pack":
      return lt("Пакет 8 занятий", "8er-Paket");
    case "12 Classes Pack":
      return lt("Пакет 12 занятий", "12er-Paket");
    default:
      return label;
  }
}

export function localizeMembershipRenewal(label, lt) {
  if (!String(label ?? "").trim()) {
    return "";
  }

  switch (label) {
    case "expires May 30":
      return lt("действует до 30 мая", "läuft ab am 30. Mai");
    case "expires Apr 27":
      return lt("действует до 27 апр.", "läuft ab am 27. Apr.");
    case "expires Jun 12":
      return lt("действует до 12 июн.", "läuft ab am 12. Juni");
    case "expired":
      return lt("истёк", "abgelaufen");
    case "expires Apr 18":
      return lt("действует до 18 апр.", "läuft ab am 18. Apr.");
    case "expires May 24":
      return lt("действует до 24 мая", "läuft ab am 24. Mai");
    default:
      return label;
  }
}

export { profileIdentity, profileStats, profileSubscription };
