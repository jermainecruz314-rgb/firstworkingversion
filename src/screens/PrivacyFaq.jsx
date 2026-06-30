import { useState } from 'react'
import SecurityBadge from '../components/SecurityBadge.jsx'
import { FAQ_ITEMS } from '../faqContent.js'

export default function PrivacyFaq() {
  const [openId, setOpenId] = useState(FAQ_ITEMS[0]?.id ?? null)

  return (
    <section className="screen">
      <SecurityBadge />

      <div className="card">
        <span className="eyebrow">Your questions answered</span>
        <h1 className="screen-title">Privacy &amp; insurance</h1>
        <p className="lead">
          Honest, plain-language answers — so you can make decisions with confidence.
        </p>

        <div className="accordion">
          {FAQ_ITEMS.map((item) => {
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
