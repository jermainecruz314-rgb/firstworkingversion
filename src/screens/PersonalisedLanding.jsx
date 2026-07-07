import SecurityBadge from '../components/SecurityBadge.jsx'
import LdlGauge from '../components/LdlGauge.jsx'
import FamilyTreeDiagram from '../components/FamilyTreeDiagram.jsx'
import { formatDate } from '../utils.js'
import { translateStatus, LANG_OPTIONS, localizeProfile } from '../i18n/index.js'
import { LDL_THRESHOLD } from '../logic.js'

const DETAIL_ICONS = {
  referredBy: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M19 8v6M22 11h-6" strokeLinecap="round" />
    </svg>
  ),
  referralDate: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M8 3v4M16 3v4M4 11h16" strokeLinecap="round" />
    </svg>
  ),
  referralReason: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16l4-2 4 2 4-2 4 2V8z" strokeLinejoin="round" />
    </svg>
  ),
  inheritanceRisk: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M16 19v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1" strokeLinecap="round" />
      <circle cx="9" cy="8" r="3" />
      <path d="M20 19v-1a3 3 0 0 0-2-2.83M15 4.18a3 3 0 0 1 0 5.64" strokeLinecap="round" />
    </svg>
  ),
  appointment: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" strokeLinecap="round" />
    </svg>
  ),
  language: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" strokeLinecap="round" />
    </svg>
  ),
}

const INFO_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 10v6M12 7h.01" strokeLinecap="round" />
  </svg>
)

export default function PersonalisedLanding({ profile, onContinue, t, language }) {
  const localized = localizeProfile(t, profile)
  const isCascade = profile.pathwayType === 'cascade'
  const langCode = language ?? profile.preferredLanguage ?? 'en'
  const langLabel =
    LANG_OPTIONS.find((o) => o.code === langCode)?.native ?? langCode
  const pathwayBadge = isCascade ? t('pathwayCascade') : t('pathwayIndex')

  const rows = [
    { id: 'referredBy', label: t('labelReferredBy'), value: localized.referredBy },
    {
      id: 'referralDate',
      label: t('labelReferralDate'),
      value: formatDate(profile.referralDate, langCode),
    },
    {
      id: 'referralReason',
      label: t('labelReferralReason'),
      value: isCascade ? (
        localized.relationToIndex
      ) : (
        <>
          {localized.referralReason}
          {profile.ldlValue != null && (
            <span className="ldl-value-display">
              <span className="ldl-value-number">{profile.ldlValue}</span>
              <span className="ldl-value-unit">mmol/L</span>
              {profile.ldlValue > LDL_THRESHOLD && (
                <span className="ldl-threshold-badge">Above threshold</span>
              )}
            </span>
          )}
        </>
      ),
      family: isCascade,
    },
  ]

  if (isCascade && localized.inheritanceRisk) {
    rows.push({
      id: 'inheritanceRisk',
      label: t('labelInheritanceRisk'),
      value: localized.inheritanceRisk,
      family: true,
    })
  }

  rows.push(
    {
      id: 'appointment',
      label: t('labelAppointment'),
      value: translateStatus(profile.appointmentStatus, t),
    },
    { id: 'language', label: t('labelPreferredLanguage'), value: langLabel }
  )

  return (
    <section className="screen">
      <SecurityBadge t={t} />

      <div className="card greeting-card landing-greeting">
        <span className="eyebrow">{t('landingEyebrow')}</span>
        <h1 className="greeting-title">{t('landingGreeting', { name: profile.name })}</h1>
        <p className="greeting-lead">{t('landingLead')}</p>
      </div>

      <div className="card landing-referral-card">
        <div className="landing-referral-header">
          <h2 className="landing-referral-name">{profile.name}</h2>
          <span className="landing-pathway-badge">{pathwayBadge}</span>
        </div>

        <div className="landing-referral-body">
          {!isCascade && profile.ldlValue != null && (
            <div className="landing-visual-block">
              <LdlGauge ldlValue={profile.ldlValue} t={t} />
            </div>
          )}

          {isCascade && (
            <div className="landing-visual-block">
              <FamilyTreeDiagram caption="FH is inherited. Each first-degree relative has a 50% chance of carrying the same gene variant." />
            </div>
          )}

          {rows.map((row, index) => (
            <div
              key={row.id}
              className={`landing-detail-row${row.family ? ' family' : ''}${
                index % 2 === 0 ? ' landing-detail-row--alt' : ''
              }`}
            >
              <span className={`landing-detail-icon landing-detail-icon--${row.id}`}>
                {DETAIL_ICONS[row.id]}
              </span>
              <div className="landing-detail-content">
                <span className="landing-detail-label">{row.label}</span>
                <span className="landing-detail-value">{row.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="landing-reassurance-banner">
        <span className="landing-reassurance-icon">{INFO_ICON}</span>
        <p>{t('landingReassurance')}</p>
      </div>

      <button className="btn btn-featured btn-block btn-featured--cta" onClick={onContinue}>
        {t('landingCta')}
      </button>
    </section>
  )
}
