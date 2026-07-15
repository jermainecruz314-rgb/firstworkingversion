import LanguageToggle from './LanguageToggle.jsx'
import logoIcon from '../assets/logo-icon.png'

export default function AppHeader({
  appName,
  title,
  showBack,
  onBack,
  showLang,
  language,
  onLanguageChange,
  backLabel,
  showWordmark,
  t,
}) {
  return (
    <header className="app-header">
      <div className="app-header-inner">
        <div className="app-header-start">
          {showBack ? (
            <button
              type="button"
              className="header-back"
              onClick={onBack}
              aria-label={backLabel}
            >
              <ChevronLeft />
            </button>
          ) : (
            <span className="app-brand">
              <img
                src={logoIcon}
                alt={showWordmark ? '' : appName}
                aria-hidden={showWordmark ? 'true' : undefined}
                className="app-header-icon"
              />
              {showWordmark && <span className="app-name">{appName}</span>}
            </span>
          )}
        </div>

        {showBack && title && <h1 className="app-header-title">{title}</h1>}

        <div className="app-header-end">
          {showLang && (
            <LanguageToggle value={language} onChange={onLanguageChange} t={t} />
          )}
        </div>
      </div>
    </header>
  )
}

function ChevronLeft() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M15 18l-6-6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
