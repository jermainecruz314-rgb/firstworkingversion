export default function InheritanceDiagram({ t }) {
  const children = [
    { cx: 60, risk: true, label: t('inheritanceChild1Label') },
    { cx: 170, risk: true, label: t('inheritanceChild2Label') },
    { cx: 280, risk: false, label: t('inheritanceChild3Label') },
  ]

  return (
    <div className="inheritance-diagram">
      <div className="inheritance-diagram-canvas">
        <svg width="100%" viewBox="0 0 340 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          {children.map((child) => (
            <path
              key={`line-${child.cx}`}
              d={`M170,64 C170,86 ${child.cx},86 ${child.cx},100`}
              fill="none"
              style={{ stroke: 'var(--line)' }}
              strokeWidth="2"
            />
          ))}

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

          {children.map((child) => (
            <g key={child.cx}>
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
          ))}
        </svg>
      </div>
      <p className="inheritance-caption">{t('familyImpactDiagramCaption')}</p>
    </div>
  )
}
