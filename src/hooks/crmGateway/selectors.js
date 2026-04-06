import { useMemo } from "react";
import { crmMetricCards } from "../../components/crm/crmData";
import {
  buildCrmMetrics,
  buildSearchCollections,
  localizeActivities
} from "../../services/crmGateway";

export function useCrmGatewaySelectors({
  adminStudentsView,
  crmState,
  deferredSearchQuery,
  lt,
  selectedStudentId
}) {
  const activities = useMemo(
    () => localizeActivities(crmState.customActivities, lt),
    [crmState.customActivities, lt]
  );

  const selectedStudent =
    adminStudentsView.find((student) => student.studentId === selectedStudentId) ?? null;
  const normalizedSearch = deferredSearchQuery.trim().toLowerCase();

  const { visibleStudents, searchStudentResults, searchActivityResults } = useMemo(
    () => buildSearchCollections(adminStudentsView, activities, normalizedSearch),
    [activities, adminStudentsView, normalizedSearch]
  );

  const metrics = useMemo(
    () =>
      buildCrmMetrics({
        metricCards: crmMetricCards,
        students: adminStudentsView,
        checkinsTodayBoost: crmState.checkinsTodayBoost,
        monthlyRevenue: crmState.monthlyRevenue,
        lt
      }),
    [adminStudentsView, crmState.checkinsTodayBoost, crmState.monthlyRevenue, lt]
  );

  return {
    activities,
    metrics,
    normalizedSearch,
    searchActivityResults,
    searchStudentResults,
    selectedStudent,
    visibleStudents
  };
}
