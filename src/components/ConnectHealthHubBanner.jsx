// A gentle, persistent prompt shown on the journey screens when the patient
// hasn't linked HealthHub yet, letting them grant access later.
export default function ConnectHealthHubBanner({ onConnect }) {
  return (
    <button type="button" className="connect-banner" onClick={onConnect}>
      <span className="connect-text">
        Connect HealthHub to personalise your journey
      </span>
      <span className="connect-cta">Connect</span>
    </button>
  )
}
