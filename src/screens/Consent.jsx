import ConsentIconRow from '../components/ConsentIconRow.jsx'

const ACCESS_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
)

export default function Consent({ onConsent, t }) {
  const consentPoints = [
    'consentPointReferralDetails',
    'consentPointCholesterolResults',
    'consentPointAppointmentStatus',
    'consentPointPreferredLanguage',
    'consentPointCareTeamContact',
    'consentPointSmsReminders',
  ]

  return (
    <section className="screen screen--hb screen--consent auth-screen">
      <div className="hb-card hb-card--peach">
        <p className="hb-card-kicker">{t('consentEyebrow')}</p>
        <h1 className="hb-card-title">{t('consentTitle')}</h1>
        <p className="hb-card-lead">{t('consentLead')}</p>
      </div>

      <div className="hb-section-head">
        <span className="hb-section-icon">{ACCESS_ICON}</span>
        <h2 className="hb-section-title">{t('consentWhatAccess')}</h2>
      </div>

      <div className="hb-card hb-card--white">
        <div className="consent-icon-rows">
          {consentPoints.map((key) => (
            <ConsentIconRow key={key}>{t(key)}</ConsentIconRow>
          ))}
        </div>
      </div>

      <div className="hb-card hb-card--yellow hb-promo-card">
        <p className="hb-promo-text">{t('consentPrivacyNote')}</p>
      </div>

      <button type="button" className="hb-btn-orange tap-card" onClick={onConsent}>
        {t('consentButton')}
      </button>
    </section>
  )
}
