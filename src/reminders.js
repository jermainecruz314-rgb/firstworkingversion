const GAC_SLOT_TIMES = ['09:00', '10:30', '14:00', '15:30']

// Deterministic pseudo-random generator seeded from a string (e.g. a date),
// so slot availability is stable across re-renders instead of using Math.random().
function seededRandom(seed) {
  let h = 0
  for (let i = 0; i < seed.length; i++) {
    h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0
  }
  return function next() {
    h = (Math.imul(1103515245, h) + 12345) | 0
    return ((h >>> 0) % 1000) / 1000
  }
}

// Next `count` weekday (Mon–Fri) ISO dates, starting tomorrow.
function nextWeekdayDates(fromIso, count) {
  const dates = []
  const d = new Date(fromIso)
  d.setDate(d.getDate() + 1)
  while (dates.length < count) {
    const day = d.getDay()
    if (day !== 0 && day !== 6) {
      dates.push(d.toISOString().slice(0, 10))
    }
    d.setDate(d.getDate() + 1)
  }
  return dates
}

// Mock appointment slots at the Genetic Assessment Centre (GAC): the next
// 10 weekdays, each with 4 fixed daily times. 1–2 slots per day are marked
// unavailable using a date-seeded random so the schedule is deterministic.
export function generateGacSlots(todayIso = mockTodayISO()) {
  const slots = []

  nextWeekdayDates(todayIso, 10).forEach((dateIso) => {
    const rand = seededRandom(dateIso)
    const unavailableCount = rand() < 0.5 ? 1 : 2
    const unavailableIndexes = new Set()
    while (unavailableIndexes.size < unavailableCount) {
      unavailableIndexes.add(Math.floor(rand() * GAC_SLOT_TIMES.length))
    }

    GAC_SLOT_TIMES.forEach((time, index) => {
      slots.push({
        id: `slot-${dateIso}-${time.replace(':', '')}`,
        date: dateIso,
        time,
        available: !unavailableIndexes.has(index),
      })
    })
  })

  return slots
}

export const GAC_SLOTS = generateGacSlots()

// Days between two ISO date strings (mock — uses local midnight).
export function daysBetween(fromIso, toIso) {
  const from = new Date(fromIso)
  const to = new Date(toIso)
  from.setHours(0, 0, 0, 0)
  to.setHours(0, 0, 0, 0)
  return Math.round((to - from) / (1000 * 60 * 60 * 24))
}

// Mock "today" for consistent demo behaviour (matches referral-date logic in PoC).
export function mockTodayISO() {
  return new Date().toISOString().slice(0, 10)
}

// Build reminder notification cards from the patient profile state.
export function buildReminders(profile, todayIso = mockTodayISO()) {
  const reminders = []
  const daysSince = daysBetween(profile.referralDate, todayIso)

  if (profile.appointmentStatus === 'Booked' && profile.appointmentDate) {
    const daysUntil = daysBetween(todayIso, profile.appointmentDate)
    const when =
      daysUntil <= 0
        ? 'today'
        : daysUntil === 1
          ? 'tomorrow'
          : `in ${daysUntil} days`
    reminders.push({
      id: 'appt-countdown',
      tone: 'appointment',
      message: `Reminder: Your appointment is ${when}`,
      detail: profile.appointmentSlotLabel ?? profile.appointmentDate,
    })
  }

  if (profile.appointmentStatus === 'Reminder scheduled') {
    reminders.push({
      id: 'reminder-later',
      tone: 'gentle',
      message: "We'll remind you when you're ready to book",
      detail: 'You chose to come back to this later — no rush.',
    })
  }

  if (
    (profile.appointmentStatus === 'Not yet booked' ||
      profile.appointmentStatus === 'Reminder scheduled') &&
    daysSince >= 7
  ) {
    reminders.push({
      id: 'no-booking-nudge',
      tone: 'nudge',
      message: `You haven't booked yet — it's been ${daysSince} days since your referral`,
      detail: 'When you feel ready, you can choose a time at the Genetic Assessment Centre.',
    })
  }

  if (reminders.length === 0) {
    reminders.push({
      id: 'all-clear',
      tone: 'gentle',
      message: 'No reminders right now',
      detail: "We'll let you know when there's something you need to see.",
    })
  }

  return reminders
}
