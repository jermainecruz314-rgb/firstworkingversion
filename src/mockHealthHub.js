// Mock HealthHub integration — FOR DEMONSTRATION ONLY.
// This does NOT call any real HealthHub, Singpass, or government API. All data
// below is fabricated mock data used to simulate the integration experience.

import { todayISO } from './utils.js'

export const MOCK_HEALTHHUB_RESPONSE = {
  patientName: 'Wei Ling',
  ldlValue: 6.2,
  referralDate: todayISO(),
  preferredLanguage: 'English',
}

// The specific data points the app would request consent for.
export const REQUESTED_DATA = [
  'LDL cholesterol result',
  'Referral status',
  'Preferred language setting',
]

// Simulate an asynchronous API call with a short artificial delay so the
// loading experience feels realistic.
export function fetchHealthHubData(delayMs = 1500) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ ...MOCK_HEALTHHUB_RESPONSE }), delayMs)
  })
}
