import { LANG_OPTIONS } from '../i18n/index.js'

// Compact secondary language selector in the header (after sign-in).
export default function LanguageToggle({ value, onChange, t }) {
  return (
    <label className="lang-toggle">
      <span className="sr-only">{t('languageSelectAria')}</span>
      <select
        className="lang-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={t('languageSelectAria')}
      >
        {LANG_OPTIONS.map((opt) => (
          <option key={opt.code} value={opt.code}>
            {opt.native}
          </option>
        ))}
      </select>
    </label>
  )
}
