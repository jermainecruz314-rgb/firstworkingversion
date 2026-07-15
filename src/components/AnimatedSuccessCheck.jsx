export default function AnimatedSuccessCheck({ title, children, className = '' }) {
  return (
    <div className={`animated-success ${className}`.trim()} role="status">
      <div className="animated-success-circle" aria-hidden="true">
        <svg className="animated-success-ring" viewBox="0 0 80 80">
          <circle className="animated-success-ring-bg" cx="40" cy="40" r="36" />
          <circle className="animated-success-ring-draw" cx="40" cy="40" r="36" />
        </svg>
        <span className="animated-success-check">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M8 12.5l2.5 2.5L16 9" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
      {title && <p className="animated-success-title">{title}</p>}
      {children}
    </div>
  )
}
