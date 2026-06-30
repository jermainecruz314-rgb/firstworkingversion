import Stepper from '../components/Stepper.jsx'
import FamilyTreeIcon from '../components/FamilyTreeIcon.jsx'
import SecurityBadge from '../components/SecurityBadge.jsx'
import { buildRiskSummary, buildCascadeSummary, LDL_THRESHOLD } from '../logic.js'

// Personalised "why this matters" summary — driven by the signed-in profile.
export default function WhyThisMatters({ profile }) {
  const isCascade = profile.pathwayType === 'cascade'
  const summary = isCascade
    ? buildCascadeSummary(profile)
    : buildRiskSummary(profile, LDL_THRESHOLD)

  return (
    <section className="screen">
      <Stepper currentStage={1} />
      <SecurityBadge />

      <div className="card">
        <span className="eyebrow">Why this matters to you</span>
        <h1 className="screen-title">Let&apos;s make sense of your result</h1>

        {!isCascade && profile.ldlValue != null && (
          <div className="highlight">
            <p className="highlight-label">Your LDL reading</p>
            <p className="highlight-value">
              {profile.ldlValue} <span className="unit">mmol/L</span>
            </p>
            <p className="highlight-note">
              This is above the {LDL_THRESHOLD} mmol/L level we look out for
              {summary.aboveThreshold > 0
                ? ` — by ${summary.aboveThreshold} mmol/L.`
                : '.'}
            </p>
          </div>
        )}

        {isCascade && (
          <div className="highlight family-highlight">
            <div className="family-head">
              <FamilyTreeIcon size={22} />
              <p className="highlight-label">Cascade screening</p>
            </div>
            <p className="highlight-note">{profile.relationToIndex}</p>
          </div>
        )}

        <p className="lead explain">{summary.intro}</p>

        <div className="info-list">
          {summary.points.map((point) => {
            const isFamily = point.title.toLowerCase().includes('family')
            return (
              <div
                className={`info-item${isFamily || isCascade ? ' family' : ''}`}
                key={point.title}
              >
                <div className="family-head">
                  {(isFamily || isCascade) && <FamilyTreeIcon size={24} />}
                  <h2 className="info-title">{point.title}</h2>
                </div>
                <p className="info-body explain">{point.body}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
