import FamilyTreeIcon from '../components/FamilyTreeIcon.jsx'
import SecurityBadge from '../components/SecurityBadge.jsx'
import InheritanceDiagram from '../components/InheritanceDiagram.jsx'
import CardWatermark from '../components/CardWatermark.jsx'
import { buildFamilyImpactT, buildCascadeSummaryT } from '../i18n/index.js'

export default function FamilyImpact({ profile, onOpenFamilyTalk, t }) {
  const isCascade = profile.pathwayType === 'cascade'
  const content = isCascade
    ? buildCascadeSummaryT(t, profile)
    : buildFamilyImpactT(t, profile)

  return (
    <section className="screen">
      <SecurityBadge t={t} />

      <div className="card card--decorated">
        <CardWatermark id="family" />
        <div className="family-head">
          <span className="icon-chip icon-chip--teal">
            <FamilyTreeIcon size={20} />
          </span>
          <span className="eyebrow family-eyebrow">{t('familyImpactEyebrow')}</span>
        </div>
        <h1 className="screen-title">
          {isCascade ? t('familyImpactTitleCascade') : t('familyImpactTitleIndex')}
        </h1>

        <InheritanceDiagram t={t} />

        <p className="lead explain">{content.intro}</p>

        <div className="info-list">
          {content.points.map((point) => (
            <div className="info-item family" key={point.title}>
              <span className="icon-chip icon-chip--teal">
                <FamilyTreeIcon size={20} />
              </span>
              <span className="info-item-copy">
                <h2 className="info-title">{point.title}</h2>
                <p className="info-body explain">{point.body}</p>
              </span>
            </div>
          ))}
        </div>

        <button type="button" className="btn btn-secondary btn-inline" onClick={onOpenFamilyTalk}>
          {t('familyImpactConversationCta')}
        </button>
      </div>
    </section>
  )
}
