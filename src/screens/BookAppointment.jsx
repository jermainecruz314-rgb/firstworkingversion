import SecurityBadge from '../components/SecurityBadge.jsx'
import AnimatedSuccessCheck from '../components/AnimatedSuccessCheck.jsx'
import AppointmentCalendar from '../components/AppointmentCalendar.jsx'
import { GAC_SLOTS } from '../reminders.js'
import { GAC_LOCATIONS, findNearestLocation } from '../locations.js'
import { translateStatus } from '../i18n/index.js'
import { formatSlotLabel, formatTimeOnly, resolveAppointmentSlotLabel, formatDate, todayISO } from '../utils.js'
import DashIcon from '../components/DashIcon.jsx'
import CardWatermark from '../components/CardWatermark.jsx'
import { useMemo, useState } from 'react'

const CALENDAR_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <rect x="4" y="5" width="16" height="15" rx="2" />
    <path d="M8 3v4M16 3v4M4 11h16" strokeLinecap="round" />
  </svg>
)

const BELL = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path d="M18 8a6 6 0 1 0-12 0c0 7-3 8-3 8h18s-3-1-3-8" strokeLinejoin="round" />
    <path d="M10.3 21a1.7 1.7 0 0 0 3.4 0" strokeLinecap="round" />
  </svg>
)

