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

// Today's date as an ISO yyyy-mm-dd string (handy for date inputs).
export function todayISO() {
  return new Date().toISOString().slice(0, 10)
}
