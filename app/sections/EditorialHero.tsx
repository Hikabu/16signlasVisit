import { EvidenceParticles } from "@/app/animations/EvidenceParticles";
import styles from "./EditorialHero.module.css";

export function EditorialHero() {
  return (
    <section id="hero" className={styles.outer} aria-labelledby="hero-title">
      <div className={styles.frame}>
        <div className={styles.atmosphere} aria-hidden="true" />
        <div className={styles.contours} aria-hidden="true" />

        <div className={styles.heroGrid}>
          <div className={styles.copyColumn}>
            <h1 id="hero-title" className={styles.headline}>
              <span>Know their work</span>{" "}
              <span>before you meet them</span>
            </h1>

            <p className={styles.subhead}>
              Turn every application into a 90-second brief on demonstrated skills,
              CV claims, role fit, and what to explore in the interview.
            </p>

            <div className={styles.actionGroup}>
              <div className={styles.ctas} role="group" aria-label="Primary actions">
                <a className={styles.primaryCta} href="#prepared-interview">
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

          <div className={styles.visual} aria-hidden="true">
            <EvidenceParticles />
          </div>
        </div>
      </div>
    </section>
  );
}
