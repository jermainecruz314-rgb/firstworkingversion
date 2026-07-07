export default function ConsentIconRow({ iconKey, children }) {
  return (
    <div className="consent-line">
      <span className="consent-line-marker" aria-hidden="true" />
      <span className="consent-line-text">{children}</span>
    </div>
  )
}
