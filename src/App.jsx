import { useState, useMemo } from 'react'
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
import AppHeader from './components/AppHeader.jsx'
import { createT } from './i18n/index.js'
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

const BACK_SCREENS = new Set([
  SCREENS.WHY,
  SCREENS.FAMILY,
  SCREENS.FAMILY_TALK,
  SCREENS.COST,
  SCREENS.BOOK,
  SCREENS.REMINDERS,
  SCREENS.FAQ,
])

const HEADER_TITLE_KEYS = {
  [SCREENS.WHY]: 'dashboardCardWhyTitle',
  [SCREENS.FAMILY]: 'dashboardCardFamilyTitle',
  [SCREENS.FAMILY_TALK]: 'dashboardCardFamilyTalkTitle',
  [SCREENS.COST]: 'dashboardCardCostTitle',
  [SCREENS.BOOK]: 'dashboardCardBookTitle',
  [SCREENS.REMINDERS]: 'dashboardCardRemindersTitle',
  [SCREENS.FAQ]: 'dashboardCardFaqTitle',
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(SCREENS.LOGIN)
  const [language, setLanguageState] = useState('en')
  const [selectedProfileId, setSelectedProfileId] = useState(null)
  const [profile, setProfile] = useState(null)
  const [dataAccessGranted, setDataAccessGranted] = useState(true)

  const t = useMemo(() => createT(language), [language])
  const showNav = NAV_SCREENS.has(currentScreen)
  const showHeaderLang =
    profile && currentScreen !== SCREENS.LOGIN && currentScreen !== SCREENS.LOADING
  const showBack = BACK_SCREENS.has(currentScreen)
  const headerTitleKey = HEADER_TITLE_KEYS[currentScreen]
  const headerTitle = headerTitleKey ? t(headerTitleKey) : ''

  const setLanguage = (lang) => {
    setLanguageState(lang)
    setProfile((p) => (p ? { ...p, preferredLanguage: lang } : p))
  }

  const handleSignIn = async () => {
    if (!selectedProfileId) return
    setCurrentScreen(SCREENS.LOADING)
    const data = await fetchPatientProfile(selectedProfileId)
    setProfile({ ...data, preferredLanguage: language })
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

  const handleBack = () => setCurrentScreen(SCREENS.DASHBOARD)

  const navCurrent = currentScreen === SCREENS.ACCOUNT ? 'account' : 'home'

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

  const screenProps = { profile, t }

  return (
    <div className={`app${showNav ? ' has-nav' : ''}`}>
      <AppHeader
        appName={t('appName')}
        title={headerTitle}
        showBack={showBack}
        onBack={handleBack}
        showLang={showHeaderLang}
        language={language}
        onLanguageChange={setLanguage}
        backLabel={t('headerBackAria')}
        t={t}
      />

      <main className="app-main">
        {currentScreen === SCREENS.LOGIN && (
          <Login
            language={language}
            onLanguageChange={setLanguage}
            selectedProfile={selectedProfileId}
            onSelectProfile={setSelectedProfileId}
            onSignIn={handleSignIn}
            t={t}
          />
        )}
        {currentScreen === SCREENS.LOADING && <HealthHubLoading t={t} />}
        {currentScreen === SCREENS.CONSENT && (
          <Consent onConsent={handleConsent} t={t} />
        )}
        {currentScreen === SCREENS.LANDING && profile && (
          <PersonalisedLanding
            profile={profile}
            onContinue={() => setCurrentScreen(SCREENS.DASHBOARD)}
            t={t}
          />
        )}
        {currentScreen === SCREENS.DASHBOARD && profile && (
          <Dashboard profile={profile} onNavigate={navigateFromDashboard} t={t} />
        )}
        {currentScreen === SCREENS.WHY && profile && (
          <WhyThisMatters {...screenProps} />
        )}
        {currentScreen === SCREENS.FAMILY && profile && (
          <FamilyImpact
            {...screenProps}
            onOpenFamilyTalk={() => setCurrentScreen(SCREENS.FAMILY_TALK)}
          />
        )}
        {currentScreen === SCREENS.FAMILY_TALK && profile && (
          <FamilyConversation {...screenProps} />
        )}
        {currentScreen === SCREENS.COST && profile && (
          <CostTransparency {...screenProps} />
        )}
        {currentScreen === SCREENS.BOOK && profile && (
          <BookAppointment
            profile={profile}
            onBook={handleBook}
            onRemindLater={handleRemindLater}
            t={t}
          />
        )}
        {currentScreen === SCREENS.REMINDERS && profile && (
          <Reminders {...screenProps} />
        )}
        {currentScreen === SCREENS.FAQ && profile && <PrivacyFaq t={t} />}
        {currentScreen === SCREENS.ACCOUNT && profile && (
          <MyAccount
            profile={profile}
            dataAccessGranted={dataAccessGranted}
            onToggleAccess={setDataAccessGranted}
            onOpenFaq={() => setCurrentScreen(SCREENS.FAQ)}
            t={t}
          />
        )}
      </main>

      {showNav && <NavBar current={navCurrent} onNavigate={handleNav} t={t} />}

      <TestPanel
        profile={profile}
        currentScreen={currentScreen}
        setCurrentScreen={setCurrentScreen}
        t={t}
      />
    </div>
  )
}

const SCREEN_LABEL_KEYS = {
  LOGIN: 'screenLogin',
  LOADING: 'screenLoading',
  CONSENT: 'screenConsent',
  LANDING: 'screenLanding',
  DASHBOARD: 'screenDashboard',
  WHY: 'screenWhy',
  FAMILY: 'screenFamily',
  FAMILY_TALK: 'screenFamilyTalk',
  COST: 'screenCost',
  BOOK: 'screenBook',
  REMINDERS: 'screenReminders',
  FAQ: 'screenFaq',
  ACCOUNT: 'screenAccount',
}

function TestPanel({ profile, currentScreen, setCurrentScreen, t }) {
  const [open, setOpen] = useState(false)

  return (
    <div className={`test-panel${open ? ' open' : ''}`}>
      <button
        className="test-panel-toggle"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        {open ? t('testPanelClose') : t('testPanelOpen')}
      </button>

      {open && (
        <div className="test-panel-body">
          <p className="test-panel-title">{t('testPanelJumpToScreen')}</p>
          <div className="test-panel-nav">
            {Object.entries(SCREENS).map(([key, value]) => (
              <button
                key={value}
                className={`chip${currentScreen === value ? ' active' : ''}`}
                onClick={() => setCurrentScreen(value)}
                disabled={value !== SCREENS.LOGIN && value !== SCREENS.LOADING && !profile}
              >
                {t(SCREEN_LABEL_KEYS[key] ?? key)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