export default function BookAppointment({ profile, onBook, onRemindLater, onCancelBooking, t, language = 'en' }) {
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [postcode, setPostcode] = useState('569880')
  const [selectedLocationId, setSelectedLocationId] = useState(null)
  const [remindOnDay, setRemindOnDay] = useState(false)
  const [confirmingCancel, setConfirmingCancel] = useState(false)

  const nearestLocation = useMemo(() => findNearestLocation(postcode), [postcode])
  const effectiveLocationId = selectedLocationId ?? nearestLocation?.id ?? null

  const slotsByDate = useMemo(() => {
    const map = {}
    GAC_SLOTS.forEach((slot) => {
      if (!map[slot.date]) map[slot.date] = []
      map[slot.date].push(slot)
    })
    return map
  }, [])
  const availableDates = useMemo(() => Object.keys(slotsByDate), [slotsByDate])
  const todayLabel = useMemo(() => formatDate(todayISO(), language), [language])

  const isBooked = profile.appointmentStatus === 'Booked'
  const isCompleted = profile.appointmentStatus === 'Completed'
  const bookedLocation = GAC_LOCATIONS.find((loc) => loc.id === profile.appointmentLocationId)
  const displaySlot =
    resolveAppointmentSlotLabel(profile, language) ||
    (() => {
      const slot = GAC_SLOTS.find((s) => s.id === profile.appointmentSlotId)
      return slot ? formatSlotLabel(slot.date, slot.time, language) : ''
    })()

  const handleSelectDate = (iso) => {
    setSelectedDate(iso)
    setSelectedSlot(null)
  }

  const handleConfirm = () => {
    const slot = GAC_SLOTS.find((s) => s.id === selectedSlot)
    if (!slot || !onBook || !effectiveLocationId) return
    onBook({ ...slot, locationId: effectiveLocationId, remindOnDay })
  }

  const handleCancelConfirmed = () => {
    setConfirmingCancel(false)
    onCancelBooking?.()
  }

  if (isCompleted) {
    return (
      <section className="screen">
        <SecurityBadge t={t} />
        <div className="card card--decorated">
          <CardWatermark id="book" />
          <div className="screen-hero">
            <DashIcon id="book" />
            <span className="eyebrow">{t('bookCompletedEyebrow')}</span>
          </div>
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
      <SecurityBadge t={t} />

      {!isBooked ? (
        <div className="card card--decorated">
          <CardWatermark id="book" />
          <div className="screen-hero">
            <DashIcon id="book" />
            <span className="eyebrow">{t('bookEyebrow')}</span>
          </div>
          <h1 className="screen-title">{t('bookTitle')}</h1>
          <p className="lead">{t('bookLead')}</p>

          {profile.appointmentStatus === 'Reminder scheduled' && (
            <p className="helper-note">{t('bookReminderLaterNote')}</p>
          )}

          <div className="field">
            <label className="field-label" htmlFor="appt-postcode">
              {t('bookPostcodeLabel')}
            </label>
            <input
              id="appt-postcode"
              className="input"
              type="text"
              inputMode="numeric"
              autoComplete="postal-code"
              maxLength={6}
              placeholder={t('bookPostcodePlaceholder')}
              value={postcode}
              onChange={(e) => setPostcode(e.target.value.replace(/\D/g, '').slice(0, 6))}
            />
            {nearestLocation && (
              <p className="helper-note helper-note--nearest">
                {t('bookNearestCentreNote', { name: nearestLocation.name })}
              </p>
            )}
          </div>

          <div className="field">
            <label className="field-label" htmlFor="appt-location-select">
              {t('bookChooseCentreLabel')}
            </label>
            <select
              id="appt-location-select"
              className="select"
              value={effectiveLocationId ?? ''}
              onChange={(e) => setSelectedLocationId(e.target.value || null)}
            >
              <option value="" disabled>
                {t('bookSelectCentrePlaceholder')}
              </option>
              {GAC_LOCATIONS.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name}
                  {nearestLocation?.id === loc.id ? ` (${t('bookNearestTag')})` : ''}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <span className="field-label">{t('bookSelectDateLabel')}</span>
            <p className="helper-note helper-note--nearest">
              {t('bookLiveAvailabilityNote', { date: todayLabel })}
            </p>
            <AppointmentCalendar
              availableDates={availableDates}
              selectedDate={selectedDate}
              onSelectDate={handleSelectDate}
              language={language}
              t={t}
            />
          </div>

          {selectedDate && (
            <div className="field">
              <span className="field-label" id="appt-time-select-label">
                {t('bookChooseTimeLabel')}
              </span>
              <div className="slot-grid" role="group" aria-labelledby="appt-time-select-label">
                {(slotsByDate[selectedDate] ?? []).map((slot) => (
                  <button
                    key={slot.id}
                    type="button"
                    className={`slot-option${selectedSlot === slot.id ? ' selected' : ''}${
                      !slot.available ? ' unavailable' : ''
                    }`}
                    disabled={!slot.available}
                    aria-pressed={selectedSlot === slot.id}
                    onClick={() => setSelectedSlot(slot.id)}
                  >
                    <span className="slot-option-time">{formatTimeOnly(slot.time)}</span>
                    <span
                      className={`slot-badge${
                        slot.available ? ' slot-badge--available' : ' slot-badge--full'
                      }`}
                    >
                      {slot.available ? t('slotAvailable') : t('slotFullyBooked')}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="field">
            <Toggle
              label={t('bookRemindOnDay')}
              checked={remindOnDay}
              onChange={setRemindOnDay}
            />
          </div>

          <div className="action-row">
            <button
              className="btn btn-featured btn-featured--cta"
              onClick={handleConfirm}
              disabled={!selectedSlot || !effectiveLocationId}
            >
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
              <span className="icon-chip icon-chip--sm icon-chip--terracotta">{CALENDAR_ICON}</span>
              <div className="booking-summary-content">
                <p className="booking-summary-slot">{displaySlot}</p>
                <p className="booking-summary-location">
                  {bookedLocation ? bookedLocation.name : t('bookLocation')}
                </p>
                {bookedLocation && (
                  <p className="booking-summary-address">{bookedLocation.address}</p>
                )}
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

          {!confirmingCancel ? (
            <button
              type="button"
              className="btn btn-text btn-text--danger btn-inline"
              onClick={() => setConfirmingCancel(true)}
            >
              {t('bookCancelAppointment')}
            </button>
          ) : (
            <div className="cancel-confirm">
              <p className="cancel-confirm-prompt">
                {t('bookCancelConfirmPrompt', { date: displaySlot })}
              </p>
              <div className="action-row">
                <button
                  type="button"
                  className="btn btn-danger btn-inline"
                  onClick={handleCancelConfirmed}
                >
                  {t('bookCancelConfirmYes')}
                </button>
                <button
                  type="button"
                  className="btn btn-text btn-inline"
                  onClick={() => setConfirmingCancel(false)}
                >
                  {t('bookCancelConfirmNo')}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  )
}

function Toggle({ label, checked, onChange }) {
  return (
    <button
      type="button"
      className={`toggle${checked ? ' on' : ''}`}
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
    >
      <span className="toggle-track">
        <span className="toggle-thumb" />
      </span>
      <span className="toggle-label">{label}</span>
    </button>
  )
}
