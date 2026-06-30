// Shown while the mock patient record is "fetched" after sign-in.
export default function HealthHubLoading() {
  return (
    <section className="screen auth-screen">
      <div className="card loading-card">
        <span className="spinner" aria-hidden="true" />
        <p className="lead">Securely retrieving your records from HealthHub…</p>
        <p className="muted">This will only take a moment.</p>
      </div>
    </section>
  )
}
