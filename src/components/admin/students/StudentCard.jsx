import {
  EyeIcon,
  PlusIcon,
  UserCheckIcon
} from "./StudentManagementIcons";
import { useLanguage } from "../../../context/LanguageContext";
import { tierStyles } from "./studentsData";

function StudentActionButton({ label, icon, style, onClick }) {
  return (
    <button
      type="button"
      className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-xl text-xs font-bold transition-all active:scale-95"
      onClick={onClick}
      style={style}
    >
      {icon}
      {label}
    </button>
  );
}

function getTierStyle(tier) {
  return tierStyles[tier] ?? {
    background: "rgba(255, 255, 255, 0.12)",
    color: "rgb(255, 255, 255)"
  };
}

function StudentCard({ student, onView, onAddClasses, onCheckIn }) {
  const { t } = useLanguage();
  const tierStyle = getTierStyle(student.tier);
  const avatarSrc = String(student.avatar ?? "").trim();
  const studentInitials = String(student.name ?? "")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");

  return (
    <article
      className="rounded-2xl p-4"
      style={{
        background: "rgb(19, 19, 31)",
        border: "1px solid rgba(255, 255, 255, 0.07)"
      }}
    >
      <div className="mb-3 flex items-center gap-3">
        <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-full">
          {avatarSrc ? (
            <img src={avatarSrc} alt={student.name} className="h-full w-full object-cover" />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center bg-white/10 text-xs font-bold text-white"
              aria-hidden="true"
            >
              {studentInitials || "TD"}
            </div>
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="text-sm font-bold text-white">{student.name}</p>
            <span
              className="rounded-full px-1.5 py-0.5 text-[10px] font-bold"
              style={tierStyle}
            >
              {student.tier}
            </span>
          </div>

          <p
            className="mt-0.5 text-xs"
            style={{ color: "rgba(255, 255, 255, 0.45)" }}
          >
            {student.email}
          </p>
        </div>

        <div className="flex flex-col items-end">
          <span
            className="text-lg font-black"
            style={{ color: student.classesColor }}
          >
            {student.classesCount}
          </span>
          <span
            className="text-[10px]"
            style={{ color: "rgba(255, 255, 255, 0.45)" }}
          >
            {t("ui.e5a2e81e413d")}
          </span>
        </div>
      </div>

      <div className="flex gap-2">
        <StudentActionButton
          label={t("ui.aaba7918b8e4")}
          icon={<EyeIcon />}
          onClick={() => onView?.(student)}
          style={{
            background: "rgba(255, 95, 160, 0.1)",
            color: "rgb(255, 95, 160)"
          }}
        />
        <StudentActionButton
          label={t("ui.b037ee913226")}
          icon={<PlusIcon />}
          onClick={() => onAddClasses?.(student)}
          style={{
            background: "rgba(168, 85, 247, 0.1)",
            color: "rgb(168, 85, 247)"
          }}
        />
        <StudentActionButton
          label={t("ui.50a7f62d9dca")}
          icon={<UserCheckIcon />}
          onClick={() => onCheckIn?.(student)}
          style={{
            background:
              "linear-gradient(135deg, rgb(255, 95, 160), rgb(168, 85, 247))",
            color: "rgb(255, 255, 255)"
          }}
        />
      </div>
    </article>
  );
}

export default StudentCard;
