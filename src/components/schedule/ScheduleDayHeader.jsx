import { getDayMeta, getMonthMeta } from "./scheduleData";
import { useLanguage } from "../../context/LanguageContext";

function ScheduleDayHeader({ currentMonthDate, selectedDate }) {
  const { locale } = useLanguage();
  const dayMeta = getDayMeta(selectedDate, locale);
  const monthMeta = getMonthMeta(currentMonthDate ?? selectedDate, locale);

  return (
    <div className="mb-3 px-5">
      <p
        className="text-[13px] font-black uppercase"
        style={{
          color: "rgba(255, 95, 160, 0.75)",
          letterSpacing: "0.1em"
        }}
      >
        {dayMeta.weekday}
      </p>
      <p
        className="mt-px text-[26px] font-black text-white"
        style={{ lineHeight: 1.1 }}
      >
        {dayMeta.date}
      </p>
      <p className="mt-1 text-[12px] font-semibold uppercase text-white/50">
        {`${monthMeta.month} ${monthMeta.year}`}
      </p>
    </div>
  );
}

export default ScheduleDayHeader;
