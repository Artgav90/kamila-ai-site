function createSizeProps(size) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  };
}

function IconBase({
  children,
  size = 16,
  color = "currentColor",
  strokeWidth = 2,
  className = ""
}) {
  return (
    <svg
      {...createSizeProps(size)}
      className={className}
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

export function CrmIcon({ name, size = 16, color = "currentColor", strokeWidth = 2, className = "" }) {
  switch (name) {
    case "zap":
      return (
        <IconBase size={size} color={color} strokeWidth={strokeWidth} className={className}>
          <path d="M4 14a1 1 0 0 1-.78-1.63l9-11.5A1 1 0 0 1 13 2v7h7a1 1 0 0 1 .78 1.63l-9 11.5A1 1 0 0 1 11 22v-7z" />
        </IconBase>
      );
    case "chevron-left":
      return (
        <IconBase size={size} color={color} strokeWidth={strokeWidth} className={className}>
          <path d="m15 18-6-6 6-6" />
        </IconBase>
      );
    case "layout-dashboard":
      return (
        <IconBase size={size} color={color} strokeWidth={strokeWidth} className={className}>
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="4" rx="1" />
          <rect x="14" y="10" width="7" height="11" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
        </IconBase>
      );
    case "users":
      return (
        <IconBase size={size} color={color} strokeWidth={strokeWidth} className={className}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </IconBase>
      );
    case "target":
      return (
        <IconBase size={size} color={color} strokeWidth={strokeWidth} className={className}>
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
        </IconBase>
      );
    case "trending-up":
      return (
        <IconBase size={size} color={color} strokeWidth={strokeWidth} className={className}>
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
          <polyline points="16 7 22 7 22 13" />
        </IconBase>
      );
    case "calendar":
      return (
        <IconBase size={size} color={color} strokeWidth={strokeWidth} className={className}>
          <path d="M8 2v4" />
          <path d="M16 2v4" />
          <rect width="18" height="18" x="3" y="4" rx="2" />
          <path d="M3 10h18" />
        </IconBase>
      );
    case "message-square":
      return (
        <IconBase size={size} color={color} strokeWidth={strokeWidth} className={className}>
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </IconBase>
      );
    case "chart-columns":
      return (
        <IconBase size={size} color={color} strokeWidth={strokeWidth} className={className}>
          <path d="M3 3v18h18" />
          <rect x="7" y="11" width="3" height="7" rx="1" />
          <rect x="12" y="7" width="3" height="11" rx="1" />
          <rect x="17" y="4" width="3" height="14" rx="1" />
        </IconBase>
      );
    case "settings":
      return (
        <IconBase size={size} color={color} strokeWidth={strokeWidth} className={className}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.65 1.65 0 0 0 15 19.4a1.65 1.65 0 0 0-1 .6 1.65 1.65 0 0 0-.33 1V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-.6-1 1.65 1.65 0 0 0-1-.33H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-.6 1.65 1.65 0 0 0 .33-1V3a2 2 0 1 1 4 0v.09A1.65 1.65 0 0 0 15 4.6a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9c.24.34.5.79.6 1 .1.21.26.67.6.67H21a2 2 0 1 1 0 4h-.09A1.65 1.65 0 0 0 19.4 15Z" />
        </IconBase>
      );
    case "log-out":
      return (
        <IconBase size={size} color={color} strokeWidth={strokeWidth} className={className}>
          <path d="m16 17 5-5-5-5" />
          <path d="M21 12H9" />
          <path d="M13 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8" />
        </IconBase>
      );
    case "search":
      return (
        <IconBase size={size} color={color} strokeWidth={strokeWidth} className={className}>
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </IconBase>
      );
    case "bell":
      return (
        <IconBase size={size} color={color} strokeWidth={strokeWidth} className={className}>
          <path d="M10.268 21a2 2 0 0 0 3.464 0" />
          <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.674C19.41 13.956 18 12.499 18 8a6 6 0 1 0-12 0c0 4.499-1.411 5.956-2.738 7.326" />
        </IconBase>
      );
    case "plus":
      return (
        <IconBase size={size} color={color} strokeWidth={strokeWidth} className={className}>
          <path d="M5 12h14" />
          <path d="M12 5v14" />
        </IconBase>
      );
    case "dollar-sign":
      return (
        <IconBase size={size} color={color} strokeWidth={strokeWidth} className={className}>
          <line x1="12" x2="12" y1="2" y2="22" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </IconBase>
      );
    case "activity":
      return (
        <IconBase size={size} color={color} strokeWidth={strokeWidth} className={className}>
          <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
        </IconBase>
      );
    case "circle-alert":
      return (
        <IconBase size={size} color={color} strokeWidth={strokeWidth} className={className}>
          <circle cx="12" cy="12" r="10" />
          <line x1="12" x2="12" y1="8" y2="12" />
          <line x1="12" x2="12.01" y1="16" y2="16" />
        </IconBase>
      );
    case "arrow-up-right":
      return (
        <IconBase size={size} color={color} strokeWidth={strokeWidth} className={className}>
          <path d="M7 7h10v10" />
          <path d="M7 17 17 7" />
        </IconBase>
      );
    case "arrow-down-right":
      return (
        <IconBase size={size} color={color} strokeWidth={strokeWidth} className={className}>
          <path d="m7 7 10 10" />
          <path d="M17 7v10H7" />
        </IconBase>
      );
    case "x":
      return (
        <IconBase size={size} color={color} strokeWidth={strokeWidth} className={className}>
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </IconBase>
      );
    case "eye":
      return (
        <IconBase size={size} color={color} strokeWidth={strokeWidth} className={className}>
          <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z" />
          <circle cx="12" cy="12" r="3" />
        </IconBase>
      );
    case "download":
      return (
        <IconBase size={size} color={color} strokeWidth={strokeWidth} className={className}>
          <path d="M12 3v12" />
          <path d="m7 10 5 5 5-5" />
          <path d="M4 21h16" />
        </IconBase>
      );
    case "circle-check":
      return (
        <IconBase size={size} color={color} strokeWidth={strokeWidth} className={className}>
          <circle cx="12" cy="12" r="9" />
          <path d="m9 12 2 2 4-4" />
        </IconBase>
      );
    default:
      return null;
  }
}
