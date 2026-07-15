// Mock Genetic Assessment Centre (GAC) sites spread across Singapore, plus a
// coarse postal-sector lookup so we can suggest the nearest one to the patient.
export const GAC_LOCATIONS = [
  {
    id: 'nuh',
    name: 'GAC @ National University Hospital',
    address: '5 Lower Kent Ridge Rd, Singapore 119074',
    region: 'west',
  },
  {
    id: 'ttsh',
    name: 'GAC @ Tan Tock Seng Hospital',
    address: '11 Jalan Tan Tock Seng, Singapore 308433',
    region: 'central',
  },
  {
    id: 'ktph',
    name: 'GAC @ Khoo Teck Puat Hospital',
    address: '90 Yishun Central, Singapore 768828',
    region: 'north',
  },
  {
    id: 'cgh',
    name: 'GAC @ Changi General Hospital',
    address: '2 Simei Street 3, Singapore 529889',
    region: 'east',
  },
]

// Singapore postal sector (first 2 digits of a 6-digit postcode) -> postal district (1-28).
const SECTOR_DISTRICT = {
  '01': 1, '02': 1, '03': 1, '04': 1, '05': 1, '06': 1,
  '07': 2, '08': 2,
  '14': 3, '15': 3, '16': 3,
  '09': 4, '10': 4,
  '11': 5, '12': 5, '13': 5,
  '17': 6,
  '18': 7, '19': 7,
  '20': 8, '21': 8,
  '22': 9, '23': 9,
  '24': 10, '25': 10, '26': 10, '27': 10,
  '28': 11, '29': 11, '30': 11,
  '31': 12, '32': 12, '33': 12,
  '34': 13, '35': 13, '36': 13, '37': 13,
  '38': 14, '39': 14, '40': 14, '41': 14,
  '42': 15, '43': 15, '44': 15, '45': 15,
  '46': 16, '47': 16, '48': 16,
  '49': 17, '50': 17, '81': 17,
  '51': 18, '52': 18,
  '53': 19, '54': 19, '55': 19, '82': 19,
  '56': 20, '57': 20,
  '58': 21, '59': 21,
  '60': 22, '61': 22, '62': 22, '63': 22, '64': 22,
  '65': 23, '66': 23, '67': 23, '68': 23,
  '69': 24, '70': 24, '71': 24,
  '72': 25, '73': 25,
  '77': 26, '78': 26,
  '75': 27, '76': 27,
  '79': 28, '80': 28,
}

// Postal district -> broad region, matched to the GAC region nearest that district.
const DISTRICT_REGION = {
  1: 'central', 2: 'central', 4: 'central', 6: 'central', 7: 'central',
  8: 'central', 9: 'central', 10: 'central', 11: 'central', 12: 'central', 13: 'central',
  3: 'west', 5: 'west', 21: 'west', 22: 'west', 23: 'west', 24: 'west',
  14: 'east', 15: 'east', 16: 'east', 17: 'east', 18: 'east',
  19: 'north', 20: 'north', 25: 'north', 26: 'north', 27: 'north', 28: 'north',
}

// Given a (possibly partial) Singapore postcode, return the closest mock GAC
// location, or null if the postcode isn't recognised yet.
export function findNearestLocation(postcode) {
  const digits = String(postcode ?? '').replace(/\D/g, '')
  if (digits.length < 2) return null
  const sector = digits.slice(0, 2)
  const district = SECTOR_DISTRICT[sector]
  const region = district ? DISTRICT_REGION[district] : null
  if (!region) return null
  return GAC_LOCATIONS.find((loc) => loc.region === region) ?? null
}
