import heroImage from "../../assets/home/hero-card.jpg";
import starIcon from "../../assets/home/icon-star.svg";
import { useLanguage } from "../../context/LanguageContext";

function HomeStudioHero() {
  const { lt } = useLanguage();

  return (
    <section className="relative h-[180px] overflow-hidden rounded-[24px]">
      <img src={heroImage} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-[linear-gradient(153.31deg,rgba(255,95,160,0.7)_0%,rgba(168,85,247,0.6)_100%)]" />

      <div className="absolute inset-x-5 bottom-5">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <img key={index} src={starIcon} alt="" className="h-[11px] w-[11px]" />
          ))}
          <span className="ml-[7px] text-[12px] leading-4 text-white/80">
            {lt("4.9 · 240 отзывов", "4.9 · 240 Bewertungen")}
          </span>
        </div>

        <h2 className="mt-[3px] text-[24px] font-black leading-8 tracking-[-0.02em] text-white">
          RHYTHMIA
        </h2>
        <p className="mt-[1px] text-[14px] leading-5 text-white/75">
          {lt("Танцевальная студия · c 2015", "Tanzstudio · seit 2015")}
        </p>
      </div>
    </section>
  );
}

export default HomeStudioHero;
