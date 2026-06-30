import Stepper from '../components/Stepper.jsx'
import FamilyTreeIcon from '../components/FamilyTreeIcon.jsx'
import SecurityBadge from '../components/SecurityBadge.jsx'
import DownloadInfoPackButton from '../components/DownloadInfoPackButton.jsx'
import { buildRiskSummary, buildCascadeSummary, LDL_THRESHOLD } from '../logic.js'
import { getStrings } from '../translations.js'

export default function WhyThisMatters({ profile }) {
  const isCascade = profile.pathwayType === 'cascade'
  const summary = isCascade
    ? buildCascadeSummary(profile)
    : buildRiskSummary(profile, LDL_THRESHOLD)
  const t = getStrings(profile.preferredLanguage).why

  return (
    <section className="screen">
      <Stepper currentStage={1} />
      <SecurityBadge />

      <div className="card">
        <span className="eyebrow">{t.eyebrow}</span>
        <h1 className="screen-title">{t.title}</h1>

        {!isCascade && profile.ldlValue != null && (
          <div className="highlight">
            <p className="highlight-label">{t.ldlLabel}</p>
            <p className="highlight-value">
              {profile.ldlValue} <span className="unit">mmol/L</span>
            </p>
            <p className="highlight-note">
              {t.aboveThreshold(LDL_THRESHOLD, summary.aboveThreshold ?? 0)}
            </p>
          </div>
        )}

        {isCascade && (
          <div className="highlight family-highlight">
            <div className="family-head">
              <FamilyTreeIcon size={22} />
              <p className="highlight-label">{t.cascadeLabel}</p>
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

        <DownloadInfoPackButton
          profile={profile}
          label={t.downloadPack}
          doneLabel={t.downloadDone}
        />
      </div>
    </section>
  )
}
