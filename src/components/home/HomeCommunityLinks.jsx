import { ChevronRightIcon, InstagramIcon, MailIcon } from "./HomeIcons";
import { useLanguage } from "../../context/LanguageContext";

function HomeCommunityLinks({ items }) {
  const { t } = useLanguage();

  return (
    <>
      <div className="mb-3 px-5">
        <h3 className="text-base font-bold text-white">{t("ui.ed0908a552fa")}</h3>
      </div>

      <section className="mb-5 px-5">
        <div
          className="overflow-hidden rounded-[28px]"
          style={{
            background: "rgba(255, 255, 255, 0.043)",
            backdropFilter: "blur(32px) saturate(180%)",
            WebkitBackdropFilter: "blur(32px) saturate(180%)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 4px 32px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.08)"
          }}
        >
          {items.map((item, index) => {
            const isMail = item.type === "mail";

            return (
              <div key={item.title}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 px-4 py-3.5 transition-opacity active:opacity-55"
                >
                  <div
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[13px]"
                    style={{ background: item.background, color: item.color }}
                  >
                    {isMail ? <MailIcon color="currentColor" /> : <InstagramIcon color="currentColor" />}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-[15px] font-semibold leading-[1.25] text-white">{item.title}</p>
                    <p className="mt-0.5 truncate text-sm font-medium" style={{ color: item.color, opacity: 0.85 }}>
                      {item.subtitle}
                    </p>
                  </div>

                  <ChevronRightIcon color="rgba(255, 255, 255, 0.2)" />
                </a>

                {index < items.length - 1 ? <div className="mx-4 h-px bg-white/[0.07]" /> : null}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default HomeCommunityLinks;
