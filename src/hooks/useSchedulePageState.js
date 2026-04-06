import { useEffect, useMemo, useRef, useState } from "react";
import { isSupabaseConfigured } from "../services/supabase";
import { scheduleRepository } from "../repositories/cloud";
import {
  createScheduleEntriesByTemplate,
  DEFAULT_WEEKLY_SCHEDULE_TEMPLATE,
  getBookingKey,
  getDaysInMonth,
  getInitialScheduleDate,
  getScheduleEntriesForDate,
  isSameDay,
  normalizeWeeklyScheduleTemplate,
  scheduleFilters,
  shiftMonth
} from "../components/schedule/scheduleData";

const SCHEDULE_STORAGE_KEY = "topdance-schedule-v1";
const CALENDAR_MONTHS_AHEAD = 12;
const EMPTY_CLOUD_SCHEDULE_STATE = Object.freeze({
  activeFilter: null,
  bookedClassKeys: [],
  weeklyTemplate: []
});

function createMonthDate(year, monthIndex, day) {
  return new Date(year, monthIndex, day, 12, 0, 0, 0);
}

function findFirstDateForFilterInMonth(monthDate, filterLabel, scheduleEntriesByDate) {
  const daysInMonth = getDaysInMonth(monthDate);

  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = createMonthDate(monthDate.getFullYear(), monthDate.getMonth(), day);
    const hasFilterClasses = getScheduleEntriesForDate(date, scheduleEntriesByDate).some(
      (scheduleClass) => scheduleClass.type === filterLabel
    );

    if (hasFilterClasses) {
      return date;
    }
  }

  return null;
}

function getFallbackScheduleState(
  weeklyTemplate = DEFAULT_WEEKLY_SCHEDULE_TEMPLATE,
  options = {},
  scheduleEntriesByDate = createScheduleEntriesByTemplate(
    weeklyTemplate,
    new Date(),
    CALENDAR_MONTHS_AHEAD,
    options
  )
) {
  const fallbackDate = getInitialScheduleDate(weeklyTemplate, new Date(), options);
  return {
    selectedDate: fallbackDate,
    currentMonthDate: fallbackDate,
    activeFilter: getScheduleEntriesForDate(fallbackDate, scheduleEntriesByDate)[0]?.type ?? null,
    bookedClassKeys: [],
    weeklyTemplate
  };
}

function parseDateOrFallback(value, fallbackDate) {
  const parsedDate = new Date(value);
  return Number.isNaN(parsedDate.getTime()) ? fallbackDate : parsedDate;
}

function normalizeScheduleState(rawState, options = {}) {
  const { useRealDates = false, fallbackToDefaultTemplate = true } = options;
  const weeklyTemplate = normalizeWeeklyScheduleTemplate(rawState?.weeklyTemplate, {
    fallbackToDefault: fallbackToDefaultTemplate
  });
  const scheduleEntriesByDate = createScheduleEntriesByTemplate(
    weeklyTemplate,
    new Date(),
    CALENDAR_MONTHS_AHEAD,
    {
      fallbackToDefault: fallbackToDefaultTemplate
    }
  );
  const fallback = getFallbackScheduleState(weeklyTemplate, {
    fallbackToDefault: fallbackToDefaultTemplate
  }, scheduleEntriesByDate);
  const realDate = getInitialScheduleDate(weeklyTemplate, new Date(), {
    fallbackToDefault: fallbackToDefaultTemplate
  });

  const selectedDate = useRealDates
    ? realDate
    : parseDateOrFallback(rawState?.selectedDate, fallback.selectedDate);
  const currentMonthDate = parseDateOrFallback(
    useRealDates ? realDate : rawState?.currentMonthDate,
    useRealDates ? realDate : selectedDate
  );
  const activeFilter = typeof rawState?.activeFilter === "string" ? rawState.activeFilter : fallback.activeFilter;
  const bookedClassKeys = Array.isArray(rawState?.bookedClassKeys)
    ? rawState.bookedClassKeys.filter((item) => typeof item === "string")
    : [];

  return {
    selectedDate,
    currentMonthDate,
    activeFilter,
    bookedClassKeys,
    weeklyTemplate
  };
}

