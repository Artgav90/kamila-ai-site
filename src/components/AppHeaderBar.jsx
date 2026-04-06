import { useLanguage } from "../context/LanguageContext";

function AppHeaderBar() {
  const { language, setLanguage } = useLanguage();
  const isRuActive = language === "ru";
  const isDeActive = language === "de";

  return (
    <div
      className="sticky top-0 z-30 shrink-0"
      style={{
        paddingTop: "env(safe-area-inset-top, 0px)",
        background: "rgba(9, 9, 14, 0.72)",
        backdropFilter: "blur(32px) saturate(180%)",
        WebkitBackdropFilter: "blur(32px) saturate(180%)"
      }}
    >
      <div
        className="flex h-[54px] items-center justify-between px-5"
        style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.07)" }}
      >
        <span
          className="select-none text-[17px] font-black uppercase tracking-[0.18em]"
          style={{
            background: "linear-gradient(90deg, rgb(255, 95, 160), rgb(168, 85, 247))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          TOP.DANCE
        </span>

        <div
          className="flex items-center gap-[2px] rounded-xl p-[3px]"
          style={{
            background: "rgba(255, 255, 255, 0.07)",
            border: "1px solid rgba(255, 255, 255, 0.1)"
          }}
        >
          <button
            type="button"
            onClick={() => setLanguage("ru")}
            className="flex h-7 w-9 items-center justify-center rounded-[9px] text-[12px] font-black tracking-wide text-white transition-all active:scale-90"
            style={
              isRuActive
                ? {
                    background: "linear-gradient(135deg, rgb(255, 95, 160), rgb(168, 85, 247))",
                    boxShadow: "0 2px 10px rgba(255, 95, 160, 0.45)"
                  }
                : { color: "rgba(255, 255, 255, 0.4)" }
            }
          >
            RU
          </button>
          <button
            type="button"
            onClick={() => setLanguage("de")}
            className="flex h-7 w-9 items-center justify-center rounded-[9px] text-[12px] font-black tracking-wide transition-all active:scale-90"
            style={
              isDeActive
                ? {
                    color: "rgb(255, 255, 255)",
                    background: "linear-gradient(135deg, rgb(255, 95, 160), rgb(168, 85, 247))",
                    boxShadow: "0 2px 10px rgba(255, 95, 160, 0.45)"
                  }
                : { color: "rgba(255, 255, 255, 0.4)" }
            }
          >
            DE
          </button>
        </div>
      </div>
    </div>
  );
}

export default AppHeaderBar;
