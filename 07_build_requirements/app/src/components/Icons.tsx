type IconProps = { className?: string };

const base = {
  viewBox: '0 0 24 24',
  fill: 'none' as const,
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export function SearchIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m20 20-4.6-4.6" />
    </svg>
  );
}

export function ChevronDownIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function PinIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.3" />
    </svg>
  );
}

export function CupIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M5 8h11v6a5 5 0 0 1-5 5H9a4 4 0 0 1-4-4V8Z" />
      <path d="M16 10h1.5a2.5 2.5 0 0 1 0 5H16" />
      <path d="M8 4.5c0 1-1 1-1 2M11.5 4.5c0 1-1 1-1 2" />
    </svg>
  );
}

export function StoreIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 9.5 5 4h14l1 5.5" />
      <path d="M4 9.5a2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0" />
      <path d="M5.5 11v8.5h13V11" />
    </svg>
  );
}

export function PlateIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3.4" />
    </svg>
  );
}

export function BoxIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 8.5 12 4l8 4.5-8 4.5-8-4.5Z" />
      <path d="M4 8.5v7L12 20l8-4.5v-7" />
      <path d="M12 13v7" />
    </svg>
  );
}

export function BagIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M6 8h12l1 12H5L6 8Z" />
      <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
    </svg>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

export function GearIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v2.2M12 18.8V21M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M3 12h2.2M18.8 12H21M4.9 19.1l1.6-1.6M17.5 6.5l1.6-1.6" />
    </svg>
  );
}

export function StarIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="m12 4 2.2 4.9 5.3.6-4 3.6 1.1 5.3L12 15.8 7.4 18.4l1.1-5.3-4-3.6 5.3-.6L12 4Z" />
    </svg>
  );
}

export function XCircleIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m9.5 9.5 5 5m0-5-5 5" />
    </svg>
  );
}

export function DeskIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="4" y="6" width="16" height="4" rx="1" />
      <path d="M6 10v8M18 10v8" />
    </svg>
  );
}
