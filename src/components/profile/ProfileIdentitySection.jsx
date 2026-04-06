import { useRef, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { profileIdentity } from "./profileData";
import { CameraIcon } from "./ProfileIcons";

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ""));
    reader.onerror = () => reject(new Error("Avatar file read failed"));
    reader.readAsDataURL(file);
  });
}

function optimizeAvatarDataUrl(dataUrl, { maxSize = 512, quality = 0.82 } = {}) {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => {
      const sourceWidth = image.naturalWidth || image.width;
      const sourceHeight = image.naturalHeight || image.height;
      if (!sourceWidth || !sourceHeight) {
        resolve(dataUrl);
        return;
      }

      const scale = Math.min(1, maxSize / Math.max(sourceWidth, sourceHeight));
      const targetWidth = Math.max(1, Math.round(sourceWidth * scale));
      const targetHeight = Math.max(1, Math.round(sourceHeight * scale));
      const canvas = document.createElement("canvas");
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      const context = canvas.getContext("2d");
      if (!context) {
        resolve(dataUrl);
        return;
      }

      context.drawImage(image, 0, 0, targetWidth, targetHeight);
      resolve(canvas.toDataURL("image/jpeg", quality));
    };

    image.onerror = () => resolve(dataUrl);
    image.src = dataUrl;
  });
}

function ProfileIdentitySection({ identity = profileIdentity, onAvatarChange }) {
  const { lt, t } = useLanguage();
  const fileInputRef = useRef(null);
  const [avatarError, setAvatarError] = useState("");
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const avatarSrc = String(identity?.avatar ?? "").trim();

  const initials = String(identity?.name ?? "")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((chunk) => chunk.charAt(0).toUpperCase())
    .join("") || "TD";

  const openFilePicker = () => {
    if (isUploadingAvatar) {
      return;
    }

    fileInputRef.current?.click();
  };

  const handleAvatarChange = async (event) => {
    const nextFile = event.target.files?.[0];

    if (!nextFile) {
      return;
    }

    if (!nextFile.type.startsWith("image/")) {
      setAvatarError(lt("Выберите изображение.", "Waehle ein Bild aus."));
      event.target.value = "";
      return;
    }

    setIsUploadingAvatar(true);
    setAvatarError("");

    try {
      const rawDataUrl = await readFileAsDataUrl(nextFile);
      const optimizedDataUrl = await optimizeAvatarDataUrl(rawDataUrl);
      const result = await onAvatarChange?.(optimizedDataUrl);

      if (result?.status && result.status !== "success") {
        throw new Error(result.message ?? "Avatar update failed");
      }
    } catch (error) {
      console.error("Avatar upload failed:", error);
      setAvatarError(
        lt("Не удалось обновить аватарку. Попробуйте еще раз.", "Avatar konnte nicht aktualisiert werden. Bitte erneut versuchen.")
      );
    } finally {
      setIsUploadingAvatar(false);
      event.target.value = "";
    }
  };

  return (
    <section className="flex flex-col items-center py-6">
      <div className="relative mb-3">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleAvatarChange}
        />

        <button
          type="button"
          onClick={openFilePicker}
          className="block rounded-full transition-all active:scale-95"
          disabled={isUploadingAvatar}
        >
          <div
            className="h-24 w-24 overflow-hidden rounded-full"
            style={{
              boxShadow: "0 0 0 3px rgb(255, 214, 0), 0 0 20px rgba(255, 214, 0, 0.3)"
            }}
          >
            {avatarSrc ? (
              <img src={avatarSrc} alt={identity.name} className="h-full w-full object-cover" />
            ) : (
              <div
                className="flex h-full w-full items-center justify-center text-xl font-black text-white"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255, 95, 160, 0.32), rgba(168, 85, 247, 0.32))"
                }}
              >
                {initials}
              </div>
            )}
          </div>
        </button>

        <button
          type="button"
          aria-label={t("ui.4535b9133460")}
          onClick={openFilePicker}
          className="absolute right-0 bottom-0 flex h-7 w-7 items-center justify-center rounded-full transition-all active:scale-90"
          disabled={isUploadingAvatar}
          style={{
            background: "linear-gradient(135deg, rgb(255, 95, 160), rgb(168, 85, 247))",
            boxShadow: "0 2px 10px rgba(168, 85, 247, 0.5)",
            border: "2px solid rgb(9, 9, 14)"
          }}
        >
          <CameraIcon />
        </button>
      </div>

      {avatarError ? (
        <p className="mb-2 text-center text-[11px] font-medium text-rose-300">{avatarError}</p>
      ) : null}
      <h2 className="text-2xl font-black text-white">{identity.name}</h2>
      <p className="mt-0.5 text-sm text-white/45">{identity.email}</p>

      <div
        className="mt-2 flex items-center gap-2 rounded-full px-3 py-1.5"
        style={{
          background: "rgba(255, 214, 0, 0.15)",
          border: "1px solid rgba(255, 214, 0, 0.25)"
        }}
      >
        <span className="text-sm">{identity.badgeEmoji}</span>
        <span className="text-xs font-bold" style={{ color: "rgb(255, 214, 0)" }}>
          {identity.badgeLabel}
        </span>
      </div>
    </section>
  );
}

export default ProfileIdentitySection;
