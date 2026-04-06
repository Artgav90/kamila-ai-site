import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import HomeSectionTitle from "./HomeSectionTitle";
import { ChevronDownIcon, KinderIcon, LadyIcon } from "./HomeIcons";

const themes = {
  pink: {
    cardBackground: "linear-gradient(145deg, rgb(30, 15, 26) 0%, rgb(22, 14, 31) 50%, rgb(19, 13, 28) 100%)",
    cardBorder: "1px solid rgba(255, 95, 160, 0.16)",
    cardShadow: "0 8px 34px rgba(255, 95, 160, 0.12), 0 4px 16px rgba(255, 95, 160, 0.08)",
    topLine: "linear-gradient(90deg, transparent 0%, rgb(255, 95, 160) 40%, rgb(168, 85, 247) 70%, transparent 100%)",
    iconBackground: "linear-gradient(135deg, rgb(255, 95, 160) 0%, rgb(168, 85, 247) 100%)",
    iconShadow: "0 8px 20px rgba(255, 95, 160, 0.36), 0 4px 10px rgba(255, 95, 160, 0.24)",
    subtitleGradient: "linear-gradient(90deg, rgb(255, 95, 160), rgb(168, 85, 247))",
    chevronBackground: "rgba(255, 95, 160, 0.12)",
    chevronBorder: "1px solid rgba(255, 95, 160, 0.125)",
    accent: "#FF5FA0",
    separator: "linear-gradient(90deg, transparent, rgba(255, 95, 160, 0.5), rgba(255, 95, 160, 0.5), transparent)",
    rowBackground: "rgba(255, 95, 160, 0.06)",
    rowBorder: "1px solid rgba(255, 95, 160, 0.2)",
    dotBackground: "linear-gradient(135deg, rgb(255, 95, 160) 0%, rgb(168, 85, 247) 100%)",
    dotShadow: "0 0 8px rgba(255, 95, 160, 0.65)",
    priceGradient: "linear-gradient(90deg, rgb(255, 95, 160), rgb(168, 85, 247))",
    bundleBackground: "linear-gradient(145deg, rgba(255, 95, 160, 0.1) 0%, rgba(255, 95, 160, 0.07) 100%)",
    bundleBorder: "1px solid rgba(255, 95, 160, 0.3)",
    bundleHeaderBackground: "linear-gradient(90deg, rgba(255, 95, 160, 0.15), rgba(255, 95, 160, 0.1))",
    bundleHeaderBorder: "1px solid rgba(255, 95, 160, 0.2)",
    bundleMuted: "rgba(255, 95, 160, 0.376)",
    badgeColor: "rgb(255, 95, 160)",
    badgeBackground: "rgba(255, 95, 160, 0.15)",
    itemSeparator: "linear-gradient(90deg, rgba(255, 95, 160, 0.2), rgba(255, 95, 160, 0.15))",
    dashedBorder: "1.5px dashed rgba(255, 95, 160, 0.5)",
    dashedDotBorder: "1.5px dashed rgba(255, 95, 160, 0.8)"
  },
  violet: {
    cardBackground: "linear-gradient(145deg, rgb(19, 15, 30) 0%, rgb(16, 11, 28) 50%, rgb(13, 9, 26) 100%)",
    cardBorder: "1px solid rgba(168, 85, 247, 0.16)",
    cardShadow: "0 8px 34px rgba(168, 85, 247, 0.12), 0 4px 16px rgba(168, 85, 247, 0.08)",
    topLine: "linear-gradient(90deg, transparent 0%, rgb(168, 85, 247) 40%, rgb(124, 58, 237) 70%, transparent 100%)",
    iconBackground: "linear-gradient(135deg, rgb(168, 85, 247) 0%, rgb(124, 58, 237) 100%)",
    iconShadow: "0 8px 20px rgba(168, 85, 247, 0.36), 0 4px 10px rgba(168, 85, 247, 0.24)",
    subtitleGradient: "linear-gradient(90deg, rgb(168, 85, 247), rgb(124, 58, 237))",
    chevronBackground: "rgba(168, 85, 247, 0.12)",
    chevronBorder: "1px solid rgba(168, 85, 247, 0.125)",
    accent: "#A855F7",
    separator: "linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.5), rgba(168, 85, 247, 0.5), transparent)",
    rowBackground: "rgba(168, 85, 247, 0.06)",
    rowBorder: "1px solid rgba(168, 85, 247, 0.2)",
    dotBackground: "linear-gradient(135deg, rgb(168, 85, 247) 0%, rgb(124, 58, 237) 100%)",
    dotShadow: "0 0 8px rgba(168, 85, 247, 0.65)",
    priceGradient: "linear-gradient(90deg, rgb(168, 85, 247), rgb(124, 58, 237))",
    bundleBackground: "linear-gradient(145deg, rgba(168, 85, 247, 0.1) 0%, rgba(168, 85, 247, 0.07) 100%)",
    bundleBorder: "1px solid rgba(168, 85, 247, 0.3)",
    bundleHeaderBackground: "linear-gradient(90deg, rgba(168, 85, 247, 0.15), rgba(168, 85, 247, 0.1))",
    bundleHeaderBorder: "1px solid rgba(168, 85, 247, 0.2)",
    bundleMuted: "rgba(168, 85, 247, 0.376)",
    badgeColor: "rgb(168, 85, 247)",
    badgeBackground: "rgba(168, 85, 247, 0.15)",
    itemSeparator: "linear-gradient(90deg, rgba(168, 85, 247, 0.2), rgba(168, 85, 247, 0.15))",
    dashedBorder: "1.5px dashed rgba(168, 85, 247, 0.5)",
    dashedDotBorder: "1.5px dashed rgba(168, 85, 247, 0.8)"
  }
};

