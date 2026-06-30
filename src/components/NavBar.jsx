// Persistent bottom navigation — Home and My Account — from the dashboard
// onward so the patient can always return to the hub.
export default function NavBar({ current, onNavigate }) {
  return (
    <nav className="nav-bar" aria-label="Main navigation">
      <button
        type="button"
        className={`nav-item${current === 'home' ? ' active' : ''}`}
        onClick={() => onNavigate('home')}
      >
        <NavIconHome />
        <span>Home</span>
      </button>
      <button
        type="button"
        className={`nav-item${current === 'account' ? ' active' : ''}`}
        onClick={() => onNavigate('account')}
      >
        <NavIconUser />
        <span>My Account</span>
      </button>
    </nav>
  )
}

function NavIconHome() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9.5z" strokeLinejoin="round" />
    </svg>
  )
}

function NavIconUser() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" strokeLinecap="round" />
    </svg>
  )
}
