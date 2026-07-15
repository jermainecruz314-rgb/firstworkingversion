import StatBanner from '../components/StatBanner.jsx'
import SecurityBadge from '../components/SecurityBadge.jsx'
import ProfileStrip from '../components/ProfileStrip.jsx'
import LogoMark from '../components/LogoMark.jsx'
import DownloadInfoPackButton from '../components/DownloadInfoPackButton.jsx'
import DashIcon from '../components/DashIcon.jsx'
import { buildRemindersT, translateStatus } from '../i18n/index.js'
import { resolveAppointmentSlotLabel } from '../utils.js'

const PATHWAY_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
    <rect x="9" y="3" width="6" height="4" rx="1" />
    <path d="M9 12h6M9 16h4" strokeLinecap="round" />
  </svg>
)

export default function Dashboard({ profile, onNavigate, t, language = 'en' }) {
  const isCascade = profile.pathwayType === 'cascade'
  const isComplete = profile.appointmentStatus === 'Completed'
  const reminderPreview = buildRemindersT(t, profile).filter((r) => r.id !== 'all-clear')[0]
  const showFeaturedCta = !isComplete

  const statusLabel = translateStatus(profile.appointmentStatus, t)
  const pathwayMeta = isCascade ? t('pathwayCascade') : t('pathwayIndex')

  const localizedSlot = resolveAppointmentSlotLabel(profile, language)
  const bookBody = localizedSlot
    ? t('dashboardCardBookBodyStatusSlot', {
        status: statusLabel,
        slot: localizedSlot,
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
    <section className="screen screen--hb screen--with-logo">
      <LogoMark />
      <SecurityBadge t={t} />
      <ProfileStrip name={profile.name} meta={pathwayMeta} />

      <div className="hb-card hb-card--peach">
        <p className="hb-card-kicker">{t('dashboardEyebrow')}</p>
        <h1 className="hb-card-title">
          {isComplete
            ? t('dashboardCompletedTitle')
            : t('dashboardWelcomeBack', { firstName })}
        </h1>
        <p className="hb-card-lead">
          {isComplete ? t('dashboardCompletedLead') : t('dashboardLead')}
        </p>
        <StatBanner t={t} />
      </div>

      {showFeaturedCta && (
        <button type="button" className="hb-btn-orange tap-card" onClick={() => onNavigate('book')}>
          {t('dashboardBookCta')}
        </button>
      )}

      <div className="hb-divider" />

      <div className="hb-section-head">
        <span className="hb-section-icon">{PATHWAY_ICON}</span>
        <h2 className="hb-section-title">{t('dashboardEyebrow')}</h2>
      </div>

      <div className="hb-tile-grid" role="navigation" aria-label={t('dashboardEyebrow')}>
        {cards.map((card) =>
          card.featured ? (
            <button
              key={card.id}
              type="button"
              className="hb-tile hb-tile--wide tap-card"
              onClick={() => onNavigate(card.id)}
            >
              <DashIcon id={card.id} />
              <span className="hb-tile-copy">
                <span className="hb-tile-title">{card.title}</span>
                <span className="hb-tile-note">{t('dashboardFeaturedNote')}</span>
                <span className="hb-tile-body">{card.body}</span>
              </span>
            </button>
          ) : (
            <button
              key={card.id}
              type="button"
              className="hb-tile tap-card"
              onClick={() => onNavigate(card.id)}
            >
              <DashIcon id={card.id} />
              <span className="hb-tile-title">{card.title}</span>
            </button>
          )
        )}
      </div>

      <DownloadInfoPackButton profile={profile} t={t} variant="link" className="dash-download-link" />
    </section>
  )
}