function loadScheduleState() {
  if (typeof window === "undefined") {
    return getFallbackScheduleState();
  }

  try {
    const rawValue = window.localStorage.getItem(SCHEDULE_STORAGE_KEY);
    if (!rawValue) {
      return getFallbackScheduleState();
    }

    return normalizeScheduleState(JSON.parse(rawValue), { useRealDates: true });
  } catch {
    return getFallbackScheduleState();
  }
}

function saveScheduleState(nextState) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    SCHEDULE_STORAGE_KEY,
    JSON.stringify({
      activeFilter: nextState.activeFilter,
      bookedClassKeys: nextState.bookedClassKeys,
      weeklyTemplate: nextState.weeklyTemplate
    })
  );
}

export function useSchedulePageState() {
  const isCloudMode = isSupabaseConfigured();
  const fallbackToDefaultTemplate = !isCloudMode;
  const skipNextCloudWriteRef = useRef(false);
  const initialScheduleStateRef = useRef(
    isCloudMode
      ? normalizeScheduleState(EMPTY_CLOUD_SCHEDULE_STATE, {
          useRealDates: true,
          fallbackToDefaultTemplate: false
        })
      : loadScheduleState()
  );
  const [selectedDate, setSelectedDate] = useState(() => initialScheduleStateRef.current.selectedDate);
  const [currentMonthDate, setCurrentMonthDate] = useState(
    () => initialScheduleStateRef.current.currentMonthDate
  );
  const [activeFilter, setActiveFilter] = useState(() => initialScheduleStateRef.current.activeFilter);
  const [bookedClassKeys, setBookedClassKeys] = useState(
    () => initialScheduleStateRef.current.bookedClassKeys
  );
  const [weeklyTemplate, setWeeklyTemplate] = useState(
    () => initialScheduleStateRef.current.weeklyTemplate
  );
  const [isScheduleCloudReady, setIsScheduleCloudReady] = useState(!isSupabaseConfigured());
  const didScheduleCloudHydrationRef = useRef(false);

  const scheduleEntriesByDate = useMemo(
    () =>
      createScheduleEntriesByTemplate(
        weeklyTemplate,
        new Date(),
        CALENDAR_MONTHS_AHEAD,
        {
          fallbackToDefault: fallbackToDefaultTemplate
        }
      ),
    [fallbackToDefaultTemplate, weeklyTemplate]
  );

  const scheduleClasses = getScheduleEntriesForDate(selectedDate, scheduleEntriesByDate);
  const availableFilters = scheduleFilters.filter((filterLabel) =>
    scheduleClasses.some((scheduleClass) => scheduleClass.type === filterLabel)
  );
  const visibleClasses = activeFilter
    ? scheduleClasses.filter((scheduleClass) => scheduleClass.type === activeFilter)
    : scheduleClasses;

  useEffect(() => {
    if (!activeFilter && scheduleClasses.length > 0) {
      setActiveFilter(scheduleClasses[0].type);
    }
  }, [activeFilter, scheduleClasses]);

  useEffect(() => {
    saveScheduleState({
      selectedDate,
      currentMonthDate,
      activeFilter,
      bookedClassKeys,
      weeklyTemplate
    });
  }, [activeFilter, bookedClassKeys, currentMonthDate, selectedDate, weeklyTemplate]);

  useEffect(() => {
    if (!isSupabaseConfigured() || didScheduleCloudHydrationRef.current) {
      setIsScheduleCloudReady(true);
      return;
    }

    didScheduleCloudHydrationRef.current = true;
    let isMounted = true;

    const hydrateScheduleFromCloud = async () => {
      try {
        if (!isMounted) {
          return;
        }

        const cloudScheduleState =
          (await scheduleRepository.load()) ?? EMPTY_CLOUD_SCHEDULE_STATE;
        const normalizedCloudState = normalizeScheduleState(cloudScheduleState, {
          useRealDates: true,
          fallbackToDefaultTemplate: false
        });
        setSelectedDate(normalizedCloudState.selectedDate);
        setCurrentMonthDate(normalizedCloudState.currentMonthDate);
        setActiveFilter(normalizedCloudState.activeFilter);
        setBookedClassKeys(normalizedCloudState.bookedClassKeys);
        setWeeklyTemplate(normalizedCloudState.weeklyTemplate);
      } catch (error) {
        console.error("Supabase schedule hydration failed:", error);
      } finally {
        if (isMounted) {
          setIsScheduleCloudReady(true);
        }
      }
    };

    hydrateScheduleFromCloud();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      return;
    }

    let isMounted = true;
    const unsubscribe = scheduleRepository.subscribe((cloudScheduleState) => {
      try {
        if (!isMounted) {
          return;
        }

        const normalizedCloudState = normalizeScheduleState(
          cloudScheduleState ?? EMPTY_CLOUD_SCHEDULE_STATE,
          {
            useRealDates: true,
            fallbackToDefaultTemplate: false
          }
        );

        skipNextCloudWriteRef.current = true;
        setSelectedDate(normalizedCloudState.selectedDate);
        setCurrentMonthDate(normalizedCloudState.currentMonthDate);
        setActiveFilter(normalizedCloudState.activeFilter);
        setBookedClassKeys(normalizedCloudState.bookedClassKeys);
        setWeeklyTemplate(normalizedCloudState.weeklyTemplate);
      } catch (error) {
        console.error("Supabase schedule realtime sync failed:", error);
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!isScheduleCloudReady || !isSupabaseConfigured()) {
      return;
    }

    if (skipNextCloudWriteRef.current) {
      skipNextCloudWriteRef.current = false;
      return;
    }

    scheduleRepository.save({
      activeFilter,
      bookedClassKeys,
      weeklyTemplate
    }).catch((error) => {
      console.error("Supabase schedule sync failed:", error);
    });
  }, [
    activeFilter,
    bookedClassKeys,
    isScheduleCloudReady,
    weeklyTemplate
  ]);

  const handleSelectDate = (nextDate) => {
    setSelectedDate(nextDate);
    setCurrentMonthDate(nextDate);
  };

  const handleToggleFilter = (filterLabel) => {
    setActiveFilter(filterLabel);

    const hasClassesOnSelectedDate = getScheduleEntriesForDate(
      selectedDate,
      scheduleEntriesByDate
    ).some(
      (scheduleClass) => scheduleClass.type === filterLabel
    );

    if (hasClassesOnSelectedDate) {
      return;
    }

    const firstDateWithFilter = findFirstDateForFilterInMonth(
      currentMonthDate,
      filterLabel,
      scheduleEntriesByDate
    );
    if (firstDateWithFilter && !isSameDay(firstDateWithFilter, selectedDate)) {
      setSelectedDate(firstDateWithFilter);
      setCurrentMonthDate(firstDateWithFilter);
    }
  };

  const handleToggleBooked = (classId) => {
    const bookingKey = getBookingKey(selectedDate, classId);

    setBookedClassKeys((currentKeys) =>
      currentKeys.includes(bookingKey)
        ? currentKeys.filter((currentKey) => currentKey !== bookingKey)
        : [...currentKeys, bookingKey]
    );
  };

  const handlePreviousMonth = () => {
    const nextDate = shiftMonth(currentMonthDate, -1);
    setCurrentMonthDate(nextDate);
    setSelectedDate(nextDate);
  };

  const handleNextMonth = () => {
    const nextDate = shiftMonth(currentMonthDate, 1);
    setCurrentMonthDate(nextDate);
    setSelectedDate(nextDate);
  };

  return {
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
  };
}
