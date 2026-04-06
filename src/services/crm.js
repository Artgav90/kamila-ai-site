const CRM_ROUTE_PATH = "/crm";

export function getCrmLaunchUrl() {
  if (typeof window === "undefined") {
    return CRM_ROUTE_PATH;
  }

  return new URL(CRM_ROUTE_PATH, window.location.origin).toString();
}

export function getConfiguredCrmUrl() {
  const configuredUrl = import.meta.env.VITE_TOPDANCE_CRM_URL?.trim();
  return configuredUrl || "";
}

export function openCrmInNewTab() {
  if (typeof window === "undefined") {
    return false;
  }

  const launchUrl = getCrmLaunchUrl();
  const popup = window.open(launchUrl, "_blank", "noopener,noreferrer");

  if (popup) {
    return true;
  }

  const link = document.createElement("a");
  link.href = launchUrl;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  return true;
}
