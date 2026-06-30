import { LANGUAGE_OPTIONS } from '../translations.js'

export default function LanguageToggle({ value, onChange }) {
  return (
    <label className="lang-toggle">
      <span className="sr-only">Language</span>
      <select
        className="lang-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Select language"
      >
        {LANGUAGE_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  )
}
