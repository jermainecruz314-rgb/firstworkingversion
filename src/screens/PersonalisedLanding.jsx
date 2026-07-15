import SecurityBadge from '../components/SecurityBadge.jsx'
import ProfileStrip from '../components/ProfileStrip.jsx'
import LdlGauge from '../components/LdlGauge.jsx'
import FamilyTreeDiagram from '../components/FamilyTreeDiagram.jsx'
import { formatDate, resolveAppointmentSlotLabel } from '../utils.js'
import { translateStatus, LANG_OPTIONS, localizeProfile } from '../i18n/index.js'
import { LDL_THRESHOLD } from '../logic.js'

const REFERRAL_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path d="M14 2H6a2 2 0 0 0-2 2v16l4-2 4 2 4-2 4 2V8z" strokeLinejoin="round" />
    <path d="M9 12h6M9 16h4" strokeLinecap="round" />
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
                <span className="ldl-threshold-badge">{t('ldlAboveThreshold')}</span>
              )}
            </span>
          )}
        </>
      ),
    },
  ]

  if (isCascade && localized.inheritanceRisk) {
    rows.push({
      id: 'inheritanceRisk',
      label: t('labelInheritanceRisk'),
      value: localized.inheritanceRisk,
    })
  }

  const appointmentSlot = resolveAppointmentSlotLabel(profile, langCode)
  const appointmentValue = appointmentSlot
    ? `${translateStatus(profile.appointmentStatus, t)} · ${appointmentSlot}`
    : translateStatus(profile.appointmentStatus, t)

  rows.push(
    {
      id: 'appointment',
      label: t('labelAppointment'),
      value: appointmentValue,
    },
    { id: 'language', label: t('labelPreferredLanguage'), value: langLabel }
  )

  return (
    <section className="screen screen--hb">
      <SecurityBadge t={t} />
      <ProfileStrip name={profile.name} meta={pathwayBadge} />

      <div className="hb-card hb-card--peach">
        <p className="hb-card-kicker">{t('landingEyebrow')}</p>
        <h1 className="hb-card-title">{t('landingGreeting', { name: profile.name })}</h1>
        <p className="hb-card-lead">{t('landingLead')}</p>
      </div>

      <div className="hb-section-head">
        <span className="hb-section-icon">{REFERRAL_ICON}</span>
        <h2 className="hb-section-title">{t('landingReferralDetails')}</h2>
      </div>

      <div className="hb-card hb-card--white hb-referral-card">
        {!isCascade && profile.ldlValue != null && (
          <div className="hb-referral-visual">
            <LdlGauge ldlValue={profile.ldlValue} t={t} />
          </div>
        )}

        {isCascade && (
          <div className="hb-referral-visual">
            <FamilyTreeDiagram caption="FH is inherited. Each first-degree relative has a 50% chance of carrying the same gene variant." />
          </div>
        )}

        <dl className="hb-detail-list">
          {rows.map((row) => (
            <div key={row.id} className="hb-detail-row">
              <dt>{row.label}</dt>
              <dd>{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="hb-card hb-card--yellow hb-promo-card">
        <p className="hb-promo-text">{t('landingReassurance')}</p>
      </div>

      <button type="button" className="hb-btn-orange tap-card" onClick={onContinue}>
        {t('landingCta')}
      </button>
    </section>
  )
}
