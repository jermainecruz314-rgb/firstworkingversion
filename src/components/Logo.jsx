export default function Logo({ size = 32, className = '' }) {
  return (
    <span
      className={`app-logo ${className}`.trim()}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 32 32" width="100%" height="100%" fill="none">
        <rect width="32" height="32" rx="9" fill="var(--primary)" />
        <path
          d="M16 23.5c-.35 0-.68-.13-.93-.36-3.9-3.55-6.47-6.1-7.7-8.24C6.2 12.9 6 11.55 6 10.4 6 7.9 8 6 10.4 6c1.5 0 2.9.75 3.7 1.95L16 10.1l1.9-2.15C18.7 6.75 20.1 6 21.6 6 24 6 26 7.9 26 10.4c0 1.15-.2 2.5-1.37 4.5-1.23 2.14-3.8 4.69-7.7 8.24-.25.23-.58.36-.93.36z"
          fill="#ffffff"
        />
        <path
          d="M9 16h2.4l1.3-2.6 1.6 4.6 1.3-2.6H19"
          stroke="var(--primary)"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}
