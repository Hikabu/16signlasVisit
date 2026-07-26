import { EvidenceParticles } from "./EvidenceParticles";
import styles from "./EditorialHero.module.css";

function SignalMark() {
  return (
    <svg
      className={styles.brandMark}
      viewBox="0 0 32 32"
      aria-hidden="true"
      fill="none"
    >
      <circle cx="16" cy="16" r="2.2" fill="currentColor" />
      {Array.from({ length: 16 }, (_, index) => (
        <path
          key={index}
          d="M16 2.5V10.25"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="square"
          transform={`rotate(${index * 22.5} 16 16)`}
        />
      ))}
    </svg>
  );
}

export function EditorialHero() {
  return (
    <section id="hero" className={styles.outer} aria-labelledby="hero-title">
      <div className={styles.frame}>
        <header className={styles.header}>
          <a href="#hero" className={styles.brand} aria-label="16 Signals home">
            <SignalMark />
            <span>16 Signals</span>
          </a>

          <nav className={styles.nav} aria-label="Main navigation">
          <a href="#evidence-report">Report</a>
          <a href="#what-work-reveals">What it reveals</a>
          <a href="#how-it-works">Method</a>
          <a href="#principles">Principles</a>
        </nav>
        <div className={styles.headerActions}>
          <a className={styles.headerCta} href="#book-call">
            Run it on your work
          </a>
          <a className={styles.contactLink} href="#book-call">
            Contact
          </a>
        </div>
        </header>

        <div className={styles.heroGrid}>
          <div className={styles.headlineBlock}>
            <p className={styles.eyebrow}>
              Evidence-led engineering hiring
            </p>

            <h1 id="hero-title" className={styles.headline}>
              <span>Hiring, with the lights on.</span>
            </h1>
          </div>

          <div className={styles.visual} aria-hidden="true">
            <EvidenceParticles />
          </div>

          <div className={styles.narrative}>
            <p>
              16 Signals reads real engineering work and shows
              you what it says - strengths, risks, and the
              questions worth asking next.
            </p>

            <div className={styles.ctas} role="group" aria-label="Primary actions">
              <a className={styles.primaryCta} href="#evidence-report-section">
                View a sample report
                <span aria-hidden="true">↘</span>
              </a>

              <a className={styles.secondaryCta} href="#book-call">
                Run it on your work
                <span aria-hidden="true">↗</span>
              </a>
            </div>

            <a className={styles.transitionLink} href="#prepared-interview">
              See what you know before the interview
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
