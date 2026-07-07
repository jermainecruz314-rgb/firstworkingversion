import ConsentIconRow from '../components/ConsentIconRow.jsx'

const SHIELD_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path d="M12 3l7 3v6c0 4.5-3.5 8.5-7 9.5-3.5-1-7-5-7-9.5V6l7-3z" strokeLinejoin="round" />
    <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function Consent({ onConsent, t }) {
  const consentPoints = [
    'consentPointReferralDetails',
    'consentPointCholesterolResults',
    'consentPointAppointmentStatus',
    'consentPointPreferredLanguage',
    'consentPointCareTeamContact',
  ]

  return (
    <section className="screen screen--consent auth-screen">
      <div className="consent-sheet">
        <header className="consent-sheet-head">
          <p className="consent-sheet-eyebrow">{t('consentEyebrow')}</p>
          <h1 className="consent-sheet-title">{t('consentTitle')}</h1>
          <p className="consent-sheet-lead">{t('consentLead')}</p>
        </header>

        <div className="consent-access-block">
          <h2 className="consent-access-heading">{t('consentWhatAccess')}</h2>
          <div className="consent-icon-rows">
            {consentPoints.map((key) => (
              <ConsentIconRow key={key} iconKey={key}>
                {t(key)}
              </ConsentIconRow>
            ))}
          </div>
        </div>

        <div className="consent-trust-note">
          <span className="consent-trust-icon">{SHIELD_ICON}</span>
          <p>{t('consentPrivacyNote')}</p>
        </div>

        <button type="button" className="btn btn-warm btn-block" onClick={onConsent}>
          {t('consentButton')}
        </button>
      </div>
    </section>
  )
}
