const STATS = [
  { value: '1 in 250', label: 'carry an FH gene variant', emphasis: 'people' },
  { value: '50%', label: 'chance per first-degree relative' },
  { value: '<10%', label: 'of FH cases diagnosed in Singapore' },
]

export default function StatBanner() {
  return (
    <div className="stat-strip" aria-label="FH awareness statistics">
      {STATS.map((stat, index) => (
        <div key={stat.value} className="stat-strip-item">
          {index > 0 && <span className="stat-strip-rule" aria-hidden="true" />}
          <p className="stat-strip-value">{stat.value}</p>
          <p className="stat-strip-label">
            {stat.emphasis ? (
              <>
                <span className="stat-strip-emphasis">{stat.emphasis}</span> {stat.label}
              </>
            ) : (
              stat.label
            )}
          </p>
        </div>
      ))}
    </div>
  )
}
