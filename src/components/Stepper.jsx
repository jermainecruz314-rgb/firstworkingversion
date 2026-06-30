const STAGES = ['Referral', 'Counselling', 'Test', 'Results']

// A simple horizontal stepper showing where the patient is in the pathway.
// `currentStage` is the 0-based index of the active stage.
export default function Stepper({ currentStage = 0 }) {
  return (
    <nav className="stepper" aria-label="Your pathway progress">
      <ol className="stepper-list">
        {STAGES.map((stage, index) => {
          const isComplete = index < currentStage
          const isCurrent = index === currentStage
          const state = isCurrent ? 'current' : isComplete ? 'complete' : 'upcoming'

          return (
            <li key={stage} className={`stepper-item ${state}`}>
              <span className="stepper-dot" aria-hidden="true">
                {isComplete ? '✓' : index + 1}
              </span>
              <span className="stepper-label">{stage}</span>
              {index < STAGES.length - 1 && (
                <span className="stepper-line" aria-hidden="true" />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export { STAGES }
