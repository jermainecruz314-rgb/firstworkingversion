import { useState } from 'react'
import SecurityBadge from '../components/SecurityBadge.jsx'
import DashIcon from '../components/DashIcon.jsx'
import CardWatermark from '../components/CardWatermark.jsx'
import { getFaqItems } from '../i18n/index.js'

const FAQ_ICONS = {
  insurance: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M12 3l7 3v6c0 4.5-3.5 8.5-7 9.5-3.5-1-7-5-7-9.5V6l7-3z" strokeLinejoin="round" />
    </svg>
  ),
  'who-sees': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  protected: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16l4-2 4 2 4-2 4 2V8z" strokeLinejoin="round" />
      <path d="M9 13h6M9 17h4" strokeLinecap="round" />
    </svg>
  ),
  'change-mind': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.5l2.5 2.5L16 9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
}

const FAQ_CATEGORY = {
  insurance: 'terracotta',
  'who-sees': 'teal',
  protected: 'teal',
  'change-mind': 'sage',
}

const CHEVRON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function PrivacyFaq({ t }) {
  const items = getFaqItems(t)
  const [openId, setOpenId] = useState(items[0]?.id ?? null)

  return (
    <section className="screen">
      <SecurityBadge t={t} />

      <div className="card card--decorated">
        <CardWatermark id="faq" />
        <div className="screen-hero">
          <DashIcon id="faq" />
          <span className="eyebrow">{t('faqEyebrow')}</span>
        </div>
        <h1 className="screen-title">{t('faqTitle')}</h1>
        <p className="lead">{t('faqLead')}</p>

        <div className="accordion">
          {items.map((item) => {
            const open = openId === item.id
            return (
              <div
                key={item.id}
                className={`accordion-item accordion-item--${item.id}${open ? ' open' : ''}`}
              >
                <button
                  type="button"
                  className="accordion-trigger tap-card"
                  aria-expanded={open}
                  onClick={() => setOpenId(open ? null : item.id)}
                >
                  <span className={`icon-chip icon-chip--sm icon-chip--${FAQ_CATEGORY[item.id] ?? 'teal'}`}>
                    {FAQ_ICONS[item.id]}
                  </span>
                  <span className="accordion-trigger-text">{item.q}</span>
                  <span className={`accordion-chevron${open ? ' open' : ''}`}>{CHEVRON}</span>
                </button>
                {open && <div className="accordion-panel">{item.a}</div>}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
