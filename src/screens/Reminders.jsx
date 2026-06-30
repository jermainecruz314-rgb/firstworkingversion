import SecurityBadge from '../components/SecurityBadge.jsx'
import { buildReminders } from '../reminders.js'

export default function Reminders({ profile }) {
  const reminders = buildReminders(profile)

  return (
    <section className="screen">
      <SecurityBadge />

      <div className="card">
        <span className="eyebrow">Stay on track</span>
        <h1 className="screen-title">Reminders</h1>
        <p className="lead">
          Gentle nudges to help you move through your pathway at your own pace.
        </p>

        <div className="reminder-list">
          {reminders.map((r) => (
            <div key={r.id} className={`reminder-card tone-${r.tone}`}>
              <p className="reminder-message">{r.message}</p>
              {r.detail && <p className="reminder-detail">{r.detail}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
