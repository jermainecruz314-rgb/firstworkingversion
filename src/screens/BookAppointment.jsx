import { useState } from 'react'
import Stepper from '../components/Stepper.jsx'
import SecurityBadge from '../components/SecurityBadge.jsx'

// Simple appointment booking screen — mock only, no real scheduling.
export default function BookAppointment({ profile, onBooked }) {
  const [booked, setBooked] = useState(profile.appointmentStatus !== 'Not yet booked')

  const handleBook = () => {
    setBooked(true)
    if (onBooked) onBooked()
  }

  return (
    <section className="screen">
      <Stepper currentStage={1} />
      <SecurityBadge />

      <div className="card">
        <span className="eyebrow">Next step</span>
        <h1 className="screen-title">Book your appointment</h1>
        <p className="lead">
          When you&apos;re ready, request a time at the Genetic Assessment Centre.
          Our care team will confirm a slot that suits you.
        </p>

        <dl className="record-list">
          <div className="record-row">
            <dt>Current status</dt>
            <dd>{booked ? 'Request sent — awaiting confirmation' : profile.appointmentStatus}</dd>
          </div>
          <div className="record-row">
            <dt>Patient</dt>
            <dd>{profile.name}</dd>
          </div>
          <div className="record-row">
            <dt>Pathway</dt>
            <dd>{profile.pathwayType === 'cascade' ? 'Cascade screening' : 'Index patient'}</dd>
          </div>
        </dl>

        {booked ? (
          <div className="confirmation" role="status">
            <span className="confirmation-icon" aria-hidden="true">
              ✓
            </span>
            <div>
              <p className="confirmation-title">Appointment request sent</p>
              <p className="confirmation-body">
                Our care team will reach out shortly to confirm a time that suits
                you. There&apos;s nothing more you need to do for now.
              </p>
            </div>
          </div>
        ) : (
          <button className="btn btn-primary" onClick={handleBook}>
            Request an appointment
          </button>
        )}
      </div>
    </section>
  )
}
