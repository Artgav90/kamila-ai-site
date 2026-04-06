import { useMemo, useState } from "react";
import BottomNav from "../BottomNav";
import { useLanguage } from "../../context/LanguageContext";
import heroBanner from "../../assets/home-archive/hero-banner.jpg";
import lisaKruglikova from "../../assets/home-archive/lisa-kruglikova.png";
import locationMap from "../../assets/home-archive/location-map.png";
import styleHighHeels from "../../assets/home-archive/style-high-heels.jpg";
import styleKinder from "../../assets/home-archive/style-kinder.png";
import styleLatina from "../../assets/home-archive/style-latina.png";
import styleProAmLatina from "../../assets/home-archive/style-pro-am-latina.jpg";
import styleProfKinder from "../../assets/home-archive/style-prof-kinder.png";
import HomeCommunityLinks from "./HomeCommunityLinks";
import HomeFindUsCard from "./HomeFindUsCard";
import HomeHeaderBar from "./HomeHeaderBar";
import HomeHeroBanner from "./HomeHeroBanner";
import HomeLeadDetailsSheet from "./HomeLeadDetailsSheet";
import HomePricingSection from "./HomePricingSection";
import HomeQuickActions from "./HomeQuickActions";
import HomeSectionDivider from "./HomeSectionDivider";
import HomeSectionTitle from "./HomeSectionTitle";
import HomeStyleGrid from "./HomeStyleGrid";
import HomeStudioLead from "./HomeStudioLead";

const danceStyleCards = [
  {
    key: "latina",
    image: styleLatina,
    objectPosition: "center 20%",
    overlay: "linear-gradient(rgba(255, 87, 87, 0.2) 0%, rgba(255, 87, 87, 0.8) 100%)"
  },
  {
    key: "kinder",
    image: styleKinder,
    objectPosition: "center 30%",
    overlay: "linear-gradient(rgba(168, 85, 247, 0.2) 0%, rgba(168, 85, 247, 0.8) 100%)"
  },
  {
    key: "prof-kinder",
    image: styleProfKinder,
    objectPosition: "center 15%",
    overlay: "linear-gradient(rgba(245, 158, 11, 0.2) 0%, rgba(245, 158, 11, 0.8) 100%)"
  },
  {
    key: "high-heels",
    image: styleHighHeels,
    overlay: "linear-gradient(rgba(255, 45, 120, 0.2) 0%, rgba(255, 45, 120, 0.8) 100%)"
  },
  {
    key: "pro-am",
    image: styleProAmLatina,
    overlay: "linear-gradient(rgba(249, 115, 22, 0.2) 0%, rgba(249, 115, 22, 0.8) 100%)"
  },
  {
    key: "coming-soon",
    overlay: "linear-gradient(rgba(255, 95, 160, 0.2) 0%, rgba(255, 95, 160, 0.8) 100%)"
  }
];

