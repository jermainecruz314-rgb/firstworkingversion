// Format an ISO date string (or Date) into a friendly, readable date.
const DATE_LOCALES = {
  en: 'en-SG',
  zh: 'zh-CN',
  ms: 'ms-SG',
  ta: 'ta-SG',
}

export function formatDate(value, lang = 'en') {
  const date = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(date.getTime())) return String(value)
  const locale = DATE_LOCALES[lang] ?? DATE_LOCALES.en
  return new Intl.DateTimeFormat(locale, {
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
