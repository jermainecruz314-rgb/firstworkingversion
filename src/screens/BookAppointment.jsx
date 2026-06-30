import Stepper from '../components/Stepper.jsx'
import SecurityBadge from '../components/SecurityBadge.jsx'
import Toast from '../components/Toast.jsx'
import { GAC_SLOTS } from '../reminders.js'
import { translateStatus } from '../i18n/index.js'
import { useState } from 'react'

export default function BookAppointment({ profile, onBook, onRemindLater, t }) {
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [toast, setToast] = useState('')

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

  const handleAddToCalendar = () => {
    setToast(t('toastCalendarAdded'))
    setTimeout(() => setToast(''), 2800)
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
          <dl className="record-list">
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

          <button className="btn btn-primary" onClick={handleConfirm} disabled={!selectedSlot}>
            {t('bookConfirm')}
          </button>
          <button type="button" className="btn btn-secondary" onClick={onRemindLater}>
            {t('bookRemindLater')}
          </button>
        </div>
      ) : (
        <div className="card">
          <span className="eyebrow">{t('bookConfirmedEyebrow')}</span>
          <h1 className="screen-title">{t('bookConfirmedTitle')}</h1>

          <div className="confirmation" role="status">
            <span className="confirmation-icon" aria-hidden="true">
              ✓
            </span>
            <div>
              <p className="confirmation-title">{t('bookConfirmedHeading')}</p>
              <p className="confirmation-body">
                <strong>{displaySlot}</strong>
                <br />
                {t('bookLocation')}
                <br />
                {profile.name}
              </p>
            </div>
          </div>

          <dl className="record-list">
            <div className="record-row">
              <dt>{t('labelStatus')}</dt>
              <dd>{translateStatus(profile.appointmentStatus, t)}</dd>
            </div>
          </dl>

          <button type="button" className="btn btn-primary" onClick={handleAddToCalendar}>
            {t('bookAddCalendar')}
          </button>
          <Toast message={toast} visible={!!toast} />
        </div>
      )}
    </section>
  )
}
