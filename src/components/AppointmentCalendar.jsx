import { useMemo, useState } from 'react'

const CHEVRON_LEFT = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const CHEVRON_RIGHT = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const DATE_LOCALES = { en: 'en-SG', zh: 'zh-CN', ms: 'ms-SG', ta: 'ta-SG' }

function monthKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
}

export default function AppointmentCalendar({
  availableDates,
  selectedDate,
  onSelectDate,
  language = 'en',
  t,
}) {
  const locale = DATE_LOCALES[language] ?? DATE_LOCALES.en
  const availableSet = useMemo(() => new Set(availableDates), [availableDates])
  const availableMonths = useMemo(
    () => new Set(availableDates.map((iso) => iso.slice(0, 7))),
    [availableDates]
  )

  const [visibleMonth, setVisibleMonth] = useState(() => {
    const first = availableDates[0] ? new Date(availableDates[0]) : new Date()
    return new Date(first.getFullYear(), first.getMonth(), 1)
  })

  const monthLabel = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(visibleMonth)

  const weekdayLabels = useMemo(() => {
    const base = new Date(2026, 5, 7) // a known Sunday
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(base)
      d.setDate(base.getDate() + i)
      return new Intl.DateTimeFormat(locale, { weekday: 'narrow' }).format(d)
    })
  }, [locale])

  const gridDays = useMemo(() => {
    const year = visibleMonth.getFullYear()
    const month = visibleMonth.getMonth()
    const startOffset = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const cells = Array.from({ length: startOffset }, () => null)
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push(`${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`)
    }
    return cells
  }, [visibleMonth])

  const prevMonth = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() - 1, 1)
  const nextMonth = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 1)
  const canGoPrev = availableMonths.has(monthKey(prevMonth))
  const canGoNext = availableMonths.has(monthKey(nextMonth))

  const shiftMonth = (delta) => {
    setVisibleMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + delta, 1))
  }

  return (
    <div className="appt-calendar" role="group" aria-label={t('labelAvailableAppointmentTimes')}>
      <div className="appt-calendar-header">
        <button
          type="button"
          className="appt-calendar-nav"
          onClick={() => shiftMonth(-1)}
          disabled={!canGoPrev}
          aria-label={t('calPrevMonth')}
        >
          {CHEVRON_LEFT}
        </button>
        <span className="appt-calendar-month">{monthLabel}</span>
        <button
          type="button"
          className="appt-calendar-nav"
          onClick={() => shiftMonth(1)}
          disabled={!canGoNext}
          aria-label={t('calNextMonth')}
        >
          {CHEVRON_RIGHT}
        </button>
      </div>

      <div className="appt-calendar-weekdays">
        {weekdayLabels.map((w, i) => (
          <span key={i} className="appt-calendar-weekday">
            {w}
          </span>
        ))}
      </div>

      <div className="appt-calendar-grid">
        {gridDays.map((iso, i) => {
          if (!iso) return <span key={`empty-${i}`} className="appt-calendar-cell appt-calendar-cell--empty" />
          const day = parseInt(iso.slice(8, 10), 10)
          const available = availableSet.has(iso)
          const selected = iso === selectedDate
          return (
            <button
              key={iso}
              type="button"
              className={`appt-calendar-cell appt-calendar-day${available ? ' available' : ''}${selected ? ' selected' : ''}`}
              disabled={!available}
              aria-pressed={selected}
              onClick={() => onSelectDate(iso)}
            >
              {day}
            </button>
          )
        })}
      </div>
    </div>
  )
}
