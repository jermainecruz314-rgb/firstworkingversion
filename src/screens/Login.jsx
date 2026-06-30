// Entry screen: a calm, centred mock sign-in. No real authentication —
// "Sign in with Singpass" simply transitions forward for the demo.
export default function Login({ onSignIn, onGuest }) {
  return (
    <section className="screen auth-screen">
      <div className="card auth-card">
        <span className="eyebrow">Welcome</span>
        <h1 className="screen-title">FH Pathway Companion</h1>
        <p className="lead">
          Sign in to securely link your health records and personalise your
          journey.
        </p>

        <button className="btn btn-primary" onClick={onSignIn}>
          Sign in with Singpass
        </button>

        <button className="btn-link" onClick={onGuest}>
          Continue as guest
        </button>

        <p className="muted auth-foot">
          A simulated sign-in for demonstration. No real account is used.
        </p>
      </div>
    </section>
  )
}
