import { AtSignIcon, ChevronRightIcon, MailIcon, MapPinIcon, NavigationIcon, PhoneIcon } from "./HomeIcons";
import { useLanguage } from "../../context/LanguageContext";

function HomeFindUsCard({ mapImage, rows }) {
  const { t } = useLanguage();

  return (
    <section className="mb-5 px-5">
      <h3 className="mb-3 text-base font-bold text-white">{t("ui.cbe74e12e649")}</h3>

      <div
        className="relative overflow-hidden rounded-[32px]"
        style={{
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(40px) saturate(180%)",
          WebkitBackdropFilter: "blur(40px) saturate(180%)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          boxShadow: "0 14px 36px rgba(0, 0, 0, 0.42), inset 0 1px 0 rgba(255, 255, 255, 0.07)"
        }}
      >
        <div className="relative h-[210px]">
          <img src={mapImage} alt={t("ui.f8ca47516e04")} className="h-full w-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.35) 100%)" }} />

          <div className="absolute bottom-4 right-4">
            <a
              href="https://maps.app.goo.gl/example"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-2xl px-4 py-2.5 text-white transition-all active:scale-95"
              style={{
                background: "linear-gradient(135deg, rgba(255, 95, 160, 0.96), rgba(168, 85, 247, 0.96))",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                boxShadow: "0 8px 20px rgba(255, 95, 160, 0.36), inset 0 1px 0 rgba(255, 255, 255, 0.24)"
              }}
            >
              <NavigationIcon />
              <span className="text-xs font-black uppercase tracking-[0.1em]">{t("ui.29108adc4094")}</span>
            </a>
          </div>
        </div>

        <div className="h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.12), transparent)" }} />

        <div className="flex flex-col gap-0 px-5 py-4">
          {rows.map((row, index) => (
            <div key={row.label}>
              <div className="flex items-center gap-3 py-3">
                <div
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl"
                  style={{ background: row.iconBackground, color: row.iconColor }}
                >
                  {row.icon === "pin" ? <MapPinIcon color="currentColor" /> : null}
                  {row.icon === "phone" ? <PhoneIcon color="currentColor" /> : null}
                  {row.icon === "mail" ? <MailIcon color="currentColor" size={15} strokeWidth={2} /> : null}
                  {row.icon === "at" ? <AtSignIcon color="currentColor" /> : null}
                  {row.icon === "text" ? <span className="text-xs font-bold">{row.iconText}</span> : null}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="mb-0.5 text-[11px]" style={{ color: "rgba(255, 255, 255, 0.45)" }}>
                    {row.label}
                  </p>
                  <p className="truncate text-sm font-semibold" style={{ color: row.valueColor ?? "rgb(255, 255, 255)" }}>
                    {row.value}
                  </p>
                </div>

                {row.href ? (
                  <a
                    href={row.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full"
                    style={{ background: "rgba(255, 255, 255, 0.06)" }}
                    aria-label={row.label}
                  >
                    <ChevronRightIcon size={12} color="rgba(255,255,255,0.45)" />
                  </a>
                ) : null}
              </div>

              {index < rows.length - 1 ? <div className="ml-11 h-px bg-white/[0.06]" /> : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomeFindUsCard;
