import SecurityBadge from '../components/SecurityBadge.jsx'
import { buildRemindersT } from '../i18n/index.js'

export default function Reminders({ profile, t }) {
  const reminders = buildRemindersT(t, profile)

  return (
    <section className="screen">
      <SecurityBadge t={t} />

      <div className="card">
        <span className="eyebrow">{t('remindersEyebrow')}</span>
        <h1 className="screen-title">{t('remindersTitle')}</h1>
        <p className="lead">{t('remindersLead')}</p>

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
