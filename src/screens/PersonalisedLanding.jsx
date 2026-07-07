import SecurityBadge from '../components/SecurityBadge.jsx'
import FamilyTreeIcon from '../components/FamilyTreeIcon.jsx'
import { formatDate } from '../utils.js'
import { translateStatus, LANG_OPTIONS } from '../i18n/index.js'

export default function PersonalisedLanding({ profile, onContinue, t }) {
  const isCascade = profile.pathwayType === 'cascade'
  const langLabel =
    LANG_OPTIONS.find((o) => o.code === profile.preferredLanguage)?.native ??
    profile.preferredLanguage

  return (
    <section className="screen">
      <SecurityBadge t={t} />

      <div className="card">
        <span className="eyebrow">{t('landingEyebrow')}</span>
        <h1 className="screen-title">{t('landingGreeting', { name: profile.name })}</h1>
        <p className="lead">{t('landingLead')}</p>

        <dl className="record-list card-data">
          <RecordRow label={t('labelReferredBy')} value={profile.referredBy} />
          <RecordRow label={t('labelReferralDate')} value={formatDate(profile.referralDate)} />
          <RecordRow
            label={t('labelReferralReason')}
            value={
              isCascade ? (
                <span className="record-family">
                  <FamilyTreeIcon size={18} />
                  {profile.relationToIndex}
                </span>
              ) : (
                <>
                  {profile.referralReason}
                  {profile.ldlValue != null && (
                    <span className="record-ldl"> — LDL {profile.ldlValue} mmol/L</span>
                  )}
                </>
              )
            }
          />
          {isCascade && profile.inheritanceRisk && (
            <RecordRow label={t('labelInheritanceRisk')} value={profile.inheritanceRisk} family />
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
