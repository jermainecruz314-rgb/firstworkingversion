import { useState } from 'react'
import Stepper from '../components/Stepper.jsx'
import FamilyTreeIcon from '../components/FamilyTreeIcon.jsx'
import SecurityBadge from '../components/SecurityBadge.jsx'

function buildShareMessage(profile) {
  return (
    `A note from your care team:\n\n` +
    `${profile.name}'s recent test results suggest your family may benefit from ` +
    `genetic screening for familial hypercholesterolaemia (FH) through ` +
    `Singapore's National FH Genetic Testing Programme.\n\n` +
    `FH can run in families — first-degree relatives have about a 50% chance of ` +
    `carrying the same gene. Early screening means earlier support if needed.\n\n` +
    `This is an invitation to learn more, not a diagnosis. Speak with your ` +
    `family doctor or contact the Genetic Assessment Centre when you're ready.`
  )
}

const SECTIONS = [
  {
    title: 'Why this conversation matters',
    body:
      'FH is inherited — each first-degree relative has about a 50% chance of carrying the same gene. ' +
      'A calm, early conversation gives your loved ones the chance to be screened before cholesterol causes harm.',
  },
  {
    title: 'What to say',
    body:
      'You might start with something simple: "My doctor has suggested our family look into a genetic test for high cholesterol. ' +
      'It\'s nothing urgent — I just wanted you to know, in case you\'d like to find out more."',
  },
  {
    title: 'Common questions your family might ask',
    body: null,
    faqs: [
      {
        q: '"Does this mean I definitely have it?"',
        a: 'No — the test is how we find out. Many relatives test negative, which is reassuring news.',
      },
      {
        q: '"Will it affect my insurance?"',
        a: 'Under Singapore\'s moratorium, FH Programme results cannot be used by life insurers in underwriting.',
      },
      {
        q: '"What if I don\'t want to test?"',
        a: 'Testing is always voluntary. You can share information without pressure — everyone moves at their own pace.',
      },
    ],
  },
]

export default function FamilyConversation({ profile }) {
  const [copied, setCopied] = useState(false)
  const message = buildShareMessage(profile)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  return (
    <section className="screen">
      <Stepper currentStage={1} />
      <SecurityBadge />

      <div className="card family-card">
        <div className="family-head">
          <FamilyTreeIcon size={28} />
          <span className="eyebrow family-eyebrow">For your family</span>
        </div>
        <h1 className="screen-title">Talking to your family</h1>
        <p className="lead explain">
          Starting the conversation can feel hard. Here&apos;s a gentle guide to help
          you share what you know — without pressure.
        </p>

        <div className="info-list">
          {SECTIONS.map((section) => (
            <div className="info-item family" key={section.title}>
              <h2 className="info-title">{section.title}</h2>
              {section.body && <p className="info-body explain">{section.body}</p>}
              {section.faqs?.map((faq) => (
                <div className="faq-mini" key={faq.q}>
                  <p className="faq-mini-q">{faq.q}</p>
                  <p className="faq-mini-a">{faq.a}</p>
                </div>
              ))}
            </div>
          ))}
        </div>

        <p className="group-title">Share with a relative</p>
        <div className="share-box">
          <pre className="share-text">{message}</pre>
          <button type="button" className="btn btn-primary" onClick={handleCopy}>
            {copied ? 'Copied!' : 'Copy message'}
          </button>
        </div>
      </div>
    </section>
  )
}
