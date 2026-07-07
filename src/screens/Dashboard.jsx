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

const ARROW_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
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
      featured: true,
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

  const firstName = profile.name.split(' ')[0]

  return (
    <section className="screen screen--dashboard">
      <SecurityBadge t={t} />

      <header className="dash-hero">
        <p className="dash-hero-eyebrow">{t('dashboardEyebrow')}</p>
        <h1 className="dash-hero-title">
          {isComplete
            ? t('dashboardCompletedTitle')
            : t('dashboardWelcomeBack', { firstName })}
        </h1>
        <p className="dash-hero-lead">
          {isComplete ? t('dashboardCompletedLead') : t('dashboardLead')}
        </p>

        <div className="dash-hero-tracker">
          <PathwayIconTracker currentStage={stage} t={t} variant="warm" />
        </div>

        <StatBanner />
      </header>

      {showFeaturedCta && (
        <button
          type="button"
          className="dash-cta tap-card"
          onClick={() => onNavigate('book')}
        >
          <span className="dash-cta-icon">{CALENDAR_ICON}</span>
          <span className="dash-cta-copy">
            <span className="dash-cta-label">Book My Appointment</span>
            <span className="dash-cta-hint">Genetic Assessment Centre, NHCS</span>
          </span>
          <span className="dash-cta-arrow">{ARROW_ICON}</span>
        </button>
      )}

      <div className="dash-section">
        <h2 className="dash-section-heading">Your pathway</h2>
        <nav className="dash-list" aria-label={t('dashboardEyebrow')}>
          {cards.map((card) => (
            <button
              key={card.id}
              type="button"
              className={`dash-row tap-card dash-row--${card.id}${
                card.featured ? ' dash-row--featured' : ''
              }`}
              onClick={() => onNavigate(card.id)}
            >
              <span className="dash-row-icon" aria-hidden="true">
                <DashIcon id={card.id} />
              </span>
              <span className="dash-row-copy">
                <span className="dash-row-title">{card.title}</span>
                {card.featured && (
                  <span className="dash-row-pullquote">
                    1 in 250 people carry an FH gene variant
                  </span>
                )}
                <span className="dash-row-body">{card.body}</span>
              </span>
              <span className="dash-row-arrow">{ARROW_ICON}</span>
            </button>
          ))}
        </nav>
      </div>

      <DownloadInfoPackButton profile={profile} t={t} variant="link" className="dash-download-link" />
    </section>
  )
}
