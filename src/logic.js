// Pure, data-driven logic for the FH Pathway Companion.
// Nothing here is hardcoded display text tied to a single value — every
// output is computed from the patient data and the user's selections so
// that changing the LDL value or citizenship status changes the result.

// The clinical threshold that triggers a referral in the program.
export const LDL_THRESHOLD = 5.5

// ---------------------------------------------------------------------------
// Cost model — based on Singapore's National FH Genetic Testing Programme
// subsidy structure (MOH, 2025). All values below are configuration; the
// actual maths lives in calculateSubsidisedCost() so it is easy to point to.
// ---------------------------------------------------------------------------

// Base (pre-subsidy) test cost depends on why the patient is being tested.
export const BASE_COSTS = {
  index: 764, // Index patient — first person tested (LDL >= 5.5 mmol/L)
  cascade: 334, // Cascade screening — first-degree relative of a confirmed case
}

export const PATIENT_TYPE_OPTIONS = [
  { value: 'index', label: 'Index patient (referred by my LDL result)' },
  { value: 'cascade', label: 'Cascade screening (relative of a confirmed FH patient)' },
]

export const RESIDENCY_OPTIONS = [
  { value: 'citizen', label: 'Singapore Citizen' },
  { value: 'pr', label: 'Permanent Resident (PR)' },
  { value: 'foreigner', label: 'Foreigner / Non-resident' },
]

// Citizens receive an income-tiered subsidy (per-person monthly household income).
export const INCOME_TIERS = [
  { value: 'tier1', label: '$0 – $1,500', max: 1500, rate: 0.7 },
  { value: 'tier2', label: '$1,501 – $2,300', max: 2300, rate: 0.6 },
  { value: 'tier3', label: '$2,301 – $3,600', max: 3600, rate: 0.5 },
  { value: 'tier4', label: '$3,601 – $7,000', max: 7000, rate: 0.4 },
  { value: 'tier5', label: 'Above $7,000', max: Infinity, rate: 0.3 },
]

// Flat subsidy rates for non-citizens (not income-tiered).
export const FLAT_SUBSIDY_RATES = {
  pr: 0.25,
  foreigner: 0,
}

// Senior support schemes — citizens only. These give an extra reduction on
// top of the income-tiered subsidy (applied to the already-subsidised amount).
export const SENIOR_SCHEMES = {
  none: { label: 'None', extraOff: 0 },
  pioneer: { label: 'Pioneer Generation', extraOff: 0.5 },
  merdeka: { label: 'Merdeka Generation', extraOff: 0.25 },
}

// MediSave configuration.
export const MEDISAVE = {
  limitStandard: 500, // per year
  limitChronic: 700, // per year, if 2+ chronic conditions
  flexiSeniorTopUp: 400, // extra annual limit for patients aged 60+
  cashCopayRate: 0.15, // 15% cash co-payment on the MediSave-covered portion
}

