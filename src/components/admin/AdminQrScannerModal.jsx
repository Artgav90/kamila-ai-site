import { useCallback, useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import { useLanguage } from "../../context/LanguageContext";

const SCAN_COOLDOWN_MS = 1800;

function ScannerStatusBadge({ tone, message }) {
  const stylesByTone = {
    idle: {
      color: "rgba(255, 255, 255, 0.78)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      background: "rgba(255, 255, 255, 0.04)"
    },
    success: {
      color: "rgb(16, 185, 129)",
      border: "1px solid rgba(16, 185, 129, 0.3)",
      background: "rgba(16, 185, 129, 0.12)"
    },
    error: {
      color: "rgb(255, 95, 160)",
      border: "1px solid rgba(255, 95, 160, 0.35)",
      background: "rgba(255, 95, 160, 0.12)"
    }
  };

  return (
    <div
      className="rounded-xl px-3 py-2 text-xs font-semibold"
      style={stylesByTone[tone] ?? stylesByTone.idle}
    >
      {message}
    </div>
  );
}

function AdminQrScannerModal({ isOpen, onClose, onScanPayload }) {
  const { t } = useLanguage();
  const overlayRef = useRef(null);
  const videoRef = useRef(null);
  const scannerRef = useRef(null);
  const isLockedRef = useRef(false);
  const lastScanRef = useRef({ value: "", at: 0 });
  const [tone, setTone] = useState("idle");
  const [statusMessage, setStatusMessage] = useState(
    t("ui.b6c9d98927c5")
  );
  const [cameraReady, setCameraReady] = useState(false);
  const [manualCode, setManualCode] = useState("");

  const stopScanner = useCallback(() => {
    const activeScanner = scannerRef.current;
    scannerRef.current = null;

    if (!activeScanner) {
      return;
    }

    activeScanner.stop();
    activeScanner.destroy();
  }, []);

  const applyPayload = useCallback(
    (payload) => {
      const normalizedPayload = String(payload ?? "").trim();
      if (!normalizedPayload || isLockedRef.current) {
        return;
      }

      const now = Date.now();
      if (
        lastScanRef.current.value === normalizedPayload &&
        now - lastScanRef.current.at < SCAN_COOLDOWN_MS
      ) {
        return;
      }

      isLockedRef.current = true;
      lastScanRef.current = { value: normalizedPayload, at: now };

      const scanResult = onScanPayload(normalizedPayload);
      if (scanResult.status === "success") {
        setTone("success");
        setStatusMessage(
          t("ui.m.qrScanner.success", {
            name: scanResult.student.name,
            classesLeft: scanResult.classesLeft
          })
        );
        if (navigator.vibrate) {
          navigator.vibrate(80);
        }
        window.setTimeout(() => {
          onClose();
        }, 750);
      } else if (scanResult.status === "empty") {
        setTone("error");
        setStatusMessage(scanResult.message);
      } else if (scanResult.status === "not-found") {
        setTone("error");
        setStatusMessage(t("ui.695ef5ef2f1b"));
      } else {
        setTone("error");
        setStatusMessage(t("ui.cb3752f81387"));
      }

      window.setTimeout(() => {
        isLockedRef.current = false;
      }, 600);
    },
    [onClose, onScanPayload, t]
  );

  useEffect(() => {
    if (!isOpen) {
      stopScanner();
      setTone("idle");
      setStatusMessage(t("ui.b6c9d98927c5"));
      setManualCode("");
      setCameraReady(false);
      isLockedRef.current = false;
      return undefined;
    }

    let isCancelled = false;

    const startScanner = async () => {
      if (!videoRef.current) {
        return;
      }

      setTone("idle");
      setStatusMessage(t("ui.0c35e4ec4067"));
      setCameraReady(false);

      try {
        const hasCamera = await QrScanner.hasCamera();
        if (!hasCamera) {
          if (!isCancelled) {
            setTone("error");
            setStatusMessage(
              t("ui.365f0f9a9e0d")
            );
          }
          return;
        }

        const scanner = new QrScanner(
          videoRef.current,
          (result) => {
            const payload = typeof result === "string" ? result : result?.data;
            applyPayload(payload);
          },
          {
            preferredCamera: "environment",
            returnDetailedScanResult: true,
            maxScansPerSecond: 8,
            highlightScanRegion: true,
            highlightCodeOutline: true,
            onDecodeError: () => {}
          }
        );

        scannerRef.current = scanner;
        await scanner.start();

        if (isCancelled) {
          stopScanner();
          return;
        }

        setCameraReady(true);
        setTone("idle");
        setStatusMessage(t("ui.c6dc7ea31bf0"));
      } catch {
        if (!isCancelled) {
          setTone("error");
          setStatusMessage(t("ui.835245f911f4"));
          setCameraReady(false);
        }
      }
    };

    startScanner();

    return () => {
      isCancelled = true;
      stopScanner();
      isLockedRef.current = false;
    };
  }, [applyPayload, isOpen, stopScanner, t]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-4 backdrop-blur-sm sm:items-center"
      onClick={(event) => {
        if (event.target === overlayRef.current) {
          onClose();
        }
      }}
    >
      <div
        className="w-full max-w-[430px] rounded-3xl border p-4 sm:p-5"
        style={{
          background: "linear-gradient(145deg, rgb(18, 14, 30), rgb(10, 10, 18))",
          borderColor: "rgba(255, 255, 255, 0.11)",
          boxShadow: "0 24px 60px rgba(0, 0, 0, 0.65)"
        }}
      >
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-black text-white">{t("ui.30845ea3eb0a")}</h3>
            <p className="mt-0.5 text-[11px] text-white/55">
              {t("ui.f57968cd4118")}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-1.5 text-xs font-bold text-white/80 transition-all active:scale-95"
            style={{
              border: "1px solid rgba(255, 255, 255, 0.12)",
              background: "rgba(255, 255, 255, 0.04)"
            }}
          >
            {t("ui.88811e2d2ca2")}
          </button>
        </div>

        <div
          className="relative mb-3 overflow-hidden rounded-2xl"
          style={{
            border: "1px solid rgba(255, 255, 255, 0.1)",
            background: "rgb(8, 8, 12)"
          }}
        >
          <video
            ref={videoRef}
            className="h-[280px] w-full object-cover"
            muted
            playsInline
            autoPlay
          />

          {!cameraReady && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/55">
              <p className="px-4 text-center text-xs font-semibold text-white/75">
                {t("ui.f78812a87dda")}
              </p>
            </div>
          )}
        </div>

        <ScannerStatusBadge tone={tone} message={statusMessage} />

        <div className="mt-3 grid grid-cols-[1fr_auto] gap-2">
          <input
            value={manualCode}
            onChange={(event) => setManualCode(event.target.value)}
            placeholder={t("ui.5b8469aa2676")}
            className="h-10 rounded-xl px-3 text-sm text-white placeholder:text-white/28 focus:outline-none"
            style={{
              background: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(255, 255, 255, 0.12)"
            }}
          />
          <button
            type="button"
            onClick={() => applyPayload(manualCode)}
            className="h-10 rounded-xl px-4 text-xs font-bold text-white transition-all active:scale-95"
            style={{
              background: "linear-gradient(135deg, rgb(255, 95, 160), rgb(168, 85, 247))",
              boxShadow: "0 4px 16px rgba(168, 85, 247, 0.35)"
            }}
          >
            {t("ui.75a53c168042")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminQrScannerModal;
