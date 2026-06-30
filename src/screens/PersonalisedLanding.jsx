import SecurityBadge from '../components/SecurityBadge.jsx'
import FamilyTreeIcon from '../components/FamilyTreeIcon.jsx'
import { formatDate } from '../utils.js'
import { getStrings } from '../translations.js'

export default function PersonalisedLanding({ profile, onContinue }) {
  const isCascade = profile.pathwayType === 'cascade'
  const t = getStrings(profile.preferredLanguage).landing

  return (
    <section className="screen">
      <SecurityBadge />

      <div className="card">
        <span className="eyebrow">{t.eyebrow}</span>
        <h1 className="screen-title">{t.greeting(profile.name)}</h1>
        <p className="lead">{t.lead}</p>

        <dl className="record-list">
          <RecordRow label="Referred by" value={profile.referredBy} />
          <RecordRow label="Referral date" value={formatDate(profile.referralDate)} />
          <RecordRow
            label="Referral reason"
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
                    <span className="record-ldl">
                      {' '}
                      — LDL {profile.ldlValue} mmol/L
                    </span>
                  )}
                </>
              )
            }
          />
          {isCascade && profile.inheritanceRisk && (
            <RecordRow label="Inheritance risk" value={profile.inheritanceRisk} family />
          )}
          <RecordRow label="Appointment" value={profile.appointmentStatus} />
          <RecordRow label="Preferred language" value={profile.preferredLanguage} />
        </dl>

        <p className="body-text">{t.reassurance}</p>

        <button className="btn btn-primary" onClick={onContinue}>
          {t.cta}
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
