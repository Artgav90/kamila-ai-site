function createSizeProps(size) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  };
}

export function QrCodeIcon({ className = "", color = "#fff", size = 18, strokeWidth = 2 }) {
  return (
    <svg {...createSizeProps(size)} className={className} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <rect width="5" height="5" x="3" y="3" rx="1" />
      <rect width="5" height="5" x="16" y="3" rx="1" />
      <rect width="5" height="5" x="3" y="16" rx="1" />
      <path d="M21 16h-3a2 2 0 0 0-2 2v3" />
      <path d="M21 21v.01" />
      <path d="M12 7v3a2 2 0 0 1-2 2H7" />
      <path d="M3 12h.01" />
      <path d="M12 3h.01" />
      <path d="M12 16v.01" />
      <path d="M16 12h1" />
      <path d="M21 12v.01" />
      <path d="M12 21v-1" />
    </svg>
  );
}

export function ChevronRightIcon({ className = "", color = "currentColor", size = 16, strokeWidth = 2 }) {
  return (
    <svg {...createSizeProps(size)} className={className} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

export function ChevronDownIcon({ className = "", color = "currentColor", size = 15, strokeWidth = 2 }) {
  return (
    <svg {...createSizeProps(size)} className={className} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function ArrowUpRightIcon({ className = "", color = "currentColor", size = 16, strokeWidth = 2 }) {
  return (
    <svg {...createSizeProps(size)} className={className} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  );
}

export function InstagramIcon({ className = "", color = "currentColor", size = 20 }) {
  return (
    <svg {...createSizeProps(size)} className={className}>
      <rect x="2" y="2" width="20" height="20" rx="6" stroke={color} strokeWidth="1.8" fill="none" />
      <circle cx="12" cy="12" r="4.8" stroke={color} strokeWidth="1.8" fill="none" />
      <circle cx="17.8" cy="6.2" r="1.3" fill={color} />
    </svg>
  );
}

export function MailIcon({ className = "", color = "currentColor", size = 20, strokeWidth = 1.8 }) {
  return (
    <svg {...createSizeProps(size)} className={className} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

export function NavigationIcon({ className = "", color = "currentColor", size = 13, strokeWidth = 2 }) {
  return (
    <svg {...createSizeProps(size)} className={className} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <polygon points="3 11 22 2 13 21 11 13 3 11" />
    </svg>
  );
}

export function MapPinIcon({ className = "", color = "currentColor", size = 15, strokeWidth = 2 }) {
  return (
    <svg {...createSizeProps(size)} className={className} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export function PhoneIcon({ className = "", color = "currentColor", size = 15, strokeWidth = 2 }) {
  return (
    <svg {...createSizeProps(size)} className={className} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

export function AtSignIcon({ className = "", color = "currentColor", size = 15, strokeWidth = 2 }) {
  return (
    <svg {...createSizeProps(size)} className={className} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" />
    </svg>
  );
}

export function FileTextIcon({ className = "", color = "currentColor", size = 15, strokeWidth = 2 }) {
  return (
    <svg {...createSizeProps(size)} className={className} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10 9H8" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
    </svg>
  );
}

export function ShieldIcon({ className = "", color = "currentColor", size = 15, strokeWidth = 2 }) {
  return (
    <svg {...createSizeProps(size)} className={className} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    </svg>
  );
}

export function HouseIcon({ className = "", color = "currentColor", size = 22, strokeWidth = 2 }) {
  return (
    <svg {...createSizeProps(size)} className={className} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
      <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </svg>
  );
}

export function CalendarDaysIcon({ className = "", color = "currentColor", size = 22, strokeWidth = 1.5 }) {
  return (
    <svg {...createSizeProps(size)} className={className} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  );
}

export function CircleUserIcon({ className = "", color = "currentColor", size = 22, strokeWidth = 1.5 }) {
  return (
    <svg {...createSizeProps(size)} className={className} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="10" r="3" />
      <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
    </svg>
  );
}

export function ShieldCheckIcon({ className = "", color = "currentColor", size = 22, strokeWidth = 1.5 }) {
  return (
    <svg {...createSizeProps(size)} className={className} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function LadyIcon({ className = "", color = "#fff", size = 22 }) {
  return (
    <svg {...createSizeProps(size)} className={className}>
      <path d="M3 19h4l2-5 5-3 4-6" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 19c0-2.5 2-5 5-5" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M14 11c1.5-0.8 3.5-1 5 0" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function KinderIcon({ className = "", color = "#fff", size = 22 }) {
  return (
    <svg {...createSizeProps(size)} className={className}>
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" stroke={color} strokeWidth="1.6" />
      <path d="M6.3 6.3l1.4 1.4M16.3 16.3l1.4 1.4M6.3 17.7l1.4-1.4M16.3 7.7l1.4-1.4" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
