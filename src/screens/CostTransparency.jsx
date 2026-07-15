import { useState } from 'react'
import FamilyTreeIcon from '../components/FamilyTreeIcon.jsx'
import SecurityBadge from '../components/SecurityBadge.jsx'
import CostStackBar from '../components/CostStackBar.jsx'
import DashIcon from '../components/DashIcon.jsx'
import CardWatermark from '../components/CardWatermark.jsx'
import { calculateSubsidisedCost, formatSGD } from '../logic.js'

export default function CostTransparency({ profile, t }) {
  const [form, setForm] = useState({
    patientType: profile?.pathwayType ?? 'index',
    residency: 'citizen',
    incomeTier: 'tier1',
    seniorScheme: 'none',
    useMediSave: true,
    hasChronicConditions: false,
    isSenior60: false,
    healthierSG: false,
  })

  const set = (field, value) => setForm((p) => ({ ...p, [field]: value }))
  const isCitizen = form.residency === 'citizen'
  const isCascade = form.patientType === 'cascade'
  const cost = calculateSubsidisedCost(form)

  const patientTypes = [
    { value: 'index', label: t('patientTypeIndex') },
    { value: 'cascade', label: t('patientTypeCascade') },
  ]
  const residencies = [
    { value: 'citizen', label: t('residencyCitizen') },
    { value: 'pr', label: t('residencyPr') },
    { value: 'foreigner', label: t('residencyForeigner') },
  ]
  const incomeTiers = [
    { value: 'tier1', label: `${t('incomeTier1')} (70%)` },
    { value: 'tier2', label: `${t('incomeTier2')} (60%)` },
    { value: 'tier3', label: `${t('incomeTier3')} (50%)` },
    { value: 'tier4', label: `${t('incomeTier4')} (40%)` },
    { value: 'tier5', label: `${t('incomeTier5')} (30%)` },
  ]
  const seniorSchemes = [
    { value: 'none', label: t('seniorSchemeNone') },
    { value: 'pioneer', label: `${t('seniorSchemePioneer')} (${t('seniorSchemeExtraOff', { percent: 50 })})` },
    { value: 'merdeka', label: `${t('seniorSchemeMerdeka')} (${t('seniorSchemeExtraOff', { percent: 25 })})` },
  ]

  return (
    <section className="screen">
      <SecurityBadge t={t} />

      <div className="card card--decorated">
        <CardWatermark id="cost" />
        <div className="screen-hero">
          <DashIcon id="cost" />
          <span className="eyebrow">{t('costEyebrow')}</span>
        </div>
        <h1 className="screen-title">{t('costTitle')}</h1>
        <p className="lead">{t('costLead')}</p>

        <div className={`form-group${isCascade ? ' family' : ''}`}>
          <div className="group-title-row">
            {isCascade && <FamilyTreeIcon size={22} />}
            <p className="group-title">{t('costAboutTest')}</p>
          </div>
          <label className="field">
            <span className="field-label">{t('labelWhichDescribesYou')}</span>
            <select
              className="select"
              value={form.patientType}
              onChange={(e) => set('patientType', e.target.value)}
            >
              {patientTypes.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="form-group">
          <p className="group-title">{t('costAboutYou')}</p>
          <label className="field">
            <span className="field-label">{t('labelResidencyStatus')}</span>
            <select
              className="select"
              value={form.residency}
              onChange={(e) => set('residency', e.target.value)}
            >
              {residencies.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>

          {isCitizen && (
            <>
              <label className="field">
                <span className="field-label">{t('labelMonthlyHouseholdIncomePerPerson')}</span>
                <select
                  className="select"
                  value={form.incomeTier}
                  onChange={(e) => set('incomeTier', e.target.value)}
                >
                  {incomeTiers.map((tier) => (
                    <option key={tier.value} value={tier.value}>
                      {tier.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="field">
                <span className="field-label">{t('labelSeniorSupportScheme')}</span>
                <select
                  className="select"
                  value={form.seniorScheme}
                  onChange={(e) => set('seniorScheme', e.target.value)}
                >
                  {seniorSchemes.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </label>
            </>
          )}
        </div>

        <div className="form-group">
          <p className="group-title">{t('costMediSaveSection')}</p>
          <Toggle
            label={t('costUseMediSave')}
            checked={form.useMediSave}
            onChange={(v) => set('useMediSave', v)}
          />
          {isCascade && form.useMediSave && (
            <div className="helper-note family">
              <FamilyTreeIcon size={22} />
              <span>{t('costCascadeMediSaveNote')}</span>
            </div>
          )}

          {form.useMediSave && (
            <div className="checkbox-stack">
              <Check
                label={t('costChronicConditions')}
                checked={form.hasChronicConditions}
                onChange={(v) => set('hasChronicConditions', v)}
              />
              <Check
                label={t('costSenior60')}
                checked={form.isSenior60}
                onChange={(v) => set('isSenior60', v)}
              />
              <Check
                label={t('costHealthierSg')}
                checked={form.healthierSG}
                onChange={(v) => set('healthierSG', v)}
              />
            </div>
          )}
        </div>

        <CostStackBar cost={cost} t={t} />

        <div className="cost-breakdown card-data">
          <Row label={t('costRowPreSubsidy')} value={formatSGD(cost.preSubsidy)} />
          <Row
            label={t('costRowSubsidy', { percent: cost.subsidyPercent })}
            value={`− ${formatSGD(cost.subsidyAmount)}`}
            tone="credit"
          />
          {cost.seniorEligible && (
            <Row
              label={t('costRowSeniorExtra', {
                scheme: cost.seniorSchemeLabel,
                percent: cost.seniorExtraPercent,
              })}
              value={`− ${formatSGD(cost.seniorDiscount)}`}
              tone="credit"
            />
          )}
          <Row
            label={t('costRowAfterSubsidy')}
            value={formatSGD(cost.afterSubsidy)}
            strong
          />
          {cost.useMediSave && (
            <>
              <Row
                label={t('costRowMediSaveCover', { limit: formatSGD(cost.mediSaveLimit) })}
                value={`− ${formatSGD(cost.mediSavePaid)}`}
                tone="credit"
                subtle
              />
              <Row
                label={cost.copayWaived ? t('costRowCopayWaived') : t('costRowCopay')}
                value={cost.copayWaived ? formatSGD(0) : formatSGD(cost.cashCopay)}
                subtle
              />
            </>
          )}
          <div className="cost-total">
            <span>{t('costFinalOutOfPocket')}</span>
            <strong>{formatSGD(cost.finalCash)}</strong>
          </div>
        </div>

        {cost.copayWaived && <p className="hsg-note">{t('costHsgNote')}</p>}
      </div>
    </section>
  )
}

function Row({ label, value, tone, subtle, strong }) {
  return (
    <div className={`cost-row${subtle ? ' subtle' : ''}${strong ? ' strong' : ''}`}>
      <span className="cost-label">{label}</span>
      <span className={`cost-value${tone === 'credit' ? ' credit' : ''}`}>{value}</span>
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
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span>{label}</span>
    </label>
  )
}
