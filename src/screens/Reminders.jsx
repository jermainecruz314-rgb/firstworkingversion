import SecurityBadge from '../components/SecurityBadge.jsx'
import DashIcon from '../components/DashIcon.jsx'
import CardWatermark from '../components/CardWatermark.jsx'
import { buildRemindersT, buildSmsRemindersT } from '../i18n/index.js'
import { formatDate } from '../utils.js'

const CALENDAR_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <rect x="4" y="5" width="16" height="15" rx="2" />
    <path d="M8 3v4M16 3v4M4 11h16" strokeLinecap="round" />
  </svg>
)

const BELL_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path d="M18 8a6 6 0 1 0-12 0c0 7-3 8-3 8h18s-3-1-3-8" strokeLinejoin="round" />
    <path d="M10.3 21a1.7 1.7 0 0 0 3.4 0" strokeLinecap="round" />
  </svg>
)

const TONE_META = {
  appointment: { category: 'teal', icon: CALENDAR_ICON },
  nudge: { category: 'terracotta', icon: BELL_ICON },
  gentle: { category: 'sage', icon: BELL_ICON },
}

export default function Reminders({ profile, t, language = 'en' }) {
  const smsReminders = buildSmsRemindersT(t, profile, language)
  const reminders = buildRemindersT(t, profile)
  const activeReminders =
    smsReminders.length > 0 ? [] : reminders.filter((r) => r.id !== 'all-clear')
  const isEmpty = smsReminders.length === 0 && activeReminders.length === 0

  return (
    <section className="screen">
      <SecurityBadge t={t} />

      <div className="card card--decorated">
        <CardWatermark id="reminders" />
        <div className="screen-hero">
          <DashIcon id="reminders" />
          <span className="eyebrow">{t('remindersEyebrow')}</span>
        </div>
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
        ) : smsReminders.length > 0 ? (
          <div className="sms-bubble-list">
            {smsReminders.map((r) => (
              <div key={r.id} className="sms-bubble-card">
                <div className="sms-bubble-meta">
                  <span className="sms-bubble-sender">{t('smsSender')}</span>
                  <span className="sms-bubble-timestamp">{formatDate(r.sentIso, language)}</span>
                </div>
                <p className="sms-bubble-message">{r.message}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="reminder-list">
            {activeReminders.map((r) => {
              const meta = TONE_META[r.tone] ?? TONE_META.gentle
              return (
                <div key={r.id} className={`reminder-card tone-${r.tone}`}>
                  <span className={`icon-chip icon-chip--${meta.category}`}>{meta.icon}</span>
                  <span className="reminder-card-copy">
                    <p className="reminder-message">{r.message}</p>
                    {r.detail && <p className="reminder-detail">{r.detail}</p>}
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
