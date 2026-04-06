export const crmSidebarMainItems = [
  { id: "dashboard", label: "Dashboard", icon: "layout-dashboard" },
  { id: "students", label: "Students", icon: "users" },
  { id: "pipeline", label: "Pipeline", icon: "target" },
  { id: "revenue", label: "Revenue", icon: "trending-up" },
  { id: "schedule", label: "Schedule", icon: "calendar" },
  { id: "messages", label: "Messages", icon: "message-square" },
  { id: "reports", label: "Reports", icon: "chart-columns" }
];

export const crmSidebarUtilityItems = [
  { id: "settings", label: "Settings", icon: "settings" },
  { id: "logout", label: "Log out", icon: "log-out" }
];

export const crmMetricCards = [
  {
    id: "monthly-revenue",
    value: "€0",
    label: "Monthly Revenue",
    note: "",
    trendLabel: "",
    trendDirection: "up",
    trendColor: "rgb(16, 185, 129)",
    icon: "dollar-sign",
    iconColor: "#A855F7",
    iconTint: "rgba(168, 85, 247, 0.15)"
  },
  {
    id: "active-students",
    value: "0",
    label: "Active Students",
    note: "",
    trendLabel: "",
    trendDirection: "up",
    trendColor: "rgb(16, 185, 129)",
    icon: "users",
    iconColor: "#FF5FA0",
    iconTint: "rgba(255, 95, 160, 0.15)"
  },
  {
    id: "checkins-today",
    value: "0",
    label: "Check-ins Today",
    note: "",
    trendLabel: "",
    trendDirection: "up",
    trendColor: "rgb(16, 185, 129)",
    icon: "activity",
    iconColor: "#10B981",
    iconTint: "rgba(16, 185, 129, 0.15)"
  },
  {
    id: "low-expired",
    value: "0",
    label: "Low / Expired",
    note: "",
    trendLabel: "",
    trendDirection: "up",
    trendColor: "rgb(239, 68, 68)",
    icon: "circle-alert",
    iconColor: "#F59E0B",
    iconTint: "rgba(245, 158, 11, 0.15)"
  }
];

export const crmRevenueChart = {
  title: "Revenue & Students",
  subtitle: "",
  yAxisTicks: [0, 1500, 3000, 4500, 6000],
  studentsDomain: [0, 100],
  series: [],
  tooltipLabelFormatter: (month) => month
};

export const crmStyleDistribution = [];

export const crmPipelineStages = [];

export const crmInitialActivities = [];

export const crmSchedulePreview = [];

export const crmSettingsSections = [
  {
    id: "notifications",
    label: "Push Notifications",
    description: "Receive CRM alerts about check-ins and low balances."
  },
  {
    id: "daily-report",
    label: "Daily Email Report",
    description: "Send an end-of-day summary to the studio inbox."
  },
  {
    id: "auto-open-students",
    label: "Remember Last Section",
    description: "Reopen the most recently used CRM section next time."
  }
];
