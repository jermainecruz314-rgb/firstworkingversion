// Mock HealthHub integration — FOR DEMONSTRATION ONLY.
// No real HealthHub, Singpass, or government API is called. All profiles
// below are fabricated data used to simulate what integration could look like.

export const MOCK_PROFILES = {
  index: {
    id: 'index',
    name: 'Wei Ling Tan',
    pathwayType: 'index',
    ldlValue: 6.2,
    referredBy: 'Dr. Sarah Lim, Toa Payoh Polyclinic',
    referralDate: '2026-06-12',
    referralReason: 'LDL result above 5.5 mmol/L threshold',
    preferredLanguage: 'English',
    appointmentStatus: 'Not yet booked',
  },
  cascade: {
    id: 'cascade',
    name: 'Marcus Tan',
    pathwayType: 'cascade',
    relationToIndex: 'Son of Wei Ling Tan (confirmed FH proband)',
    inheritanceRisk: '50% chance of carrying the same gene variant',
    referredBy: 'Cascade screening invitation from GAC',
    referralDate: '2026-06-18',
    referralReason: 'First-degree relative of a confirmed FH patient',
    preferredLanguage: 'English',
    appointmentStatus: 'Not yet booked',
  },
}

export const PROFILE_OPTIONS = [
  { id: 'index', label: 'Demo as Index Patient', profile: MOCK_PROFILES.index },
  { id: 'cascade', label: 'Demo as Cascade Relative', profile: MOCK_PROFILES.cascade },
]

// Data points shown on the brief consent screen after sign-in.
export const CONSENT_DATA_POINTS = [
  'Referral details (who referred you and when)',
  'LDL cholesterol result or cascade screening information',
  'Contact and language preferences',
]

// Simulate fetching a patient record from HealthHub after sign-in.
export function fetchPatientProfile(profileId, delayMs = 1500) {
  const profile = MOCK_PROFILES[profileId]
  if (!profile) return Promise.reject(new Error('Unknown profile'))
  return new Promise((resolve) => {
    setTimeout(() => resolve({ ...profile }), delayMs)
  })
}
