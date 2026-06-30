// A short, reassuring loading state shown while the mock HealthHub data is
// "fetched" (simulated with an artificial delay in App).
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
