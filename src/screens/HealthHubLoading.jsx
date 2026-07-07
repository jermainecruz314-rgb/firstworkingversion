export default function HealthHubLoading({ t }) {
  return (
    <section className="screen auth-screen">
      <div className="card loading-card">
        <div className="skeleton-stack" aria-hidden="true">
          <div className="skeleton skeleton-line wide" />
          <div className="skeleton skeleton-line" />
          <div className="skeleton skeleton-line short" />
          <div className="skeleton skeleton-card" />
        </div>
        <span className="spinner" aria-hidden="true" />
        <p className="lead">{t('loadingLead')}</p>
        <p className="muted">{t('loadingNote')}</p>
      </div>
    </section>
  )
}
