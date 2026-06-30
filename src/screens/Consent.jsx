import { REQUESTED_DATA } from '../mockHealthHub.js'

// HealthHub consent screen. Plain-language explanation of what's requested,
// the specific data points, and an honest privacy note.
export default function Consent({ onAllow, onDeny }) {
  return (
    <section className="screen auth-screen">
      <div className="card">
        <span className="eyebrow">HealthHub</span>
        <h1 className="screen-title">A quick permission</h1>
        <p className="lead">
          FH Pathway Companion would like to access your recent cholesterol (LDL)
          test results from HealthHub to personalise your experience.
        </p>

        <div className="consent-list-wrap">
          <p className="group-title">What we&apos;ll access</p>
          <ul className="consent-list">
            {REQUESTED_DATA.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <p className="privacy-note">
          Your data stays within Singapore&apos;s national health data protection
          framework and is never shared with third parties without your consent.
        </p>

        <button className="btn btn-primary" onClick={onAllow}>
          Allow access
        </button>
        <button className="btn btn-secondary" onClick={onDeny}>
          Not now
        </button>
      </div>
    </section>
  )
}
