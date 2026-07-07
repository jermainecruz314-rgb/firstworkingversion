import { LDL_THRESHOLD } from '../logic.js'

export default function LdlGauge({ ldlValue, t }) {
  const ldl = Number(ldlValue)
  const min = 3
  const max = 8
  const markerPct = Math.min(100, Math.max(0, ((ldl - min) / (max - min)) * 100))

  return (
    <div className="ldl-gauge" aria-label={`LDL ${ldl} mmol/L`}>
      <div className="ldl-gauge-track">
        <div className="ldl-gauge-gradient" aria-hidden="true" />
        <span
          className="ldl-gauge-marker"
          style={{ left: `${markerPct}%` }}
          aria-hidden="true"
        />
      </div>
      <div className="ldl-gauge-labels">
        <span className="ldl-gauge-label ldl-gauge-label--low">{t('ldlGaugeNormal')}</span>
        <span className="ldl-gauge-label ldl-gauge-label--result">
          {t('ldlGaugeYourResult', { ldlValue: ldl })}
        </span>
        <span className="ldl-gauge-label ldl-gauge-label--high">{t('ldlGaugeHighRisk')}</span>
      </div>
      {ldl > LDL_THRESHOLD && (
        <span className="ldl-threshold-badge">{t('ldlAboveThreshold')}</span>
      )}
    </div>
  )
}
