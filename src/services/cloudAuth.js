import { coerceStudentsEntity, coerceUsersEntity } from "../domain/types/cloud";
import { usersRepository } from "../repositories/cloud";
import {
  CLOUD_ENTITY_IDS,
  isSupabaseConfigured,
  updateCloudEntity
} from "./supabase";

const MIN_PHONE_LENGTH = 6;
const USER_ROLES = Object.freeze({
  admin: "admin",
  student: "student"
});
const DEFAULT_REGISTRATION_CODES = Object.freeze({
  admin: "TOP.admin",
  student: "topdance"
});

export class CloudAuthError extends Error {
  constructor(code, message) {
    super(message);
    this.name = "CloudAuthError";
    this.code = code;
  }
}

function getUnknownErrorMessage(error) {
  if (!error) {
    return "";
  }

  if (error instanceof Error) {
    return String(error.message ?? "").trim();
  }

  if (typeof error === "string") {
    return error.trim();
  }

  if (typeof error === "object") {
    const messageParts = [error.message, error.details, error.hint, error.code]
      .filter(Boolean)
      .map((part) => String(part).trim())
      .filter(Boolean);

    return messageParts.join(" ").trim();
  }

  return "";
}

function normalizeCloudError(error, fallbackMessage) {
  if (error instanceof CloudAuthError) {
    return error;
  }

  const rawMessage = getUnknownErrorMessage(error);
  const normalizedMessage = rawMessage.toLowerCase();

  if (
    normalizedMessage.includes("row-level security") ||
    normalizedMessage.includes("permission denied") ||
    normalizedMessage.includes("42501")
  ) {
    return new CloudAuthError(
      "CLOUD_POLICY_MISSING",
      "Supabase блокирует запись. Обнови RLS-политики app_state и добавь id='users' в разрешенные значения."
    );
  }

  if (
    normalizedMessage.includes("relation \"app_state\" does not exist") ||
    normalizedMessage.includes("42p01")
  ) {
    return new CloudAuthError(
      "APP_STATE_TABLE_MISSING",
      "В Supabase не найдена таблица app_state. Выполни SQL из SUPABASE_SETUP.md."
    );
  }

  return new CloudAuthError("CLOUD_OPERATION_FAILED", rawMessage || fallbackMessage);
}

function normalizePhone(value) {
  return String(value ?? "").replace(/[^\d]/g, "");
}

function normalizeClubCode(value) {
  return String(value ?? "").trim().toLowerCase();
}

function normalizeName(value) {
  return String(value ?? "").trim();
}

function normalizeUserRole(value) {
  return value === USER_ROLES.admin || value === USER_ROLES.student
    ? value
    : USER_ROLES.admin;
}

function resolveRegistrationRole(clubCodeValue) {
  const normalizedInputCode = normalizeClubCode(clubCodeValue);
  const adminCode = normalizeClubCode(DEFAULT_REGISTRATION_CODES.admin);
  const studentCode = normalizeClubCode(DEFAULT_REGISTRATION_CODES.student);

  if (normalizedInputCode === adminCode) {
    return USER_ROLES.admin;
  }

  if (normalizedInputCode === studentCode) {
    return USER_ROLES.student;
  }

  return null;
}

function normalizeStudentRecordId(value) {
  return String(value ?? "")
    .trim()
    .toUpperCase();
}

async function loadRegistrationCodesFromCloud() {
  const settings = await fetchCloudEntity(CLOUD_ENTITY_IDS.settings);
  const safeSettings = settings && typeof settings === "object" ? settings : {};
  const cloudCodes = safeSettings.registrationCodes;

  return {
    admin: String(cloudCodes?.admin ?? DEFAULT_REGISTRATION_CODES.admin).trim(),
    student: String(cloudCodes?.student ?? DEFAULT_REGISTRATION_CODES.student).trim()
  };
}

