import { useLanguage } from "../context/LanguageContext";
import ScheduleClassCard from "../components/schedule/ScheduleClassCard";
import ScheduleDayHeader from "../components/schedule/ScheduleDayHeader";
import ScheduleFilterPills from "../components/schedule/ScheduleFilterPills";
import ScheduleHeroCalendar from "../components/schedule/ScheduleHeroCalendar";
import { getBookingKey } from "../components/schedule/scheduleData";
import { useSchedulePageState } from "../hooks/useSchedulePageState";

function SchedulePage() {
  const { t } = useLanguage();
  const {
    currentMonthDate,
    selectedDate,
    activeFilter,
    availableFilters,
    visibleClasses,
    bookedClassKeys,
    scheduleEntriesByDate,
    handlePreviousMonth,
    handleNextMonth,
    handleSelectDate,
    handleToggleFilter,
    handleToggleBooked
  } = useSchedulePageState();

  return (
    <section
      className="-mx-4 flex flex-1 flex-col bg-[#09090e] sm:-mx-5"
      style={{ background: "rgb(9, 9, 14)" }}
    >
      <ScheduleHeroCalendar
        currentMonthDate={currentMonthDate}
        selectedDate={selectedDate}
        activeFilter={activeFilter}
        scheduleEntriesByDate={scheduleEntriesByDate}
        onPreviousMonth={handlePreviousMonth}
        onNextMonth={handleNextMonth}
        onSelectDate={handleSelectDate}
      />
      <ScheduleFilterPills
        activeFilter={activeFilter}
        availableFilters={availableFilters}
        onToggleFilter={handleToggleFilter}
      />
      <ScheduleDayHeader
        currentMonthDate={currentMonthDate}
        selectedDate={selectedDate}
      />

      <div className="flex flex-col gap-3 px-4 pb-4">
        {visibleClasses.length > 0 ? (
          visibleClasses.map((scheduleClass) => (
            <ScheduleClassCard
              key={`${scheduleClass.id}-${selectedDate.toISOString()}`}
              {...scheduleClass}
              booked={bookedClassKeys.includes(getBookingKey(selectedDate, scheduleClass.id))}
              onBook={() => handleToggleBooked(scheduleClass.id)}
            />
          ))
        ) : (
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
              {t("ui.91e575b09957")}
            </p>
            <p className="mt-2 text-sm text-white/58">
              {t("ui.42d3a7aa213e")}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default SchedulePage;
