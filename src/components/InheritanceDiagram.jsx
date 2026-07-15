import { useCallback, useEffect, useState } from 'react'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion.js'

export default function InheritanceDiagram({ t }) {
  const reducedMotion = usePrefersReducedMotion()
  const [replayKey, setReplayKey] = useState(0)
  const [phase, setPhase] = useState(reducedMotion ? 'done' : 'boot')

  const children = [
    { cx: 60, risk: true, label: t('inheritanceChild1Label') },
    { cx: 170, risk: true, label: t('inheritanceChild2Label') },
    { cx: 280, risk: false, label: t('inheritanceChild3Label') },
  ]

  useEffect(() => {
    if (reducedMotion) {
      setPhase('done')
      return undefined
    }

    setPhase('boot')
    const timers = [
      setTimeout(() => setPhase('parent'), 20),
      setTimeout(() => setPhase('lines'), 400),
      setTimeout(() => setPhase('children'), 800),
      setTimeout(() => setPhase('badges'), 1200),
      setTimeout(() => setPhase('done'), 1600),
    ]
    return () => timers.forEach(clearTimeout)
  }, [replayKey, reducedMotion])

  const handleReplay = useCallback(() => {
    setReplayKey((k) => k + 1)
  }, [])

  const showParent = phase !== 'boot'
  const showLines = ['lines', 'children', 'badges', 'done'].includes(phase)
  const showChildren = ['children', 'badges', 'done'].includes(phase)
  const showBadges = ['badges', 'done'].includes(phase)

  return (
    <div className={`inheritance-diagram inheritance-diagram--phased phase-${phase}`}>
      <div className="inheritance-diagram-canvas">
        <svg width="100%" viewBox="0 0 340 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          {children.map((child, index) => (
            <path
              key={`line-${child.cx}`}
              className={`inherit-line${showLines ? ' is-visible' : ''}`}
              style={{
                stroke: 'var(--line)',
                transitionDelay: showLines ? `${index * 40}ms` : '0ms',
              }}
              d={`M170,64 C170,86 ${child.cx},86 ${child.cx},100`}
              fill="none"
              strokeWidth="2"
              pathLength="1"
            />
          ))}

          <g className={`inherit-parent-group${showParent ? ' is-visible' : ''}`}>
            <circle cx="170" cy="36" r="28" style={{ fill: 'var(--primary)' }} />
            <circle cx="170" cy="29" r="6" fill="#fff" />
            <path d="M156,48 C156,40 162,35 170,35 C178,35 184,40 184,48 Z" fill="#fff" />
            <text
              x="170"
              y="90"
              textAnchor="middle"
              style={{ fontFamily: 'var(--sans)', fill: 'var(--ink)' }}
              fontSize="12"
              fontWeight="700"
            >
              {t('inheritanceParentLabel')}
            </text>
          </g>

          {children.map((child, index) => (
            <g
              key={child.cx}
              className={`inherit-child${showChildren ? ' is-visible' : ''}`}
              style={{ transitionDelay: showChildren ? `${index * 100}ms` : '0ms' }}
            >
              {child.risk ? (
                <>
                  <circle cx={child.cx} cy="124" r="24" fill="#fff" style={{ stroke: 'var(--hb-orange)' }} strokeWidth="2" />
                  <path
                    d={`M ${child.cx} 100 A 24 24 0 0 0 ${child.cx} 148 Z`}
                    style={{ fill: 'var(--hb-orange)' }}
                  />
                  <circle cx={child.cx} cy="124" r="24" fill="none" style={{ stroke: 'var(--hb-orange)' }} strokeWidth="2" />
                </>
              ) : (
                <circle cx={child.cx} cy="124" r="24" style={{ fill: 'var(--card)', stroke: 'var(--line)' }} strokeWidth="2" />
              )}
              <text
                x={child.cx}
                y="158"
                textAnchor="middle"
                style={{ fontFamily: 'var(--sans)', fill: 'var(--ink)' }}
                fontSize="12"
                fontWeight="700"
              >
                {child.label}
              </text>
              <g
                className={`inherit-badge${showBadges ? ' is-visible' : ''}`}
                style={{ transitionDelay: showBadges ? `${index * 80}ms` : '0ms' }}
              >
                <rect
                  x={child.cx - 46}
                  y="168"
                  width="92"
                  height="24"
                  rx="12"
                  style={{ fill: child.risk ? 'var(--hb-orange-soft)' : 'var(--sage-soft)' }}
                />
                <text
                  x={child.cx}
                  y="184"
                  textAnchor="middle"
                  style={{
                    fontFamily: 'var(--sans)',
                    fill: child.risk ? 'var(--hb-orange)' : 'var(--hb-green)',
                  }}
                  fontSize="10.5"
                  fontWeight="700"
                >
                  {child.risk ? t('inheritanceRiskBadge') : t('inheritanceMayNotCarry')}
                </text>
              </g>
            </g>
          ))}
        </svg>
      </div>
      <p className="inheritance-caption">{t('familyImpactDiagramCaption')}</p>
      {!reducedMotion && (
        <button type="button" className="inheritance-replay" onClick={handleReplay}>
          {t('audioPlayAgain')}
        </button>
      )}
    </div>
  )
}
