const STAT_KEYS = [
  { valueKey: 'statValue1', labelKey: 'statLabel1', emphasisKey: 'statLabel1Emphasis' },
  { valueKey: 'statValue2', labelKey: 'statLabel2' },
  { valueKey: 'statValue3', labelKey: 'statLabel3' },
]

export default function StatBanner({ t }) {
  return (
    <div className="stat-strip" aria-label="FH awareness statistics">
      {STAT_KEYS.map((stat, index) => (
        <div key={stat.valueKey} className="stat-strip-item">
          {index > 0 && <span className="stat-strip-rule" aria-hidden="true" />}
          <p className="stat-strip-value">{t(stat.valueKey)}</p>
          <p className="stat-strip-label">
            {stat.emphasisKey && t(stat.emphasisKey) ? (
              <>
                <span className="stat-strip-emphasis">{t(stat.emphasisKey)}</span> {t(stat.labelKey)}
              </>
            ) : (
              t(stat.labelKey)
            )}
          </p>
        </div>
      ))}
    </div>
  )
}
