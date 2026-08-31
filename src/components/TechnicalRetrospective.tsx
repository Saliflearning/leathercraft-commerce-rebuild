const findings = [
  ['44', 'SELECT statements'],
  ['46', 'raw query calls'],
  ['0', 'prepared-statement calls detected'],
  ['0', 'CSRF token mentions detected'],
] as const;

export function TechnicalRetrospective() {
  return (
    <section className="section retrospective" aria-labelledby="retrospective-title">
      <div className="section-heading">
        <p className="eyebrow">Ruthless retrospective</p>
        <h2 id="retrospective-title">The old build was ambitious. It was not production-ready.</h2>
        <p>
          Search, CRUD, sessions, authentication, cart, and administration were meaningful learning. But
          feature count hid serious weaknesses: unsafe database access, obsolete password handling, no
          detected CSRF defense, thin documentation, no tests, and unresolved asset ownership.
        </p>
      </div>

      <div className="finding-strip" aria-label="Static legacy code findings">
        {findings.map(([value, label]) => (
          <div key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>

      <div className="decision-grid">
        <article>
          <span className="decision-number">01</span>
          <h3>Publish the learning, not the legacy package</h3>
          <p>
            The old source is team-authored, privacy-sensitive, and rights-unclear. This repository starts
            clean and preserves only bounded facts.
          </p>
        </article>
        <article>
          <span className="decision-number">02</span>
          <h3>Reduce the attack surface</h3>
          <p>
            The rebuild demonstrates discovery and cart state without accounts, uploads, a database,
            checkout, or any collection of personal data.
          </p>
        </article>
        <article>
          <span className="decision-number">03</span>
          <h3>Make quality visible</h3>
          <p>
            Typed data, hostile-state recovery, component tests, browser journeys, accessibility checks,
            and provenance scanning turn claims into repeatable evidence.
          </p>
        </article>
      </div>
    </section>
  );
}
