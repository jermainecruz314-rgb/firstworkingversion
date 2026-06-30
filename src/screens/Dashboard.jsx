import Stepper from '../components/Stepper.jsx'
import FamilyTreeIcon from '../components/FamilyTreeIcon.jsx'
import SecurityBadge from '../components/SecurityBadge.jsx'

// Central hub after the personalised landing page. Every other screen is
// reachable from here — not a forced linear sequence.
export default function Dashboard({ profile, onNavigate }) {
  const isCascade = profile.pathwayType === 'cascade'

  const cards = [
    {
      id: 'why',
      title: 'Why This Matters To Me',
      body: isCascade
        ? 'Understand your cascade screening invitation and what it means for you.'
        : 'A plain-language summary of your LDL result and why testing helps.',
      icon: '◆',
    },
    {
      id: 'family',
      title: 'Family Impact',
      body: isCascade
        ? 'How FH runs in families and what your result could mean for loved ones.'
        : 'What a positive result could mean for your relatives and cascade screening.',
      family: true,
    },
    {
      id: 'cost',
      title: 'Cost Transparency',
      body: 'See an honest estimate of what the genetic test may cost you.',
      icon: '$',
    },
    {
      id: 'book',
      title: 'Book Appointment',
      body: `Current status: ${profile.appointmentStatus}`,
      icon: '✓',
    },
    {
      id: 'account',
      title: 'My Account',
      body: 'View your profile, manage data access, and read about data security.',
      icon: '◎',
    },
  ]

  return (
    <section className="screen">
      <SecurityBadge />

      <div className="card dashboard-hero">
        <span className="eyebrow">Your pathway</span>
        <h1 className="screen-title">
          {isCascade ? (
            <span className="dashboard-title-row">
              <FamilyTreeIcon size={26} />
              Welcome back, {profile.name.split(' ')[0]}
            </span>
          ) : (
            <>Welcome back, {profile.name.split(' ')[0]}</>
          )}
        </h1>
        <p className="lead">
          Here&apos;s where you are in your journey. Tap any section below whenever
          you&apos;re ready.
        </p>
        <Stepper currentStage={0} />
      </div>

      <div className="dash-grid">
        {cards.map((card) => (
          <button
            key={card.id}
            type="button"
            className={`dash-card${card.family ? ' family' : ''}`}
            onClick={() => onNavigate(card.id)}
          >
            {card.family ? (
              <FamilyTreeIcon size={22} className="dash-card-icon" />
            ) : (
              <span className="dash-card-glyph" aria-hidden="true">
                {card.icon}
              </span>
            )}
            <span className="dash-card-title">{card.title}</span>
            <span className="dash-card-body">{card.body}</span>
          </button>
        ))}
      </div>
    </section>
  )
}
