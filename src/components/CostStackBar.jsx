import { formatSGD } from '../logic.js'

export default function CostStackBar({ cost, t }) {
  const pre = cost.preSubsidy || 1
  const subsidyTotal = cost.subsidyAmount + (cost.seniorDiscount || 0)
  const mediSave = cost.useMediSave ? cost.mediSavePaid : 0
  const oop = cost.finalCash

  const subsidyPct = Math.max(0, (subsidyTotal / pre) * 100)
  const mediSavePct = Math.max(0, (mediSave / pre) * 100)
  const oopPct = Math.max(0, (oop / pre) * 100)
  const total = subsidyPct + mediSavePct + oopPct || 1

  return (
    <div className="cost-stack-visual">
      <div className="cost-stack-bar" role="img" aria-label="Cost breakdown visual">
        <span
          className="cost-stack-segment cost-stack-segment--subsidy"
          style={{ width: `${(subsidyPct / total) * 100}%` }}
        />
        <span
          className="cost-stack-segment cost-stack-segment--medisave"
          style={{ width: `${(mediSavePct / total) * 100}%` }}
        />
        <span
          className="cost-stack-segment cost-stack-segment--oop"
          style={{ width: `${(oopPct / total) * 100}%` }}
        />
      </div>
      <div className="cost-stack-legend">
        <span className="cost-legend-pill cost-legend-pill--subsidy">
          Government subsidy {formatSGD(subsidyTotal)}
        </span>
        <span className="cost-legend-pill cost-legend-pill--medisave">
          MediSave {formatSGD(mediSave)}
        </span>
        <span className="cost-legend-pill cost-legend-pill--oop">
          You pay {formatSGD(oop)}
        </span>
      </div>
    </div>
  )
}
