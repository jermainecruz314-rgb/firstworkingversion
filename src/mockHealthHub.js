import { isoDaysAgo, isoDaysAhead, formatSlotLabel } from './utils.js'

// Build mock profiles with dates relative to today so demo logic stays realistic.
function buildMarcusAppointment() {
  const date = isoDaysAhead(12)
  return {
    appointmentSlotId: 'slot-booked',
    appointmentDate: date,
    appointmentTime: '10:00',
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
      referredByKey: 'mockReferredByWeiLing',
      referralDate: isoDaysAgo(7),
      referralReasonKey: 'mockReferralReasonLdlThreshold',
      appointmentStatus: 'Not yet booked',
      pathwayStage: 0,
      preferredLanguage: 'en',
    },
    marcus: {
      id: 'marcus',
      name: 'Marcus Tan',
      pathwayType: 'cascade',
      relationToIndexKey: 'mockRelationMarcus',
      inheritanceRiskKey: 'mockInheritanceRiskStandard',
      referredByKey: 'mockReferredByMarcusCascade',
      referralDate: isoDaysAgo(2),
      referralReasonKey: 'mockReferralReasonCascadeRelative',
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
      referredByKey: 'mockReferredByAishah',
      referralDate: isoDaysAgo(42),
      referralReasonKey: 'mockReferralReasonLdlThreshold',
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
