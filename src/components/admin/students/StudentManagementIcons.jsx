function createSizeProps(size) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  };
}

export function ArrowLeftIcon({ size = 18, color = "#fff", strokeWidth = 2, className = "" }) {
  return (
    <svg {...createSizeProps(size)} className={className} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}

export function SearchIcon({ size = 16, color = "currentColor", strokeWidth = 2, className = "" }) {
  return (
    <svg {...createSizeProps(size)} className={className} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

export function EyeIcon({ size = 12, color = "currentColor", strokeWidth = 2, className = "" }) {
  return (
    <svg {...createSizeProps(size)} className={className} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function PlusIcon({ size = 12, color = "currentColor", strokeWidth = 2, className = "" }) {
  return (
    <svg {...createSizeProps(size)} className={className} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

export function UserCheckIcon({ size = 12, color = "currentColor", strokeWidth = 2, className = "" }) {
  return (
    <svg {...createSizeProps(size)} className={className} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <polyline points="16 11 18 13 22 9" />
    </svg>
  );
}
