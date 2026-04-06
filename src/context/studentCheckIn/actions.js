import { useCallback, useMemo } from "react";
import {
  calculateClassesLeft,
  createStudentRecordFromInput,
  normalizeStudentId,
  parseStudentIdFromQrPayload,
  resolveUserEntryByStudentId
} from "./helpers";

export function useStudentCheckInActions({
  checkInState,
  currentStudentId,
  lt,
  persistState,
  persistUsersState
}) {
  const consumeClassByStudentId = useCallback(
    (studentId) => {
      const normalizedStudentId = normalizeStudentId(studentId);
      if (!normalizedStudentId) {
        return { status: "invalid", message: lt("Некорректный QR-код.", "Ungültiger QR-Code.") };
      }

      const student = checkInState.studentsById[normalizedStudentId];
      if (!student) {
        return {
          status: "not-found",
          message: lt("Ученик не найден.", "Schüler wurde nicht gefunden."),
          studentId: normalizedStudentId
        };
      }

      if (student.usedClasses >= student.totalClasses) {
        return {
          status: "empty",
          message: lt(
            `У ${student.name} не осталось занятий.`,
            `${student.name} hat keine Klassen mehr übrig.`
          ),
          studentId: normalizedStudentId,
          student
        };
      }

      const nextStudent = {
        ...student,
        lastCheckInAt: new Date().toISOString(),
        usedClasses: student.usedClasses + 1,
        totalVisits: student.totalVisits + 1
      };

      const nextState = {
        ...checkInState,
        studentsById: {
          ...checkInState.studentsById,
          [normalizedStudentId]: nextStudent
        }
      };

      persistState(nextState);

      return {
        status: "success",
        message: lt(
          `Посещение для ${nextStudent.name} учтено.`,
          `Besuch für ${nextStudent.name} wurde gezählt.`
        ),
        studentId: normalizedStudentId,
        student: nextStudent,
        classesLeft: calculateClassesLeft(nextStudent)
      };
    },
    [checkInState, lt, persistState]
  );

  const addClassesToStudent = useCallback(
    (studentId, amount) => {
      const normalizedStudentId = normalizeStudentId(studentId);
      const safeAmount = Number.parseInt(amount, 10);

      if (!normalizedStudentId || !Number.isFinite(safeAmount) || safeAmount <= 0) {
        return {
          status: "invalid",
          message: lt(
            "Введите корректное количество занятий.",
            "Gib eine gültige Anzahl an Klassen ein."
          )
        };
      }

      const student = checkInState.studentsById[normalizedStudentId];
      if (!student) {
        return {
          status: "not-found",
          message: lt("Ученик не найден.", "Schüler wurde nicht gefunden."),
          studentId: normalizedStudentId
        };
      }

      const nextStudent = {
        ...student,
        totalClasses: student.totalClasses + safeAmount
      };

      const nextState = {
        ...checkInState,
        studentsById: {
          ...checkInState.studentsById,
          [normalizedStudentId]: nextStudent
        }
      };

      persistState(nextState);

      return {
        status: "success",
        message: lt(
          `Для ${nextStudent.name} добавлено ${safeAmount} занятий.`,
          `${safeAmount} Klassen wurden für ${nextStudent.name} hinzugefügt.`
        ),
        studentId: normalizedStudentId,
        student: nextStudent,
        classesLeft: calculateClassesLeft(nextStudent)
      };
    },
    [checkInState, lt, persistState]
  );

  const consumeClassFromPayload = useCallback(
    (payload) => {
      const studentId = parseStudentIdFromQrPayload(payload);
      if (!studentId) {
        return { status: "invalid", message: lt("Некорректный QR-код.", "Ungültiger QR-Code.") };
      }

      return consumeClassByStudentId(studentId);
    },
    [consumeClassByStudentId, lt]
  );

  const addStudent = useCallback(
    (input) => {
      const normalizedName = String(input?.name ?? "").trim();
      const normalizedEmail = String(input?.email ?? "").trim().toLowerCase();

      if (!normalizedName || !normalizedEmail) {
        return {
          status: "invalid",
          message: lt("Имя и email обязательны.", "Name und E-Mail sind erforderlich.")
        };
      }

      const emailTaken = Object.values(checkInState.studentsById).some(
        (student) => student.email.toLowerCase() === normalizedEmail
      );

      if (emailTaken) {
        return {
          status: "duplicate",
          message: lt(
            "Ученик с таким email уже существует.",
            "Ein Schüler mit dieser E-Mail existiert bereits."
          )
        };
      }

      const nextStudent = createStudentRecordFromInput({
        tier: "",
        phone: "",
        membershipLabel: "",
        membershipRenewal: "",
        totalClasses: 0,
        emergencyContact: "",
        emergencyPhone: "",
        notes: "",
        ...input,
        name: normalizedName,
        email: normalizedEmail
      });

      const nextState = {
        ...checkInState,
        studentsById: {
          ...checkInState.studentsById,
          [nextStudent.studentId]: nextStudent
        }
      };

      persistState(nextState);

      return {
        status: "success",
        message: lt(
          `${nextStudent.name} добавлен в CRM.`,
          `${nextStudent.name} wurde zum CRM hinzugefügt.`
        ),
        student: nextStudent
      };
    },
    [checkInState, lt, persistState]
  );

  const updateCurrentStudentAvatar = useCallback(
    (avatarSrc) => {
      const normalizedStudentId = normalizeStudentId(currentStudentId);
      if (!normalizedStudentId || !String(avatarSrc ?? "").trim()) {
        return {
          status: "invalid",
          message: lt("Некорректная аватарка.", "Ungültiger Avatar.")
        };
      }

      const normalizedAvatar = String(avatarSrc).trim();
      const now = new Date().toISOString();
      persistUsersState((currentUsersState) => {
        const userEntry = resolveUserEntryByStudentId(currentUsersState, normalizedStudentId);
        const userStorageKey = userEntry?.key ?? normalizedStudentId;
        const currentUser = userEntry?.user ?? {};

        return {
          ...(currentUsersState ?? {}),
          usersById: {
            ...((currentUsersState && currentUsersState.usersById) || {}),
            [userStorageKey]: {
              ...currentUser,
              userId: currentUser.userId || userStorageKey,
              avatar: normalizedAvatar,
              updatedAt: now
            }
          }
        };
      });

      const currentStudent = checkInState.studentsById[normalizedStudentId];
      if (currentStudent) {
        const nextStudent = {
          ...currentStudent,
          studentId: normalizedStudentId,
          avatar: normalizedAvatar
        };
        const nextState = {
          ...checkInState,
          studentsById: {
            ...checkInState.studentsById,
            [normalizedStudentId]: nextStudent
          }
        };

        persistState(nextState);
      }

      return {
        status: "success",
        avatar: normalizedAvatar
      };
    },
    [
      checkInState,
      currentStudentId,
      lt,
      persistState,
      persistUsersState
    ]
  );

  return useMemo(
    () => ({
      addStudent,
      addClassesToStudent,
      consumeClassByStudentId,
      consumeClassFromPayload,
      updateCurrentStudentAvatar
    }),
    [
      addClassesToStudent,
      addStudent,
      consumeClassByStudentId,
      consumeClassFromPayload,
      updateCurrentStudentAvatar
    ]
  );
}
