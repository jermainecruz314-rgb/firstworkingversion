import Stepper from '../components/Stepper.jsx'
import SecurityBadge from '../components/SecurityBadge.jsx'
import Toast from '../components/Toast.jsx'
import { GAC_SLOTS } from '../reminders.js'

export default function BookAppointment({ profile, onBook, onRemindLater }) {
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [toast, setToast] = useState('')

  const isBooked = profile.appointmentStatus === 'Booked'
  const displaySlot =
    profile.appointmentSlotLabel ??
    GAC_SLOTS.find((s) => s.id === profile.appointmentSlotId)?.label

  const handleConfirm = () => {
    const slot = GAC_SLOTS.find((s) => s.id === selectedSlot)
    if (!slot || !onBook) return
    onBook(slot)
  }

  const handleAddToCalendar = () => {
    setToast('Added to calendar (demo)')
    setTimeout(() => setToast(''), 2800)
  }

  return (
    <section className="screen">
      <Stepper currentStage={1} />
      <SecurityBadge />

      {!isBooked ? (
        <div className="card">
          <span className="eyebrow">Genetic Assessment Centre</span>
          <h1 className="screen-title">Choose a time</h1>
          <p className="lead">
            Pick a slot that suits you. All appointments are at the Genetic
            Assessment Centre (GAC).
          </p>

          {profile.appointmentStatus === 'Reminder scheduled' && (
            <p className="helper-note">
              You asked us to remind you later — whenever you&apos;re ready, choose a
              time below.
            </p>
          )}

          <div className="slot-list" role="radiogroup" aria-label="Available appointment times">
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

          <button
            className="btn btn-primary"
            onClick={handleConfirm}
            disabled={!selectedSlot}
          >
            Confirm appointment
          </button>
          <button type="button" className="btn btn-secondary" onClick={onRemindLater}>
            Not ready yet, remind me later
          </button>
        </div>
      ) : (
        <div className="card">
          <span className="eyebrow">You&apos;re all set</span>
          <h1 className="screen-title">Appointment confirmed</h1>

          <div className="confirmation" role="status">
            <span className="confirmation-icon" aria-hidden="true">
              ✓
            </span>
            <div>
              <p className="confirmation-title">See you at the GAC</p>
              <p className="confirmation-body">
                <strong>{displaySlot}</strong>
                <br />
                Genetic Assessment Centre
                <br />
                {profile.name}
              </p>
            </div>
          </div>

          <dl className="record-list">
            <div className="record-row">
              <dt>Status</dt>
              <dd>{profile.appointmentStatus}</dd>
            </div>
          </dl>

          <button type="button" className="btn btn-primary" onClick={handleAddToCalendar}>
            Add to calendar
          </button>
          <Toast message={toast} visible={!!toast} />
        </div>
      )}
    </section>
  )
}
