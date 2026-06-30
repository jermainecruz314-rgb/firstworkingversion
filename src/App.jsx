import { useState } from 'react'
import ReferralNotification from './screens/ReferralNotification.jsx'
import WhyThisMatters from './screens/WhyThisMatters.jsx'
import CostTransparency from './screens/CostTransparency.jsx'
import { todayISO } from './utils.js'

const SCREENS = {
  REFERRAL: 'referral',
  WHY: 'why',
  COST: 'cost',
}

export default function App() {
  // Simple client-side navigation — no routing library, just state.
  const [currentScreen, setCurrentScreen] = useState(SCREENS.REFERRAL)

  // Editable mock patient data so different values can be tested.
  const [patient, setPatient] = useState({
    name: 'Wei Ling',
    ldlValue: 6.2,
    referralDate: todayISO(),
  })

  const updatePatient = (field, value) =>
    setPatient((prev) => ({ ...prev, [field]: value }))

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-brand">
          <span className="app-name">FH Pathway Companion</span>
        </div>
      </header>

      <main className="app-main">
        {currentScreen === SCREENS.REFERRAL && (
          <ReferralNotification
            patient={patient}
            onContinue={() => setCurrentScreen(SCREENS.WHY)}
          />
        )}
        {currentScreen === SCREENS.WHY && (
          <WhyThisMatters
            patient={patient}
            onContinue={() => setCurrentScreen(SCREENS.COST)}
          />
        )}
        {currentScreen === SCREENS.COST && <CostTransparency />}
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

// A small, collapsible panel for testing different mock values and
// jumping between screens. Not part of the patient-facing flow.
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
              value={patient.ldlValue}
              onChange={(e) =>
                updatePatient('ldlValue', Number(e.target.value))
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
            {Object.entries(SCREENS).map(([key, value]) => (
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
