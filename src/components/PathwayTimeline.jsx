const STEPS = [
  {
    key: 'stepReferral',
    time: '~1 week',
    color: 'referral',
    desc: 'Your doctor refers you into the FH genetic testing programme.',
  },
  {
    key: 'stepCounselling',
    time: '~30 mins',
    color: 'counselling',
    desc: 'Meet a genetic counsellor to discuss testing and what results mean.',
  },
  {
    key: 'stepTest',
    time: '~1 day',
    color: 'test',
    desc: 'A simple blood sample is taken at the Genetic Assessment Centre.',
  },
  {
    key: 'stepResults',
    time: '~3-4 months',
    color: 'results',
    desc: 'Results are reviewed with you and shared with your care team.',
  },
]

export default function PathwayTimeline({ currentStage = 0, completed = false, t }) {
  const stage = Math.min(Math.max(Number(currentStage) || 0, 0), STEPS.length - 1)

  return (
    <div className="pathway-timeline">
      {STEPS.map((step, index) => {
        const isComplete = completed || index < stage
        const isCurrent = !completed && index === stage

        return (
          <div
            key={step.key}
            className={`pathway-timeline-step pathway-timeline-step--${step.color}${
              isComplete ? ' complete' : ''
            }${isCurrent ? ' current' : ''}`}
          >
            <div className="pathway-timeline-rail">
              <span className="pathway-timeline-node">
                {isComplete && index === STEPS.length - 1 && completed && (
                  <span className="pathway-timeline-check" aria-hidden="true">✓</span>
                )}
              </span>
              {index < STEPS.length - 1 && <span className="pathway-timeline-line" />}
            </div>
            <div className="pathway-timeline-content">
              <p className="pathway-timeline-title">{t(step.key)}</p>
              <p className="pathway-timeline-desc">{step.desc}</p>
              <span className="pathway-timeline-pill">{step.time}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
