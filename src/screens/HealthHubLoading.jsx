export default function HealthHubLoading({ t }) {
  return (
    <section className="screen auth-screen">
      <div className="card loading-card">
        <span className="spinner" aria-hidden="true" />
        <p className="lead">{t('loadingLead')}</p>
        <p className="muted">{t('loadingNote')}</p>
      </div>
    </section>
  )
}
