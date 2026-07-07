import SecurityBadge from '../components/SecurityBadge.jsx'
import { buildRemindersT } from '../i18n/index.js'

export default function Reminders({ profile, t }) {
  const reminders = buildRemindersT(t, profile)
  const activeReminders = reminders.filter((r) => r.id !== 'all-clear')
  const isEmpty = activeReminders.length === 0

  return (
    <section className="screen">
      <SecurityBadge t={t} />

      <div className="card">
        <span className="eyebrow">{t('remindersEyebrow')}</span>
        <h1 className="screen-title">{t('remindersTitle')}</h1>
        <p className="lead">{t('remindersLead')}</p>

        {isEmpty ? (
          <div className="empty-state">
            <span className="empty-state-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="12" r="9" />
                <path d="M8 12.5l2.5 2.5L16 9" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <p className="empty-state-title">{t('remindersEmptyTitle')}</p>
            <p className="empty-state-body">{t('remindersEmptyBody')}</p>
          </div>
        ) : (
          <div className="reminder-list">
            {activeReminders.map((r) => (
              <div key={r.id} className={`reminder-card tone-${r.tone}`}>
                <p className="reminder-message">{r.message}</p>
                {r.detail && <p className="reminder-detail">{r.detail}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
