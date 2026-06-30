import { useState } from 'react'
import Stepper from '../components/Stepper.jsx'
import FamilyTreeIcon from '../components/FamilyTreeIcon.jsx'
import {
  PATIENT_TYPE_OPTIONS,
  RESIDENCY_OPTIONS,
  INCOME_TIERS,
  SENIOR_SCHEMES,
  calculateSubsidisedCost,
  formatSGD,
} from '../logic.js'

// Screen 3: a live cost calculator built on Singapore's national FH Genetic
// Testing Programme subsidy structure. All figures come from
// calculateSubsidisedCost() in logic.js, recalculated on every change.
export default function CostTransparency() {
  const [form, setForm] = useState({
    patientType: 'index',
    residency: 'citizen',
    incomeTier: 'tier1',
    seniorScheme: 'none',
    useMediSave: true,
    hasChronicConditions: false,
    isSenior60: false,
    healthierSG: false,
  })
  const [booked, setBooked] = useState(false)

  const set = (field, value) => setForm((p) => ({ ...p, [field]: value }))

  const isCitizen = form.residency === 'citizen'
  const isCascade = form.patientType === 'cascade'

  // Recalculated on every render → fully live.
  const cost = calculateSubsidisedCost(form)

  return (
    <section className="screen">
      <Stepper currentStage={2} />

      <div className="card">
        <span className="eyebrow">Clear, upfront costs</span>
        <h1 className="screen-title">What the test may cost you</h1>
        <p className="lead">
          We believe in no surprises. Tell us a little about yourself and your
          estimate updates instantly.
        </p>

        {/* About the test */}
        <div className={`form-group${isCascade ? ' family' : ''}`}>
          <div className="group-title-row">
            {isCascade && <FamilyTreeIcon size={22} />}
            <p className="group-title">About your test</p>
          </div>
          <label className="field">
            <span className="field-label">Which describes you?</span>
            <select
              className="select"
              value={form.patientType}
              onChange={(e) => set('patientType', e.target.value)}
            >
              {PATIENT_TYPE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* About you */}
        <div className="form-group">
          <p className="group-title">About you</p>
          <label className="field">
            <span className="field-label">Residency status</span>
            <select
              className="select"
              value={form.residency}
              onChange={(e) => set('residency', e.target.value)}
            >
              {RESIDENCY_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>

          {isCitizen && (
            <>
              <label className="field">
                <span className="field-label">
                  Monthly household income per person
                </span>
                <select
                  className="select"
                  value={form.incomeTier}
                  onChange={(e) => set('incomeTier', e.target.value)}
                >
                  {INCOME_TIERS.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label} ({Math.round(t.rate * 100)}% subsidy)
                    </option>
                  ))}
                </select>
              </label>

              <label className="field">
                <span className="field-label">Senior support scheme</span>
                <select
                  className="select"
                  value={form.seniorScheme}
                  onChange={(e) => set('seniorScheme', e.target.value)}
                >
                  {Object.entries(SENIOR_SCHEMES).map(([key, s]) => (
                    <option key={key} value={key}>
                      {s.label}
                      {s.extraOff > 0
                        ? ` (extra ${Math.round(s.extraOff * 100)}% off)`
                        : ''}
                    </option>
                  ))}
                </select>
              </label>
            </>
          )}
        </div>

        {/* MediSave */}
        <div className="form-group">
          <p className="group-title">MediSave</p>
          <Toggle
            label="Use MediSave for this test"
            checked={form.useMediSave}
            onChange={(v) => set('useMediSave', v)}
          />
          {isCascade && form.useMediSave && (
            <div className="helper-note family">
              <FamilyTreeIcon size={22} />
              <span>
                Cascade screening relatives can use MediSave even before a
                diagnosis (a documented MOH exception).
              </span>
            </div>
          )}

          {form.useMediSave && (
            <div className="checkbox-stack">
              <Check
                label="I have 2 or more chronic conditions (raises limit to $700/yr)"
                checked={form.hasChronicConditions}
                onChange={(v) => set('hasChronicConditions', v)}
              />
              <Check
                label="I am aged 60 or above (adds $400 Flexi-MediSave)"
                checked={form.isSenior60}
                onChange={(v) => set('isSenior60', v)}
              />
              <Check
                label="I'm enrolled in Healthier SG with my regular doctor (waives the 15% cash co-pay)"
                checked={form.healthierSG}
                onChange={(v) => set('healthierSG', v)}
              />
            </div>
          )}
        </div>

        {/* Headline numbers */}
        <div className="cost-breakdown">
          <Row label="Pre-subsidy test cost" value={formatSGD(cost.preSubsidy)} />
          <Row
            label={`Subsidy (${cost.subsidyPercent}%)`}
            value={`− ${formatSGD(cost.subsidyAmount)}`}
            tone="credit"
          />
          {cost.seniorEligible && (
            <Row
              label={`${cost.seniorSchemeLabel} (extra ${cost.seniorExtraPercent}% off)`}
              value={`− ${formatSGD(cost.seniorDiscount)}`}
              tone="credit"
            />
          )}
          <Row
            label="Cost after subsidy (before MediSave)"
            value={formatSGD(cost.afterSubsidy)}
            strong
          />
          {cost.useMediSave && (
            <>
              <Row
                label={`MediSave covers (limit ${formatSGD(cost.mediSaveLimit)})`}
                value={`− ${formatSGD(cost.mediSavePaid)}`}
                tone="credit"
                subtle
              />
              <Row
                label={
                  cost.copayWaived
                    ? '15% cash co-pay (waived — Healthier SG)'
                    : '15% cash co-pay on MediSave portion'
                }
                value={cost.copayWaived ? formatSGD(0) : formatSGD(cost.cashCopay)}
                subtle
              />
            </>
          )}
          <div className="cost-total">
            <span>Final out-of-pocket (cash)</span>
            <strong>{formatSGD(cost.finalCash)}</strong>
          </div>
        </div>

        <p className="source-note">
          Based on Singapore&apos;s national FH Genetic Testing Programme subsidy
          structure (MOH, 2025)
        </p>

        {cost.copayWaived && (
          <p className="hsg-note">
            Healthier SG enrolment waives the standard MediSave copay, reducing
            your cost further.
          </p>
        )}

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
          <button className="btn btn-primary" onClick={() => setBooked(true)}>
            Book my appointment
          </button>
        )}
      </div>
    </section>
  )
}

function Row({ label, value, tone, subtle, strong }) {
  return (
    <div className={`cost-row${subtle ? ' subtle' : ''}${strong ? ' strong' : ''}`}>
      <span className="cost-label">{label}</span>
      <span className={`cost-value${tone === 'credit' ? ' credit' : ''}`}>
        {value}
      </span>
    </div>
  )
}

function Toggle({ label, checked, onChange }) {
  return (
    <button
      type="button"
      className={`toggle${checked ? ' on' : ''}`}
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
    >
      <span className="toggle-track">
        <span className="toggle-thumb" />
      </span>
      <span className="toggle-label">{label}</span>
    </button>
  )
}

function Check({ label, checked, onChange }) {
  return (
    <label className="check">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span>{label}</span>
    </label>
  )
}