function HomePhoneShell() {
  const { t } = useLanguage();
  const [isLeadSheetOpen, setIsLeadSheetOpen] = useState(false);

  const danceStyles = useMemo(
    () =>
      danceStyleCards.map((card) => ({
        ...card,
        label:
          card.key === "latina"
            ? t("ui.d84385b76308")
            : card.key === "kinder"
              ? t("ui.8c04be4c280a")
              : card.key === "prof-kinder"
                ? t("ui.5474a362cb3d")
                : card.key === "high-heels"
                  ? "HIGH HEELS"
                  : card.key === "pro-am"
                    ? "PRO-AM LATINA"
                    : t("ui.f8ea10f2707e")
      })),
    [t]
  );

  const pricingPlans = useMemo(
    () => [
      {
        theme: "pink",
        icon: "lady",
        title: t("ui.f370d6ccd5a3"),
        subtitle: t("ui.e274a0f79f8e"),
        trialPrice: "15€",
        oneOffPrice: "20€",
        bundleOptions: [
          { label: t("ui.e9728f62b7bb"), badge: "12€/Stunde", price: "60€" },
          { label: t("ui.933be539a72d"), badge: "11€/Stunde", price: "90€" },
          { label: t("ui.8b24d02aadf2"), price: "119€" }
        ]
      },
      {
        theme: "violet",
        icon: "kinder",
        title: t("ui.95735930b3fe"),
        subtitle: t("ui.8dab42187f40"),
        trialPrice: "10€",
        oneOffPrice: "15€",
        bundleOptions: [
          { label: t("ui.e9728f62b7bb"), badge: "10€/Stunde", price: "50€" },
          { label: t("ui.8b24d02aadf2"), price: "90€" }
        ]
      }
    ],
    [t]
  );

  const communityLinks = useMemo(
    () => [
      {
        title: "Lisa Kruglikova",
        subtitle: "@lisa_kruglikova",
        href: "https://instagram.com/lisa_kruglikova",
        background: "rgba(255, 95, 160, 0.14)",
        color: "rgb(255, 95, 160)",
        type: "instagram"
      },
      {
        title: "Top Dance",
        subtitle: "@top.dance.team",
        href: "https://instagram.com/top.dance.team",
        background: "rgba(168, 85, 247, 0.14)",
        color: "rgb(168, 85, 247)",
        type: "instagram"
      },
      {
        title: t("ui.7c04d0975843"),
        subtitle: "top.dance.team81@gmail.com",
        href: "mailto:top.dance.team81@gmail.com",
        background: "rgba(10, 132, 255, 0.14)",
        color: "rgb(10, 132, 255)",
        type: "mail"
      }
    ],
    [t]
  );

  const locationRows = useMemo(
    () => [
      {
        label: t("ui.bc849693a33c"),
        value: "Allersberger Str. 185, Nürnberg",
        icon: "pin",
        iconBackground: "rgba(255, 95, 160, 0.15)",
        iconColor: "#FF5FA0"
      },
      {
        label: t("ui.238259ae9fde"),
        value: t("ui.fd488822ce69"),
        icon: "text",
        iconText: "A7",
        iconBackground: "rgba(168, 85, 247, 0.15)",
        iconColor: "rgb(168, 85, 247)"
      },
      {
        label: t("ui.5f5cf935b0eb"),
        value: "+49 1511 1625135",
        icon: "phone",
        iconBackground: "rgba(48, 209, 88, 0.15)",
        iconColor: "#30D158",
        valueColor: "rgb(48, 209, 88)",
        href: "tel:+4915111625135"
      },
      {
        label: t("ui.7c04d0975843"),
        value: "top.dance.team81@gmail.com",
        icon: "mail",
        iconBackground: "rgba(10, 132, 255, 0.15)",
        iconColor: "#0A84FF",
        valueColor: "rgb(10, 132, 255)",
        href: "mailto:top.dance.team81@gmail.com"
      },
      {
        label: "Instagram",
        value: "@lisa_kruglikova · @top.dance.team",
        icon: "at",
        iconBackground: "rgba(255, 95, 160, 0.15)",
        iconColor: "#FF5FA0",
        valueColor: "rgb(255, 95, 160)",
        href: "https://instagram.com/top.dance.team"
      }
    ],
    [t]
  );

  return (
    <div
      className="relative flex h-[100dvh] w-full flex-col overflow-hidden sm:h-[844px] sm:w-[390px] sm:rounded-[44px] sm:shadow-[0_40px_80px_rgba(0,0,0,0.6)]"
      style={{ background: "rgb(9, 9, 14)" }}
    >
      <div className="relative hidden h-[50px] shrink-0 sm:block">
        <div className="absolute left-1/2 top-2 hidden h-[34px] w-[120px] -translate-x-1/2 rounded-full bg-black sm:block" />
      </div>

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <div className="h-full overflow-y-auto bg-[#09090e]">
          <HomeHeaderBar />
          <HomeHeroBanner image={heroBanner} />
          <HomeSectionDivider />

          <section className="mb-5 px-5">
            <HomeSectionTitle
              title={t("ui.a2d967fdebfd")}
              actionLabel={t("ui.52d08a0a2bd6")}
              actionTo="/schedule"
            />
            <HomeStyleGrid items={danceStyles} />
          </section>

          <HomeSectionDivider reverse />
          <HomePricingSection plans={pricingPlans} />
          <HomeSectionDivider reverse />
          <HomeStudioLead
            image={lisaKruglikova}
            onOpenDetails={() => setIsLeadSheetOpen(true)}
          />
          <HomeSectionDivider reverse />
          <HomeCommunityLinks items={communityLinks} />
          <HomeSectionDivider />
          <HomeFindUsCard mapImage={locationMap} rows={locationRows} />
          <HomeQuickActions />
        </div>
      </div>

      <BottomNav />
      <HomeLeadDetailsSheet
        image={lisaKruglikova}
        isOpen={isLeadSheetOpen}
        onClose={() => setIsLeadSheetOpen(false)}
      />
    </div>
  );
}

export default HomePhoneShell;
