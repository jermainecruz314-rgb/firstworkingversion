import { useState } from 'react'
import SecurityBadge from '../components/SecurityBadge.jsx'
import { getFaqItems } from '../i18n/index.js'

export default function PrivacyFaq({ t }) {
  const items = getFaqItems(t)
  const [openId, setOpenId] = useState(items[0]?.id ?? null)

  return (
    <section className="screen">
      <SecurityBadge t={t} />

      <div className="card">
        <span className="eyebrow">{t('faqEyebrow')}</span>
        <h1 className="screen-title">{t('faqTitle')}</h1>
        <p className="lead">{t('faqLead')}</p>

        <div className="accordion">
          {items.map((item) => {
            const open = openId === item.id
            return (
              <div key={item.id} className={`accordion-item${open ? ' open' : ''}`}>
                <button
                  type="button"
                  className="accordion-trigger"
                  aria-expanded={open}
                  onClick={() => setOpenId(open ? null : item.id)}
                >
                  <span>{item.q}</span>
                  <span className="accordion-chevron" aria-hidden="true">
                    {open ? '−' : '+'}
                  </span>
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
