// Mock appointment slots at the Genetic Assessment Centre (GAC).
export const GAC_SLOTS = [
  { id: 'slot-1', label: 'Tue 14 July, 10:00 AM', date: '2026-07-14', time: '10:00' },
  { id: 'slot-2', label: 'Wed 15 July, 2:30 PM', date: '2026-07-15', time: '14:30' },
  { id: 'slot-3', label: 'Thu 16 July, 9:00 AM', date: '2026-07-16', time: '09:00' },
  { id: 'slot-4', label: 'Mon 20 July, 11:30 AM', date: '2026-07-20', time: '11:30' },
  { id: 'slot-5', label: 'Tue 21 July, 3:00 PM', date: '2026-07-21', time: '15:00' },
]

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
