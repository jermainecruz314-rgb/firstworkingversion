import { useEffect, useState } from 'react'
import { LDL_THRESHOLD } from '../logic.js'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion.js'

export default function LdlGauge({ ldlValue, t }) {
  const ldl = Number(ldlValue)
  const min = 3
  const max = 8
  const markerPct = Math.min(100, Math.max(0, ((ldl - min) / (max - min)) * 100))
  const reducedMotion = usePrefersReducedMotion()
  const [markerReady, setMarkerReady] = useState(reducedMotion)
  const [showBadge, setShowBadge] = useState(reducedMotion && ldl > LDL_THRESHOLD)

  useEffect(() => {
    if (reducedMotion) {
      setMarkerReady(true)
      setShowBadge(ldl > LDL_THRESHOLD)
      return undefined
    }

    setMarkerReady(false)
    setShowBadge(false)
    const frame = requestAnimationFrame(() => setMarkerReady(true))
    const badgeTimer = setTimeout(() => {
      if (ldl > LDL_THRESHOLD) setShowBadge(true)
    }, 800)

    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(badgeTimer)
    }
  }, [ldl, reducedMotion])

  return (
    <div className="ldl-gauge" aria-label={`LDL ${ldl} mmol/L`}>
      <div className="ldl-gauge-track">
        <div className="ldl-gauge-gradient" aria-hidden="true" />
        <span
          className={`ldl-gauge-marker${markerReady ? ' ldl-gauge-marker--settled' : ''}`}
          style={{ left: markerReady ? `${markerPct}%` : '0%' }}
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
      {showBadge && (
        <span className={`ldl-threshold-badge${!reducedMotion ? ' ldl-threshold-badge--fade-in' : ''}`}>
          {t('ldlAboveThreshold')}
        </span>
      )}
    </div>
  )
}
