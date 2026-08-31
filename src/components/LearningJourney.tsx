import type { EvidenceClassification, EvidenceNote, HistoricalPhase } from '../types/domain';

interface LearningJourneyProps {
  readonly phases: readonly HistoricalPhase[];
  readonly notes: readonly EvidenceNote[];
}

const classificationLabels: Record<EvidenceClassification, string> = {
  verified: 'Verified',
  qualified: 'Qualified',
  'new-work': 'New work',
  'non-claim': 'Non-claim',
};

export function LearningJourney({ phases, notes }: LearningJourneyProps) {
  return (
    <section id="journey" className="section section--journey" aria-labelledby="journey-title">
      <div className="section-heading">
        <p className="eyebrow">Case study · evidence before claims</p>
        <h2 id="journey-title">Three versions. Three different levels of maturity.</h2>
        <p>
          These were separate implementations, not duplicate snapshots of one finished product. Each
          version solved a different layer and left important work unfinished.
        </p>
      </div>

      <div className="timeline" role="region" aria-label="Three-stage learning timeline">
        {phases.map((phase, index) => (
          <article className="phase-card" key={phase.id}>
            <div className="phase-card__index" aria-hidden="true">
              0{index + 1}
            </div>
            <div className="phase-card__topline">
              <span className={`evidence-tag evidence-tag--${phase.evidenceStatus}`}>
                {phase.evidenceStatus === 'verified' ? 'Verified' : 'Qualified'}
              </span>
              <span>{phase.scope}</span>
            </div>
            <h3>
              {phase.year} · {phase.label}
            </h3>
            <p className="phase-card__role">{phase.role}</p>
            <div className="phase-card__columns">
              <div>
                <h4>What existed</h4>
                <ul>
                  {phase.verifiedCapabilities.map((capability) => (
                    <li key={capability}>{capability}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4>What did not hold up</h4>
                <ul>
                  {phase.limitations.map((limitation) => (
                    <li key={limitation}>{limitation}</li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="phase-card__lesson">
              <strong>Lesson:</strong> {phase.lesson}
            </p>
          </article>
        ))}
      </div>

      <div className="evidence-register" aria-labelledby="evidence-title">
        <div className="section-heading section-heading--compact">
          <p className="eyebrow">Public claim register</p>
          <h3 id="evidence-title">What the evidence supports—and where it stops</h3>
        </div>
        <div className="evidence-grid">
          {notes.map((note) => (
            <article className="evidence-note" key={note.id}>
              <span className={`evidence-tag evidence-tag--${note.classification}`}>
                {classificationLabels[note.classification]}
              </span>
              <p className="evidence-note__claim">{note.claim}</p>
              <p>
                <strong>Basis:</strong> {note.basis}
              </p>
              <p>
                <strong>Boundary:</strong> {note.boundary}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
