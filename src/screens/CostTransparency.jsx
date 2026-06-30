import { useState } from 'react'
import Stepper from '../components/Stepper.jsx'
import {
  CITIZENSHIP_OPTIONS,
  calculateCost,
  formatSGD,
} from '../logic.js'

// Screen 3: a live cost calculator driven by the citizenship dropdown.
export default function CostTransparency({ onBook }) {
  const [citizenship, setCitizenship] = useState('citizen')
  const [booked, setBooked] = useState(false)

  // Recalculated on every render, so changing the dropdown updates live.
  const cost = calculateCost(citizenship)

  const handleBook = () => {
    setBooked(true)
    if (onBook) onBook()
  }

  return (
    <section className="screen">
      <Stepper currentStage={2} />

      <div className="card">
        <span className="eyebrow">Clear, upfront costs</span>
        <h1 className="screen-title">What the test may cost you</h1>
        <p className="lead">
          We believe in no surprises. Here&apos;s an honest, estimated breakdown —
          it updates instantly as you tell us a little more about yourself.
        </p>

        <label className="field">
          <span className="field-label">Your residency status</span>
          <select
            className="select"
            value={citizenship}
            onChange={(e) => setCitizenship(e.target.value)}
          >
            {CITIZENSHIP_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>

        <div className="cost-breakdown">
          <Row label="Test cost" value={formatSGD(cost.baseTestCost)} />
          <Row
            label={`Subsidy (${cost.subsidyPercent}%)`}
            value={`− ${formatSGD(cost.subsidyAmount)}`}
            tone="credit"
          />
          <Row
            label="After subsidy"
            value={formatSGD(cost.afterSubsidy)}
            subtle
          />
          <Row
            label={
              cost.mediSaveEligible
                ? `MediSave applied (up to ${formatSGD(cost.mediSaveCap)})`
                : 'MediSave'
            }
            value={
              cost.mediSaveEligible
                ? `− ${formatSGD(cost.mediSaveApplied)}`
                : 'Not available'
            }
            tone={cost.mediSaveEligible ? 'credit' : undefined}
          />
          <div className="cost-total">
            <span>Estimated out-of-pocket</span>
            <strong>{formatSGD(cost.finalPayable)}</strong>
          </div>
        </div>

        <p className="muted">
          {cost.mediSaveEligible
            ? `Good news — MediSave can be used for this test, covering up to ${formatSGD(
                cost.mediSaveCap,
              )}. The amount above is what you'd pay after MediSave.`
            : 'MediSave is not available for this test.'}
        </p>

        {booked ? (
          <div className="confirmation" role="status">
            <span className="confirmation-icon" aria-hidden="true">
              ✓
            </span>
            <div>
              <p className="confirmation-title">Appointment request sent</p>
              <p className="confirmation-body">
                Our care team will reach out shortly to confirm a time that suits
                you. There&apos;s nothing more you need to do for now.
              </p>
            </div>
          </div>
        ) : (
          <button className="btn btn-primary" onClick={handleBook}>
            Book my appointment
          </button>
        )}
      </div>
    </section>
  )
}

function Row({ label, value, tone, subtle }) {
  return (
    <div className={`cost-row${subtle ? ' subtle' : ''}`}>
      <span className="cost-label">{label}</span>
      <span className={`cost-value${tone === 'credit' ? ' credit' : ''}`}>
        {value}
      </span>
    </div>
  )
}
