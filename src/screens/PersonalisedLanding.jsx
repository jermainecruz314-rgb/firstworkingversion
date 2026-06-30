import SecurityBadge from '../components/SecurityBadge.jsx'
import FamilyTreeIcon from '../components/FamilyTreeIcon.jsx'
import { formatDate } from '../utils.js'

// Personalised landing page — feels like data pulled from a real health record.
export default function PersonalisedLanding({ profile, onContinue }) {
  const isCascade = profile.pathwayType === 'cascade'

  return (
    <section className="screen">
      <SecurityBadge />

      <div className="card">
        <span className="eyebrow">Your referral summary</span>
        <h1 className="screen-title">Hello, {profile.name}</h1>
        <p className="lead">
          We&apos;ve pulled together the details from your referral so you can see
          exactly where things stand.
        </p>

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

        <p className="body-text">
          This is an invitation to learn more through Singapore&apos;s National FH
          Genetic Testing Program. There&apos;s nothing you need to worry about right
          now — take your time.
        </p>

        <button className="btn btn-primary" onClick={onContinue}>
          Go to my dashboard
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