function PricingCard({ plan, isOpen, onToggle, t }) {
  const theme = themes[plan.theme];
  const Icon = plan.icon === "lady" ? LadyIcon : KinderIcon;

  return (
    <div
      className="relative overflow-hidden rounded-[22px]"
      style={{
        background: theme.cardBackground,
        border: theme.cardBorder,
        boxShadow: theme.cardShadow,
        transition: "0.35s cubic-bezier(0.4, 0, 0.2, 1)"
      }}
    >
      <div className="pointer-events-none absolute left-0 right-0 top-0 h-px" style={{ background: theme.topLine }} />

      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between px-4 py-4 transition-opacity active:opacity-70"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <div
            className="relative flex h-[46px] w-[46px] items-center justify-center rounded-[14px]"
            style={{
              background: theme.iconBackground,
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: theme.iconShadow
            }}
          >
            <Icon />
          </div>

          <div className="flex flex-col items-start gap-0.5">
            <span className="text-[17px] font-black leading-none tracking-tight text-white">{plan.title}</span>
            <span
              className="text-[11px] font-medium tracking-wide"
              style={{
                background: theme.subtitleGradient,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}
            >
              {plan.subtitle}
            </span>
          </div>
        </div>

        <div
          className="flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300"
          style={{
            background: theme.chevronBackground,
            border: theme.chevronBorder,
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)"
          }}
        >
          <ChevronDownIcon color={theme.accent} />
        </div>
      </button>

      <div className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="min-h-0 overflow-hidden">
          <div className="flex flex-col gap-3 px-4 pb-5">
            <div className="h-px" style={{ background: theme.separator }} />

            <div
              className="flex items-center justify-between rounded-xl px-3 py-3"
              style={{ background: theme.rowBackground, border: theme.rowBorder }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: theme.dotBackground, boxShadow: theme.dotShadow }}
                />
                <span className="text-sm font-medium text-white">{t("ui.c94126ba7fd5")}</span>
              </div>
              <span
                className="text-[17px] font-black"
                style={{
                  background: theme.priceGradient,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}
              >
                {plan.trialPrice}
              </span>
            </div>

            <div className="overflow-hidden rounded-xl" style={{ background: theme.bundleBackground, border: theme.bundleBorder }}>
              <div
                className="flex items-center gap-2 px-3 py-2"
                style={{
                  background: theme.bundleHeaderBackground,
                  borderBottom: theme.bundleHeaderBorder
                }}
              >
                <span
                  className="text-[10px] font-black uppercase tracking-[0.18em]"
                  style={{
                    background: theme.priceGradient,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                  }}
                >
                  {t("ui.35282b7b3539")}
                </span>
                <span className="text-[10px]" style={{ color: theme.bundleMuted }}>
                  {t("ui.f5661afe2c52")}
                </span>
              </div>

              <div className="flex flex-col gap-2.5 px-3 py-2.5">
                {plan.bundleOptions.map((option, index) => (
                  <div key={option.label}>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-medium text-white">{option.label}</span>
                        {option.badge ? (
                          <span
                            className="ml-2 rounded-md px-1.5 py-0.5 text-[11px] font-semibold"
                            style={{ color: theme.badgeColor, background: theme.badgeBackground }}
                          >
                            {option.badge}
                          </span>
                        ) : null}
                      </div>
                      <span
                        className="text-[17px] font-black"
                        style={{
                          background: theme.priceGradient,
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent"
                        }}
                      >
                        {option.price}
                      </span>
                    </div>
                    {index < plan.bundleOptions.length - 1 ? (
                      <div className="mt-2.5 h-px" style={{ background: theme.itemSeparator }} />
                    ) : null}
                  </div>
                ))}
              </div>
            </div>

            <div
              className="flex items-center justify-between rounded-xl px-3 py-3"
              style={{ background: theme.rowBackground, border: theme.dashedBorder }}
            >
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full" style={{ border: theme.dashedDotBorder }} />
                <span className="text-sm font-medium text-white">{t("ui.e70f04b4983e")}</span>
              </div>
              <span
                className="text-[17px] font-black"
                style={{
                  background: theme.priceGradient,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}
              >
                {plan.oneOffPrice}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HomePricingSection({ plans }) {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="mb-5 px-5">
      <HomeSectionTitle title={t("ui.f063a9c6e64c")} />
      <div className="flex flex-col gap-3">
        {plans.map((plan, index) => (
          <PricingCard
            key={plan.title}
            plan={plan}
            t={t}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex((current) => (current === index ? null : index))}
          />
        ))}
      </div>
    </section>
  );
}

export default HomePricingSection;
