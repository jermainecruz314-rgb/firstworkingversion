// Pure, data-driven logic for the FH Pathway Companion.
// Nothing here is hardcoded display text tied to a single value — every
// output is computed from the patient data and the user's selections so
// that changing the LDL value or citizenship status changes the result.

// The clinical threshold that triggers a referral in the program.
export const LDL_THRESHOLD = 5.5

// Cost model (all mock values for this prototype).
export const COST_MODEL = {
  baseTestCost: 300,
  subsidyRates: {
    citizen: 0.7, // Singapore Citizen
    pr: 0.5, // Permanent Resident
    foreigner: 0, // Not eligible for subsidy in this mock
  },
  mediSave: {
    eligible: true,
    cap: 200,
  },
}

export const CITIZENSHIP_OPTIONS = [
  { value: 'citizen', label: 'Singapore Citizen' },
  { value: 'pr', label: 'Permanent Resident (PR)' },
  { value: 'foreigner', label: 'Foreigner' },
]

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

// Live cost calculation driven entirely by the selected citizenship status.
export function calculateCost(citizenship, model = COST_MODEL) {
  const baseTestCost = model.baseTestCost
  const subsidyRate = model.subsidyRates[citizenship] ?? 0
  const subsidyAmount = Number((baseTestCost * subsidyRate).toFixed(2))
  const afterSubsidy = Number((baseTestCost - subsidyAmount).toFixed(2))

  const mediSaveEligible = model.mediSave.eligible
  // MediSave can only cover up to its cap, and never more than what's owed.
  const mediSaveApplied = mediSaveEligible
    ? Number(Math.min(model.mediSave.cap, afterSubsidy).toFixed(2))
    : 0
  const finalPayable = Number((afterSubsidy - mediSaveApplied).toFixed(2))

  return {
    baseTestCost,
    subsidyRate,
    subsidyPercent: Math.round(subsidyRate * 100),
    subsidyAmount,
    afterSubsidy,
    mediSaveEligible,
    mediSaveCap: model.mediSave.cap,
    mediSaveApplied,
    finalPayable,
  }
}
