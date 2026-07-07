export default function RiskComparison() {
  return (
    <div className="risk-comparison">
      <div className="risk-comparison-col">
        <p className="risk-comparison-label">Without genetic testing</p>
        <span className="risk-comparison-icon risk-comparison-icon--muted" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
          </svg>
        </span>
        <p className="risk-comparison-text">Treatment based on cholesterol level alone</p>
      </div>
      <div className="risk-comparison-divider" aria-hidden="true" />
      <div className="risk-comparison-col risk-comparison-col--positive">
        <p className="risk-comparison-label">With genetic testing</p>
        <span className="risk-comparison-icon risk-comparison-icon--active" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
          </svg>
          <span className="risk-comparison-check">✓</span>
        </span>
        <p className="risk-comparison-text">Treatment tailored to your gene variant</p>
      </div>
    </div>
  )
}
