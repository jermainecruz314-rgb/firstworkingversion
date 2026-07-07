const CHECK = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
    <path d="M5 12.5l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function ConsentIconRow({ children }) {
  return (
    <div className="consent-line">
      <span className="consent-line-check">{CHECK}</span>
      <span className="consent-line-text">{children}</span>
    </div>
  )
}
