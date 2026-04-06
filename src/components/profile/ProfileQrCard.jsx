import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { useLanguage } from "../../context/LanguageContext";
import { DownloadIcon, ShareIcon } from "./ProfileIcons";
import { profileIdentity } from "./profileData";

function ProfileQrCard({ identity = profileIdentity }) {
  const { t } = useLanguage();
  const [generatedQr, setGeneratedQr] = useState("");
  const studentId = String(identity.studentId ?? "").trim();
  const qrPayload = studentId
    ? JSON.stringify({
        studentId,
        source: "topdance-cloud",
        version: 1
      })
    : "";
  const shareUrl = studentId
    ? typeof window !== "undefined"
      ? `${window.location.origin}/check-in?studentId=${encodeURIComponent(studentId)}`
      : `topdance://check-in?studentId=${encodeURIComponent(studentId)}`
    : "";

  useEffect(() => {
    let isActive = true;
    if (!qrPayload) {
      setGeneratedQr("");
      return () => {
        isActive = false;
      };
    }

    QRCode.toDataURL(qrPayload, {
      errorCorrectionLevel: "M",
      margin: 1,
      width: 280,
      color: {
        dark: "#0F0A24",
        light: "#FFFFFF"
      }
    })
      .then((dataUrl) => {
        if (isActive) {
          setGeneratedQr(dataUrl);
        }
      })
      .catch(() => {
        if (isActive) {
          setGeneratedQr("");
        }
      });

    return () => {
      isActive = false;
    };
  }, [qrPayload]);

  const handleShareQr = async () => {
    if (!shareUrl) {
      return;
    }

    if (navigator.share) {
      try {
        await navigator.share({
          title: t("ui.8831006c15b3"),
          text: t("ui.m.profileQr.shareText", { name: identity.name }),
          url: shareUrl
        });
        return;
      } catch {
        return;
      }
    }

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(shareUrl);
    }
  };

  const handleSaveQr = () => {
    if (!generatedQr) {
      return;
    }

    const link = document.createElement("a");
    const safeStudentId = String(studentId).toLowerCase().replace(/[^a-z0-9-]/g, "-");
    link.href = generatedQr;
    link.download = `topdance-checkin-${safeStudentId || "user"}.png`;
    link.click();
  };

  return (
    <section
      id="profile-checkin-qr"
      className="mb-5 rounded-3xl p-5"
      style={{
        background: "rgb(19, 19, 31)",
        border: "1px solid rgba(255, 255, 255, 0.07)"
      }}
    >
      <h3 className="mb-4 text-center text-sm font-bold text-white">
        {t("ui.6b227febd634")}
      </h3>

      <div className="mb-4 flex justify-center">
        <div
          className="rounded-2xl p-3"
          style={{
            background: "rgb(30, 30, 48)",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)"
          }}
        >
          {generatedQr ? (
            <img
              src={generatedQr}
              alt={t("ui.m.profileQr.alt", { name: identity.name })}
              className="h-[140px] w-[140px] rounded-[8px]"
            />
          ) : (
            <div className="flex h-[140px] w-[140px] items-center justify-center rounded-[8px] bg-white/5 text-center text-[11px] font-semibold text-white/45">
              {t("ui.d1083d71cf62")}
            </div>
          )}
        </div>
      </div>

      <p className="mb-4 text-center text-xs text-white/45">
        {t("ui.d44012e3e569")}
      </p>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={handleShareQr}
          className="flex h-10 flex-1 items-center justify-center gap-2 rounded-xl text-sm font-bold transition-all active:scale-95"
          style={{
            background: "rgba(255, 95, 160, 0.12)",
            color: "rgb(255, 95, 160)"
          }}
        >
          <ShareIcon />
          {t("ui.7b1cd91e7dc9")}
        </button>

        <button
          type="button"
          onClick={handleSaveQr}
          className="flex h-10 flex-1 items-center justify-center gap-2 rounded-xl text-sm font-bold transition-all active:scale-95"
          style={{
            background: "rgba(168, 85, 247, 0.12)",
            color: "rgb(168, 85, 247)"
          }}
        >
          <DownloadIcon />
          {t("ui.3dbf1e48f3e4")}
        </button>
      </div>
    </section>
  );
}

export default ProfileQrCard;
