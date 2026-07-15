import { isoDaysAgo } from './utils.js'

const BOOKING_STORAGE_PREFIX = 'gac-booking-'

function loadStoredBooking(profileId) {
  try {
    const raw = localStorage.getItem(BOOKING_STORAGE_PREFIX + profileId)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function saveBookingState(profileId, booking) {
  try {
    localStorage.setItem(BOOKING_STORAGE_PREFIX + profileId, JSON.stringify(booking))
  } catch {
    // storage unavailable (e.g. private browsing) — booking still works for this session
  }
}

export function getMockProfiles() {
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
    aishah: {
      id: 'aishah',
      name: 'Aishah Rahman',
      pathwayType: 'index',
      ldlValue: 7.1,
      referredByKey: 'mockReferredByAishah',
      referralDate: isoDaysAgo(52),
      referralReasonKey: 'mockReferralReasonLdlThreshold',
      appointmentStatus: 'Completed',
      pathwayStage: 3,
      preferredLanguage: 'en',
    },
  }
}

export const PROFILE_IDS = ['weiLing', 'aishah']

export function fetchPatientProfile(profileId, delayMs = 1500) {
  const profiles = getMockProfiles()
  const profile = profiles[profileId]
  if (!profile) return Promise.reject(new Error('Unknown profile'))
  const storedBooking = loadStoredBooking(profileId)
  const merged = storedBooking ? { ...profile, ...storedBooking } : { ...profile }
  return new Promise((resolve) => {
    setTimeout(() => resolve(merged), delayMs)
  })
}
