function createSizeProps(size) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  };
}

export function UsersIcon({ size = 16, className = "", color = "#fff", strokeWidth = 2 }) {
  return (
    <svg {...createSizeProps(size)} className={className} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export function ActivityIcon({ size = 16, className = "", color = "#fff", strokeWidth = 2 }) {
  return (
    <svg {...createSizeProps(size)} className={className} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
    </svg>
  );
}

export function TrendingUpIcon({ size = 16, className = "", color = "#fff", strokeWidth = 2 }) {
  return (
    <svg {...createSizeProps(size)} className={className} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}

export function CalendarCheckIcon({ size = 16, className = "", color = "#fff", strokeWidth = 2 }) {
  return (
    <svg {...createSizeProps(size)} className={className} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      <path d="m9 16 2 2 4-4" />
    </svg>
  );
}

export function ContactCardIcon({ size = 16, className = "", color = "#fff", strokeWidth = 2 }) {
  return (
    <svg {...createSizeProps(size)} className={className} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 2v2" />
      <path d="M17.915 22a6 6 0 0 0-12 0" />
      <path d="M8 2v2" />
      <circle cx="12" cy="12" r="4" />
      <rect x="3" y="4" width="18" height="18" rx="2" />
    </svg>
  );
}

export function CalendarCogIcon({ size = 16, className = "", color = "#fff", strokeWidth = 2 }) {
  return (
    <svg {...createSizeProps(size)} className={className} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="m15.2 16.9-.9-.4" />
      <path d="m15.2 19.1-.9.4" />
      <path d="M16 2v4" />
      <path d="m16.9 15.2-.4-.9" />
      <path d="m16.9 20.8-.4.9" />
      <path d="m19.5 14.3-.4.9" />
      <path d="m19.5 21.7-.4-.9" />
      <path d="M21 10.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6" />
      <path d="m21.7 16.5-.9.4" />
      <path d="m21.7 19.5-.9-.4" />
      <path d="M3 10h18" />
      <path d="M8 2v4" />
      <circle cx="18" cy="18" r="3" />
    </svg>
  );
}
