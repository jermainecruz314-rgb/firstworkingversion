import FamilyTreeIcon from '../components/FamilyTreeIcon.jsx'
import SecurityBadge from '../components/SecurityBadge.jsx'
import LogoMark from '../components/LogoMark.jsx'
import DashIcon from '../components/DashIcon.jsx'
import CardWatermark from '../components/CardWatermark.jsx'
import RiskComparison from '../components/RiskComparison.jsx'
import DownloadInfoPackButton from '../components/DownloadInfoPackButton.jsx'
import { buildRiskSummaryT, localizeProfile } from '../i18n/index.js'
import { LDL_THRESHOLD } from '../logic.js'

const ALERT_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7.5v5.5M12 16.5h.01" strokeLinecap="round" />
  </svg>
)

const TRENDING_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path d="M3 17l6-6 4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15 7h6v6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const SHIELD_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path d="M12 3l7 3v6c0 5-3.5 7.5-7 9-3.5-1.5-7-4-7-9V6l7-3z" strokeLinejoin="round" />
    <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function WhyThisMatters({ profile, t }) {
  if (!profile) return null

  const isCascade = profile.pathwayType === 'cascade'
  const isIndex = profile.pathwayType === 'index'
  const localized = localizeProfile(t, profile)
  const aboveThreshold = isIndex
    ? buildRiskSummaryT(t, profile, LDL_THRESHOLD).aboveThreshold
    : 0

  return (
    <section className="screen screen--with-logo">
      <LogoMark />
      <SecurityBadge t={t} />

      <div className="card card--decorated">
        <CardWatermark id="why" />
        <div className="screen-hero">
          <DashIcon id="why" />
          <span className="eyebrow">{t('whyEyebrow')}</span>
        </div>
        <h1 className="screen-title">{t('whyTitle')}</h1>
        <p className="lead">{t('whyLead')}</p>

        {isIndex && <RiskComparison t={t} />}

        {isIndex && profile.ldlValue != null && (
          <div className="highlight card-data">
            <p className="highlight-label">{t('whyLdlLabel')}</p>
            <p className="highlight-value">
              {profile.ldlValue} <span className="unit">mmol/L</span>
            </p>
            <p className="highlight-note">
              {aboveThreshold > 0
                ? t('whyAboveThresholdWithAbove', {
                    threshold: LDL_THRESHOLD,
                    above: aboveThreshold,
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
            <p className="highlight-note">{localized.relationToIndex}</p>
          </div>
        )}

        <div className="risk-timeline">
          <div className="risk-timeline-card risk-timeline-card--short">
            <span className="risk-timeline-icon risk-timeline-icon--short">{ALERT_ICON}</span>
            <div className="risk-timeline-copy">
              <p className="risk-timeline-eyebrow">{t('whyTimelineShortLabel')}</p>
              <h2 className="risk-timeline-title">{t('whyTimelineShortTitle')}</h2>
              <p className="risk-timeline-body">
                {isCascade
                  ? t('whyTimelineShortBodyCascade')
                  : t('whyTimelineShortBodyIndex', { ldlValue: profile.ldlValue })}
              </p>
            </div>
          </div>

          <div className="risk-timeline-card risk-timeline-card--medium">
            <span className="risk-timeline-icon risk-timeline-icon--medium">{TRENDING_ICON}</span>
            <div className="risk-timeline-copy">
              <p className="risk-timeline-eyebrow">{t('whyTimelineMediumLabel')}</p>
              <h2 className="risk-timeline-title">{t('whyTimelineMediumTitle')}</h2>
              <p className="risk-timeline-body">{t('whyTimelineMediumBody')}</p>
              <p className="risk-timeline-stat">{t('whyTimelineMediumStat')}</p>
            </div>
          </div>

          <div className="risk-timeline-card risk-timeline-card--long">
            <span className="risk-timeline-icon risk-timeline-icon--long">{SHIELD_ICON}</span>
            <div className="risk-timeline-copy">
              <p className="risk-timeline-eyebrow">{t('whyTimelineLongLabel')}</p>
              <h2 className="risk-timeline-title">{t('whyTimelineLongTitle')}</h2>
              <p className="risk-timeline-body">{t('whyTimelineLongBody')}</p>
              <p className="risk-timeline-cta">{t('whyTimelineLongCta')}</p>
            </div>
          </div>
        </div>

        <DownloadInfoPackButton profile={profile} t={t} />
      </div>
    </section>
  )
}
