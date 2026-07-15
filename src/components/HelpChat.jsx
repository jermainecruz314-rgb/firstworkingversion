import { useState, useMemo, useRef, useEffect } from 'react'
import { getFaqItems, translateStatus, translatePathwayStage, buildRemindersT } from '../i18n/index.js'

const CHAT_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M4 5h16v11H8l-4 4V5z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const CLOSE_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const FAQ_KEYWORDS = {
  insurance: ['insurance', 'insurer', 'premium'],
  'who-sees': ['see', 'access', 'who'],
  protected: ['protect', 'secure', 'safe', 'data'],
  'change-mind': ['change my mind', 'cancel', 'withdraw', 'stop', 'quit'],
}

function buildTopics(profile, t) {
  const custom = [
    {
      id: 'status',
      label: t('chatbotTopicStatus'),
      keywords: ['status', 'appointment', 'booked', 'book'],
      answer: () => t('chatbotStatusAnswer', { status: translateStatus(profile?.appointmentStatus, t) }),
    },
    {
      id: 'nextStep',
      label: t('chatbotTopicNextStep'),
      keywords: ['next', 'step', 'happen'],
      answer: () => t('chatbotNextStepAnswer', { stage: translatePathwayStage(profile?.pathwayStage, t) }),
    },
    {
      id: 'reminders',
      label: t('chatbotTopicReminders'),
      keywords: ['reminder', 'remind'],
      answer: () => {
        const active = buildRemindersT(t, profile).filter((r) => r.id !== 'all-clear')
        if (active.length === 0) return t('chatbotNoRemindersAnswer')
        return `${t('chatbotRemindersIntro')} ${active.map((r) => r.message).join(' ')}`
      },
    },
  ]

  const faq = getFaqItems(t).map((item) => ({
    id: item.id,
    label: item.q,
    keywords: FAQ_KEYWORDS[item.id] ?? [],
    answer: () => item.a,
  }))

  return [...custom, ...faq]
}

function matchTopic(query, topics) {
  const lower = query.toLowerCase()
  return topics.find((topic) => topic.keywords.some((kw) => lower.includes(kw)))
}

export default function HelpChat({ profile, t }) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState(null)
  const [input, setInput] = useState('')
  const messagesRef = useRef(null)

  const topics = useMemo(() => buildTopics(profile, t), [profile, t])

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }, [messages])

  const toggleOpen = () => {
    setOpen((o) => !o)
    setMessages((prev) =>
      prev ?? [{ id: 'welcome', from: 'bot', text: t('chatbotWelcome', { name: profile?.name ?? '' }) }]
    )
  }

  const pushExchange = (userText, botText) => {
    setMessages((prev) => [
      ...(prev ?? []),
      { id: `u-${Date.now()}`, from: 'user', text: userText },
      { id: `b-${Date.now()}-r`, from: 'bot', text: botText },
    ])
  }

  const handleTopicClick = (topic) => {
    pushExchange(topic.label, topic.answer())
  }

  const handleSend = () => {
    const query = input.trim()
    if (!query) return
    const match = matchTopic(query, topics)
    pushExchange(query, match ? match.answer() : t('chatbotFallback'))
    setInput('')
  }

  return (
    <div className={`help-chat${open ? ' open' : ''}`}>
      <button
        className="help-chat-toggle"
        onClick={toggleOpen}
        aria-expanded={open}
        aria-label={open ? t('chatbotClose') : t('chatbotButtonLabel')}
        title={open ? t('chatbotClose') : t('chatbotButtonLabel')}
      >
        <span className="help-chat-toggle-icon">{open ? CLOSE_ICON : CHAT_ICON}</span>
      </button>

      {open && (
        <div className="help-chat-body">
          <div className="help-chat-header">
            <p className="help-chat-title">{t('chatbotTitle')}</p>
            <p className="help-chat-subtitle">{t('chatbotSubtitle')}</p>
          </div>

          <div className="help-chat-messages" ref={messagesRef}>
            {(messages ?? []).map((m) => (
              <p key={m.id} className={`help-chat-message help-chat-message--${m.from}`}>
                {m.text}
              </p>
            ))}
          </div>

          <div className="help-chat-topics">
            {topics.map((topic) => (
              <button
                key={topic.id}
                type="button"
                className="help-chat-topic-chip"
                onClick={() => handleTopicClick(topic)}
              >
                {topic.label}
              </button>
            ))}
          </div>

          <div className="help-chat-input-row">
            <input
              className="help-chat-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend()
              }}
              placeholder={t('chatbotInputPlaceholder')}
            />
            <button type="button" className="help-chat-send" onClick={handleSend} disabled={!input.trim()}>
              {t('chatbotSend')}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
