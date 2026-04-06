import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useStudentCheckIn } from "../context/StudentCheckInContext";
import { createCrmGatewayActions } from "./crmGateway/actions";
import { useCrmGatewaySelectors } from "./crmGateway/selectors";
import { useCrmGatewayStateStore } from "./crmGateway/state";
import { useCrmGatewaySync } from "./crmGateway/sync";

export function useCrmGatewayState() {
  const { lt, t } = useLanguage();
  const navigate = useNavigate();
  const {
    addClassesToStudent,
    addStudent,
    adminStudentsView,
    consumeClassByStudentId
  } = useStudentCheckIn();

  const state = useCrmGatewayStateStore({ lt });
  const selectors = useCrmGatewaySelectors({
    adminStudentsView,
    crmState: state.crmState,
    deferredSearchQuery: state.deferredSearchQuery,
    lt,
    selectedStudentId: state.selectedStudentId
  });

  useCrmGatewaySync({
    crmState: state.crmState,
    didCrmCloudHydrationRef: state.didCrmCloudHydrationRef,
    highlightedSection: state.highlightedSection,
    isCrmCloudReady: state.isCrmCloudReady,
    lt,
    pipelineSectionRef: state.pipelineSectionRef,
    revenueSectionRef: state.revenueSectionRef,
    setActivePanel: state.setActivePanel,
    setActiveSidebarItem: state.setActiveSidebarItem,
    setCrmState: state.setCrmState,
    setHighlightedSection: state.setHighlightedSection,
    setIsCrmCloudReady: state.setIsCrmCloudReady,
    setSchedulePreviewItems: state.setSchedulePreviewItems,
    setToast: state.setToast,
    skipNextCloudWriteRef: state.skipNextCloudWriteRef,
    toast: state.toast
  });

  const actions = createCrmGatewayActions({
    activeSidebarItem: state.activeSidebarItem,
    activities: selectors.activities,
    addClassesToStudent,
    addStudent,
    adminStudentsView,
    consumeClassByStudentId,
    lt,
    metrics: selectors.metrics,
    navigate,
    pipelineSectionRef: state.pipelineSectionRef,
    revenueSectionRef: state.revenueSectionRef,
    selectedStudent: selectors.selectedStudent,
    setActivePanel: state.setActivePanel,
    setActiveSidebarItem: state.setActiveSidebarItem,
    setCrmState: state.setCrmState,
    setHighlightedSection: state.setHighlightedSection,
    setIsAddStudentOpen: state.setIsAddStudentOpen,
    setIsLogoutConfirmOpen: state.setIsLogoutConfirmOpen,
    setSearchQuery: state.setSearchQuery,
    setSelectedStudentId: state.setSelectedStudentId,
    setSidebarItemBeforeLogout: state.setSidebarItemBeforeLogout,
    setStudentModal: state.setStudentModal,
    setToast: state.setToast,
    sidebarItemBeforeLogout: state.sidebarItemBeforeLogout,
    topAnchorRef: state.topAnchorRef
  });

  return {
    t,
    lt,
    topAnchorRef: state.topAnchorRef,
    revenueSectionRef: state.revenueSectionRef,
    pipelineSectionRef: state.pipelineSectionRef,
    activitySectionRef: state.activitySectionRef,
    crmState: state.crmState,
    activePanel: state.activePanel,
    activeSidebarItem: state.activeSidebarItem,
    highlightedSection: state.highlightedSection,
    searchQuery: state.searchQuery,
    setSearchQuery: state.setSearchQuery,
    normalizedSearch: selectors.normalizedSearch,
    searchStudentResults: selectors.searchStudentResults,
    searchActivityResults: selectors.searchActivityResults,
    studentModal: state.studentModal,
    isAddStudentOpen: state.isAddStudentOpen,
    setIsAddStudentOpen: state.setIsAddStudentOpen,
    isLogoutConfirmOpen: state.isLogoutConfirmOpen,
    sidebarItemBeforeLogout: state.sidebarItemBeforeLogout,
    toast: state.toast,
    schedulePreviewItems: state.schedulePreviewItems,
    activities: selectors.activities,
    selectedStudent: selectors.selectedStudent,
    visibleStudents: selectors.visibleStudents,
    metrics: selectors.metrics,
    ...actions
  };
}
