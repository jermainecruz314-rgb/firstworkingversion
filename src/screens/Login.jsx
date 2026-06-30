import { PROFILE_OPTIONS } from '../mockHealthHub.js'

// Entry screen: mock Singpass sign-in with demo profile picker.
// Every user must log in — there is no guest path.
export default function Login({ selectedProfile, onSelectProfile, onSignIn }) {
  return (
    <section className="screen auth-screen">
      <div className="card auth-card">
        <span className="eyebrow">Welcome</span>
        <h1 className="screen-title">FH Pathway Companion</h1>
        <p className="lead">
          Sign in to securely link your health records and personalise your
          journey.
        </p>

        <div className="demo-picker">
          <p className="group-title">Choose a demo profile</p>
          <div className="demo-options">
            {PROFILE_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                className={`demo-option${selectedProfile === opt.id ? ' selected' : ''}${
                  opt.id === 'cascade' ? ' family' : ''
                }`}
                onClick={() => onSelectProfile(opt.id)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <button
          className="btn btn-primary"
          onClick={onSignIn}
          disabled={!selectedProfile}
        >
          Sign in with Singpass
        </button>

        <p className="muted auth-foot">
          A simulated sign-in for demonstration. No real account is used.
        </p>
      </div>
    </section>
  )
}
