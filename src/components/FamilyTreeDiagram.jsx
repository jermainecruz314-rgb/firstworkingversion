export default function FamilyTreeDiagram({ caption }) {
  return (
    <div className="family-tree-diagram">
      <svg viewBox="0 0 280 140" className="family-tree-svg" aria-hidden="true">
        <line x1="140" y1="44" x2="80" y2="88" stroke="#CBD5E0" strokeWidth="1.5" />
        <line x1="140" y1="44" x2="200" y2="88" stroke="#CBD5E0" strokeWidth="1.5" />
        <circle cx="140" cy="28" r="18" fill="#1B4F9B" />
        <text x="140" y="70" textAnchor="middle" className="family-tree-svg-label">
          Confirmed FH Patient
        </text>
        <circle cx="80" cy="104" r="16" fill="#E8703A" />
        <text x="80" y="130" textAnchor="middle" className="family-tree-svg-label">
          You: 50% risk
        </text>
        <circle cx="200" cy="104" r="16" fill="#FFFFFF" stroke="#CBD5E0" strokeWidth="2" />
        <text x="200" y="130" textAnchor="middle" className="family-tree-svg-label">
          Sibling: 50% risk
        </text>
      </svg>
      {caption && <p className="family-tree-caption">{caption}</p>}
    </div>
  )
}
