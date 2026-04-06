import { lazy, Suspense } from "react";
import { crmSettingsSections } from "../components/crm/crmData";
import CrmSidebar from "../components/crm/CrmSidebar";
import CrmTopBar from "../components/crm/CrmTopBar";
import { useCrmGatewayState } from "../hooks/useCrmGatewayState";

const MUTED_TEXT = "rgba(255, 255, 255, 0.45)";
const SECONDARY_TEXT = "rgba(255, 255, 255, 0.25)";

const CrmDashboardContent = lazy(() => import("../components/crm/CrmDashboardContent"));
const CrmStudentsPanel = lazy(() =>
  import("../components/crm/overlays/StudentsPanel").then((module) => ({
    default: module.CrmStudentsPanel
  }))
);
const CrmMessagesPanel = lazy(() =>
  import("../components/crm/overlays/MessagesPanel").then((module) => ({
    default: module.CrmMessagesPanel
  }))
);
const CrmSchedulePanel = lazy(() =>
  import("../components/crm/overlays/SchedulePanel").then((module) => ({
    default: module.CrmSchedulePanel
  }))
);
const CrmReportsPanel = lazy(() =>
  import("../components/crm/overlays/ReportsPanel").then((module) => ({
    default: module.CrmReportsPanel
  }))
);
const CrmSettingsPanel = lazy(() =>
  import("../components/crm/overlays/SettingsPanel").then((module) => ({
    default: module.CrmSettingsPanel
  }))
);
const CrmStudentDetailsModal = lazy(() =>
  import("../components/crm/overlays/modals/StudentDetailsModal").then((module) => ({
    default: module.CrmStudentDetailsModal
  }))
);
const CrmAddClassesModal = lazy(() =>
  import("../components/crm/overlays/modals/AddClassesModal").then((module) => ({
    default: module.CrmAddClassesModal
  }))
);
const CrmAddStudentModal = lazy(() =>
  import("../components/crm/overlays/modals/AddStudentModal").then((module) => ({
    default: module.CrmAddStudentModal
  }))
);
const CrmConfirmModal = lazy(() =>
  import("../components/crm/overlays/modals/ConfirmModal").then((module) => ({
    default: module.CrmConfirmModal
  }))
);
const CrmToast = lazy(() =>
  import("../components/crm/overlays/Toast").then((module) => ({
    default: module.CrmToast
  }))
);

