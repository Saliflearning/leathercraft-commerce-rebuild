export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__content">
        <p className="eyebrow">2019 → 2022 → 2023 → rebuilt now</p>
        <h1 id="hero-title">Leathercraft commerce, learning rebuilt.</h1>
        <p className="hero__lede">
          A candid case study about turning an uneven student project into a focused, tested, and
          evidence-aware product demonstration.
        </p>
        <div className="hero__actions">
          <a className="button button--primary" href="#journey">
            Read the case study
          </a>
          <a className="button button--quiet" href="#catalog">
            Explore the rebuild
          </a>
        </div>
        <ul className="boundary-list" aria-label="Project boundaries">
          <li>Clean-room reconstruction</li>
          <li>Historical team work labeled</li>
          <li>No personal or payment data</li>
        </ul>
      </div>
      <div className="hero__artifact" aria-hidden="true">
        <div className="artifact-card artifact-card--back">
          <span>legacy.php</span>
          <i />
          <i />
          <i />
        </div>
        <div className="artifact-card artifact-card--front">
          <span>rebuild.tsx</span>
          <strong>Evidence → critique → tested response</strong>
          <div className="artifact-swatch" />
        </div>
      </div>
    </section>
  );
}
