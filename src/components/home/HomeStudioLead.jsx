import { ArrowUpRightIcon } from "./HomeIcons";
import { useLanguage } from "../../context/LanguageContext";

function HomeStudioLead({ image, onOpenDetails = () => {} }) {
  const { t } = useLanguage();

  return (
    <section className="mb-5 px-5">
      <div className="overflow-hidden rounded-3xl" style={{ background: "rgb(19, 19, 31)", border: "1px solid rgba(255, 255, 255, 0.07)" }}>
        <div className="relative h-[260px]">
          <img src={image} alt="Lisa Kruglikova" className="h-full w-full object-cover object-top" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.55) 100%)" }} />
        </div>

        <div className="px-5 pb-5 pt-4">
          <h2
            className="mb-0.5 text-3xl font-black"
            style={{
              background: "linear-gradient(90deg, rgb(255, 95, 160), rgb(168, 85, 247))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            Lisa Kruglikova
          </h2>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em]" style={{ color: "rgba(255, 255, 255, 0.45)" }}>
            {t("ui.d1e5746418c6")}
          </p>
          <p className="mb-5 text-sm leading-relaxed" style={{ color: "rgba(255, 255, 255, 0.45)" }}>
            {t("ui.076aaf5a2dd3")}
          </p>

          <button
            type="button"
            onClick={onOpenDetails}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl text-sm font-bold text-white transition-all active:scale-95"
            style={{
              background: "linear-gradient(135deg, rgb(255, 95, 160), rgb(168, 85, 247))",
              boxShadow: "0 6px 24px rgba(255, 95, 160, 0.35)"
            }}
          >
            <ArrowUpRightIcon />
            {t("ui.a98cafcf50dc")}
          </button>
        </div>
      </div>
    </section>
  );
}

export default HomeStudioLead;
