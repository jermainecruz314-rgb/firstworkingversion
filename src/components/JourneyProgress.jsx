const TOTAL_STAGES = 4

export default function JourneyProgress({ currentStage = 0, t }) {
  const completed = Math.min(Math.max(currentStage, 0), TOTAL_STAGES)
  const percent = Math.round((completed / TOTAL_STAGES) * 100)

  return (
    <div className="journey-progress" aria-label={t('pathwayProgress')}>
      <div className="journey-progress-header">
        <span className="journey-progress-label">
          {t('dashboardProgressLabel', { current: completed, total: TOTAL_STAGES })}
        </span>
        <span className="journey-progress-percent tnum">{percent}%</span>
      </div>
      <div className="journey-progress-track" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}>
        <div className="journey-progress-fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}
