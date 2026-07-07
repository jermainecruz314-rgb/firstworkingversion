import Stepper from '../components/Stepper.jsx'
import SecurityBadge from '../components/SecurityBadge.jsx'
import AnimatedSuccessCheck from '../components/AnimatedSuccessCheck.jsx'
import { GAC_SLOTS } from '../reminders.js'
import { translateStatus } from '../i18n/index.js'
import { formatSlotLabel, parseSlotLabel, resolveAppointmentSlotLabel } from '../utils.js'
import { useState } from 'react'

const CALENDAR_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <rect x="4" y="5" width="16" height="15" rx="2" />
    <path d="M8 3v4M16 3v4M4 11h16" strokeLinecap="round" />
  </svg>
)

const CHEVRON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const CHECK = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M8 12.5l2.5 2.5L16 9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const BELL = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path d="M18 8a6 6 0 1 0-12 0c0 7-3 8-3 8h18s-3-1-3-8" strokeLinejoin="round" />
    <path d="M10.3 21a1.7 1.7 0 0 0 3.4 0" strokeLinecap="round" />
  </svg>
)

export default function BookAppointment({ profile, onBook, onRemindLater, t, language = 'en' }) {
  const [selectedSlot, setSelectedSlot] = useState(null)

  const isBooked = profile.appointmentStatus === 'Booked'
  const isCompleted = profile.appointmentStatus === 'Completed'
  const displaySlot =
    resolveAppointmentSlotLabel(profile, language) ||
    (() => {
      const slot = GAC_SLOTS.find((s) => s.id === profile.appointmentSlotId)
      return slot ? formatSlotLabel(slot.date, slot.time, language) : ''
    })()

  const handleConfirm = () => {
    const slot = GAC_SLOTS.find((s) => s.id === selectedSlot)
    if (!slot || !onBook) return
    onBook(slot)
  }

  if (isCompleted) {
    return (
      <section className="screen">
        <Stepper currentStage={profile.pathwayStage ?? 3} t={t} />
        <SecurityBadge t={t} />
        <div className="card">
          <span className="eyebrow">{t('bookCompletedEyebrow')}</span>
          <h1 className="screen-title">{t('bookCompletedTitle')}</h1>
          <p className="lead">{t('bookCompletedLead')}</p>
          <dl className="record-list card-data">
            <div className="record-row">
              <dt>{t('labelStatus')}</dt>
              <dd>{translateStatus(profile.appointmentStatus, t)}</dd>
            </div>
          </dl>
        </div>
      </section>
    )
  }

  return (
    <section className="screen">
      <Stepper currentStage={profile.pathwayStage ?? 1} t={t} />
      <SecurityBadge t={t} />

      {!isBooked ? (
        <div className="card">
          <span className="eyebrow">{t('bookEyebrow')}</span>
          <h1 className="screen-title">{t('bookTitle')}</h1>
          <p className="lead">{t('bookLead')}</p>

          {profile.appointmentStatus === 'Reminder scheduled' && (
            <p className="helper-note">{t('bookReminderLaterNote')}</p>
          )}

          <div
            className="slot-list"
            role="radiogroup"
            aria-label={t('labelAvailableAppointmentTimes')}
          >
            {GAC_SLOTS.map((slot) => {
              const selected = selectedSlot === slot.id
              const formatted = formatSlotLabel(slot.date, slot.time, language)
              const { date, time } = parseSlotLabel(formatted)
              return (
                <button
                  key={slot.id}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  className={`slot-card tap-card${selected ? ' selected' : ''}`}
                  onClick={() => setSelectedSlot(slot.id)}
                >
                  <span className="slot-card-icon">{CALENDAR_ICON}</span>
                  <span className="slot-card-content">
                    <span className="slot-card-date">{date}</span>
                    {time && <span className="slot-card-time">{time}</span>}
                  </span>
                  {!selected && <span className="slot-available-badge">{t('slotAvailable')}</span>}
                  <span className="slot-card-action">
                    {selected ? CHECK : CHEVRON}
                  </span>
                </button>
              )
            })}
          </div>

          <div className="action-row">
            <button className="btn btn-featured btn-featured--cta" onClick={handleConfirm} disabled={!selectedSlot}>
              {t('bookConfirm')}
            </button>
            <button type="button" className="btn btn-text" onClick={onRemindLater}>
              {t('bookRemindLater')}
            </button>
          </div>
        </div>
      ) : (
        <div className="card">
          <AnimatedSuccessCheck title={t('bookAppointmentConfirmed')}>
            <div className="booking-summary-card">
              <span className="booking-summary-icon">{CALENDAR_ICON}</span>
              <div className="booking-summary-content">
                <p className="booking-summary-slot">{displaySlot}</p>
                <p className="booking-summary-location">{t('bookLocation')}</p>
              </div>
            </div>
          </AnimatedSuccessCheck>

          <div className="booking-reminder-banner">
            <span className="booking-reminder-icon">{BELL}</span>
            <p>{t('bookReminderBanner')}</p>
          </div>

          <dl className="record-list card-data">
            <div className="record-row">
              <dt>{t('labelStatus')}</dt>
              <dd>{translateStatus(profile.appointmentStatus, t)}</dd>
            </div>
          </dl>

          <button type="button" className="btn btn-secondary btn-inline">
            {t('bookAddCalendar')}
          </button>
        </div>
      )}
    </section>
  )
}
