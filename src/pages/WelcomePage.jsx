import { useEffect, useMemo, useState } from "react";
import WelcomePhoneShell from "../components/welcome/WelcomePhoneShell";

const WELCOME_SHELL_WIDTH = 390;
const WELCOME_SHELL_HEIGHT = 844;
const WELCOME_DESKTOP_PADDING = 64;

function getDesktopWelcomeScale() {
  if (typeof window === "undefined") {
    return { isDesktop: false, scale: 1 };
  }

  const desktopQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

  if (!desktopQuery.matches) {
    return { isDesktop: false, scale: 1 };
  }

  const viewportWidth = window.visualViewport?.width ?? window.innerWidth;
  const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
  const availableWidth = Math.max(viewportWidth - WELCOME_DESKTOP_PADDING, 320);
  const availableHeight = Math.max(viewportHeight - WELCOME_DESKTOP_PADDING, 320);
  const scale = Math.min(
    1,
    availableWidth / WELCOME_SHELL_WIDTH,
    availableHeight / WELCOME_SHELL_HEIGHT
  );

  return {
    isDesktop: true,
    scale
  };
}

function WelcomePage() {
  const [{ isDesktop, scale }, setDesktopMetrics] = useState(() => getDesktopWelcomeScale());

  useEffect(() => {
    document.documentElement.classList.add("welcome-lock");
    document.body.classList.add("welcome-lock");

    return () => {
      document.documentElement.classList.remove("welcome-lock");
      document.body.classList.remove("welcome-lock");
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    const updateMetrics = () => {
      setDesktopMetrics(getDesktopWelcomeScale());
    };

    updateMetrics();
    window.addEventListener("resize", updateMetrics);
    window.visualViewport?.addEventListener("resize", updateMetrics);
    mediaQuery.addEventListener?.("change", updateMetrics);

    return () => {
      window.removeEventListener("resize", updateMetrics);
      window.visualViewport?.removeEventListener("resize", updateMetrics);
      mediaQuery.removeEventListener?.("change", updateMetrics);
    };
  }, []);

  const desktopShellStyle = useMemo(() => {
    if (!isDesktop) {
      return undefined;
    }

    return {
      width: `${Math.round(WELCOME_SHELL_WIDTH * scale)}px`,
      height: `${Math.round(WELCOME_SHELL_HEIGHT * scale)}px`
    };
  }, [isDesktop, scale]);

  const desktopShellInnerStyle = useMemo(() => {
    if (!isDesktop) {
      return undefined;
    }

    return {
      width: `${WELCOME_SHELL_WIDTH}px`,
      height: `${WELCOME_SHELL_HEIGHT}px`,
      transform: `scale(${scale})`,
      transformOrigin: "top left"
    };
  }, [isDesktop, scale]);

  return (
    <section
      className="flex min-h-dvh flex-1 items-center justify-center overflow-hidden p-0 sm:p-8"
      style={{ background: "rgb(5, 5, 16)" }}
    >
      {isDesktop ? (
        <div className="shrink-0 overflow-visible" style={desktopShellStyle}>
          <div style={desktopShellInnerStyle}>
            <WelcomePhoneShell />
          </div>
        </div>
      ) : (
        <WelcomePhoneShell />
      )}
    </section>
  );
}

export default WelcomePage;
