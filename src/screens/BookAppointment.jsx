import Stepper from '../components/Stepper.jsx'
import SecurityBadge from '../components/SecurityBadge.jsx'
import { GAC_SLOTS } from '../reminders.js'
import { translateStatus } from '../i18n/index.js'
import { useState } from 'react'

export default function BookAppointment({ profile, onBook, onRemindLater, t }) {
  const [selectedSlot, setSelectedSlot] = useState(null)

  const isBooked = profile.appointmentStatus === 'Booked'
  const isCompleted = profile.appointmentStatus === 'Completed'
  const displaySlot =
    profile.appointmentSlotLabel ??
    GAC_SLOTS.find((s) => s.id === profile.appointmentSlotId)?.label

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
            {GAC_SLOTS.map((slot) => (
              <button
                key={slot.id}
                type="button"
                role="radio"
                aria-checked={selectedSlot === slot.id}
                className={`slot-option${selectedSlot === slot.id ? ' selected' : ''}`}
                onClick={() => setSelectedSlot(slot.id)}
              >
                {slot.label}
              </button>
            ))}
          </div>

          <div className="action-row">
            <button className="btn btn-primary" onClick={handleConfirm} disabled={!selectedSlot}>
              {t('bookConfirm')}
            </button>
            <button type="button" className="btn btn-text" onClick={onRemindLater}>
              {t('bookRemindLater')}
            </button>
          </div>
        </div>
      ) : (
        <div className="card">
          <span className="eyebrow">{t('bookConfirmedEyebrow')}</span>
          <h1 className="screen-title">{t('bookConfirmedTitle')}</h1>

          <div className="success-state" role="status">
            <span className="success-state-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 12.5l2.5 2.5L16 9" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <p className="success-state-title">{t('bookConfirmedHeading')}</p>
            <p className="success-state-body">
              <strong>{displaySlot}</strong>
              <br />
              {t('bookLocation')}
              <br />
              {profile.name}
            </p>
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
