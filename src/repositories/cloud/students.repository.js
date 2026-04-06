import {
  coerceStudentsEntity,
  parseStudentsEntity
} from "../../domain/types/cloud";
import {
  CLOUD_ENTITY_IDS,
  fetchCloudEntity,
  saveCloudEntity,
  subscribeToCloudEntities
} from "../../services/supabase.core";

function mergeStudents(currentState, incomingState) {
  const current = coerceStudentsEntity(currentState);
  const incoming = coerceStudentsEntity(incomingState);

  const studentIds = new Set([
    ...Object.keys(current.studentsById ?? {}),
    ...Object.keys(incoming.studentsById ?? {})
  ]);

  const mergedStudentsById = {};
  studentIds.forEach((studentId) => {
    const currentStudent = current.studentsById?.[studentId] ?? {};
    const incomingStudent = incoming.studentsById?.[studentId] ?? {};
    const currentCheckInAt = Date.parse(currentStudent.lastCheckInAt ?? "");
    const incomingCheckInAt = Date.parse(incomingStudent.lastCheckInAt ?? "");

    mergedStudentsById[studentId] = {
      ...currentStudent,
      ...incomingStudent,
      studentId: incomingStudent.studentId ?? currentStudent.studentId ?? studentId,
      totalClasses: Math.max(
        Number(currentStudent.totalClasses) || 0,
        Number(incomingStudent.totalClasses) || 0
      ),
      usedClasses: Math.max(
        Number(currentStudent.usedClasses) || 0,
        Number(incomingStudent.usedClasses) || 0
      ),
      totalVisits: Math.max(
        Number(currentStudent.totalVisits) || 0,
        Number(incomingStudent.totalVisits) || 0
      ),
      monthsInClub: Math.max(
        Number(currentStudent.monthsInClub) || 0,
        Number(incomingStudent.monthsInClub) || 0
      ),
      lastCheckInAt:
        Number.isFinite(currentCheckInAt) && Number.isFinite(incomingCheckInAt)
          ? (currentCheckInAt >= incomingCheckInAt
              ? currentStudent.lastCheckInAt
              : incomingStudent.lastCheckInAt)
          : (incomingStudent.lastCheckInAt ?? currentStudent.lastCheckInAt ?? null)
    };
  });

  return {
    ...current,
    ...incoming,
    studentsById: mergedStudentsById
  };
}

async function loadStudents() {
  return parseStudentsEntity(await fetchCloudEntity(CLOUD_ENTITY_IDS.students));
}

async function saveStudents(nextState) {
  await saveCloudEntity(CLOUD_ENTITY_IDS.students, coerceStudentsEntity(nextState));
}

export const studentsRepository = Object.freeze({
  load: loadStudents,

  save: saveStudents,

  subscribe(onChange) {
    if (typeof onChange !== "function") {
      return () => {};
    }

    return subscribeToCloudEntities([CLOUD_ENTITY_IDS.students], async () => {
      const nextState = await loadStudents();
      onChange(nextState);
    });
  },

  merge(currentState, incomingState) {
    return mergeStudents(currentState, incomingState);
  }
});
