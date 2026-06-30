import Stepper from '../components/Stepper.jsx'
import FamilyTreeIcon from '../components/FamilyTreeIcon.jsx'
import SecurityBadge from '../components/SecurityBadge.jsx'
import { buildFamilyImpactT, buildCascadeSummaryT } from '../i18n/index.js'

export default function FamilyImpact({ profile, onOpenFamilyTalk, t }) {
  const isCascade = profile.pathwayType === 'cascade'
  const content = isCascade
    ? buildCascadeSummaryT(t, profile)
    : buildFamilyImpactT(t, profile)

  return (
    <section className="screen">
      <Stepper currentStage={profile.pathwayStage ?? 1} t={t} />
      <SecurityBadge t={t} />

      <div className="card">
        <div className="family-head">
          <FamilyTreeIcon size={28} />
          <span className="eyebrow family-eyebrow">{t('familyImpactEyebrow')}</span>
        </div>
        <h1 className="screen-title">
          {isCascade ? t('familyImpactTitleCascade') : t('familyImpactTitleIndex')}
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

        <button type="button" className="btn btn-secondary" onClick={onOpenFamilyTalk}>
          {t('familyImpactConversationCta')}
        </button>
      </div>
    </section>
  )
}
