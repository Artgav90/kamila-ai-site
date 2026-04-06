import { createActivityRecord, downloadJsonReport } from "../../services/crmGateway";

export function createCrmGatewayActions({
  activeSidebarItem,
  activities,
  addClassesToStudent,
  addStudent,
  adminStudentsView,
  consumeClassByStudentId,
  lt,
  metrics,
  navigate,
  pipelineSectionRef,
  revenueSectionRef,
  selectedStudent,
  setActivePanel,
  setActiveSidebarItem,
  setCrmState,
  setHighlightedSection,
  setIsAddStudentOpen,
  setIsLogoutConfirmOpen,
  setSearchQuery,
  setSelectedStudentId,
  setSidebarItemBeforeLogout,
  setStudentModal,
  setToast,
  sidebarItemBeforeLogout,
  topAnchorRef
}) {
  const updateCrmState = (updater) => {
    setCrmState((currentState) => {
      const nextState = typeof updater === "function" ? updater(currentState) : updater;
      return nextState;
    });
  };

  const showToast = (tone, message) => {
    setToast({
      id: `${Date.now()}-${tone}`,
      tone,
      message
    });
  };

  const appendActivity = (payload) => {
    updateCrmState((currentState) => ({
      ...currentState,
      customActivities: [createActivityRecord(payload), ...currentState.customActivities].slice(0, 24)
    }));
  };

  const rememberPanel = (panelId) => {
    updateCrmState((currentState) => ({
      ...currentState,
      lastPanel: panelId
    }));
  };

  const closeOverlayPanels = () => {
    setActivePanel(null);
    setActiveSidebarItem("dashboard");
  };

  const focusSection = (sectionId, sectionRef, navId) => {
    setActivePanel(null);
    setActiveSidebarItem(navId);
    setHighlightedSection(sectionId);
    rememberPanel(navId);
    sectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  };

  const openPanel = (panelId) => {
    setActivePanel(panelId);
    setActiveSidebarItem(panelId);
    rememberPanel(panelId);
  };

  const handleMainNavigation = (itemId) => {
    switch (itemId) {
      case "dashboard":
        setActivePanel(null);
        setActiveSidebarItem("dashboard");
        rememberPanel("dashboard");
        topAnchorRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
        break;
      case "students":
        openPanel("students");
        break;
      case "pipeline":
        focusSection("pipeline", pipelineSectionRef, "pipeline");
        break;
      case "revenue":
        focusSection("revenue", revenueSectionRef, "revenue");
        break;
      case "schedule":
        openPanel("schedule");
        break;
      case "messages":
        openPanel("messages");
        break;
      case "reports":
        openPanel("reports");
        break;
      default:
        break;
    }
  };

  const handleUtilityNavigation = (itemId) => {
    switch (itemId) {
      case "settings":
        openPanel("settings");
        break;
      case "logout":
        setSidebarItemBeforeLogout(activeSidebarItem);
        setActiveSidebarItem("logout");
        setIsLogoutConfirmOpen(true);
        break;
      default:
        break;
    }
  };

  const openStudentModal = (modalName, student) => {
    setSelectedStudentId(student.studentId);
    setStudentModal(modalName);
  };

  const closeStudentModal = () => {
    setStudentModal(null);
    setSelectedStudentId(null);
  };

  const handleStudentCheckIn = (student) => {
    const result = consumeClassByStudentId(student.studentId);

    if (result.status === "success") {
      appendActivity({
        color: "rgb(16, 185, 129)",
        text: lt(
          `${student.name} сделал(а) чекин — ${student.membershipLabel}`,
          `${student.name} hat eingecheckt — ${student.membershipLabel}`
        ),
        type: "checkin"
      });
      updateCrmState((currentState) => ({
        ...currentState,
        checkinsTodayBoost: currentState.checkinsTodayBoost + 1
      }));
      showToast(
        "success",
        lt(
          `${student.name}: посещение учтено, осталось ${result.classesLeft}.`,
          `${student.name}: Besuch gezählt, noch ${result.classesLeft} Klassen.`
        )
      );
      return;
    }

    showToast(
      "error",
      result.message ?? lt("Не удалось учесть посещение.", "Besuch konnte nicht gezählt werden.")
    );
  };

  const handleAddClasses = (amount) => {
    if (!selectedStudent) {
      return;
    }

    const result = addClassesToStudent(selectedStudent.studentId, amount);
    if (result.status === "success") {
      appendActivity({
        color: "rgb(168, 85, 247)",
        text: lt(
          `${selectedStudent.name} пополнил(а) на ${amount} занятий`,
          `${selectedStudent.name} hat ${amount} Klassen aufgeladen`
        ),
        type: "payment"
      });
      closeStudentModal();
      showToast(
        "success",
        lt(
          `${selectedStudent.name}: добавлено ${amount} занятий, теперь ${result.classesLeft} осталось.`,
          `${selectedStudent.name}: ${amount} Klassen hinzugefügt, jetzt ${result.classesLeft} übrig.`
        )
      );
      return;
    }

    showToast(
      "error",
      result.message ?? lt("Не удалось добавить занятия.", "Klassen konnten nicht hinzugefügt werden.")
    );
  };

  const handleAddStudent = (formState) => {
    const result = addStudent(formState);

    if (result.status === "success") {
      appendActivity({
        color: "rgb(255, 95, 160)",
        text: lt(
          `Новый ученик ${result.student.name} зарегистрирован`,
          `Neuer Schüler ${result.student.name} wurde registriert`
        ),
        type: "registration"
      });
      setIsAddStudentOpen(false);
      setSelectedStudentId(result.student.studentId);
      openPanel("students");
      showToast(
        "success",
        lt(
          `${result.student.name} добавлен в CRM и синхронизирован с приложением.`,
          `${result.student.name} wurde zum CRM hinzugefügt und mit der App synchronisiert.`
        )
      );
      return;
    }

    showToast(
      "error",
      result.message ?? lt("Не удалось добавить ученика.", "Schüler konnte nicht hinzugefügt werden.")
    );
  };

  const handleToggleSetting = (settingId) => {
    updateCrmState((currentState) => ({
      ...currentState,
      settings: {
        ...currentState.settings,
        [settingId]: !currentState.settings[settingId]
      }
    }));
  };

  const handleDownloadReport = () => {
    downloadJsonReport("topdance-crm-report.json", {
      generatedAt: new Date().toISOString(),
      metrics,
      students: adminStudentsView,
      activities
    });

    showToast("success", lt("CRM-отчёт скачан.", "CRM-Bericht heruntergeladen."));
  };

  const handleSelectSearchStudent = (student) => {
    setSearchQuery("");
    setSelectedStudentId(student.studentId);
    setStudentModal("view");
    openPanel("students");
  };

  const handleSelectSearchActivity = () => {
    setSearchQuery("");
    openPanel("messages");
  };

  const handleLogout = () => {
    setIsLogoutConfirmOpen(false);
    navigate("/home");
  };

  const handleCloseLogoutConfirm = () => {
    setIsLogoutConfirmOpen(false);
    setActiveSidebarItem(sidebarItemBeforeLogout);
  };

  return {
    closeOverlayPanels,
    closeStudentModal,
    handleAddClasses,
    handleAddStudent,
    handleCloseLogoutConfirm,
    handleDownloadReport,
    handleLogout,
    handleMainNavigation,
    handleSelectSearchActivity,
    handleSelectSearchStudent,
    handleStudentCheckIn,
    handleToggleSetting,
    handleUtilityNavigation,
    onBackToApp: () => navigate("/admin"),
    onOpenAddStudent: () => setIsAddStudentOpen(true),
    onOpenMessages: () => openPanel("messages"),
    onOpenSchedule: () => navigate("/schedule"),
    openPanel,
    openStudentModal
  };
}
