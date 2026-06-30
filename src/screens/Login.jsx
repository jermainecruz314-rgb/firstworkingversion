import LanguagePicker from '../components/LanguagePicker.jsx'
import FamilyTreeIcon from '../components/FamilyTreeIcon.jsx'

const PROFILE_CARDS = [
  { id: 'weiLing', nameKey: 'loginProfileWeiLing', descKey: 'profileWeiLingDesc' },
  { id: 'marcus', nameKey: 'loginProfileMarcus', descKey: 'profileMarcusDesc', family: true },
  { id: 'aishah', nameKey: 'loginProfileAishah', descKey: 'profileAishahDesc' },
]

export default function Login({ language, onLanguageChange, selectedProfile, onSelectProfile, onSignIn, t }) {
  return (
    <section className="screen auth-screen">
      <div className="card auth-card">
        <span className="eyebrow">{t('loginWelcome')}</span>
        <h1 className="screen-title">{t('loginTitle')}</h1>
        <p className="lead">{t('loginLead')}</p>

        <LanguagePicker value={language} onChange={onLanguageChange} t={t} />

        <div className="demo-picker">
          <p className="group-title">{t('loginChooseProfile')}</p>
          <div className="profile-card-grid">
            {PROFILE_CARDS.map((card) => (
              <button
                key={card.id}
                type="button"
                className={`profile-card${selectedProfile === card.id ? ' selected' : ''}${
                  card.family ? ' family' : ''
                }`}
                onClick={() => onSelectProfile(card.id)}
              >
                {card.family && <FamilyTreeIcon size={22} />}
                <span className="profile-card-name">{t(card.nameKey)}</span>
                <span className="profile-card-desc">{t(card.descKey)}</span>
              </button>
            ))}
          </div>
        </div>

        <button
          className="btn btn-primary"
          onClick={onSignIn}
          disabled={!selectedProfile}
        >
          {t('loginSignIn')}
        </button>

        <p className="muted auth-foot">{t('loginDemoFoot')}</p>
      </div>
    </section>
  )
}
