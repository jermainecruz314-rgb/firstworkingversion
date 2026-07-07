const STAGES = [
  {
    key: 'stepReferral',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <path d="M9 12h6M9 16h4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    key: 'stepCounselling',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M16 19v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1" strokeLinecap="round" />
        <circle cx="9" cy="8" r="3" />
        <path d="M20 19v-1a3 3 0 0 0-2-2.83M15 4.18a3 3 0 0 1 0 5.64" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    key: 'stepTest',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M12 22a7 7 0 0 0 7-7c0-4-7-13-7-13S5 11 5 15a7 7 0 0 0 7 7z" />
      </svg>
    ),
  },
  {
    key: 'stepResults',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M8 12.5l2.5 2.5L16 9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

export default function PathwayIconTracker({ currentStage = 0, t, variant = 'default' }) {
  const stage = Math.min(Math.max(Number(currentStage) || 0, 0), STAGES.length - 1)

  return (
    <div
      className={`pathway-icon-tracker${
        variant === 'greeting'
          ? ' pathway-icon-tracker--greeting'
          : variant === 'warm'
            ? ' pathway-icon-tracker--warm'
            : ''
      }`}
      aria-label={t('pathwayProgress')}
    >
      <div className="pathway-icon-tracker-row">
        {STAGES.map((item, index) => {
          const isComplete = index < stage
          const isCurrent = index === stage
          const state = isCurrent ? 'current' : isComplete ? 'complete' : 'upcoming'

          return (
            <div key={item.key} className={`pathway-icon-node pathway-icon-node--${state}`}>
              {index > 0 && (
                <span
                  className={`pathway-icon-connector pathway-icon-connector--${
                    index <= stage ? 'complete' : 'upcoming'
                  }`}
                  aria-hidden="true"
                />
              )}
              <span className="pathway-icon-circle">{item.icon}</span>
              <span className="pathway-icon-label">{t(item.key)}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
