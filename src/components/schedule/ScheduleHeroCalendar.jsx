import { useRef } from "react";
import heroCouple from "../../assets/schedule-archive/hero-couple.jpg";
import { useLanguage } from "../../context/LanguageContext";
import { buildScheduleDays, getMonthMeta, getWeekdayLabels } from "./scheduleData";

function ChevronIcon({ direction = "left" }) {
  const path = direction === "left" ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6";

  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[15px] w-[15px]" aria-hidden="true">
      <path
        d={path}
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ScheduleHeroCalendar({
  currentMonthDate,
  selectedDate,
  activeFilter,
  scheduleEntriesByDate,
  onPreviousMonth,
  onNextMonth,
  onSelectDate
}) {
  const { language, locale, t } = useLanguage();
  const swipeStartRef = useRef({ x: 0, y: 0 });
  const monthMeta = getMonthMeta(currentMonthDate, locale);
  const weekdayLabels = getWeekdayLabels(language);
  const scheduleDays = buildScheduleDays(
    currentMonthDate,
    selectedDate,
    activeFilter,
    scheduleEntriesByDate
  );

  const handleTouchStart = (event) => {
    const firstTouch = event.touches?.[0];
    if (!firstTouch) {
      return;
    }

    swipeStartRef.current = {
      x: firstTouch.clientX,
      y: firstTouch.clientY
    };
  };

  const handleTouchEnd = (event) => {
    const firstTouch = event.changedTouches?.[0];
    if (!firstTouch) {
      return;
    }

    const deltaX = firstTouch.clientX - swipeStartRef.current.x;
    const deltaY = firstTouch.clientY - swipeStartRef.current.y;
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);

    if (absX < 48 || absX < absY * 1.2) {
      return;
    }

    if (deltaX < 0) {
      onNextMonth();
      return;
    }

    onPreviousMonth();
  };

  return (
    <div className="mb-4 px-4 pt-2">
      <div
        className="overflow-hidden rounded-[24px] border"
        style={{
          borderColor: "rgba(255, 255, 255, 0.07)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)"
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative h-[322px]">
          <img
            src={heroCouple}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-[center_top] grayscale"
            draggable="false"
          />

          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(rgba(10, 5, 30, 0.42) 0%, rgba(10, 5, 30, 0.65) 50%, rgba(10, 5, 30, 0.85) 100%)"
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(255, 95, 160, 0.13) 0%, rgba(168, 85, 247, 0.13) 100%)"
            }}
          />

          <div className="absolute top-3 left-4 right-4 z-10">
            <div className="flex items-center justify-between">
              <button
                type="button"
                aria-label={t("ui.64d6cdcdd444")}
                className="flex h-8 w-8 items-center justify-center rounded-full transition-all active:scale-90"
                onClick={onPreviousMonth}
                style={{
                  background: "rgba(255, 255, 255, 0.15)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)"
                }}
              >
                <ChevronIcon direction="left" />
              </button>

              <div className="flex flex-col items-center gap-0.5">
                <span
                  className="text-[18px] font-black text-white"
                  style={{ textShadow: "0 1px 8px rgba(0, 0, 0, 0.5)" }}
                >
                  {monthMeta.month}
                </span>
                <span className="text-[11px] font-bold text-white/65">{monthMeta.year}</span>
              </div>

              <button
                type="button"
                aria-label={t("ui.743e2fa33173")}
                className="flex h-8 w-8 items-center justify-center rounded-full transition-all active:scale-90"
                onClick={onNextMonth}
                style={{
                  background: "rgba(255, 255, 255, 0.15)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)"
                }}
              >
                <ChevronIcon direction="right" />
              </button>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 px-4 pb-4 pt-20">
            <div className="mb-1 grid grid-cols-7">
              {weekdayLabels.map(({ label, weekend }, index) => (
                <div key={`${label}-${index}-${weekend ? "w" : "d"}`} className="flex h-5 items-center justify-center">
                  <span
                    className="text-[10px] font-black"
                    style={{ color: weekend ? "rgba(255, 160, 200, 0.9)" : "rgba(255, 255, 255, 0.55)" }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-y-0.5">
              {scheduleDays.map((day) => {
                const labelColor = day.outsideMonth
                  ? "rgba(255, 255, 255, 0.18)"
                  : day.selected
                    ? "rgb(255, 255, 255)"
                    : day.filteredOut
                      ? "rgba(255, 255, 255, 0.35)"
                    : day.weekend
                      ? "rgba(255, 160, 200, 0.9)"
                      : "rgba(255, 255, 255, 0.9)";

                return (
                  <button
                    key={day.id}
                    type="button"
                    disabled={day.outsideMonth}
                    className="flex flex-col items-center rounded-xl py-0 transition-all active:scale-90"
                    onClick={() => onSelectDate(day.date)}
                    style={
                      day.selected
                        ? {
                            background: "linear-gradient(145deg, rgb(255, 95, 160), rgb(168, 85, 247))",
                            boxShadow: "0 2px 10px rgba(168, 85, 247, 0.6)"
                          }
                        : {
                            background: "none",
                            boxShadow: "none",
                            cursor: day.outsideMonth ? "default" : "pointer",
                            opacity: day.filteredOut ? 0.5 : 1
                          }
                    }
                  >
                    <div className="flex h-7 w-7 items-center justify-center rounded-full">
                      <span
                        className="text-[11px] font-black"
                        style={{
                          color: labelColor,
                          fontVariantNumeric: "tabular-nums"
                        }}
                      >
                        {day.label}
                      </span>
                    </div>

                    <div className="flex h-1 items-center gap-0.5">
                      {day.dots.map((dotColor, dotIndex) => (
                        <div
                          key={`${day.label}-${dotColor}-${dotIndex}`}
                          className="h-1 w-1 rounded-full"
                          style={{ background: dotColor }}
                        />
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScheduleHeroCalendar;
