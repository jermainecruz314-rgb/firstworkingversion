import Stepper from '../components/Stepper.jsx'
import FamilyTreeIcon from '../components/FamilyTreeIcon.jsx'
import SecurityBadge from '../components/SecurityBadge.jsx'
import DownloadInfoPackButton from '../components/DownloadInfoPackButton.jsx'
import { buildRiskSummaryT, buildCascadeSummaryT } from '../i18n/index.js'
import { LDL_THRESHOLD } from '../logic.js'

export default function WhyThisMatters({ profile, t }) {
  const isCascade = profile.pathwayType === 'cascade'
  const summary = isCascade
    ? buildCascadeSummaryT(t, profile)
    : buildRiskSummaryT(t, profile, LDL_THRESHOLD)

  return (
    <section className="screen">
      <Stepper currentStage={profile.pathwayStage ?? 1} t={t} />
      <SecurityBadge t={t} />

      <div className="card">
        <span className="eyebrow">{t('whyEyebrow')}</span>
        <h1 className="screen-title">{t('whyTitle')}</h1>

        {!isCascade && profile.ldlValue != null && (
          <div className="highlight card-data">
            <p className="highlight-label">{t('whyLdlLabel')}</p>
            <p className="highlight-value">
              {profile.ldlValue} <span className="unit">mmol/L</span>
            </p>
            <p className="highlight-note">
              {summary.aboveThreshold > 0
                ? t('whyAboveThresholdWithAbove', {
                    threshold: LDL_THRESHOLD,
                    above: summary.aboveThreshold,
                  })
                : t('whyAboveThresholdNoAbove', { threshold: LDL_THRESHOLD })}
            </p>
          </div>
        )}

        {isCascade && (
          <div className="highlight family-highlight">
            <div className="family-head">
              <FamilyTreeIcon size={22} />
              <p className="highlight-label">{t('whyCascadeLabel')}</p>
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

        <DownloadInfoPackButton profile={profile} t={t} />
      </div>
    </section>
  )
}
