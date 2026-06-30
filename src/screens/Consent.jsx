import { CONSENT_DATA_POINTS } from '../mockHealthHub.js'

// Brief consent step between sign-in and the personalised landing page.
// Single screen, one button — no "not now" path.
export default function Consent({ onConsent }) {
  return (
    <section className="screen auth-screen">
      <div className="card">
        <span className="eyebrow">Your permission</span>
        <h1 className="screen-title">Before we begin</h1>
        <p className="lead">
          To personalise your journey, FH Pathway Companion needs to access a
          small amount of information from your health record.
        </p>

        <div className="consent-list-wrap">
          <p className="group-title">What we&apos;ll access</p>
          <ul className="consent-list">
            {CONSENT_DATA_POINTS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <p className="privacy-note">
          Your data stays within Singapore&apos;s national health data protection
          framework and is never shared with third parties without your consent.
        </p>

        <button className="btn btn-primary" onClick={onConsent}>
          I consent
        </button>
      </div>
    </section>
  )
}
