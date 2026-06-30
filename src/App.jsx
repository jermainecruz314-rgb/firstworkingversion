import { useState } from 'react'
import Login from './screens/Login.jsx'
import Consent from './screens/Consent.jsx'
import HealthHubLoading from './screens/HealthHubLoading.jsx'
import PersonalisedLanding from './screens/PersonalisedLanding.jsx'
import Dashboard from './screens/Dashboard.jsx'
import WhyThisMatters from './screens/WhyThisMatters.jsx'
import FamilyImpact from './screens/FamilyImpact.jsx'
import FamilyConversation from './screens/FamilyConversation.jsx'
import CostTransparency from './screens/CostTransparency.jsx'
import BookAppointment from './screens/BookAppointment.jsx'
import Reminders from './screens/Reminders.jsx'
import PrivacyFaq from './screens/PrivacyFaq.jsx'
import MyAccount from './screens/MyAccount.jsx'
import NavBar from './components/NavBar.jsx'
import LanguageToggle from './components/LanguageToggle.jsx'
import { fetchPatientProfile } from './mockHealthHub.js'

const SCREENS = {
  LOGIN: 'login',
  LOADING: 'loading',
  CONSENT: 'consent',
  LANDING: 'landing',
  DASHBOARD: 'dashboard',
  WHY: 'why',
  FAMILY: 'family',
  FAMILY_TALK: 'familyTalk',
  COST: 'cost',
  BOOK: 'book',
  REMINDERS: 'reminders',
  FAQ: 'faq',
  ACCOUNT: 'account',
}

const NAV_SCREENS = new Set([
  SCREENS.DASHBOARD,
  SCREENS.WHY,
  SCREENS.FAMILY,
  SCREENS.FAMILY_TALK,
  SCREENS.COST,
  SCREENS.BOOK,
  SCREENS.REMINDERS,
  SCREENS.FAQ,
  SCREENS.ACCOUNT,
])

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(SCREENS.LOGIN)
  const [selectedProfileId, setSelectedProfileId] = useState(null)
  const [profile, setProfile] = useState(null)
  const [dataAccessGranted, setDataAccessGranted] = useState(true)

  const showNav = NAV_SCREENS.has(currentScreen)
  const showLang = profile && currentScreen !== SCREENS.LOGIN && currentScreen !== SCREENS.LOADING

  const handleSignIn = async () => {
    if (!selectedProfileId) return
    setCurrentScreen(SCREENS.LOADING)
    const data = await fetchPatientProfile(selectedProfileId)
    setProfile({
      ...data,
      appointmentSlotId: null,
      appointmentSlotLabel: null,
      appointmentDate: null,
    })
    setCurrentScreen(SCREENS.CONSENT)
  }

  const handleConsent = () => {
    setDataAccessGranted(true)
    setCurrentScreen(SCREENS.LANDING)
  }

  const setLanguage = (lang) => {
    setProfile((p) => (p ? { ...p, preferredLanguage: lang } : p))
  }

  const navigateFromDashboard = (target) => {
    const map = {
      why: SCREENS.WHY,
      family: SCREENS.FAMILY,
      familyTalk: SCREENS.FAMILY_TALK,
      cost: SCREENS.COST,
      book: SCREENS.BOOK,
      reminders: SCREENS.REMINDERS,
      faq: SCREENS.FAQ,
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

  const handleBook = (slot) => {
    setProfile((p) => ({
      ...p,
      appointmentStatus: 'Booked',
      appointmentSlotId: slot.id,
      appointmentSlotLabel: slot.label,
      appointmentDate: slot.date,
    }))
  }

  const handleRemindLater = () => {
    setProfile((p) => ({
      ...p,
      appointmentStatus: 'Reminder scheduled',
    }))
    setCurrentScreen(SCREENS.DASHBOARD)
  }

  return (
    <div className={`app${showNav ? ' has-nav' : ''}`}>
      <header className="app-header">
        <div className="app-brand">
          <span className="app-name">FH Pathway Companion</span>
          {showLang && (
            <LanguageToggle
              value={profile.preferredLanguage}
              onChange={setLanguage}
            />
          )}
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
          <FamilyImpact
            profile={profile}
            onOpenFamilyTalk={() => setCurrentScreen(SCREENS.FAMILY_TALK)}
          />
        )}
        {currentScreen === SCREENS.FAMILY_TALK && profile && (
          <FamilyConversation profile={profile} />
        )}
        {currentScreen === SCREENS.COST && profile && (
          <CostTransparency profile={profile} />
        )}
        {currentScreen === SCREENS.BOOK && profile && (
          <BookAppointment
            profile={profile}
            onBook={handleBook}
            onRemindLater={handleRemindLater}
          />
        )}
        {currentScreen === SCREENS.REMINDERS && profile && (
          <Reminders profile={profile} />
        )}
        {currentScreen === SCREENS.FAQ && profile && (
          <PrivacyFaq />
        )}
        {currentScreen === SCREENS.ACCOUNT && profile && (
          <MyAccount
            profile={profile}
            dataAccessGranted={dataAccessGranted}
            onToggleAccess={setDataAccessGranted}
            onOpenFaq={() => setCurrentScreen(SCREENS.FAQ)}
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
