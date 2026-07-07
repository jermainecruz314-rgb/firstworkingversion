import SecurityBadge from '../components/SecurityBadge.jsx'
import FamilyTreeIcon from '../components/FamilyTreeIcon.jsx'
import { formatDate } from '../utils.js'
import { translateStatus, LANG_OPTIONS, localizeProfile } from '../i18n/index.js'

export default function PersonalisedLanding({ profile, onContinue, t, language }) {
  const localized = localizeProfile(t, profile)
  const isCascade = profile.pathwayType === 'cascade'
  const langCode = language ?? profile.preferredLanguage ?? 'en'
  const langLabel =
    LANG_OPTIONS.find((o) => o.code === langCode)?.native ?? langCode

  return (
    <section className="screen">
      <SecurityBadge t={t} />

      <div className="card">
        <span className="eyebrow">{t('landingEyebrow')}</span>
        <h1 className="screen-title">{t('landingGreeting', { name: profile.name })}</h1>
        <p className="lead">{t('landingLead')}</p>

        <dl className="record-list card-data">
          <RecordRow label={t('labelReferredBy')} value={localized.referredBy} />
          <RecordRow
            label={t('labelReferralDate')}
            value={formatDate(profile.referralDate, langCode)}
          />
          <RecordRow
            label={t('labelReferralReason')}
            value={
              isCascade ? (
                <span className="record-family">
                  <FamilyTreeIcon size={18} />
                  {localized.relationToIndex}
                </span>
              ) : (
                <>
                  {localized.referralReason}
                  {profile.ldlValue != null && (
                    <span className="record-ldl">
                      {' '}
                      — {t('landingLdlReading', { ldl: profile.ldlValue })}
                    </span>
                  )}
                </>
              )
            }
          />
          {isCascade && localized.inheritanceRisk && (
            <RecordRow
              label={t('labelInheritanceRisk')}
              value={localized.inheritanceRisk}
              family
            />
          )}
          <RecordRow
            label={t('labelAppointment')}
            value={translateStatus(profile.appointmentStatus, t)}
          />
          <RecordRow label={t('labelPreferredLanguage')} value={langLabel} />
        </dl>

        <p className="body-text">{t('landingReassurance')}</p>

        <button className="btn btn-primary btn-block" onClick={onContinue}>
          {t('landingCta')}
        </button>
      </div>
    </section>
  )
}

function RecordRow({ label, value, family }) {
  return (
    <div className={`record-row${family ? ' family' : ''}`}>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  )
}
