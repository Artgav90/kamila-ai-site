import { useMemo } from "react";
import { getClassesBalanceColor } from "../../components/admin/students/studentsData";
import { useAppAccess } from "../AppAccessContext";
import {
  calculateClassesLeft,
  createFallbackCurrentStudent,
  formatDateTimeLabelByLocale,
  localizeMembershipLabel,
  localizeMembershipRenewal,
  normalizeStudentId,
  profileIdentity,
  profileStats,
  profileSubscription,
  resolveUserEntryByStudentId
} from "./helpers";

export function useStudentCheckInSelectors({ checkInState, usersState, locale, lt }) {
  const { session } = useAppAccess();
  const currentStudentId = normalizeStudentId(session?.userId ?? profileIdentity.studentId);
  const fallbackCurrentStudent = useMemo(
    () => createFallbackCurrentStudent(currentStudentId, lt),
    [currentStudentId, lt]
  );
  const currentUserEntry = useMemo(
    () => resolveUserEntryByStudentId(usersState, currentStudentId),
    [currentStudentId, usersState]
  );
  const currentUser = currentUserEntry?.user ?? null;

  const currentStudent = checkInState.studentsById[currentStudentId] ?? fallbackCurrentStudent;
  const safeTotalClasses = Math.max(0, Number.parseInt(currentStudent.totalClasses, 10) || 0);
  const classesLeft = calculateClassesLeft(currentStudent);
  const usageTotal = safeTotalClasses > 0 ? safeTotalClasses : 1;

  const profileSubscriptionView = useMemo(
    () => ({
      ...profileSubscription,
      title: lt("Мой абонемент", "Mein Abo"),
      ctaLabel: lt("Пополнить", "Aufladen"),
      subtitle: [
        localizeMembershipLabel(currentStudent.membershipLabel, lt),
        localizeMembershipRenewal(currentStudent.membershipRenewal, lt)
      ]
        .filter(Boolean)
        .join(" · "),
      classesLeft: String(classesLeft),
      classesLeftLabel: lt("занятий осталось", "Klassen übrig"),
      usageLabel: lt(
        `${currentStudent.usedClasses} из ${safeTotalClasses} использовано`,
        `${currentStudent.usedClasses} von ${safeTotalClasses} genutzt`
      ),
      progressWidth:
        safeTotalClasses > 0 ? `${Math.round((classesLeft / usageTotal) * 100)}%` : "0%",
      activeDots:
        safeTotalClasses > 0
          ? Math.min(profileSubscription.totalDots, currentStudent.usedClasses + 1)
          : 0
    }),
    [
      classesLeft,
      currentStudent.membershipLabel,
      currentStudent.membershipRenewal,
      currentStudent.usedClasses,
      lt,
      safeTotalClasses,
      usageTotal
    ]
  );

  const profileStatsView = useMemo(
    () =>
      profileStats.map((stat, index) => {
        if (index === 0) {
          return {
            ...stat,
            value: String(classesLeft),
            label: lt("Занятий\nосталось", "Klassen\nübrig")
          };
        }

        if (index === 1) {
          return {
            ...stat,
            value: String(currentStudent.monthsInClub),
            label: lt("Месяцев\nв клубе", "Monate\nim Club")
          };
        }

        if (index === 2) {
          return {
            ...stat,
            value: String(currentStudent.totalVisits),
            label: lt("Всего\nвизитов", "Besuche\ngesamt")
          };
        }

        return stat;
      }),
    [classesLeft, currentStudent.monthsInClub, currentStudent.totalVisits, lt]
  );

  const profileIdentityView = useMemo(
    () => ({
      ...profileIdentity,
      studentId: currentStudentId,
      name:
        String(currentUser?.fullName ?? "").trim() ||
        currentStudent.name ||
        lt("Профиль не заполнен", "Profil ist noch leer"),
      email:
        String(currentUser?.phoneNumber ?? "").trim() ||
        String(currentStudent.phone ?? "").trim() ||
        String(currentStudent.email ?? "").trim() ||
        lt("Телефон не указан", "Telefon nicht angegeben"),
      avatar:
        String(currentUser?.avatar ?? "").trim() ||
        String(currentStudent.avatar ?? "").trim() ||
        "",
      photoHint: "",
      badgeLabel: lt("Лучший танцор", "Bester Tänzer")
    }),
    [
      currentStudent.avatar,
      currentStudent.email,
      currentStudent.name,
      currentStudent.phone,
      currentStudentId,
      currentUser?.avatar,
      currentUser?.fullName,
      currentUser?.phoneNumber,
      lt
    ]
  );

  const adminStudentsView = useMemo(
    () =>
      Object.values(checkInState.studentsById).map((student) => {
        const classesLeftCount = calculateClassesLeft(student);

        return {
          ...student,
          membershipLabel: localizeMembershipLabel(student.membershipLabel, lt),
          membershipRenewal: localizeMembershipRenewal(student.membershipRenewal, lt),
          emergencyContact: student.emergencyContact ?? "",
          emergencyPhone: student.emergencyPhone ?? "",
          notes: student.notes ?? "",
          classesCount: classesLeftCount,
          classesColor: getClassesBalanceColor(classesLeftCount),
          classesLeftLabel: lt(
            `Осталось занятий: ${classesLeftCount}`,
            `${classesLeftCount} Klassen übrig`
          ),
          lastCheckInLabel: formatDateTimeLabelByLocale(student.lastCheckInAt, locale, lt)
        };
      }),
    [checkInState.studentsById, locale, lt]
  );

  return {
    adminStudentsView,
    currentStudentId,
    profileIdentityView,
    profileStatsView,
    profileSubscriptionView
  };
}
