import Stepper from '../components/Stepper.jsx'
import { formatDate } from '../utils.js'

// Screen 1: a warm, reassuring referral notification.
export default function ReferralNotification({ patient, onContinue }) {
  return (
    <section className="screen">
      <Stepper currentStage={0} />

      <div className="card">
        <span className="eyebrow">A note from your care team</span>
        <h1 className="screen-title">Hello {patient.name}</h1>

        <p className="lead">
          Thank you for taking this step with us. We&apos;d like to share something
          from your recent results and walk through it together, at your pace.
        </p>

        <div className="highlight">
          <p className="highlight-label">Your recent LDL cholesterol reading</p>
          <p className="highlight-value">
            {patient.ldlValue} <span className="unit">mmol/L</span>
          </p>
        </div>

        <p className="body-text">
          Based on this result, your doctor has gently referred you to the{' '}
          <strong>Genetic Assessment Centre</strong>, part of Singapore&apos;s
          National FH Genetic Testing Program. This is simply an invitation to
          learn more — there&apos;s nothing you need to worry about right now.
        </p>

        <p className="muted">
          Referral created on {formatDate(patient.referralDate)}
        </p>

        <button className="btn btn-primary" onClick={onContinue}>
          Continue
        </button>
      </div>
    </section>
  )
}
