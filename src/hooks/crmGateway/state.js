import { useDeferredValue, useRef, useState } from "react";
import {
  buildTodaySchedulePreview,
  createCrmFallbackState,
  DEFAULT_WEEKLY_SCHEDULE_TEMPLATE,
  loadCrmStateFromStorage
} from "../../services/crmGateway";
import { isSupabaseConfigured } from "../../services/supabase";

export function useCrmGatewayStateStore({ lt }) {
  const topAnchorRef = useRef(null);
  const revenueSectionRef = useRef(null);
  const pipelineSectionRef = useRef(null);
  const activitySectionRef = useRef(null);
  const didCrmCloudHydrationRef = useRef(false);
  const skipNextCloudWriteRef = useRef(false);

  const [crmState, setCrmState] = useState(() =>
    isSupabaseConfigured() ? createCrmFallbackState() : loadCrmStateFromStorage()
  );
  const [isCrmCloudReady, setIsCrmCloudReady] = useState(!isSupabaseConfigured());
  const [activePanel, setActivePanel] = useState(null);
  const [activeSidebarItem, setActiveSidebarItem] = useState("dashboard");
  const [highlightedSection, setHighlightedSection] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [studentModal, setStudentModal] = useState(null);
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);
  const [sidebarItemBeforeLogout, setSidebarItemBeforeLogout] = useState("dashboard");
  const [toast, setToast] = useState(null);
  const [schedulePreviewItems, setSchedulePreviewItems] = useState(() =>
    buildTodaySchedulePreview(
      isSupabaseConfigured() ? [] : DEFAULT_WEEKLY_SCHEDULE_TEMPLATE,
      lt,
      { fallbackToDefault: !isSupabaseConfigured() }
    )
  );
  const deferredSearchQuery = useDeferredValue(searchQuery);

  return {
    activitySectionRef,
    activePanel,
    activeSidebarItem,
    crmState,
    deferredSearchQuery,
    didCrmCloudHydrationRef,
    highlightedSection,
    isAddStudentOpen,
    isCrmCloudReady,
    isLogoutConfirmOpen,
    pipelineSectionRef,
    revenueSectionRef,
    schedulePreviewItems,
    searchQuery,
    selectedStudentId,
    setActivePanel,
    setActiveSidebarItem,
    setCrmState,
    setHighlightedSection,
    setIsAddStudentOpen,
    setIsCrmCloudReady,
    setIsLogoutConfirmOpen,
    setSchedulePreviewItems,
    setSearchQuery,
    setSelectedStudentId,
    setSidebarItemBeforeLogout,
    setStudentModal,
    setToast,
    sidebarItemBeforeLogout,
    skipNextCloudWriteRef,
    studentModal,
    toast,
    topAnchorRef
  };
}
