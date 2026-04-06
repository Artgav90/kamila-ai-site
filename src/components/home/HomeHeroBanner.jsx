import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { QrCodeIcon } from "./HomeIcons";

function HomeHeroBanner({ image }) {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleOpenProfileQr = () => {
    navigate("/profile", { state: { focusQr: true } });
  };

  return (
    <div className="relative mx-4 mb-5 mt-4 overflow-hidden rounded-3xl" style={{ background: "rgb(13, 9, 24)" }}>
      <img src={image} alt={t("ui.e1932f2aee0b")} className="block w-full" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(rgba(13, 9, 24, 0.08) 0%, rgba(13, 9, 24, 0.18) 35%, rgba(13, 9, 24, 0.72) 65%, rgba(13, 9, 24, 0.96) 100%)"
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(135deg, rgba(255, 95, 160, 0.22) 0%, rgba(168, 85, 247, 0.18) 100%)" }}
      />

      <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center px-5 pb-4 text-center">
        <h1
          className="mb-[10px] uppercase"
          style={{
            fontFamily: '"Bebas Neue", "Arial Narrow", sans-serif',
            fontSize: "38px",
            fontWeight: 400,
            letterSpacing: "0.08em",
            lineHeight: 1,
            background: "linear-gradient(160deg, rgb(255, 255, 255) 30%, rgba(255, 200, 230, 0.9) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          REACH YOUR DANCE
        </h1>
        <p
          className="max-w-60"
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: "15px",
            fontWeight: 500,
            fontStyle: "italic",
            lineHeight: 1.4,
            letterSpacing: "0.01em",
            color: "rgba(255, 255, 255, 0.72)",
            textShadow: "0 1px 8px rgba(0, 0, 0, 0.5)"
          }}
        >
          {t("ui.d387f56a211e")}
        </p>
      </div>

      <button
        type="button"
        onClick={handleOpenProfileQr}
        className="absolute right-3 top-3 flex h-[38px] w-[38px] items-center justify-center transition-all active:scale-90"
        style={{
          borderRadius: "10px",
          background: "rgba(255, 255, 255, 0.18)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.35)",
          boxShadow: "0 2px 12px rgba(0, 0, 0, 0.2)"
        }}
        aria-label={t("ui.6c49b54db9a0")}
      >
        <QrCodeIcon />
      </button>
    </div>
  );
}

export default HomeHeroBanner;
