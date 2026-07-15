import { useEffect, useState } from 'react'
import { formatSGD } from '../logic.js'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion.js'

function useCountUp(target, duration, enabled) {
  const [value, setValue] = useState(enabled ? 0 : target)

  useEffect(() => {
    if (!enabled) {
      setValue(target)
      return undefined
    }

    setValue(0)
    const start = performance.now()
    let frame

    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration)
      setValue(target * progress)
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, duration, enabled])

  return value
}

export default function CostStackBar({ cost, t }) {
  const reducedMotion = usePrefersReducedMotion()
  const [barsReady, setBarsReady] = useState(reducedMotion)
  const [oopBounce, setOopBounce] = useState(false)

  const pre = cost.preSubsidy || 1
  const subsidyTotal = cost.subsidyAmount + (cost.seniorDiscount || 0)
  const mediSave = cost.useMediSave ? cost.mediSavePaid : 0
  const oop = cost.finalCash

  const subsidyPct = Math.max(0, (subsidyTotal / pre) * 100)
  const mediSavePct = Math.max(0, (mediSave / pre) * 100)
  const oopPct = Math.max(0, (oop / pre) * 100)
  const total = subsidyPct + mediSavePct + oopPct || 1

  const subsidyWidth = (subsidyPct / total) * 100
  const mediSaveWidth = (mediSavePct / total) * 100
  const oopWidth = (oopPct / total) * 100

  const animate = !reducedMotion

  useEffect(() => {
    if (reducedMotion) {
      setBarsReady(true)
      return undefined
    }

    setBarsReady(false)
    setOopBounce(false)
    const frame = requestAnimationFrame(() => setBarsReady(true))
    return () => cancelAnimationFrame(frame)
  }, [subsidyWidth, mediSaveWidth, oopWidth, reducedMotion])

  const animatedSubsidy = useCountUp(subsidyTotal, 500, animate && barsReady)
  const animatedMediSave = useCountUp(mediSave, 500, animate && barsReady)
  const animatedOop = useCountUp(oop, 500, animate && barsReady)

  useEffect(() => {
    if (!animate || !barsReady) return undefined
    const timer = setTimeout(() => setOopBounce(true), 500)
    return () => clearTimeout(timer)
  }, [animate, barsReady, oop])

  useEffect(() => {
    if (!oopBounce) return undefined
    const timer = setTimeout(() => setOopBounce(false), 200)
    return () => clearTimeout(timer)
  }, [oopBounce])

  return (
    <div className="cost-stack-visual">
      <div className="cost-stack-bar" role="img" aria-label="Cost breakdown visual">
        <span
          className="cost-stack-segment cost-stack-segment--subsidy"
          style={{ width: barsReady ? `${subsidyWidth}%` : '0%' }}
        />
        <span
          className="cost-stack-segment cost-stack-segment--medisave"
          style={{ width: barsReady ? `${mediSaveWidth}%` : '0%' }}
        />
        <span
          className="cost-stack-segment cost-stack-segment--oop"
          style={{ width: barsReady ? `${oopWidth}%` : '0%' }}
        />
      </div>
      <div className="cost-stack-legend">
        <span className="cost-legend-pill cost-legend-pill--subsidy">
          {t('costLegendSubsidy', { amount: formatSGD(animatedSubsidy) })}
        </span>
        <span className="cost-legend-pill cost-legend-pill--medisave">
          {t('costLegendMediSave', { amount: formatSGD(animatedMediSave) })}
        </span>
        <span
          className={`cost-legend-pill cost-legend-pill--oop${oopBounce ? ' cost-legend-pill--bounce' : ''}`}
        >
          {t('costLegendYouPay', { amount: formatSGD(animatedOop) })}
        </span>
      </div>
    </div>
  )
}
