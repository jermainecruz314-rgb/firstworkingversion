// Manual fallback for patients who didn't link HealthHub (guest or "Not now").
// Lets them enter the details the app would otherwise read from HealthHub.
export default function ManualEntry({ patient, updatePatient, showName = true }) {
  return (
    <div className="form-group">
      <p className="group-title">Enter your details</p>

      {showName && (
        <label className="field">
          <span className="field-label">Your name (optional)</span>
          <input
            className="input"
            type="text"
            placeholder="e.g. Wei Ling"
            value={patient.name ?? ''}
            onChange={(e) => updatePatient('name', e.target.value)}
          />
        </label>
      )}

      <label className="field">
        <span className="field-label">Your LDL cholesterol (mmol/L)</span>
        <input
          className="input"
          type="number"
          step="0.1"
          inputMode="decimal"
          placeholder="e.g. 6.2"
          value={patient.ldlValue ?? ''}
          onChange={(e) =>
            updatePatient(
              'ldlValue',
              e.target.value === '' ? null : Number(e.target.value),
            )
          }
        />
      </label>
    </div>
  )
}
