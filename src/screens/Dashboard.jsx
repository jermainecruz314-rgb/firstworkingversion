import PathwayIconTracker from '../components/PathwayIconTracker.jsx'
import StatBanner from '../components/StatBanner.jsx'
import SecurityBadge from '../components/SecurityBadge.jsx'
import DownloadInfoPackButton from '../components/DownloadInfoPackButton.jsx'
import DashIcon from '../components/DashIcon.jsx'
import { buildRemindersT, translateStatus } from '../i18n/index.js'

const CALENDAR_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <rect x="4" y="5" width="16" height="15" rx="2" />
    <path d="M8 3v4M16 3v4M4 11h16" strokeLinecap="round" />
  </svg>
)

const CHEVRON_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function Dashboard({ profile, onNavigate, t }) {
  const isCascade = profile.pathwayType === 'cascade'
  const isComplete = profile.appointmentStatus === 'Completed'
  const reminderPreview = buildRemindersT(t, profile).filter((r) => r.id !== 'all-clear')[0]
  const stage = profile.pathwayStage ?? 0
  const showFeaturedCta = !isComplete

  const statusLabel = translateStatus(profile.appointmentStatus, t)
  const bookBody = profile.appointmentSlotLabel
    ? t('dashboardCardBookBodyStatusSlot', {
        status: statusLabel,
        slot: profile.appointmentSlotLabel,
      })
    : t('dashboardCardBookBodyStatus', { status: statusLabel })

  const cards = [
    {
      id: 'why',
      title: t('dashboardCardWhyTitle'),
      body: isCascade ? t('dashboardCardWhyBodyCascade') : t('dashboardCardWhyBodyIndex'),
      wide: true,
    },
    {
      id: 'family',
      title: t('dashboardCardFamilyTitle'),
      body: isCascade ? t('dashboardCardFamilyBodyCascade') : t('dashboardCardFamilyBodyIndex'),
    },
    {
      id: 'familyTalk',
      title: t('dashboardCardFamilyTalkTitle'),
      body: t('dashboardCardFamilyTalkBody'),
    },
    {
      id: 'cost',
      title: t('dashboardCardCostTitle'),
      body: t('dashboardCardCostBody'),
    },
    {
      id: 'book',
      title: t('dashboardCardBookTitle'),
      body: bookBody,
    },
    {
      id: 'reminders',
      title: t('dashboardCardRemindersTitle'),
      body: reminderPreview?.message ?? t('dashboardCardRemindersBodyNone'),
    },
    {
      id: 'faq',
      title: t('dashboardCardFaqTitle'),
      body: t('dashboardCardFaqBody'),
    },
    {
      id: 'account',
      title: t('dashboardCardAccountTitle'),
      body: t('dashboardCardAccountBody'),
    },
  ]

  return (
    <section className="screen">
      <SecurityBadge t={t} />

      <div className="card greeting-card greeting-card--hero dashboard-greeting">
        <span className="greeting-card-decor" aria-hidden="true" />
        <span className="eyebrow eyebrow--hero">{t('dashboardEyebrow')}</span>
        <h1 className="greeting-title greeting-title--hero">
          {isComplete
            ? t('dashboardCompletedTitle')
            : t('dashboardWelcomeBack', { firstName: profile.name.split(' ')[0] })}
        </h1>
        <p className="greeting-lead greeting-lead--hero">
          {isComplete ? t('dashboardCompletedLead') : t('dashboardLead')}
        </p>
        <PathwayIconTracker currentStage={stage} t={t} variant="greeting" />
      </div>

      <StatBanner />

      {showFeaturedCta && (
        <button
          type="button"
          className="btn btn-featured btn-block btn-featured--cta"
          onClick={() => onNavigate('book')}
        >
          <span className="btn-featured-icon">{CALENDAR_ICON}</span>
          Book My Appointment
        </button>
      )}

      <div className="dash-grid">
        {cards.map((card) => (
          <button
            key={card.id}
            type="button"
            className={`dash-card tap-card${card.wide ? ' dash-card--wide' : ''}`}
            onClick={() => onNavigate(card.id)}
          >
            <span className={`dash-card-tile dash-card-tile--${card.id}`}>
              <DashIcon id={card.id} />
            </span>
            {card.id === 'why' && (
              <span className="dash-stat-badge">
                1 in 250 people carry an FH gene variant
              </span>
            )}
            <span className="dash-card-title">{card.title}</span>
            <span className="dash-card-body">{card.body}</span>
            <span className="dash-card-chevron">{CHEVRON_ICON}</span>
          </button>
        ))}
      </div>

      <DownloadInfoPackButton profile={profile} t={t} variant="link" className="dash-download-link" />
    </section>
  )
}
