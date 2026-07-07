export default function InheritanceDiagram({ caption }) {
  return (
    <div className="inheritance-diagram">
      <svg viewBox="0 0 300 160" className="inheritance-svg" aria-hidden="true">
        <line x1="150" y1="56" x2="70" y2="108" stroke="#CBD5E0" strokeWidth="1.5" />
        <line x1="150" y1="56" x2="150" y2="108" stroke="#CBD5E0" strokeWidth="1.5" />
        <line x1="150" y1="56" x2="230" y2="108" stroke="#CBD5E0" strokeWidth="1.5" />
        <circle cx="150" cy="32" r="22" fill="#1B4F9B" />
        <text x="150" y="78" textAnchor="middle" className="inheritance-svg-label">
          You (FH confirmed)
        </text>
        <circle cx="70" cy="124" r="18" fill="url(#halfBlue)" stroke="#1B4F9B" strokeWidth="1.5" />
        <circle cx="150" cy="124" r="18" fill="url(#halfBlue)" stroke="#1B4F9B" strokeWidth="1.5" />
        <circle cx="230" cy="124" r="18" fill="#FFFFFF" stroke="#CBD5E0" strokeWidth="2" />
        <text x="70" y="152" textAnchor="middle" className="inheritance-svg-label">Child 1</text>
        <text x="150" y="152" textAnchor="middle" className="inheritance-svg-label">Child 2</text>
        <text x="230" y="152" textAnchor="middle" className="inheritance-svg-label">Child 3</text>
        <defs>
          <linearGradient id="halfBlue" x1="0" y1="0" x2="1" y2="0">
            <stop offset="50%" stopColor="#1B4F9B" />
            <stop offset="50%" stopColor="#FFFFFF" />
          </linearGradient>
        </defs>
      </svg>
      <div className="inheritance-badges">
        <span className="inheritance-risk-pill">50% risk</span>
        <span className="inheritance-risk-pill">50% risk</span>
      </div>
      {caption && <p className="inheritance-caption">{caption}</p>}
    </div>
  )
}
