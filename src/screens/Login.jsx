import LanguagePicker from '../components/LanguagePicker.jsx'
import Logo from '../components/Logo.jsx'
import { translatePathwayStage } from '../i18n/index.js'

const PROFILE_CARDS = [
  {
    id: 'weiLing',
    nameKey: 'loginProfileWeiLing',
    descKey: 'profileWeiLingDesc',
    initials: 'WL',
    pathwayType: 'index',
    pathwayStage: 0,
  },
  {
    id: 'aishah',
    nameKey: 'loginProfileAishah',
    descKey: 'profileAishahDesc',
    initials: 'AR',
    pathwayType: 'index',
    pathwayStage: 3,
  },
]

export default function Login({
  language,
  onLanguageChange,
  selectedProfile,
  onSelectProfile,
  onSignIn,
  t,
}) {
  return (
    <section className="screen auth-screen">
      <div className="card auth-card">
        <Logo size={48} className="auth-logo" />
        <span className="eyebrow">{t('loginWelcome')}</span>
        <h1 className="screen-title">{t('loginTitle')}</h1>
        <p className="lead">{t('loginLead')}</p>

        <LanguagePicker value={language} onChange={onLanguageChange} t={t} />

        <div className="demo-picker">
          <p className="group-title">{t('loginChooseProfile')}</p>
          <div className="profile-card-grid">
            {PROFILE_CARDS.map((card) => {
              const badgeLabel =
                card.pathwayType === 'cascade' ? t('loginBadgeCascade') : t('loginBadgeIndex')
              const stageLabel = translatePathwayStage(card.pathwayStage, t)

              return (
                <button
                  key={card.id}
                  type="button"
                  className={`profile-card${selectedProfile === card.id ? ' selected' : ''}`}
                  onClick={() => onSelectProfile(card.id)}
                >
                  <div className="profile-card-row">
                    <span className={`profile-avatar profile-avatar--${card.id}`}>
                      {card.initials}
                    </span>
                    <div className="profile-card-content">
                      <span className="profile-card-name">{t(card.nameKey)}</span>
                      <span
                        className={`profile-badge${
                          card.pathwayType === 'cascade' ? ' profile-badge-cascade' : ''
                        }`}
                      >
                        {badgeLabel}
                      </span>
                      <span className="profile-card-stage">
                        {t('loginProfileStage', { stage: stageLabel })}
                      </span>
                      {card.descKey && (
                        <span className="profile-card-desc">{t(card.descKey)}</span>
                      )}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        <button className="btn btn-primary btn-block" onClick={onSignIn} disabled={!selectedProfile}>
          {t('loginSignIn')}
        </button>

        <p className="muted auth-foot">{t('loginDemoFoot')}</p>
      </div>
    </section>
  )
}
