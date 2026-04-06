import { useLanguage } from "../../context/LanguageContext";

function ScheduleClassCard({
  type,
  duration,
  start,
  end,
  availability,
  availabilityColor,
  progress,
  progressBackground,
  booked = false,
  onBook
}) {
  const { t } = useLanguage();
  const typeLabel =
    type === "KINDER"
      ? t("ui.64b45db8474e")
      : type === "PROF KINDER"
        ? t("ui.35f4bafbf430")
        : type;

  return (
    <article
      className="relative overflow-hidden rounded-2xl border"
      style={{
        background: "linear-gradient(145deg, rgb(30, 10, 56) 0%, rgb(26, 11, 48) 40%, rgb(32, 13, 58) 100%)",
        borderColor: "rgba(255, 95, 160, 0.11)"
      }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 0% 0%, rgba(255, 95, 160, 0.1) 0%, transparent 70%), radial-gradient(100% 80% at 100% 100%, rgba(168, 85, 247, 0.09) 0%, transparent 70%)"
        }}
      />

      <div
        className="h-px w-full"
        style={{
          background: "linear-gradient(90deg, rgba(255, 95, 160, 0.55) 0%, rgba(168, 85, 247, 0.55) 100%)"
        }}
      />

      <div className="relative p-4">
        <div className="mb-3 flex items-center justify-between">
          <span
            className="text-[10px] font-bold uppercase"
            style={{
              color: "rgba(255, 160, 210, 0.72)",
              letterSpacing: "0.1em"
            }}
          >
            {typeLabel}
          </span>
          <span
            className="text-[10px]"
            style={{
              color: "rgba(255, 255, 255, 0.28)",
              fontWeight: 500,
              letterSpacing: "0.03em"
            }}
          >
            {duration}
          </span>
        </div>

        <div className="mb-3 flex items-baseline gap-2.5">
          <span
            className="text-[38px] font-[200] text-white"
            style={{
              letterSpacing: "-0.03em",
              lineHeight: 1,
              fontVariantNumeric: "tabular-nums"
            }}
          >
            {start}
          </span>

          <div className="flex items-center gap-1.5">
            <span className="text-[13px]" style={{ color: "rgba(255, 255, 255, 0.18)" }}>
              –
            </span>
            <span
              className="text-[17px] font-[300]"
              style={{
                color: "rgba(255, 255, 255, 0.58)",
                letterSpacing: "-0.02em",
                fontVariantNumeric: "tabular-nums"
              }}
            >
              {end}
            </span>
          </div>
        </div>

        <div
          className="mb-3 h-px"
          style={{
            background:
              "linear-gradient(90deg, rgba(255, 95, 160, 0.18) 0%, rgba(168, 85, 247, 0.1) 55%, transparent 100%)"
          }}
        />

        <div className="mb-3 flex items-center justify-between">
          <span
            className="text-[11px]"
            style={{
              color: availabilityColor,
              fontWeight: 500
            }}
          >
            {availability}
          </span>

          <div
            className="overflow-hidden rounded-full"
            style={{
              width: "64px",
              height: "4px",
              background: "rgba(255, 255, 255, 0.07)"
            }}
          >
            <div
              className="h-full rounded-full"
              style={{
                width: progress,
                background: progressBackground
              }}
            />
          </div>
        </div>

        <button
          type="button"
          className="w-full rounded-xl transition-all active:scale-[0.97]"
          onClick={onBook}
          style={{
            height: "42px",
            background: booked
              ? "linear-gradient(135deg, rgba(255, 95, 160, 0.34) 0%, rgba(168, 85, 247, 0.34) 100%)"
              : "linear-gradient(135deg, rgba(255, 95, 160, 0.22) 0%, rgba(168, 85, 247, 0.22) 100%)",
            border: booked ? "1px solid rgba(255, 170, 212, 0.7)" : "1px solid rgba(255, 95, 160, 0.45)",
            boxShadow: booked
              ? "inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 1px 14px rgba(255, 95, 160, 0.24)"
              : "inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 1px 8px rgba(255, 95, 160, 0.12)",
            color: booked ? "rgb(255, 225, 238)" : "rgb(255, 170, 212)",
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.08em"
          }}
        >
          {booked ? t("ui.b93d2061cb5a") : t("ui.23b66539f588")}
        </button>
      </div>
    </article>
  );
}

export default ScheduleClassCard;
