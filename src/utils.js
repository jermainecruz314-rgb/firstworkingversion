// Format an ISO date string (or Date) into a friendly, readable date.
export function formatDate(value) {
  const date = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(date.getTime())) return String(value)
  return new Intl.DateTimeFormat('en-SG', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

export function todayISO() {
  return new Date().toISOString().slice(0, 10)
}

export function isoDaysAgo(days) {
  const d = new Date()
  d.setDate(d.getDate() - days)
  return d.toISOString().slice(0, 10)
}

export function isoDaysAhead(days) {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

export function formatSlotLabel(dateIso, time24) {
  const d = new Date(dateIso)
  const day = d.toLocaleDateString('en-SG', { weekday: 'short', day: 'numeric', month: 'long' })
  const [h, m] = time24.split(':')
  const hour = parseInt(h, 10)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const h12 = hour % 12 || 12
  return `${day}, ${h12}:${m} ${ampm}`
}
