export default function SuccessState({ title, body, actionLabel, onAction, className = '' }) {
  return (
    <div className={`success-state ${className}`.trim()} role="status">
      <span className="success-state-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 12.5l2.5 2.5L16 9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <p className="success-state-title">{title}</p>
      {body && <p className="success-state-body">{body}</p>}
      {actionLabel && onAction && (
        <button type="button" className="btn btn-primary btn-inline" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  )
}