function createUserId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return `USR-${crypto.randomUUID()}`;
  }

  return `USR-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

function validateCloudSetup() {
  if (!isSupabaseConfigured()) {
    throw new CloudAuthError(
      "CLOUD_NOT_CONFIGURED",
      "Облако не подключено. Проверь Supabase переменные окружения."
    );
  }
}

function findUserByPhone(usersEntity, phoneNormalized) {
  const usersById = usersEntity.usersById ?? {};
  const entries = Object.values(usersById);

  return (
    entries.find(
      (entry) =>
        normalizePhone(entry.phoneNormalized ?? entry.phoneNumber ?? "") === phoneNormalized
    ) ?? null
  );
}

function resolveUserStorageKey(usersEntity, user) {
  const usersById = usersEntity.usersById ?? {};
  const byExplicitId = Object.entries(usersById).find(([, entry]) => entry.userId === user.userId);
  if (byExplicitId) {
    return byExplicitId[0];
  }

  const byPhone = Object.entries(usersById).find(
    ([, entry]) =>
      normalizePhone(entry.phoneNormalized ?? entry.phoneNumber ?? "") ===
      normalizePhone(user.phoneNormalized ?? user.phoneNumber ?? "")
  );

  return byPhone?.[0] ?? user.userId;
}

export async function registerCloudUser(payload) {
  try {
    validateCloudSetup();
    const registrationCodes = await loadRegistrationCodesFromCloud();

    const fullName = normalizeName(payload?.fullName);
    const phoneNumber = String(payload?.phoneNumber ?? "").trim();
    const phoneNormalized = normalizePhone(phoneNumber);
    const clubCode = String(payload?.clubCode ?? "").trim();
    const clubCodeNormalized = normalizeClubCode(clubCode);
    const role = resolveRegistrationRole(clubCode);

    if (fullName.length < 2) {
      throw new CloudAuthError("INVALID_FULL_NAME", "Введите корректное имя.");
    }

    if (phoneNormalized.length < MIN_PHONE_LENGTH) {
      throw new CloudAuthError("INVALID_PHONE", "Введите корректный номер телефона.");
    }

    if (!role) {
      throw new CloudAuthError(
        "INVALID_REGISTRATION_CODE",
        "Неверный код регистрации."
      );
    }

    let createdUser = null;
    await updateCloudEntity(CLOUD_ENTITY_IDS.users, (currentState) => {
      const currentUsers = coerceUsersEntity(currentState);
      const existingUser = findUserByPhone(currentUsers, phoneNormalized);

      if (existingUser) {
        throw new CloudAuthError(
          "USER_EXISTS",
          "Этот номер уже зарегистрирован. Используй Log In."
        );
      }

      const nextUsersById = { ...(currentUsers.usersById ?? {}) };
      const now = new Date().toISOString();
      const userId = createUserId();
      const nextUser = {
        userId,
        role,
        fullName,
        phoneNumber,
        phoneNormalized,
        clubCode: role === USER_ROLES.admin ? registrationCodes.admin : registrationCodes.student,
        clubCodeNormalized,
        createdAt: now,
        updatedAt: now,
        lastLoginAt: now
      };

      nextUsersById[userId] = nextUser;
      createdUser = nextUser;

      return {
        ...currentUsers,
        usersById: nextUsersById
      };
    });

    if (createdUser?.role === USER_ROLES.student) {
      await updateCloudEntity(CLOUD_ENTITY_IDS.students, (currentState) => {
        const currentStudents = coerceStudentsEntity(currentState);
        const studentId = normalizeStudentRecordId(createdUser.userId);
        const now = new Date().toISOString();
        const existingStudent = currentStudents.studentsById?.[studentId] ?? {};

        return {
          ...currentStudents,
          studentsById: {
            ...(currentStudents.studentsById ?? {}),
            [studentId]: {
              ...existingStudent,
              studentId,
              name: createdUser.fullName,
              email: existingStudent.email ?? "",
              phone: createdUser.phoneNumber,
              membershipLabel: existingStudent.membershipLabel ?? "",
              membershipRenewal: existingStudent.membershipRenewal ?? "",
              totalClasses:
                Number.isFinite(Number(existingStudent.totalClasses))
                  ? Number(existingStudent.totalClasses)
                  : 0,
              usedClasses:
                Number.isFinite(Number(existingStudent.usedClasses))
                  ? Number(existingStudent.usedClasses)
                  : 0,
              totalVisits:
                Number.isFinite(Number(existingStudent.totalVisits))
                  ? Number(existingStudent.totalVisits)
                  : 0,
              monthsInClub:
                Number.isFinite(Number(existingStudent.monthsInClub))
                  ? Number(existingStudent.monthsInClub)
                  : 0,
              lastCheckInAt: existingStudent.lastCheckInAt ?? null,
              joinedAt: existingStudent.joinedAt ?? now,
              tier: existingStudent.tier ?? "",
              emergencyContact: existingStudent.emergencyContact ?? "",
              emergencyPhone: existingStudent.emergencyPhone ?? "",
              notes: existingStudent.notes ?? ""
            }
          }
        };
      });
    }

    return createdUser;
  } catch (error) {
    throw normalizeCloudError(error, "Не удалось создать аккаунт. Попробуй еще раз.");
  }
}

export async function loginCloudUser(payload) {
  try {
    validateCloudSetup();
    await loadRegistrationCodesFromCloud();

    const phoneNumber = String(payload?.phoneNumber ?? "").trim();
    const clubCode = String(payload?.clubCode ?? "").trim();
    const phoneNormalized = normalizePhone(phoneNumber);
    const clubCodeNormalized = normalizeClubCode(clubCode);

    if (phoneNormalized.length < MIN_PHONE_LENGTH) {
      throw new CloudAuthError("INVALID_PHONE", "Введите корректный номер телефона.");
    }

    const usersState = coerceUsersEntity(await usersRepository.load());
    const existingUser = findUserByPhone(usersState, phoneNormalized);

    if (!existingUser) {
      throw new CloudAuthError(
        "USER_NOT_FOUND",
        "Пользователь не найден. Сначала зарегистрируйся через Create Account."
      );
    }

    const expectedClubCode = normalizeClubCode(
      existingUser.clubCodeNormalized ?? existingUser.clubCode ?? ""
    );

    if (expectedClubCode && clubCodeNormalized !== expectedClubCode) {
      throw new CloudAuthError("INVALID_CREDENTIALS", "Неверный Club Code.");
    }

    const storageKey = resolveUserStorageKey(usersState, existingUser);
    const now = new Date().toISOString();
    let updatedUser = {
      ...existingUser,
      role: normalizeUserRole(existingUser.role)
    };

    await updateCloudEntity(CLOUD_ENTITY_IDS.users, (currentState) => {
      const currentUsers = coerceUsersEntity(currentState);
      const currentUser = currentUsers.usersById?.[storageKey];

      if (!currentUser) {
        return currentUsers;
      }

      updatedUser = {
        ...currentUser,
        role: normalizeUserRole(currentUser.role),
        lastLoginAt: now,
        updatedAt: now
      };

      return {
        ...currentUsers,
        usersById: {
          ...(currentUsers.usersById ?? {}),
          [storageKey]: updatedUser
        }
      };
    });

    return updatedUser;
  } catch (error) {
    throw normalizeCloudError(error, "Не удалось выполнить вход. Попробуй еще раз.");
  }
}
