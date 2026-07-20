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
            <a href="#problem-value">Why now</a>
            <a href="#how-it-works">Method</a>
            <a href="#book-call">Principles</a>
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
            <h1 id="hero-title" className={styles.headline}>
              <span>Software engineering</span>
              <span>changed. Hiring didn&apos;t.</span>
              <span>Built on the work itself.</span>
            </h1>
          </div>

          <div className={styles.visual} aria-hidden="true">
            <EvidenceParticles />
          </div>

          <div className={styles.narrative}>
            <p>
              This is hiring built on the work itself. Every conclusion compiles upward
              from evidence: facts from artifacts, inferences from facts. Each claim is
              one click from the pull request that supports it—and when the evidence is
              thin, the report says so.
            </p>

            <div className={styles.ctas} role="group" aria-label="Primary actions">
              <a className={styles.primaryCta} href="#evidence-report-section">
                Explore a real report
                <span aria-hidden="true">↘</span>
              </a>
              <a className={styles.secondaryCta} href="#book-call">
                Run it on your own work
                <span aria-hidden="true">↗</span>
              </a>
            </div>

            <a className={styles.transitionLink} href="#evidence-report-section">
              Explore the evidence report <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
