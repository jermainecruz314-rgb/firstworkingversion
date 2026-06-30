import { LANG_OPTIONS } from '../i18n/index.js'

// Primary language picker on the login screen — four clear buttons.
export default function LanguagePicker({ value, onChange, t }) {
  return (
    <div className="lang-picker">
      <p className="group-title">{t('loginChooseLanguage')}</p>
      <div className="lang-picker-grid">
        {LANG_OPTIONS.map((opt) => (
          <button
            key={opt.code}
            type="button"
            className={`lang-picker-btn${value === opt.code ? ' selected' : ''}`}
            onClick={() => onChange(opt.code)}
          >
            {opt.native}
          </button>
        ))}
      </div>
    </div>
  )
}
