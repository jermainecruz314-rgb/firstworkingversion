import { useState } from 'react'
import Login from './screens/Login.jsx'
import Consent from './screens/Consent.jsx'
import HealthHubLoading from './screens/HealthHubLoading.jsx'
import ReferralNotification from './screens/ReferralNotification.jsx'
import WhyThisMatters from './screens/WhyThisMatters.jsx'
import CostTransparency from './screens/CostTransparency.jsx'
import { fetchHealthHubData } from './mockHealthHub.js'
import { todayISO } from './utils.js'

const SCREENS = {
  LOGIN: 'login',
  CONSENT: 'consent',
  LOADING: 'loading',
  REFERRAL: 'referral',
  WHY: 'why',
  COST: 'cost',
}

// The patient's starting state before any HealthHub data is loaded.
const EMPTY_PATIENT = {
  name: '',
  ldlValue: null,
  referralDate: todayISO(),
  preferredLanguage: 'English',
}

export default function App() {
  // Simple client-side navigation — no routing library, just state.
  const [currentScreen, setCurrentScreen] = useState(SCREENS.LOGIN)

  // 'healthhub' once data is linked, 'manual' for guest / "Not now".
  const [dataSource, setDataSource] = useState('manual')
  const [hhConnected, setHhConnected] = useState(false)

  // Where to return to once the consent flow completes (defaults to the
  // start of the care journey, but the "Connect HealthHub" banner can set it
  // to whichever screen the patient was on).
  const [postConsentScreen, setPostConsentScreen] = useState(SCREENS.REFERRAL)

  const [patient, setPatient] = useState(EMPTY_PATIENT)

  const updatePatient = (field, value) =>
    setPatient((prev) => ({ ...prev, [field]: value }))

  const handleSignIn = () => setCurrentScreen(SCREENS.CONSENT)

  const handleGuest = () => {
    setDataSource('manual')
    setCurrentScreen(SCREENS.REFERRAL)
  }

  // Consent granted → simulate the HealthHub API call, then personalise.
  const handleAllow = async () => {
    setCurrentScreen(SCREENS.LOADING)
    const data = await fetchHealthHubData()
    setPatient({
      name: data.patientName,
      ldlValue: data.ldlValue,
      referralDate: data.referralDate,
      preferredLanguage: data.preferredLanguage,
    })
    setDataSource('healthhub')
    setHhConnected(true)
    setCurrentScreen(postConsentScreen)
  }

  // "Not now" → continue without HealthHub, fall back to manual entry.
  const handleDeny = () => {
    setDataSource('manual')
    setCurrentScreen(postConsentScreen)
  }

  // The persistent banner lets the patient link HealthHub later, returning
  // to the screen they were on afterwards.
  const handleConnectLater = () => {
    setPostConsentScreen(currentScreen)
    setCurrentScreen(SCREENS.CONSENT)
  }

  const showConnect = dataSource === 'manual' && !hhConnected
  const isManual = dataSource === 'manual'

  const journeyProps = {
    patient,
    updatePatient,
    isManual,
    showConnect,
    onConnect: handleConnectLater,
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-brand">
          <span className="app-name">FH Pathway Companion</span>
        </div>
      </header>

      <main className="app-main">
        {currentScreen === SCREENS.LOGIN && (
          <Login onSignIn={handleSignIn} onGuest={handleGuest} />
        )}
        {currentScreen === SCREENS.CONSENT && (
          <Consent onAllow={handleAllow} onDeny={handleDeny} />
        )}
        {currentScreen === SCREENS.LOADING && <HealthHubLoading />}
        {currentScreen === SCREENS.REFERRAL && (
          <ReferralNotification
            {...journeyProps}
            onContinue={() => setCurrentScreen(SCREENS.WHY)}
          />
        )}
        {currentScreen === SCREENS.WHY && (
          <WhyThisMatters
            {...journeyProps}
            onContinue={() => setCurrentScreen(SCREENS.COST)}
          />
        )}
        {currentScreen === SCREENS.COST && (
          <CostTransparency {...journeyProps} />
        )}
      </main>

      <TestPanel
        patient={patient}
        updatePatient={updatePatient}
        currentScreen={currentScreen}
        setCurrentScreen={setCurrentScreen}
      />
    </div>
  )
}

// A small, collapsible panel for testing different mock values and jumping
// between screens. Not part of the patient-facing flow.
function TestPanel({ patient, updatePatient, currentScreen, setCurrentScreen }) {
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
          <p className="test-panel-title">Mock data</p>

          <label className="field">
            <span className="field-label">Name</span>
            <input
              className="input"
              type="text"
              value={patient.name}
              onChange={(e) => updatePatient('name', e.target.value)}
            />
          </label>

          <label className="field">
            <span className="field-label">LDL value (mmol/L)</span>
            <input
              className="input"
              type="number"
              step="0.1"
              value={patient.ldlValue ?? ''}
              onChange={(e) =>
                updatePatient(
                  'ldlValue',
                  e.target.value === '' ? null : Number(e.target.value),
                )
              }
            />
          </label>

          <label className="field">
            <span className="field-label">Referral date</span>
            <input
              className="input"
              type="date"
              value={patient.referralDate}
              onChange={(e) => updatePatient('referralDate', e.target.value)}
            />
          </label>

          <p className="test-panel-title">Jump to screen</p>
          <div className="test-panel-nav">
            {Object.entries(SCREENS)
              .filter(([, value]) => value !== SCREENS.LOADING)
              .map(([key, value]) => (
                <button
                  key={value}
                  className={`chip${currentScreen === value ? ' active' : ''}`}
                  onClick={() => setCurrentScreen(value)}
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
