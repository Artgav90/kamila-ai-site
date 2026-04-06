import { useEffect } from "react";
import { normalizeWeeklyScheduleTemplate } from "../../components/schedule/scheduleData";
import {
  isSupabaseConfigured
} from "../../services/supabase";
import { crmRepository, scheduleRepository } from "../../repositories/cloud";
import {
  buildTodaySchedulePreview,
  DEFAULT_WEEKLY_SCHEDULE_TEMPLATE,
  normalizeCrmState,
  saveCrmStateToStorage
} from "../../services/crmGateway";

export function useCrmGatewaySync({
  crmState,
  didCrmCloudHydrationRef,
  highlightedSection,
  isCrmCloudReady,
  lt,
  pipelineSectionRef,
  revenueSectionRef,
  setActivePanel,
  setActiveSidebarItem,
  setCrmState,
  setHighlightedSection,
  setIsCrmCloudReady,
  setSchedulePreviewItems,
  setToast,
  skipNextCloudWriteRef,
  toast
}) {
  useEffect(() => {
    saveCrmStateToStorage(crmState);
  }, [crmState]);

  useEffect(() => {
    if (!isSupabaseConfigured() || didCrmCloudHydrationRef.current) {
      setIsCrmCloudReady(true);
      return;
    }

    didCrmCloudHydrationRef.current = true;
    let isMounted = true;

    const hydrateCrmFromCloud = async () => {
      try {
        const cloudCrmState = await crmRepository.load();
        if (!isMounted || !cloudCrmState) {
          return;
        }

        setCrmState((currentState) =>
          normalizeCrmState(crmRepository.merge(currentState, cloudCrmState))
        );
      } catch (error) {
        console.error("Supabase CRM hydration failed:", error);
      } finally {
        if (isMounted) {
          setIsCrmCloudReady(true);
        }
      }
    };

    hydrateCrmFromCloud();

    return () => {
      isMounted = false;
    };
  }, [didCrmCloudHydrationRef, setCrmState, setIsCrmCloudReady]);

  useEffect(() => {
    if (!isCrmCloudReady || !isSupabaseConfigured()) {
      return;
    }

    if (skipNextCloudWriteRef.current) {
      skipNextCloudWriteRef.current = false;
      return;
    }

    crmRepository.save(crmState).catch((error) => {
      console.error("Supabase CRM sync failed:", error);
    });
  }, [crmState, isCrmCloudReady, skipNextCloudWriteRef]);

  useEffect(() => {
    let isMounted = true;
    const shouldUseDefaultTemplate = !isSupabaseConfigured();

    const hydrateSchedulePreview = async () => {
      try {
        let weeklyTemplate = shouldUseDefaultTemplate ? DEFAULT_WEEKLY_SCHEDULE_TEMPLATE : [];

        if (isSupabaseConfigured()) {
          const cloudSchedule = await scheduleRepository.load();
          if (Array.isArray(cloudSchedule?.weeklyTemplate)) {
            weeklyTemplate = normalizeWeeklyScheduleTemplate(cloudSchedule.weeklyTemplate, {
              fallbackToDefault: false
            });
          }
        }

        if (!isMounted) {
          return;
        }

        setSchedulePreviewItems(
          buildTodaySchedulePreview(weeklyTemplate, lt, {
            fallbackToDefault: shouldUseDefaultTemplate
          })
        );
      } catch (error) {
        console.error("Supabase CRM schedule preview hydration failed:", error);
      }
    };

    hydrateSchedulePreview();

    return () => {
      isMounted = false;
    };
  }, [lt, setSchedulePreviewItems]);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      return;
    }

    let isMounted = true;
    const unsubscribeCrm = crmRepository.subscribe((nextCloudCrmState) => {
      try {
        if (!isMounted || !nextCloudCrmState) {
          return;
        }

        skipNextCloudWriteRef.current = true;
        setCrmState((currentState) =>
          normalizeCrmState(crmRepository.merge(currentState, nextCloudCrmState))
        );
      } catch (error) {
        console.error("Supabase CRM realtime sync failed:", error);
      }
    });

    const unsubscribeSchedule = scheduleRepository.subscribe((cloudScheduleState) => {
      try {
        if (!isMounted) {
          return;
        }

        const shouldUseDefaultTemplate = !isSupabaseConfigured();
        const weeklyTemplate = Array.isArray(cloudScheduleState?.weeklyTemplate)
          ? normalizeWeeklyScheduleTemplate(cloudScheduleState.weeklyTemplate, {
              fallbackToDefault: false
            })
          : (shouldUseDefaultTemplate ? DEFAULT_WEEKLY_SCHEDULE_TEMPLATE : []);
        setSchedulePreviewItems(
          buildTodaySchedulePreview(weeklyTemplate, lt, {
            fallbackToDefault: shouldUseDefaultTemplate
          })
        );
      } catch (error) {
        console.error("Supabase CRM schedule realtime sync failed:", error);
      }
    });

    return () => {
      isMounted = false;
      unsubscribeCrm();
      unsubscribeSchedule();
    };
  }, [lt, setCrmState, setSchedulePreviewItems, skipNextCloudWriteRef]);

  useEffect(() => {
    if (!crmState.settings["auto-open-students"] || crmState.lastPanel === "dashboard") {
      return;
    }

    const panelIds = new Set(["students", "messages", "schedule", "reports", "settings"]);
    setActiveSidebarItem(crmState.lastPanel);

    if (panelIds.has(crmState.lastPanel)) {
      setActivePanel(crmState.lastPanel);
      return;
    }

    const sectionMap = {
      pipeline: pipelineSectionRef,
      revenue: revenueSectionRef
    };

    const sectionRef = sectionMap[crmState.lastPanel];
    if (sectionRef?.current) {
      sectionRef.current.scrollIntoView({
        behavior: "auto",
        block: "start"
      });
      setHighlightedSection(crmState.lastPanel);
    }
  }, [
    crmState.lastPanel,
    crmState.settings,
    pipelineSectionRef,
    revenueSectionRef,
    setActivePanel,
    setActiveSidebarItem,
    setHighlightedSection
  ]);

  useEffect(() => {
    if (!highlightedSection) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setHighlightedSection(null);
    }, 1400);

    return () => window.clearTimeout(timeoutId);
  }, [highlightedSection, setHighlightedSection]);

  useEffect(() => {
    if (!toast) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setToast(null);
    }, 2400);

    return () => window.clearTimeout(timeoutId);
  }, [setToast, toast]);
}