function CrmGatewayPage() {
  const {
    topAnchorRef,
    revenueSectionRef,
    pipelineSectionRef,
    activitySectionRef,
    crmState,
    activePanel,
    activeSidebarItem,
    highlightedSection,
    searchQuery,
    setSearchQuery,
    normalizedSearch,
    searchStudentResults,
    searchActivityResults,
    studentModal,
    isAddStudentOpen,
    setIsAddStudentOpen,
    isLogoutConfirmOpen,
    toast,
    schedulePreviewItems,
    activities,
    selectedStudent,
    visibleStudents,
    metrics,
    closeOverlayPanels,
    handleMainNavigation,
    handleUtilityNavigation,
    openStudentModal,
    closeStudentModal,
    handleStudentCheckIn,
    handleAddClasses,
    handleAddStudent,
    handleToggleSetting,
    handleDownloadReport,
    handleSelectSearchStudent,
    handleSelectSearchActivity,
    handleLogout,
    handleCloseLogoutConfirm,
    onBackToApp,
    onOpenSchedule,
    onOpenMessages,
    onOpenAddStudent,
    t
  } = useCrmGatewayState();

  const dashboardFallback = (
    <main className="flex-1 p-6">
      <div className="rounded-2xl border border-white/10 bg-[#1a1a2e] p-5 text-sm text-white/60">
        {t("ui.3c1f65215010")}
      </div>
    </main>
  );

  return (
    <section
      className="min-h-screen"
      style={{
        background: "rgb(9, 9, 14)",
        fontFamily: "system-ui, -apple-system, sans-serif"
      }}
    >
      <div className="flex min-h-screen min-w-[1280px]">
        <CrmSidebar
          activeItemId={activeSidebarItem}
          onBackToApp={onBackToApp}
          onSelectMainItem={handleMainNavigation}
          onSelectUtilityItem={handleUtilityNavigation}
        />

        <div className="ml-56 flex min-w-0 flex-1 flex-col">
          <CrmTopBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onBellClick={onOpenMessages}
            onAddStudent={onOpenAddStudent}
            searchDropdown={
              normalizedSearch ? (
                <div
                  className="absolute top-[46px] left-0 z-20 w-[320px] rounded-2xl p-2"
                  style={{
                    background: "rgb(19, 19, 31)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    boxShadow: "0 18px 48px rgba(0, 0, 0, 0.35)"
                  }}
                >
                  {searchStudentResults.length === 0 && searchActivityResults.length === 0 ? (
                    <div className="px-3 py-3 text-sm" style={{ color: MUTED_TEXT }}>
                      {t("ui.54ee8d6c0481")}
                    </div>
                  ) : (
                    <>
                      {searchStudentResults.length > 0 ? (
                        <div className="mb-1">
                          <p
                            className="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.14em]"
                            style={{ color: MUTED_TEXT }}
                          >
                            {t("ui.e161fcab4c90")}
                          </p>
                          {searchStudentResults.map((student) => (
                            <button
                              key={student.studentId}
                              type="button"
                              onClick={() => handleSelectSearchStudent(student)}
                              className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left transition-all hover:bg-white/5"
                            >
                              <div className="min-w-0">
                                <p className="truncate text-sm font-bold text-white">{student.name}</p>
                                <p className="truncate text-xs" style={{ color: MUTED_TEXT }}>
                                  {student.email}
                                </p>
                              </div>
                              <p className="ml-3 text-xs" style={{ color: SECONDARY_TEXT }}>
                                {t("ui.m.crm.searchClassesLeft", { count: student.classesCount })}
                              </p>
                            </button>
                          ))}
                        </div>
                      ) : null}

                      {searchActivityResults.length > 0 ? (
                        <div>
                          <p
                            className="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.14em]"
                            style={{ color: MUTED_TEXT }}
                          >
                            {t("ui.4aece3fd30e0")}
                          </p>
                          {searchActivityResults.map((activity) => (
                            <button
                              key={activity.id}
                              type="button"
                              onClick={handleSelectSearchActivity}
                              className="flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition-all hover:bg-white/5"
                            >
                              <div
                                className="mt-1 h-2.5 w-2.5 rounded-full"
                                style={{ background: activity.color }}
                              />
                              <div className="min-w-0">
                                <p className="line-clamp-1 text-sm text-white">{activity.text}</p>
                                <p className="mt-0.5 text-xs" style={{ color: SECONDARY_TEXT }}>
                                  {activity.time}
                                </p>
                              </div>
                            </button>
                          ))}
                        </div>
                      ) : null}
                    </>
                  )}
                </div>
              ) : null
            }
          />

          <Suspense fallback={dashboardFallback}>
            <CrmDashboardContent
              activities={activities}
              highlightedSection={highlightedSection}
              metrics={metrics}
              onViewAll={onOpenMessages}
              topAnchorRef={topAnchorRef}
              revenueSectionRef={revenueSectionRef}
              pipelineSectionRef={pipelineSectionRef}
              activitySectionRef={activitySectionRef}
            />
          </Suspense>
        </div>
      </div>

      {activePanel === "students" ? (
        <Suspense fallback={null}>
          <CrmStudentsPanel
            isOpen
            onClose={closeOverlayPanels}
            onView={(student) => openStudentModal("view", student)}
            onAddClasses={(student) => openStudentModal("classes", student)}
            onCheckIn={handleStudentCheckIn}
            onAddStudent={onOpenAddStudent}
            onQueryChange={setSearchQuery}
            query={searchQuery}
            students={visibleStudents}
          />
        </Suspense>
      ) : null}

      {activePanel === "messages" ? (
        <Suspense fallback={null}>
          <CrmMessagesPanel
            activities={activities}
            isOpen
            onClose={closeOverlayPanels}
          />
        </Suspense>
      ) : null}

      {activePanel === "schedule" ? (
        <Suspense fallback={null}>
          <CrmSchedulePanel
            isOpen
            onClose={closeOverlayPanels}
            onOpenSchedule={onOpenSchedule}
            scheduleItems={schedulePreviewItems}
          />
        </Suspense>
      ) : null}

      {activePanel === "reports" ? (
        <Suspense fallback={null}>
          <CrmReportsPanel
            isOpen
            metrics={metrics}
            onClose={closeOverlayPanels}
            onDownloadReport={handleDownloadReport}
          />
        </Suspense>
      ) : null}

      {activePanel === "settings" ? (
        <Suspense fallback={null}>
          <CrmSettingsPanel
            isOpen
            onClose={closeOverlayPanels}
            onToggleSetting={handleToggleSetting}
            settings={crmState.settings}
            settingItems={crmSettingsSections}
          />
        </Suspense>
      ) : null}

      {studentModal === "view" ? (
        <Suspense fallback={null}>
          <CrmStudentDetailsModal
            isOpen
            onClose={closeStudentModal}
            student={selectedStudent}
          />
        </Suspense>
      ) : null}

      {studentModal === "classes" ? (
        <Suspense fallback={null}>
          <CrmAddClassesModal
            isOpen
            onClose={closeStudentModal}
            onConfirm={handleAddClasses}
            student={selectedStudent}
          />
        </Suspense>
      ) : null}

      {isAddStudentOpen ? (
        <Suspense fallback={null}>
          <CrmAddStudentModal
            isOpen
            onClose={() => setIsAddStudentOpen(false)}
            onSubmit={handleAddStudent}
          />
        </Suspense>
      ) : null}

      {isLogoutConfirmOpen ? (
        <Suspense fallback={null}>
          <CrmConfirmModal
            confirmLabel={t("ui.56c78442fb5a")}
            isOpen
            onClose={handleCloseLogoutConfirm}
            onConfirm={handleLogout}
            subtitle={t("ui.faa0f48f0cd1")}
            title={t("ui.bfc208f180cb")}
          />
        </Suspense>
      ) : null}

      {toast ? (
        <Suspense fallback={null}>
          <CrmToast toast={toast} />
        </Suspense>
      ) : null}
    </section>
  );
}

export default CrmGatewayPage;
