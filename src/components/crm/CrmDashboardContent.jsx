import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import {
  crmPipelineStages,
  crmRevenueChart,
  crmStyleDistribution
} from "./crmData";
import { useLanguage } from "../../context/LanguageContext";
import { CrmIcon } from "./CrmIcons";

const CARD_BACKGROUND = "rgb(26, 26, 46)";
const CARD_BORDER = "rgba(255, 255, 255, 0.06)";
const MUTED_TEXT = "rgba(255, 255, 255, 0.45)";
const SECONDARY_TEXT = "rgba(255, 255, 255, 0.25)";
const TOOLTIP_BACKGROUND = "rgb(19, 19, 31)";

function ChartTooltip({ active, label, payload }) {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div
      className="rounded-xl px-2.5 py-2 text-[12px] text-white"
      style={{
        background: TOOLTIP_BACKGROUND,
        border: "1px solid rgba(255, 255, 255, 0.1)"
      }}
    >
      <p className="m-0">{label}</p>
      <ul className="mt-1 space-y-1">
        {payload.map((item) => (
          <li key={item.dataKey} style={{ color: item.color }}>
            <span>{item.name}</span>
            <span className="px-1">:</span>
            <span>{item.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PieTooltip({ active, payload, t }) {
  if (!active || !payload?.length) {
    return null;
  }

  const [item] = payload;
  const itemData = item?.payload;
  if (!itemData) {
    return null;
  }

  return (
    <div
      className="rounded-xl px-2.5 py-2 text-[12px] text-white"
      style={{
        background: TOOLTIP_BACKGROUND,
        border: "1px solid rgba(255, 255, 255, 0.1)"
      }}
    >
      <p className="m-0 font-bold">
        {itemData.id === "latina"
          ? "Latina"
          : itemData.id === "high-heels"
            ? "High Heels"
            : itemData.id === "kinder"
              ? t("ui.95735930b3fe")
              : t("ui.7dcaa59a4d27")}
      </p>
      <p className="mt-1" style={{ color: itemData.color }}>
        {itemData.tooltipLabel ??
          t("ui.d1083d71cf62")}
      </p>
    </div>
  );
}

function renderActivePieShape(props) {
  const {
    cx,
    cy,
    endAngle,
    fill,
    innerRadius,
    outerRadius,
    startAngle
  } = props;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 4}
        fill={fill}
        stroke="#fff"
        strokeWidth={1}
      />
    </g>
  );
}

function SectionCard({ children, className = "", highlighted = false, sectionRef }) {
  return (
    <div
      ref={sectionRef}
      className={`rounded-2xl ${className}`}
      style={{
        background: CARD_BACKGROUND,
        border: `1px solid ${highlighted ? "rgba(255, 95, 160, 0.24)" : CARD_BORDER}`,
        boxShadow: highlighted ? "0 0 0 1px rgba(168, 85, 247, 0.18)" : "none",
        transition: "box-shadow 180ms ease, border-color 180ms ease"
      }}
    >
      {children}
    </div>
  );
}

function MetricCard({ metric, t }) {
  const metricLabel =
    metric.id === "monthly-revenue"
      ? t("ui.cd7a025664a5")
      : metric.id === "active-students"
        ? t("ui.46fa4166bd70")
        : metric.id === "checkins-today"
          ? t("ui.af9e904caca6")
          : t("ui.482e9967a005");

  return (
    <SectionCard className="flex flex-col gap-3 p-5">
      <div className="flex items-center justify-between">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl"
          style={{ background: metric.iconTint }}
        >
          <CrmIcon name={metric.icon} size={18} color={metric.iconColor} />
        </div>

        {metric.trendLabel ? (
          <span
            className="flex items-center gap-1 text-xs font-bold"
            style={{ color: metric.trendColor }}
          >
            <CrmIcon
              name={metric.trendDirection === "down" ? "arrow-down-right" : "arrow-up-right"}
              size={13}
              color="currentColor"
            />
            <span>{metric.trendLabel}</span>
          </span>
        ) : null}
      </div>

      <div>
        <p className="text-[26px] leading-none font-black text-white">{metric.value}</p>
        <p className="mt-1 text-xs font-medium text-white">{metricLabel}</p>
        {metric.note ? (
          <p className="mt-0.5 text-[11px]" style={{ color: SECONDARY_TEXT }}>
            {metric.note}
          </p>
        ) : null}
      </div>
    </SectionCard>
  );
}

function RevenueChartCard({ highlighted = false, t, sectionRef }) {
  const hasSeries = crmRevenueChart.series.length > 0;

  return (
    <SectionCard className="col-span-2 p-5" highlighted={highlighted} sectionRef={sectionRef}>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-white">{t("ui.f8ce8de5caf4")}</p>
          <p className="mt-0.5 text-xs" style={{ color: MUTED_TEXT }}>
            {t("ui.35ec72f35cba")}
          </p>
        </div>
      </div>

      {hasSeries ? (
        <div className="relative h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={crmRevenueChart.series}
              margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            >
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#A855F7" stopOpacity="0.3" />
                  <stop offset="95%" stopColor="#A855F7" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="stuGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF5FA0" stopOpacity="0.3" />
                  <stop offset="95%" stopColor="#FF5FA0" stopOpacity="0" />
                </linearGradient>
              </defs>

              <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />

              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tick={{ fill: MUTED_TEXT, fontSize: 11 }}
                dy={8}
              />

              <YAxis
                yAxisId="revenue"
                domain={[0, 6000]}
                ticks={crmRevenueChart.yAxisTicks}
                tickLine={false}
                axisLine={false}
                tick={{ fill: MUTED_TEXT, fontSize: 11 }}
                width={42}
              />

              <YAxis
                yAxisId="students"
                orientation="right"
                hide
                domain={crmRevenueChart.studentsDomain}
              />

              <Tooltip
                content={<ChartTooltip />}
                cursor={{ stroke: "#ccc", strokeWidth: 1 }}
                wrapperStyle={{ outline: "none" }}
                animationDuration={250}
              />

              <Area
                yAxisId="revenue"
                type="monotone"
                dataKey="revenue"
                name={t("ui.c146e2f2856e")}
                stroke="#A855F7"
                strokeWidth={2}
                fill="url(#revGrad)"
                fillOpacity={0.6}
                dot={false}
                activeDot={{ r: 4, fill: "#A855F7", stroke: "#fff", strokeWidth: 2 }}
                isAnimationActive
                animationDuration={900}
                animationEasing="ease-out"
              />

              <Area
                yAxisId="students"
                type="monotone"
                dataKey="students"
                name={t("ui.e161fcab4c90")}
                stroke="#FF5FA0"
                strokeWidth={2}
                fill="url(#stuGrad)"
                fillOpacity={0.6}
                dot={false}
                activeDot={false}
                isAnimationActive
                animationDuration={1000}
                animationBegin={90}
                animationEasing="ease-out"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div
          className="rounded-xl px-4 py-5 text-sm"
          style={{
            background: "rgba(255, 255, 255, 0.03)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            color: MUTED_TEXT
          }}
        >
          {t("ui.7f5299f25b88")}
        </div>
      )}
    </SectionCard>
  );
}

function StyleDistributionCard({ t }) {
  const [activeSliceIndex, setActiveSliceIndex] = useState(-1);
  const hasDistribution = crmStyleDistribution.length > 0;

  return (
    <SectionCard className="flex flex-col p-5">
      <p className="mb-0.5 text-sm font-bold text-white">{t("ui.f19c8cd6f4b5")}</p>
      <p className="mb-3 text-xs" style={{ color: MUTED_TEXT }}>
        {t("ui.e3c09f8435ba")}
      </p>

      {hasDistribution ? (
        <>
          <div className="h-[155px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip
                  content={<PieTooltip t={t} />}
                  wrapperStyle={{ outline: "none" }}
                  animationDuration={220}
                />
                <Pie
                  activeIndex={activeSliceIndex >= 0 ? activeSliceIndex : undefined}
                  activeShape={renderActivePieShape}
                  data={crmStyleDistribution}
                  dataKey="share"
                  nameKey="label"
                  cx="50%"
                  cy="50%"
                  innerRadius={42}
                  outerRadius={68}
                  startAngle={0}
                  endAngle={360}
                  stroke="#fff"
                  strokeWidth={1}
                  isAnimationActive
                  animationDuration={950}
                  animationEasing="ease-out"
                  onMouseEnter={(_, index) => setActiveSliceIndex(index)}
                  onMouseLeave={() => setActiveSliceIndex(-1)}
                >
                  {crmStyleDistribution.map((item) => (
                    <Cell key={item.id} fill={item.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-1 flex flex-col gap-1.5">
            {crmStyleDistribution.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onMouseEnter={() => setActiveSliceIndex(index)}
                onMouseLeave={() => setActiveSliceIndex(-1)}
                onFocus={() => setActiveSliceIndex(index)}
                onBlur={() => setActiveSliceIndex(-1)}
                className="flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-1.5">
                  <div
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ background: item.color }}
                  />
                    <span
                    className="text-xs transition-colors"
                    style={{
                      color:
                        activeSliceIndex === index ? "rgba(255, 255, 255, 0.92)" : MUTED_TEXT
                    }}
                    >
                      {item.id === "latina"
                        ? "Latina"
                        : item.id === "high-heels"
                          ? "High Heels"
                          : item.id === "kinder"
                            ? t("ui.95735930b3fe")
                            : t("ui.7dcaa59a4d27")}
                    </span>
                </div>
                <span className="text-xs font-bold text-white">{item.valueLabel}</span>
              </button>
            ))}
          </div>
        </>
      ) : (
        <div
          className="rounded-xl px-4 py-5 text-sm"
          style={{
            background: "rgba(255, 255, 255, 0.03)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            color: MUTED_TEXT
          }}
        >
          {t("ui.de1f596451a7")}
        </div>
      )}
    </SectionCard>
  );
}

function PipelineCard({ highlighted = false, t, sectionRef }) {
  const hasPipeline = crmPipelineStages.length > 0;

  return (
    <SectionCard className="p-5" highlighted={highlighted} sectionRef={sectionRef}>
      <p className="mb-4 text-sm font-bold text-white">{t("ui.e91e5fa3c701")}</p>
      {hasPipeline ? (
        <div className="flex flex-col gap-3">
          {crmPipelineStages.map((stage) => (
            <div key={stage.id}>
              <div className="mb-1.5 flex items-center justify-between">
                <span className="text-xs" style={{ color: MUTED_TEXT }}>
                  {stage.id === "new-leads"
                    ? t("ui.f712f0ca9bf0")
                    : stage.id === "trial-class"
                      ? t("ui.9042e7000e38")
                      : stage.id === "negotiating"
                        ? t("ui.1f494304fb58")
                        : stage.id === "converted"
                          ? t("ui.4dc7e733b331")
                          : t("ui.e7eec868b705")}
                </span>
                <span className="text-xs font-bold text-white">{stage.count}</span>
              </div>
              <div
                className="h-2 overflow-hidden rounded-full"
                style={{ background: "rgba(255, 255, 255, 0.05)" }}
              >
                <div
                  className="h-full rounded-full"
                  style={{ width: stage.width, background: stage.color }}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          className="rounded-xl px-4 py-5 text-sm"
          style={{
            background: "rgba(255, 255, 255, 0.03)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            color: MUTED_TEXT
          }}
        >
          {t("ui.f7a15c1fff48")}
        </div>
      )}
    </SectionCard>
  );
}

function RecentActivityCard({
  activities,
  highlighted = false,
  t,
  onViewAll,
  sectionRef
}) {
  return (
    <SectionCard
      className="col-span-2 p-5"
      highlighted={highlighted}
      sectionRef={sectionRef}
    >
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-bold text-white">{t("ui.a03b4af1ef99")}</p>
        <button
          type="button"
          onClick={onViewAll}
          className="text-xs font-medium"
          style={{ color: "rgb(255, 95, 160)" }}
        >
          {t("ui.8464a5dc122a")}
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {activities.length > 0 ? (
          activities.slice(0, 7).map((activity) => (
            <div key={activity.id} className="flex items-start gap-3">
              <div
                className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                style={{ background: activity.tint ?? "rgba(255, 255, 255, 0.094)" }}
              >
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ background: activity.color }}
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs leading-snug text-white">{activity.text}</p>
                <p className="mt-0.5 text-[11px]" style={{ color: SECONDARY_TEXT }}>
                  {activity.time}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div
            className="rounded-xl px-4 py-5 text-sm"
            style={{
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              color: MUTED_TEXT
            }}
          >
            {t("ui.5ecaf2816d67")}
          </div>
        )}
      </div>
    </SectionCard>
  );
}

function CrmDashboardContent({
  activities,
  highlightedSection,
  metrics,
  onViewAll,
  topAnchorRef,
  revenueSectionRef,
  pipelineSectionRef,
  activitySectionRef
}) {
  const { t } = useLanguage();

  return (
    <main className="flex-1 overflow-y-auto p-6">
      <div className="flex flex-col gap-5">
        <div ref={topAnchorRef} />

        <div className="grid grid-cols-4 gap-4">
          {metrics.map((metric) => (
            <MetricCard key={metric.id} metric={metric} t={t} />
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4">
          <RevenueChartCard
            highlighted={highlightedSection === "revenue"}
            t={t}
            sectionRef={revenueSectionRef}
          />
          <StyleDistributionCard t={t} />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <PipelineCard
            highlighted={highlightedSection === "pipeline"}
            t={t}
            sectionRef={pipelineSectionRef}
          />
          <RecentActivityCard
            activities={activities}
            highlighted={highlightedSection === "activity"}
            t={t}
            onViewAll={onViewAll}
            sectionRef={activitySectionRef}
          />
        </div>
      </div>
    </main>
  );
}

export default CrmDashboardContent;
