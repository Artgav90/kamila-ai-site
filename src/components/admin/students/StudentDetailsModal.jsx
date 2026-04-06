import { tierStyles } from "./studentsData";
import { useLanguage } from "../../../context/LanguageContext";
import StudentActionSheet from "./StudentActionSheet";

function DetailsRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5">
      <span className="text-[11px] uppercase tracking-[0.12em] text-white/35">
        {label}
      </span>
      <span className="max-w-[60%] text-right text-sm font-medium text-white/88">
        {value}
      </span>
    </div>
  );
}

function StudentDetailsModal({ student, isOpen, onClose }) {
  const { t } = useLanguage();

  if (!student) {
    return null;
  }

  const tierStyle = tierStyles[student.tier] ?? {
    background: "rgba(255, 255, 255, 0.12)",
    color: "rgb(255, 255, 255)"
  };
  const avatarSrc = String(student.avatar ?? "").trim();
  const studentInitials = String(student.name ?? "")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");

  return (
    <StudentActionSheet
      isOpen={isOpen}
      onClose={onClose}
      title={t("ui.881c5b7a6a50")}
      subtitle={t("ui.395b13002295")}
    >
      <div className="mb-4 flex items-center gap-3">
        <div className="h-16 w-16 overflow-hidden rounded-full">
          {avatarSrc ? (
            <img src={avatarSrc} alt={student.name} className="h-full w-full object-cover" />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center bg-white/10 text-sm font-bold text-white"
              aria-hidden="true"
            >
              {studentInitials || "TD"}
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="truncate text-lg font-black text-white">{student.name}</p>
            <span
              className="rounded-full px-2 py-1 text-[10px] font-bold"
              style={tierStyle}
            >
              {student.tier}
            </span>
          </div>
          <p className="mt-1 text-xs text-white/45">{student.studentId}</p>
          <p className="mt-1 text-xs text-white/58">{student.email}</p>
        </div>
      </div>

      <div
        className="mb-4 rounded-2xl border p-4"
        style={{
          borderColor: "rgba(255, 255, 255, 0.08)",
          background: "rgba(255, 255, 255, 0.04)"
        }}
      >
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-2xl bg-black/20 px-3 py-3 text-center">
            <p className="text-[10px] uppercase tracking-[0.12em] text-white/35">
              {t("ui.95b018e9c869")}
            </p>
            <p className="mt-1 text-2xl font-black text-white">{student.classesCount}</p>
          </div>
          <div className="rounded-2xl bg-black/20 px-3 py-3 text-center">
            <p className="text-[10px] uppercase tracking-[0.12em] text-white/35">
              {t("ui.6b5886dbb5a2")}
            </p>
            <p className="mt-1 text-2xl font-black text-white">{student.usedClasses}</p>
          </div>
          <div className="rounded-2xl bg-black/20 px-3 py-3 text-center">
            <p className="text-[10px] uppercase tracking-[0.12em] text-white/35">
              {t("ui.8bc9aff4a816")}
            </p>
            <p className="mt-1 text-2xl font-black text-white">{student.totalVisits}</p>
          </div>
        </div>
      </div>

      <div
        className="rounded-2xl border px-4"
        style={{
          borderColor: "rgba(255, 255, 255, 0.08)",
          background: "rgba(255, 255, 255, 0.04)"
        }}
      >
        <DetailsRow label={t("ui.5f5cf935b0eb")} value={student.phone} />
        <DetailsRow label={t("ui.927bfce026c4")} value={student.membershipLabel} />
        <DetailsRow label={t("ui.5c05280d023a")} value={student.membershipRenewal} />
        <DetailsRow label={t("ui.f5cd68d7a174")} value={String(student.monthsInClub)} />
        <DetailsRow label={t("ui.d972f46658ab")} value={student.lastCheckInLabel} />
        <DetailsRow label={t("ui.bc7ec840b5ae")} value={student.emergencyContact} />
        <DetailsRow label={t("ui.f18d5f06cc24")} value={student.emergencyPhone} />
      </div>

      <div
        className="mt-4 rounded-2xl border p-4"
        style={{
          borderColor: "rgba(255, 255, 255, 0.08)",
          background: "rgba(255, 255, 255, 0.04)"
        }}
      >
        <p className="text-[11px] uppercase tracking-[0.12em] text-white/35">
          {t("ui.61d3bf864398")}
        </p>
        <p className="mt-2 text-sm leading-6 text-white/82">{student.notes}</p>
      </div>
    </StudentActionSheet>
  );
}

export default StudentDetailsModal;
