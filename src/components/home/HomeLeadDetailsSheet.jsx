import { useLanguage } from "../../context/LanguageContext";

function HomeLeadDetailsSheet({ image, isOpen, onClose }) {
  const { t } = useLanguage();

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center bg-black/65 px-3 pb-0 pt-10 backdrop-blur-sm"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        className="flex max-h-full w-full max-w-[430px] flex-col overflow-hidden rounded-t-[32px] border"
        style={{
          background:
            "linear-gradient(180deg, rgba(20, 15, 34, 0.98) 0%, rgba(10, 10, 18, 0.98) 100%)",
          borderColor: "rgba(255, 255, 255, 0.1)",
          boxShadow: "0 -20px 60px rgba(0, 0, 0, 0.55)"
        }}
      >
        <div className="flex justify-center pt-3">
          <div
            className="h-1.5 w-14 rounded-full"
            style={{ background: "rgba(255, 255, 255, 0.18)" }}
          />
        </div>

        <div className="overflow-y-auto px-4 pb-[calc(24px+env(safe-area-inset-bottom))] pt-4">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <p
                className="text-[10px] font-bold uppercase tracking-[0.22em]"
                style={{ color: "rgba(255, 255, 255, 0.45)" }}
              >
                {t("ui.2f419e696168")}
              </p>
              <h3
                className="mt-2 text-[28px] font-black leading-none"
                style={{
                  background: "linear-gradient(90deg, rgb(255, 95, 160), rgb(168, 85, 247))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}
              >
                Lisa Kruglikova
              </h3>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl px-3 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-white transition-all active:scale-95"
              style={{
                background: "rgba(255, 255, 255, 0.06)",
                border: "1px solid rgba(255, 255, 255, 0.1)"
              }}
            >
              {t("ui.004a4a31b476")}
            </button>
          </div>

          <div
            className="relative overflow-hidden rounded-[28px] border"
            style={{
              borderColor: "rgba(255, 255, 255, 0.08)",
              background: "rgb(16, 12, 27)"
            }}
          >
            <div className="relative h-[312px]">
              <img
                src={image}
                alt="Lisa Kruglikova"
                className="h-full w-full object-cover object-top"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(9, 7, 18, 0.08) 0%, rgba(9, 7, 18, 0.78) 72%, rgba(9, 7, 18, 0.96) 100%)"
                }}
              />

              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="flex flex-wrap gap-2">
                  {[
                    t("ui.70acaf704840"),
                    t("ui.e141ec40a748"),
                    t("ui.63a0a2388247")
                  ].map((item) => (
                    <span
                      key={item}
                      className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white"
                      style={{
                        background: "rgba(255, 255, 255, 0.1)",
                        border: "1px solid rgba(255, 255, 255, 0.08)"
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2.5">
            {[
              {
                value: "10+",
                label: t("ui.7799cbc73e5d")
              },
              {
                value: "TOP",
                label: t("ui.c6fae6421cb4")
              },
              {
                value: "360",
                label: t("ui.abb099d8b5a3")
              }
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-[22px] px-3 py-3 text-center"
                style={{
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(255, 255, 255, 0.07)"
                }}
              >
                <p className="text-[18px] font-black text-white">{item.value}</p>
                <p className="mt-1 text-[10px] leading-4" style={{ color: "rgba(255, 255, 255, 0.55)" }}>
                  {item.label}
                </p>
              </div>
            ))}
          </div>

          <div
            className="mt-4 rounded-[28px] border p-5"
            style={{
              background:
                "linear-gradient(180deg, rgba(255, 95, 160, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)",
              borderColor: "rgba(255, 255, 255, 0.08)"
            }}
          >
            <p className="text-sm leading-7 text-white/88">
              {t("ui.fe80032da367")}
            </p>
            <p className="mt-3 text-sm leading-7 text-white/58">
              {t("ui.bf4b3577ffcc")}
            </p>
          </div>

          <div
            className="mt-4 rounded-[28px] border p-5"
            style={{
              background: "rgba(255, 255, 255, 0.03)",
              borderColor: "rgba(255, 255, 255, 0.08)"
            }}
          >
            <p
              className="text-[10px] font-bold uppercase tracking-[0.2em]"
              style={{ color: "rgba(255, 95, 160, 0.88)" }}
            >
              {t("ui.6ba874d02f61")}
            </p>
            <div className="mt-3 space-y-3">
              {[
                t("ui.5bed7a1ad79e"),
                t("ui.a73fad04ce5b"),
                t("ui.218fdc32de8c")
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div
                    className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{
                      background:
                        "linear-gradient(135deg, rgb(255, 95, 160), rgb(168, 85, 247))"
                    }}
                  />
                  <p className="text-sm leading-6 text-white/72">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomeLeadDetailsSheet;
