import { useState } from 'react'
import SecurityBadge from '../components/SecurityBadge.jsx'
import FamilyTreeIcon from '../components/FamilyTreeIcon.jsx'
import DashIcon from '../components/DashIcon.jsx'
import CardWatermark from '../components/CardWatermark.jsx'
import { formatDate } from '../utils.js'
import { translateStatus, LANG_OPTIONS, localizeProfile } from '../i18n/index.js'

const SHIELD_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path d="M12 3l7 3v6c0 5-3.5 7.5-7 9-3.5-1.5-7-4-7-9V6l7-3z" strokeLinejoin="round" />
    <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function MyAccount({ profile, dataAccessGranted, onToggleAccess, onOpenFaq, t }) {
  const [deleteRequested, setDeleteRequested] = useState(false)
  const isCascade = profile.pathwayType === 'cascade'
  const localized = localizeProfile(t, profile)

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

      <div className="card card--decorated">
        <CardWatermark id="account" />
        <div className="screen-hero">
          <DashIcon id="account" />
          <span className="eyebrow">{t('accountEyebrow')}</span>
        </div>
        <h1 className="screen-title">{t('accountTitle')}</h1>

        <dl className="record-list card-data">
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
          <RecordRow label={t('labelReferredBy')} value={localized.referredBy} />
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
        <button type="button" className="btn btn-secondary btn-inline" onClick={onOpenFaq}>
          {t('accountFaqButton')}
        </button>
      </div>

      <div className="card">
        <span className="eyebrow">{t('accountSecurityEyebrow')}</span>
        <h2 className="section-title">{t('accountSecurityTitle')}</h2>
        <div className="info-list">
          <div className="info-item sage">
            <span className="icon-chip icon-chip--sage">{SHIELD_ICON}</span>
            <span className="info-item-copy">
              <p className="info-body">{t('accountSecurityPoint1')}</p>
            </span>
          </div>
          <div className="info-item sage">
            <span className="icon-chip icon-chip--sage">{SHIELD_ICON}</span>
            <span className="info-item-copy">
              <p className="info-body">{t('accountSecurityPoint2')}</p>
            </span>
          </div>
          <div className="info-item sage">
            <span className="icon-chip icon-chip--sage">{SHIELD_ICON}</span>
            <span className="info-item-copy">
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
            </span>
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
