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
          <p className="group-title">{t('consentWhatAccess')}</p>
          <ul className="consent-list">
            {consentPoints.map((key) => (
              <li key={key}>{t(key)}</li>
            ))}
          </ul>
        </div>

        <p className="privacy-note">{t('consentPrivacyNote')}</p>

        <button className="btn btn-primary" onClick={onConsent}>
          {t('consentButton')}
        </button>
      </div>
    </section>
  )
}
