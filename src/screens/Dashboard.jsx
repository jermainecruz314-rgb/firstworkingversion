import JourneyProgress from '../components/JourneyProgress.jsx'
import SecurityBadge from '../components/SecurityBadge.jsx'
import DownloadInfoPackButton from '../components/DownloadInfoPackButton.jsx'
import DashIcon from '../components/DashIcon.jsx'
import { buildRemindersT, translateStatus } from '../i18n/index.js'

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

      <div className="card greeting-card dashboard-greeting">
        <span className="eyebrow">{t('dashboardEyebrow')}</span>
        <h1 className="greeting-title">
          {isComplete
            ? t('dashboardCompletedTitle')
            : t('dashboardWelcomeBack', { firstName: profile.name.split(' ')[0] })}
        </h1>
        <p className="greeting-lead">
          {isComplete ? t('dashboardCompletedLead') : t('dashboardLead')}
        </p>
        <JourneyProgress currentStage={stage} t={t} />
      </div>

      {showFeaturedCta && (
        <button
          type="button"
          className="btn btn-featured btn-block"
          onClick={() => onNavigate('book')}
        >
          {t('dashboardCardBookTitle')}
        </button>
      )}

      <div className="dash-grid">
        {cards.map((card) => (
          <button
            key={card.id}
            type="button"
            className="dash-card"
            onClick={() => onNavigate(card.id)}
          >
            <span className={`dash-card-tile dash-card-tile--${card.id}`}>
              <DashIcon id={card.id} />
            </span>
            <span className="dash-card-title">{card.title}</span>
            <span className="dash-card-body">{card.body}</span>
          </button>
        ))}
      </div>

      <DownloadInfoPackButton profile={profile} t={t} variant="link" className="dash-download-link" />
    </section>
  )
}
