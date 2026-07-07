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
    <section className="screen auth-screen">
      <div className="card">
        <span className="eyebrow">{t('consentEyebrow')}</span>
        <h1 className="screen-title">{t('consentTitle')}</h1>
        <p className="lead">{t('consentLead')}</p>

        <div className="consent-list-wrap">
          <p className="consent-section-title">{t('consentWhatAccess')}</p>
          <div className="consent-icon-rows">
            {consentPoints.map((key) => (
              <ConsentIconRow key={key} iconKey={key}>
                {t(key)}
              </ConsentIconRow>
            ))}
          </div>
        </div>

        <div className="privacy-note privacy-note--positive">
          <span className="privacy-note-icon">{SHIELD_ICON}</span>
          <p>{t('consentPrivacyNote')}</p>
        </div>

        <button className="btn btn-featured btn-block btn-featured--cta" onClick={onConsent}>
          {t('consentButton')}
        </button>
      </div>
    </section>
  )
}
