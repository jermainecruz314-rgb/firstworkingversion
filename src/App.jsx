import { useState } from 'react'
import Login from './screens/Login.jsx'
import Consent from './screens/Consent.jsx'
import HealthHubLoading from './screens/HealthHubLoading.jsx'
import PersonalisedLanding from './screens/PersonalisedLanding.jsx'
import Dashboard from './screens/Dashboard.jsx'
import WhyThisMatters from './screens/WhyThisMatters.jsx'
import FamilyImpact from './screens/FamilyImpact.jsx'
import CostTransparency from './screens/CostTransparency.jsx'
import BookAppointment from './screens/BookAppointment.jsx'
import MyAccount from './screens/MyAccount.jsx'
import NavBar from './components/NavBar.jsx'
import { fetchPatientProfile } from './mockHealthHub.js'

const SCREENS = {
  LOGIN: 'login',
  LOADING: 'loading',
  CONSENT: 'consent',
  LANDING: 'landing',
  DASHBOARD: 'dashboard',
  WHY: 'why',
  FAMILY: 'family',
  COST: 'cost',
  BOOK: 'book',
  ACCOUNT: 'account',
}

// Screens that show the bottom navigation bar.
const NAV_SCREENS = new Set([
  SCREENS.DASHBOARD,
  SCREENS.WHY,
  SCREENS.FAMILY,
  SCREENS.COST,
  SCREENS.BOOK,
  SCREENS.ACCOUNT,
])

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(SCREENS.LOGIN)
  const [selectedProfileId, setSelectedProfileId] = useState(null)
  const [profile, setProfile] = useState(null)
  const [dataAccessGranted, setDataAccessGranted] = useState(true)

  const showNav = NAV_SCREENS.has(currentScreen)

  const handleSignIn = async () => {
    if (!selectedProfileId) return
    setCurrentScreen(SCREENS.LOADING)
    const data = await fetchPatientProfile(selectedProfileId)
    setProfile(data)
    setCurrentScreen(SCREENS.CONSENT)
  }

  const handleConsent = () => {
    setDataAccessGranted(true)
    setCurrentScreen(SCREENS.LANDING)
  }

  const navigateFromDashboard = (target) => {
    const map = {
      why: SCREENS.WHY,
      family: SCREENS.FAMILY,
      cost: SCREENS.COST,
      book: SCREENS.BOOK,
      account: SCREENS.ACCOUNT,
    }
    setCurrentScreen(map[target] ?? SCREENS.DASHBOARD)
  }

  const handleNav = (tab) => {
    if (tab === 'home') setCurrentScreen(SCREENS.DASHBOARD)
    if (tab === 'account') setCurrentScreen(SCREENS.ACCOUNT)
  }

  const navCurrent =
    currentScreen === SCREENS.ACCOUNT ? 'account' : 'home'

  const updateAppointmentStatus = () => {
    setProfile((p) => ({
      ...p,
      appointmentStatus: 'Request sent — awaiting confirmation',
    }))
  }

  return (
    <div className={`app${showNav ? ' has-nav' : ''}`}>
      <header className="app-header">
        <div className="app-brand">
          <span className="app-name">FH Pathway Companion</span>
        </div>
      </header>

      <main className="app-main">
        {currentScreen === SCREENS.LOGIN && (
          <Login
            selectedProfile={selectedProfileId}
            onSelectProfile={setSelectedProfileId}
            onSignIn={handleSignIn}
          />
        )}
        {currentScreen === SCREENS.LOADING && <HealthHubLoading />}
        {currentScreen === SCREENS.CONSENT && (
          <Consent onConsent={handleConsent} />
        )}
        {currentScreen === SCREENS.LANDING && profile && (
          <PersonalisedLanding
            profile={profile}
            onContinue={() => setCurrentScreen(SCREENS.DASHBOARD)}
          />
        )}
        {currentScreen === SCREENS.DASHBOARD && profile && (
          <Dashboard profile={profile} onNavigate={navigateFromDashboard} />
        )}
        {currentScreen === SCREENS.WHY && profile && (
          <WhyThisMatters profile={profile} />
        )}
        {currentScreen === SCREENS.FAMILY && profile && (
          <FamilyImpact profile={profile} />
        )}
        {currentScreen === SCREENS.COST && profile && (
          <CostTransparency profile={profile} />
        )}
        {currentScreen === SCREENS.BOOK && profile && (
          <BookAppointment
            profile={profile}
            onBooked={updateAppointmentStatus}
          />
        )}
        {currentScreen === SCREENS.ACCOUNT && profile && (
          <MyAccount
            profile={profile}
            dataAccessGranted={dataAccessGranted}
            onToggleAccess={setDataAccessGranted}
          />
        )}
      </main>

      {showNav && <NavBar current={navCurrent} onNavigate={handleNav} />}

      <TestPanel
        profile={profile}
        currentScreen={currentScreen}
        setCurrentScreen={setCurrentScreen}
      />
    </div>
  )
}

function TestPanel({ profile, currentScreen, setCurrentScreen }) {
  const [open, setOpen] = useState(false)

  return (
    <div className={`test-panel${open ? ' open' : ''}`}>
      <button
        className="test-panel-toggle"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        {open ? 'Close test panel' : 'Test panel'}
      </button>

      {open && (
        <div className="test-panel-body">
          <p className="test-panel-title">Jump to screen</p>
          <div className="test-panel-nav">
            {Object.entries(SCREENS).map(([key, value]) => (
              <button
                key={value}
                className={`chip${currentScreen === value ? ' active' : ''}`}
                onClick={() => setCurrentScreen(value)}
                disabled={value !== SCREENS.LOGIN && value !== SCREENS.LOADING && !profile}
              >
                {key.toLowerCase()}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
