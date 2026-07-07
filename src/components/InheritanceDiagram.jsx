export default function InheritanceDiagram({ t }) {
  return (
    <div className="inheritance-diagram">
      <svg width="100%" viewBox="0 0 320 240" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="160" cy="30" r="24" fill="#1B4F9B" />
        <text
          x="160"
          y="68"
          textAnchor="middle"
          fontFamily="Inter,sans-serif"
          fontSize="11"
          fill="#718096"
        >
          {t('inheritanceParentLabel')}
        </text>

        <line x1="160" y1="54" x2="80" y2="108" stroke="#CBD5E0" strokeWidth="1.5" />
        <line x1="160" y1="54" x2="160" y2="108" stroke="#CBD5E0" strokeWidth="1.5" />
        <line x1="160" y1="54" x2="240" y2="108" stroke="#CBD5E0" strokeWidth="1.5" />

        <circle cx="80" cy="122" r="20" fill="#FFFFFF" stroke="#1B4F9B" strokeWidth="1.5" />
        <path d="M 80 102 A 20 20 0 0 0 80 142 Z" fill="#1B4F9B" />
        <circle cx="80" cy="122" r="20" fill="none" stroke="#1B4F9B" strokeWidth="1.5" />
        <text
          x="80"
          y="151"
          textAnchor="middle"
          fontFamily="Inter,sans-serif"
          fontSize="11"
          fill="#718096"
        >
          {t('inheritanceChild1Label')}
        </text>
        <rect x="44" y="156" width="72" height="20" rx="10" fill="#FFF3EB" />
        <text
          x="80"
          y="170"
          textAnchor="middle"
          fontFamily="Inter,sans-serif"
          fontSize="11"
          fill="#E8703A"
          fontWeight="500"
        >
          {t('inheritanceRiskBadge')}
        </text>

        <circle cx="160" cy="122" r="20" fill="#FFFFFF" stroke="#1B4F9B" strokeWidth="1.5" />
        <path d="M 160 102 A 20 20 0 0 0 160 142 Z" fill="#1B4F9B" />
        <circle cx="160" cy="122" r="20" fill="none" stroke="#1B4F9B" strokeWidth="1.5" />
        <text
          x="160"
          y="151"
          textAnchor="middle"
          fontFamily="Inter,sans-serif"
          fontSize="11"
          fill="#718096"
        >
          {t('inheritanceChild2Label')}
        </text>
        <rect x="124" y="156" width="72" height="20" rx="10" fill="#FFF3EB" />
        <text
          x="160"
          y="170"
          textAnchor="middle"
          fontFamily="Inter,sans-serif"
          fontSize="11"
          fill="#E8703A"
          fontWeight="500"
        >
          {t('inheritanceRiskBadge')}
        </text>

        <circle cx="240" cy="122" r="20" fill="#FFFFFF" stroke="#CBD5E0" strokeWidth="1.5" />
        <text
          x="240"
          y="151"
          textAnchor="middle"
          fontFamily="Inter,sans-serif"
          fontSize="11"
          fill="#718096"
        >
          {t('inheritanceChild3Label')}
        </text>
        <rect x="204" y="156" width="72" height="20" rx="10" fill="#F0F4F8" />
        <text
          x="240"
          y="170"
          textAnchor="middle"
          fontFamily="Inter,sans-serif"
          fontSize="11"
          fill="#718096"
          fontWeight="500"
        >
          {t('inheritanceMayNotCarry')}
        </text>

        <path
          d="M 60 122 C 60 108, 260 108, 260 122"
          fill="none"
          stroke="#CBD5E0"
          strokeWidth="1"
          strokeDasharray="3 2"
        />
      </svg>
      <p className="inheritance-caption">{t('familyImpactDiagramCaption')}</p>
    </div>
  )
}
