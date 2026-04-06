import { useMemo } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { useStudentCheckIn } from "../../context/StudentCheckInContext";

function formatCheckInTime(value, locale) {
  const date = new Date(value ?? "");
  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
}

function buildInitials(name) {
  const parts = String(name ?? "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length === 0) {
    return "ST";
  }

  return parts
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

function AdminRecentCheckIns() {
  const { locale, t } = useLanguage();
  const { adminStudentsView } = useStudentCheckIn();
  const recentCheckIns = useMemo(
    () =>
      adminStudentsView
        .filter((student) => {
          const date = new Date(student.lastCheckInAt ?? "");
          return !Number.isNaN(date.getTime());
        })
        .sort(
          (firstStudent, secondStudent) =>
            new Date(secondStudent.lastCheckInAt).getTime() -
            new Date(firstStudent.lastCheckInAt).getTime()
        )
        .slice(0, 8),
    [adminStudentsView]
  );

  return (
    <div className="mb-5 px-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-bold text-white">{t("ui.4fe0918518c2")}</h3>
        <span className="text-xs" style={{ color: "rgba(255, 255, 255, 0.45)" }}>
          {t("ui.c9b33b4dbd6f")}
        </span>
      </div>

      <div
        className="overflow-hidden rounded-2xl"
        style={{
          background: "rgb(19, 19, 31)",
          border: "1px solid rgba(255, 255, 255, 0.07)"
        }}
      >
        {recentCheckIns.length > 0 ? (
          recentCheckIns.map((student, index) => (
            <div
              key={student.studentId}
              className="flex items-center gap-3 px-4 py-3"
              style={
                index < recentCheckIns.length - 1
                  ? { borderBottom: "1px solid rgba(255, 255, 255, 0.07)" }
                  : undefined
              }
            >
              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full">
                {student.avatar ? (
                  <img src={student.avatar} alt={student.name} className="h-full w-full object-cover" />
                ) : (
                  <div
                    className="flex h-full w-full items-center justify-center text-xs font-bold text-white"
                    style={{ background: "rgba(255, 95, 160, 0.3)" }}
                  >
                    {buildInitials(student.name)}
                  </div>
                )}
              </div>

              <div className="flex-1">
                <p className="text-sm font-semibold text-white">{student.name}</p>
                <p className="text-xs" style={{ color: "rgba(255, 255, 255, 0.45)" }}>
                  {t("ui.34aa39a4c98b")}
                </p>
              </div>

              <div className="flex flex-col items-end gap-1">
                <span className="text-xs font-bold" style={{ color: "rgb(16, 185, 129)" }}>
                  {formatCheckInTime(student.lastCheckInAt, locale)}
                </span>
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ background: "rgb(16, 185, 129)" }}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="px-4 py-5 text-center text-sm" style={{ color: "rgba(255, 255, 255, 0.45)" }}>
            {t("ui.e9d0bb7bc8ca")}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminRecentCheckIns;
