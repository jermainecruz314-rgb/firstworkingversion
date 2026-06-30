import { useState } from 'react'
import SecurityBadge from '../components/SecurityBadge.jsx'
import FamilyTreeIcon from '../components/FamilyTreeIcon.jsx'
import { formatDate } from '../utils.js'
import { translateStatus, LANG_OPTIONS } from '../i18n/index.js'

export default function MyAccount({ profile, dataAccessGranted, onToggleAccess, onOpenFaq, t }) {
  const [deleteRequested, setDeleteRequested] = useState(false)
  const isCascade = profile.pathwayType === 'cascade'

  const consentPoints = [
    'consentPointReferralDetails',
    'consentPointCholesterolResults',
    'consentPointAppointmentStatus',
    'consentPointPreferredLanguage',
    'consentPointCareTeamContact',
  ]

  const langLabel =
    LANG_OPTIONS.find((o) => o.code === profile.preferredLanguage)?.native ??
    profile.preferredLanguage

  return (
    <section className="screen">
      <SecurityBadge t={t} />

      <div className="card">
        <span className="eyebrow">{t('accountEyebrow')}</span>
        <h1 className="screen-title">{t('accountTitle')}</h1>

        <dl className="record-list">
          <RecordRow label={t('labelName')} value={profile.name} />
          <RecordRow
            label={t('labelPathway')}
            value={
              isCascade ? (
                <span className="record-family">
                  <FamilyTreeIcon size={18} />
                  {t('pathwayCascade')}
                </span>
              ) : (
                t('pathwayIndex')
              )
            }
          />
          <RecordRow label={t('labelReferredBy')} value={profile.referredBy} />
          <RecordRow label={t('labelReferralDate')} value={formatDate(profile.referralDate)} />
          <RecordRow label={t('labelLanguage')} value={langLabel} />
        </dl>
      </div>

      <div className="card">
        <span className="eyebrow">{t('accountDataEyebrow')}</span>
        <h2 className="section-title">{t('accountDataTitle')}</h2>
        <p className="body-text">{t('accountDataLead')}</p>
        <ul className="consent-list compact">
          {consentPoints.map((key) => (
            <li key={key}>{t(key)}</li>
          ))}
        </ul>

        <div className="access-toggle">
          <button
            type="button"
            className={`toggle${dataAccessGranted ? ' on' : ''}`}
            role="switch"
            aria-checked={dataAccessGranted}
            onClick={() => onToggleAccess(!dataAccessGranted)}
          >
            <span className="toggle-track">
              <span className="toggle-thumb" />
            </span>
            <span className="toggle-label">
              {dataAccessGranted ? t('accountAccessGranted') : t('accountAccessRevoked')}
            </span>
          </button>
        </div>
        {!dataAccessGranted && (
          <p className="helper-note">{t('accountAccessRevokedNote')}</p>
        )}
      </div>

      <div className="card">
        <span className="eyebrow">{t('accountFaqEyebrow')}</span>
        <h2 className="section-title">{t('accountFaqTitle')}</h2>
        <p className="body-text">{t('accountFaqLead')}</p>
        <button type="button" className="btn btn-secondary" onClick={onOpenFaq}>
          {t('accountFaqButton')}
        </button>
      </div>

      <div className="card">
        <span className="eyebrow">{t('accountSecurityEyebrow')}</span>
        <h2 className="section-title">{t('accountSecurityTitle')}</h2>
        <div className="info-list">
          <div className="info-item">
            <p className="info-body">{t('accountSecurityPoint1')}</p>
          </div>
          <div className="info-item">
            <p className="info-body">{t('accountSecurityPoint2')}</p>
          </div>
          <div className="info-item">
            <p className="info-body">{t('accountSecurityPoint3')}</p>
            {deleteRequested ? (
              <p className="confirmation-inline" role="status">
                {t('accountDeleteRequested')}
              </p>
            ) : (
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => setDeleteRequested(true)}
              >
                {t('accountDeleteButton')}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function RecordRow({ label, value }) {
  return (
    <div className="record-row">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  )
}
