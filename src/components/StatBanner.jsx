const STATS = [
  { value: '1 in 250', label: 'people carry an FH gene variant', tone: 'blue' },
  { value: '50%', label: 'chance for each first-degree relative', tone: 'orange' },
  { value: '<10%', label: 'of FH cases in Singapore currently diagnosed', tone: 'teal' },
]

export default function StatBanner() {
  return (
    <div className="stat-banner" aria-label="FH awareness statistics">
      <div className="stat-banner-track">
        {STATS.map((stat) => (
          <div key={stat.value} className={`stat-card stat-card--${stat.tone}`}>
            <p className="stat-card-value">{stat.value}</p>
            <p className="stat-card-label">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
