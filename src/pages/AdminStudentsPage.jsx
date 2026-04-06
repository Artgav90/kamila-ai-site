import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentActionToast from "../components/admin/students/StudentActionToast";
import StudentAddClassesModal from "../components/admin/students/StudentAddClassesModal";
import StudentDetailsModal from "../components/admin/students/StudentDetailsModal";
import StudentsList from "../components/admin/students/StudentsList";
import StudentsScreenHeader from "../components/admin/students/StudentsScreenHeader";
import StudentsSearchBar from "../components/admin/students/StudentsSearchBar";
import { getStudentsSummary } from "../components/admin/students/studentsData";
import { useLanguage } from "../context/LanguageContext";
import { useStudentCheckIn } from "../context/StudentCheckInContext";

const TOAST_DURATION_MS = 2200;

function AdminStudentsPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const {
    addClassesToStudent,
    adminStudentsView,
    consumeClassByStudentId
  } = useStudentCheckIn();
  const [query, setQuery] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [activeSheet, setActiveSheet] = useState(null);
  const [toast, setToast] = useState(null);
  const studentsSummary = getStudentsSummary(t, adminStudentsView.length);

  useEffect(() => {
    if (!toast) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setToast(null);
    }, TOAST_DURATION_MS);

    return () => window.clearTimeout(timeoutId);
  }, [toast]);

  const visibleStudents = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) {
      return adminStudentsView;
    }

    return adminStudentsView.filter(
      (student) =>
        student.name.toLowerCase().includes(normalizedQuery) ||
        student.email.toLowerCase().includes(normalizedQuery) ||
        student.studentId.toLowerCase().includes(normalizedQuery)
    );
  }, [adminStudentsView, query]);

  const selectedStudent = useMemo(
    () =>
      adminStudentsView.find((student) => student.studentId === selectedStudentId) ?? null,
    [adminStudentsView, selectedStudentId]
  );

  const showToast = (tone, message) => {
    setToast({
      id: `${Date.now()}-${tone}`,
      tone,
      message
    });
  };

  const openSheet = (sheetName, student) => {
    setSelectedStudentId(student.studentId);
    setActiveSheet(sheetName);
  };

  const closeSheet = () => {
    setActiveSheet(null);
    setSelectedStudentId(null);
  };

  const handleCheckIn = (student) => {
    const result = consumeClassByStudentId(student.studentId);

    if (result.status === "success") {
      showToast(
        "success",
        t("ui.m.adminStudents.checkinSuccess", {
          name: student.name,
          classesLeft: result.classesLeft
        })
      );
      return;
    }

    showToast("error", result.message ?? t("ui.774402cfe0b8"));
  };

  const handleAddClasses = (amount) => {
    if (!selectedStudent) {
      return;
    }

    const result = addClassesToStudent(selectedStudent.studentId, amount);

    if (result.status === "success") {
      closeSheet();
      showToast(
        "success",
        t("ui.m.adminStudents.addClassesSuccess", {
          name: selectedStudent.name,
          amount,
          classesLeft: result.classesLeft
        })
      );
      return;
    }

    showToast("error", result.message ?? t("ui.8372e86cdf70"));
  };

  return (
    <>
      <section
        className="-mx-4 flex flex-1 flex-col bg-[#09090e] sm:-mx-5"
        style={{ background: "rgb(9, 9, 14)" }}
      >
        <StudentsScreenHeader
          title={studentsSummary.title}
          subtitle={studentsSummary.subtitle}
          onBack={() => navigate("/admin")}
        />

        <StudentsSearchBar
          value={query}
          onChange={setQuery}
          placeholder={studentsSummary.searchPlaceholder}
        />

        <StudentsList
          students={visibleStudents}
          onView={(student) => openSheet("view", student)}
          onAddClasses={(student) => openSheet("classes", student)}
          onCheckIn={handleCheckIn}
        />
      </section>

      <StudentDetailsModal
        student={selectedStudent}
        isOpen={activeSheet === "view"}
        onClose={closeSheet}
      />

      <StudentAddClassesModal
        student={selectedStudent}
        isOpen={activeSheet === "classes"}
        onClose={closeSheet}
        onConfirm={handleAddClasses}
      />

      <StudentActionToast toast={toast} />
    </>
  );
}

export default AdminStudentsPage;
