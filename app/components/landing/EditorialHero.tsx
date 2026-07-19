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

function ReportGlyph({ variant = 0 }: { variant?: number }) {
  return (
    <span className={styles.reportGlyph} aria-hidden="true">
      {variant === 0 ? (
        <>
          <i>››</i><i>›››</i><i>››</i>
        </>
      ) : (
        <>
          <i>›››</i><i>››</i><i>›››</i>
        </>
      )}
    </span>
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

          <article id="evidence-report" className={styles.report} aria-label="Evidence report preview">
            <div className={styles.reportHeading}>
              <div>
                <p>Evidence report</p>
                <h2>Candidate 16–4812</h2>
              </div>
              <span className={styles.reportStamp}>Snapshot 9F2A · rubric v1.4</span>
            </div>

            <div className={styles.manifest}>
              <span>Evidence manifest</span>
              <strong>3 repositories · 47 merged PRs · 26 months</strong>
            </div>

            <div className={styles.claimList}>
              <div className={styles.claimRow}>
                <ReportGlyph />
                <div className={styles.claimCopy}>
                  <span>Fact</span>
                  <p>Refactored the authentication module across 14 files.</p>
                </div>
                <a href="#how-it-works" aria-label="Open pull request 184 citation">
                  PR 184 ↗
                </a>
              </div>

              <div className={styles.claimRow}>
                <ReportGlyph variant={1} />
                <div className={styles.claimCopy}>
                  <span>Inference · established</span>
                  <p>Handles cross-cutting changes with deliberate review.</p>
                </div>
                <a href="#how-it-works" aria-label="Open review 32 citation">
                  Review 32 ↗
                </a>
              </div>
            </div>
          </article>

          <div className={styles.narrative}>
            <p>
              This is hiring built on the work itself. Every conclusion compiles upward
              from evidence: facts from artifacts, inferences from facts. Each claim is
              one click from the pull request that supports it—and when the evidence is
              thin, the report says so.
            </p>

            <div className={styles.ctas} role="group" aria-label="Primary actions">
              <a className={styles.primaryCta} href="#evidence-report">
                Explore a real report
                <span aria-hidden="true">↘</span>
              </a>
              <a className={styles.secondaryCta} href="#book-call">
                Run it on your own work
                <span aria-hidden="true">↗</span>
              </a>
            </div>

            <a className={styles.transitionLink} href="#problem-value">
              What changed in engineering? <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
