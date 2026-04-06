import StudentCard from "./StudentCard";
import { useLanguage } from "../../../context/LanguageContext";

function StudentsList({ students, onView, onAddClasses, onCheckIn }) {
  const { t } = useLanguage();

  if (students.length === 0) {
    return (
      <div className="px-4 pb-8">
        <div
          className="rounded-2xl border px-4 py-5 text-center"
          style={{
            borderColor: "rgba(255, 255, 255, 0.08)",
            background: "rgba(18, 18, 28, 0.72)"
          }}
        >
          <p
            className="text-[11px] font-bold uppercase"
            style={{
              color: "rgba(255, 95, 160, 0.72)",
              letterSpacing: "0.1em"
            }}
          >
            {t("ui.c5fd4bb4814d")}
          </p>
          <p className="mt-2 text-sm text-white/58">
            {t("ui.6731a1b617da")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 px-4 pb-8">
      {students.map((student) => (
        <StudentCard
          key={student.id}
          student={student}
          onView={onView}
          onAddClasses={onAddClasses}
          onCheckIn={onCheckIn}
        />
      ))}
    </div>
  );
}

export default StudentsList;