// Format a number as Singapore dollars.
export function formatSGD(amount) {
  return new Intl.NumberFormat('en-SG', {
    style: 'currency',
    currency: 'SGD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount)
}

// How far above the threshold is this patient's LDL, as a friendly value.
export function ldlAboveThreshold(ldlValue, threshold = LDL_THRESHOLD) {
  return Math.max(0, Number((ldlValue - threshold).toFixed(1)))
}

// Generate a short, plain-language, personalised explanation of FH and
// why genetic testing adds value — built from the patient's actual data.
export function buildRiskSummary(patient, threshold = LDL_THRESHOLD) {
  const { name, ldlValue } = patient
  const above = ldlAboveThreshold(ldlValue, threshold)

  const intro =
    `${name}, your LDL cholesterol reading is ${ldlValue} mmol/L. ` +
    `That's ${above} mmol/L above the ${threshold} mmol/L level we look out for, ` +
    `which is why your care team suggested taking a closer look.`

  const whatIsFh =
    `Familial hypercholesterolaemia (FH) simply means a gene you were born with ` +
    `can keep LDL cholesterol higher than usual — it isn't caused by diet or lifestyle. ` +
    `A reading like ${ldlValue} mmol/L is one of the signs it's worth checking for.`

  const whyTest =
    `A genetic test can confirm whether FH is behind your ${ldlValue} mmol/L reading. ` +
    `Knowing this helps your doctor tailor treatment specifically to you, rather than a ` +
    `one-size-fits-all approach.`

  const familyImpact =
    `If FH is found, each of your first-degree relatives (parents, brothers, sisters and ` +
    `children) has about a 50% chance of carrying the same gene. A clear answer means they ` +
    `can be checked early and supported too.`

  return {
    intro,
    points: [
      { title: 'What FH means for you', body: whatIsFh },
      { title: 'Why the test is worth it', body: whyTest },
      { title: 'A head start for your family', body: familyImpact },
    ],
    aboveThreshold: above,
  }
}

const round2 = (n) => Number(n.toFixed(2))

// Resolve the subsidy rate from residency + (for citizens) income tier.
export function resolveSubsidyRate({ residency, incomeTier }) {
  if (residency === 'citizen') {
    const tier =
      INCOME_TIERS.find((t) => t.value === incomeTier) ?? INCOME_TIERS[0]
    return tier.rate
  }
  return FLAT_SUBSIDY_RATES[residency] ?? 0
}

/**
 * The single source of truth for the cost calculation. Everything the UI shows
 * is derived from this function, driven entirely by the user's selections.
 *
 * @returns the three headline numbers (preSubsidy, afterSubsidy, finalCash)
 *          plus a detailed breakdown for the itemised display.
 */
export function calculateSubsidisedCost({
  patientType = 'index',
  residency = 'citizen',
  incomeTier = 'tier1',
  seniorScheme = 'none',
  useMediSave = true,
  hasChronicConditions = false,
  isSenior60 = false,
  healthierSG = false,
} = {}) {
  // 1) Pre-subsidy base cost (depends on index vs cascade).
  const preSubsidy = BASE_COSTS[patientType] ?? BASE_COSTS.index

  // 2) Income-tiered / flat subsidy.
  const subsidyRate = resolveSubsidyRate({ residency, incomeTier })
  const subsidyAmount = round2(preSubsidy * subsidyRate)
  let afterSubsidy = round2(preSubsidy - subsidyAmount)

  // 3) Senior top-up — citizens only. An extra reduction on the already-
  //    subsidised amount (Pioneer 50% off, Merdeka 25% off).
  const scheme = SENIOR_SCHEMES[seniorScheme] ?? SENIOR_SCHEMES.none
  const seniorEligible = residency === 'citizen' && scheme.extraOff > 0
  const seniorDiscount = seniorEligible ? round2(afterSubsidy * scheme.extraOff) : 0
  afterSubsidy = round2(afterSubsidy - seniorDiscount)

  // 4) MediSave. Cascade relatives are explicitly allowed to use MediSave even
  //    before a diagnosis (documented MOH exception) — so there is no
  //    diagnosis gate here.
  let mediSaveLimit = hasChronicConditions
    ? MEDISAVE.limitChronic
    : MEDISAVE.limitStandard
  if (isSenior60) mediSaveLimit += MEDISAVE.flexiSeniorTopUp

  let mediSaveCovered = 0 // portion of the bill eligible to go through MediSave
  let mediSavePaid = 0 // amount actually drawn from the MediSave account
  let cashCopay = 0 // 15% cash co-pay on the covered portion (waived by HSG)
  let uncoveredCash = 0 // any amount above the MediSave limit, paid in cash

  if (useMediSave) {
    mediSaveCovered = round2(Math.min(afterSubsidy, mediSaveLimit))
    uncoveredCash = round2(afterSubsidy - mediSaveCovered)
    cashCopay = healthierSG ? 0 : round2(mediSaveCovered * MEDISAVE.cashCopayRate)
    mediSavePaid = round2(mediSaveCovered - cashCopay)
  } else {
    uncoveredCash = afterSubsidy
  }

  // 5) Final out-of-pocket cash the patient actually pays.
  const finalCash = round2(uncoveredCash + cashCopay)

  return {
    patientType,
    preSubsidy,
    subsidyRate,
    subsidyPercent: Math.round(subsidyRate * 100),
    subsidyAmount,
    seniorEligible,
    seniorSchemeLabel: scheme.label,
    seniorExtraPercent: Math.round(scheme.extraOff * 100),
    seniorDiscount,
    afterSubsidy,
    useMediSave,
    mediSaveLimit,
    mediSaveCovered,
    mediSavePaid,
    cashCopay,
    copayWaived: useMediSave && healthierSG,
    uncoveredCash,
    finalCash,
  }
}
