import { registerSW } from "virtual:pwa-register";

export function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    return;
  }

  registerSW({
    immediate: true,
    onRegistered(registration) {
      if (!registration) {
        return;
      }

      setInterval(() => {
        registration.update();
      }, 60 * 60 * 1000);
    }
  });
}
