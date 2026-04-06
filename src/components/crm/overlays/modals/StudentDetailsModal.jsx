import { useLanguage } from "../../../../context/LanguageContext";
import { tierStyles } from "../../../admin/students/studentsData";
import {
  MUTED_TEXT,
  ModalShell,
  SURFACE_BACKGROUND,
  SURFACE_BORDER
} from "../shared";

export function CrmStudentDetailsModal({ isOpen, onClose, student }) {
  const { t } = useLanguage();

  if (!isOpen || !student) {
    return null;
  }

  const tierStyle = tierStyles[student.tier] ?? {
    background: "rgba(255, 255, 255, 0.12)",
    color: "rgb(255, 255, 255)"
  };

  return (
    <ModalShell
      title={t("ui.03eecd999787")}
      subtitle={t("ui.0c9e7afae3fb")}
      onClose={onClose}
      className="max-w-[620px]"
    >
      <div className="mb-5 flex items-center gap-4">
        <div className="h-20 w-20 overflow-hidden rounded-full">
          <img src={student.avatar} alt={student.name} className="h-full w-full object-cover" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="truncate text-2xl font-black text-white">{student.name}</p>
            <span className="rounded-full px-2 py-1 text-[11px] font-bold" style={tierStyle}>
              {student.tier}
            </span>
          </div>
          <p className="mt-1 text-xs" style={{ color: MUTED_TEXT }}>
            {student.studentId}
          </p>
          <p className="mt-1 text-sm" style={{ color: "rgba(255,255,255,0.74)" }}>
            {student.email}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: t("ui.6579046ccbd6"), value: student.classesCount },
          { label: t("ui.6b5886dbb5a2"), value: student.usedClasses },
          { label: t("ui.32883c898f4f"), value: student.totalVisits }
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-2xl p-4 text-center"
            style={{
              background: SURFACE_BACKGROUND,
              border: `1px solid ${SURFACE_BORDER}`
            }}
          >
            <p className="text-[11px] uppercase tracking-[0.14em]" style={{ color: MUTED_TEXT }}>
              {item.label}
            </p>
            <p className="mt-2 text-3xl font-black text-white">{item.value}</p>
          </div>
        ))}
      </div>

      <div
        className="mt-5 rounded-2xl px-4 py-2"
        style={{
          background: SURFACE_BACKGROUND,
          border: `1px solid ${SURFACE_BORDER}`
        }}
      >
        {[
          [t("ui.5f5cf935b0eb"), student.phone],
          [t("ui.927bfce026c4"), student.membershipLabel],
          [t("ui.5c05280d023a"), student.membershipRenewal],
          [t("ui.f5cd68d7a174"), String(student.monthsInClub)],
          [t("ui.d972f46658ab"), student.lastCheckInLabel],
          [t("ui.bc7ec840b5ae"), student.emergencyContact],
          [t("ui.f18d5f06cc24"), student.emergencyPhone]
        ].map(([label, value]) => (
          <div key={label} className="flex items-start justify-between gap-5 py-3">
            <span className="text-[11px] uppercase tracking-[0.12em]" style={{ color: MUTED_TEXT }}>
              {label}
            </span>
            <span className="max-w-[62%] text-right text-sm text-white">{value}</span>
          </div>
        ))}
      </div>

      <div
        className="mt-5 rounded-2xl p-4"
        style={{
          background: SURFACE_BACKGROUND,
          border: `1px solid ${SURFACE_BORDER}`
        }}
      >
        <p className="text-[11px] uppercase tracking-[0.12em]" style={{ color: MUTED_TEXT }}>
          {t("ui.61d3bf864398")}
        </p>
        <p className="mt-2 text-sm leading-6 text-white">{student.notes}</p>
      </div>
    </ModalShell>
  );
}
