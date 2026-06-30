import Stepper from '../components/Stepper.jsx'
import FamilyTreeIcon from '../components/FamilyTreeIcon.jsx'
import SecurityBadge from '../components/SecurityBadge.jsx'
import { buildFamilyImpact, buildCascadeSummary } from '../logic.js'

// Family-impact content — terracotta styling for cascade and index pathways.
export default function FamilyImpact({ profile, onOpenFamilyTalk }) {
  const isCascade = profile.pathwayType === 'cascade'
  const content = isCascade
    ? buildCascadeSummary(profile)
    : buildFamilyImpact(profile)

  return (
    <section className="screen">
      <Stepper currentStage={1} />
      <SecurityBadge />

      <div className="card">
        <div className="family-head">
          <FamilyTreeIcon size={28} />
          <span className="eyebrow family-eyebrow">Family impact</span>
        </div>
        <h1 className="screen-title">
          {isCascade ? 'Your place in the family pathway' : 'A head start for your family'}
        </h1>
        <p className="lead explain">{content.intro}</p>

        <div className="info-list">
          {content.points.map((point) => (
            <div className="info-item family" key={point.title}>
              <h2 className="info-title">{point.title}</h2>
              <p className="info-body explain">{point.body}</p>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={onOpenFamilyTalk}
        >
          Talking to your family →
        </button>
      </div>
    </section>
  )
}
