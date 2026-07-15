import { useState } from 'react'
import FamilyTreeIcon from '../components/FamilyTreeIcon.jsx'
import SecurityBadge from '../components/SecurityBadge.jsx'
import SuccessState from '../components/SuccessState.jsx'
import CardWatermark from '../components/CardWatermark.jsx'
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
  }

  return (
    <section className="screen">
      <SecurityBadge t={t} />

      <div className="card family-card card--decorated">
        <CardWatermark id="familyTalk" />
        <div className="family-head">
          <span className="icon-chip icon-chip--teal">
            <FamilyTreeIcon size={20} />
          </span>
          <span className="eyebrow family-eyebrow">{t('familyConversationEyebrow')}</span>
        </div>
        <h1 className="screen-title">{t('familyConversationTitle')}</h1>
        <p className="lead explain">{t('familyConversationLead')}</p>

        <div className="info-list">
          {SECTIONS.map((section) => (
            <div className="info-item family" key={section.titleKey}>
              <span className="icon-chip icon-chip--teal">
                <FamilyTreeIcon size={20} />
              </span>
              <span className="info-item-copy">
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
              </span>
            </div>
          ))}
        </div>

        <p className="group-title">{t('familyConversationShareHeading')}</p>
        <div className="share-box">
          <pre className="share-text">{message}</pre>
          {copied ? (
            <SuccessState
              title={t('familyConversationCopySuccessTitle')}
              body={t('familyConversationCopySuccessBody')}
              actionLabel={t('familyConversationCopy')}
              onAction={() => setCopied(false)}
            />
          ) : (
            <button type="button" className="btn btn-primary btn-inline" onClick={handleCopy}>
              {t('familyConversationCopy')}
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
