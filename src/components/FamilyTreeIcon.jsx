// A minimal, line-drawn family tree — one parent connected to two children,
// echoing the ~50% inheritance theme. Single colour via `currentColor`, so the
// parent sets it to the terracotta family accent. This is the app's only
// decorative element; it appears wherever family / cascade content is shown.
export default function FamilyTreeIcon({ size = 26, className = '' }) {
  return (
    <svg
      className={`family-tree-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="16" cy="6" r="3.2" />
      <circle cx="8" cy="26" r="3.2" />
      <circle cx="24" cy="26" r="3.2" />
      <path d="M16 9.2 V16 M8 16 H24 M8 16 V22.8 M24 16 V22.8" />
    </svg>
  )
}
