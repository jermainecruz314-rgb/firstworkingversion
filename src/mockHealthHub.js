import { isoDaysAgo, isoDaysAhead, formatSlotLabel } from './utils.js'

// Build mock profiles with dates relative to today so demo logic stays realistic.
function buildMarcusAppointment() {
  const date = isoDaysAhead(12)
  return {
    appointmentSlotId: 'slot-booked',
    appointmentDate: date,
    appointmentSlotLabel: formatSlotLabel(date, '10:00'),
  }
}

export function getMockProfiles() {
  const marcusAppt = buildMarcusAppointment()
  return {
    weiLing: {
      id: 'weiLing',
      name: 'Wei Ling Tan',
      pathwayType: 'index',
      ldlValue: 6.2,
      referredBy: 'Dr. Sarah Lim, Toa Payoh Polyclinic',
      referralDate: isoDaysAgo(7),
      referralReason: 'LDL result above 5.5 mmol/L threshold',
      appointmentStatus: 'Not yet booked',
      pathwayStage: 0,
      preferredLanguage: 'en',
    },
    marcus: {
      id: 'marcus',
      name: 'Marcus Tan',
      pathwayType: 'cascade',
      relationToIndex: 'Son of Wei Ling Tan (confirmed FH proband)',
      inheritanceRisk: '50% chance of carrying the same gene variant',
      referredBy: 'Cascade screening invitation from GAC',
      referralDate: isoDaysAgo(2),
      referralReason: 'First-degree relative of a confirmed FH patient',
      appointmentStatus: 'Booked',
      pathwayStage: 1,
      preferredLanguage: 'en',
      ...marcusAppt,
    },
    aishah: {
      id: 'aishah',
      name: 'Aishah Rahman',
      pathwayType: 'index',
      ldlValue: 7.1,
      referredBy: 'Dr. Tan Wei Kiat, Bedok Polyclinic',
      referralDate: isoDaysAgo(42),
      referralReason: 'LDL result above 5.5 mmol/L threshold',
      appointmentStatus: 'Completed',
      pathwayStage: 3,
      preferredLanguage: 'en',
    },
  }
}

export const PROFILE_IDS = ['weiLing', 'marcus', 'aishah']

export function fetchPatientProfile(profileId, delayMs = 1500) {
  const profiles = getMockProfiles()
  const profile = profiles[profileId]
  if (!profile) return Promise.reject(new Error('Unknown profile'))
  return new Promise((resolve) => {
    setTimeout(() => resolve({ ...profile }), delayMs)
  })
}
