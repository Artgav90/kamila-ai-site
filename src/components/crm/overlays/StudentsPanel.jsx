import { useLanguage } from "../../../context/LanguageContext";
import { getClassesBalanceColor, tierStyles } from "../../admin/students/studentsData";
import { CrmIcon } from "../CrmIcons";
import {
  MUTED_TEXT,
  PanelShell,
  SURFACE_BACKGROUND,
  SURFACE_BORDER
} from "./shared";

function StudentRow({ student, onView, onAddClasses, onCheckIn }) {
  const { t } = useLanguage();
  const tierStyle = tierStyles[student.tier] ?? {
    background: "rgba(255, 255, 255, 0.12)",
    color: "rgb(255, 255, 255)"
  };

  const classesColor = getClassesBalanceColor(student.classesCount);

  return (
    <div
      className="rounded-[24px] p-4"
      style={{
        background: SURFACE_BACKGROUND,
        border: `1px solid ${SURFACE_BORDER}`
      }}
    >
      <div className="flex items-start gap-3">
        <div className="h-12 w-12 overflow-hidden rounded-full">
          <img src={student.avatar} alt={student.name} className="h-full w-full object-cover" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="truncate text-xl font-black text-white">{student.name}</p>
            <span className="rounded-full px-2 py-1 text-[11px] font-bold" style={tierStyle}>
              {student.tier}
            </span>
          </div>
          <p className="truncate text-sm" style={{ color: MUTED_TEXT }}>
            {student.email}
          </p>
        </div>

        <div className="text-right">
          <p className="text-[40px] leading-none font-black" style={{ color: classesColor }}>
            {student.classesCount}
          </p>
          <p className="text-xs" style={{ color: MUTED_TEXT }}>
            {t("ui.e5a2e81e413d")}
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        <button
          type="button"
          onClick={() => onView(student)}
          className="flex h-12 items-center justify-center gap-2 rounded-2xl text-sm font-bold transition-all active:scale-[0.98]"
          style={{
            background: "rgba(255, 95, 160, 0.08)",
            color: "rgb(255, 95, 160)"
          }}
        >
          <CrmIcon name="eye" size={15} color="currentColor" />
          <span>{t("ui.14b1d03f3513")}</span>
        </button>

        <button
          type="button"
          onClick={() => onAddClasses(student)}
          className="flex h-12 items-center justify-center gap-2 rounded-2xl text-sm font-bold transition-all active:scale-[0.98]"
          style={{
            background: "rgba(168, 85, 247, 0.1)",
            color: "rgb(168, 85, 247)"
          }}
        >
          <CrmIcon name="plus" size={15} color="currentColor" />
          <span>{t("ui.b037ee913226")}</span>
        </button>

        <button
          type="button"
          onClick={() => onCheckIn(student)}
          className="flex h-12 items-center justify-center gap-2 rounded-2xl text-sm font-bold text-white transition-all active:scale-[0.98]"
          style={{
            background: "linear-gradient(135deg, rgb(255, 95, 160), rgb(214, 103, 255))"
          }}
        >
          <CrmIcon name="circle-check" size={15} color="currentColor" />
          <span>{t("ui.50a7f62d9dca")}</span>
        </button>
      </div>
    </div>
  );
}

export function CrmStudentsPanel({
  isOpen,
  onClose,
  onView,
  onAddClasses,
  onCheckIn,
  onAddStudent,
  onQueryChange,
  query,
  students
}) {
  const { t } = useLanguage();

  if (!isOpen) {
    return null;
  }

  return (
    <PanelShell
      title={t("ui.e161fcab4c90")}
      subtitle={t("ui.m.crm.studentsPanel.subtitle", { count: students.length })}
      onClose={onClose}
    >
      <button
        type="button"
        onClick={onAddStudent}
        className="mb-4 flex h-11 w-full items-center justify-center gap-2 rounded-2xl text-sm font-bold text-white transition-all active:scale-[0.98]"
        style={{
          background: "linear-gradient(135deg, rgb(255, 95, 160), rgb(168, 85, 247))",
          boxShadow: "0 10px 28px rgba(168, 85, 247, 0.25)"
        }}
      >
        <CrmIcon name="plus" size={15} color="currentColor" />
        <span>{t("ui.0b33b48e2541")}</span>
      </button>

      <div
        className="mb-4 flex items-center gap-2 rounded-2xl px-3"
        style={{
          height: 52,
          background: "rgba(255, 255, 255, 0.05)",
          border: `1px solid ${SURFACE_BORDER}`
        }}
      >
        <CrmIcon name="search" size={15} color={MUTED_TEXT} />
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder={t("ui.878ce0f888d2")}
          className="w-full bg-transparent text-sm text-white outline-none"
        />
      </div>

      <div className="flex flex-col gap-4">
        {students.length > 0 ? (
          students.map((student) => (
            <StudentRow
              key={student.studentId}
              student={student}
              onView={onView}
              onAddClasses={onAddClasses}
              onCheckIn={onCheckIn}
            />
          ))
        ) : (
          <div
            className="rounded-[24px] px-4 py-8 text-center"
            style={{
              background: SURFACE_BACKGROUND,
              border: `1px solid ${SURFACE_BORDER}`
            }}
          >
            <p className="text-sm font-bold text-white">{t("ui.78726cfdbcbc")}</p>
            <p className="mt-2 text-sm" style={{ color: MUTED_TEXT }}>
              {t("ui.b3c99145f027")}
            </p>
          </div>
        )}
      </div>
    </PanelShell>
  );
}
