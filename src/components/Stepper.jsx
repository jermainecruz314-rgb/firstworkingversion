// A simple horizontal stepper — stage labels come from translations.
export default function Stepper({ currentStage = 0, t }) {
  const stages = [
    t('stepReferral'),
    t('stepCounselling'),
    t('stepTest'),
    t('stepResults'),
  ]

  return (
    <nav className="stepper" aria-label={t('pathwayProgress')}>
      <ol className="stepper-list">
        {stages.map((stage, index) => {
          const isComplete = index < currentStage
          const isCurrent = index === currentStage
          const state = isCurrent ? 'current' : isComplete ? 'complete' : 'upcoming'

          return (
            <li key={stage} className={`stepper-item ${state}`}>
              <span className="stepper-dot" aria-hidden="true" />
              <span className="stepper-label">{stage}</span>
              {index < stages.length - 1 && (
                <span className="stepper-line" aria-hidden="true" />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
