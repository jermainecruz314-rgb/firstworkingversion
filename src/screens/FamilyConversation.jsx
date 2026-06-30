import { useState } from 'react'
import Stepper from '../components/Stepper.jsx'
import FamilyTreeIcon from '../components/FamilyTreeIcon.jsx'
import SecurityBadge from '../components/SecurityBadge.jsx'
import { buildShareMessageT } from '../i18n/index.js'

const SECTIONS = [
  { titleKey: 'familyConversationSection1Title', bodyKey: 'familyConversationSection1Body' },
  { titleKey: 'familyConversationSection2Title', bodyKey: 'familyConversationSection2Body' },
  {
    titleKey: 'familyConversationSection3Title',
    faqs: [
      { q: 'familyConversationFaq1Q', a: 'familyConversationFaq1A' },
      { q: 'familyConversationFaq2Q', a: 'familyConversationFaq2A' },
      { q: 'familyConversationFaq3Q', a: 'familyConversationFaq3A' },
    ],
  },
]

export default function FamilyConversation({ profile, t }) {
  const [copied, setCopied] = useState(false)
  const message = buildShareMessageT(t, profile)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message)
    } catch {
      /* demo fallback */
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <section className="screen">
      <Stepper currentStage={profile.pathwayStage ?? 1} t={t} />
      <SecurityBadge t={t} />

      <div className="card family-card">
        <div className="family-head">
          <FamilyTreeIcon size={28} />
          <span className="eyebrow family-eyebrow">{t('familyConversationEyebrow')}</span>
        </div>
        <h1 className="screen-title">{t('familyConversationTitle')}</h1>
        <p className="lead explain">{t('familyConversationLead')}</p>

        <div className="info-list">
          {SECTIONS.map((section) => (
            <div className="info-item family" key={section.titleKey}>
              <h2 className="info-title">{t(section.titleKey)}</h2>
              {section.bodyKey && (
                <p className="info-body explain">{t(section.bodyKey)}</p>
              )}
              {section.faqs?.map((faq) => (
                <div className="faq-mini" key={faq.q}>
                  <p className="faq-mini-q">{t(faq.q)}</p>
                  <p className="faq-mini-a">{t(faq.a)}</p>
                </div>
              ))}
            </div>
          ))}
        </div>

        <p className="group-title">{t('familyConversationShareHeading')}</p>
        <div className="share-box">
          <pre className="share-text">{message}</pre>
          <button type="button" className="btn btn-primary" onClick={handleCopy}>
            {copied ? t('familyConversationCopied') : t('familyConversationCopy')}
          </button>
        </div>
      </div>
    </section>
  )
}
