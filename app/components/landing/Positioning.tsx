"use client";

import { useScrollReveal } from "@/app/hooks/useScrollReveal";
import styles from "./Positioning.module.css";

const cards = {
  screening: {
    title: "Screening / HR",
    summary: "Shows how clearly someone can describe their experience.",
  },
  technical: {
    title: "Technical interview",
    summary: "Shows how someone performs in a prepared conversation or exercise.",
  },
  signals: {
    title: "16Signals",
    summary: "Reveals evidence from real work before the interview.",
  },
};

function StoryCard({
  title,
  summary,
  featured = false,
}: {
  title: string;
  summary: string;
  featured?: boolean;
}) {
  return (
    <article className={`${styles.card} ${featured ? styles.featuredCard : ""}`}>
      <h3>{title}</h3>
      <p>{summary}</p>
    </article>
  );
}

export function Positioning() {
  const { ref, isRevealed } = useScrollReveal<HTMLElement>({
    threshold: 0.16,
    rootMargin: "0px 0px -12% 0px",
  });

  return (
    <section
      ref={ref}
      id="the-shift"
      className={`${styles.section} ${isRevealed ? styles.revealed : ""}`}
      aria-labelledby="hiring-timeline-title"
    >
      <div className={styles.inner}>
        <header className={styles.intro}>
          <h2 id="hiring-timeline-title">How to use 16Signals</h2>
        </header>

        <div className={styles.composition}>
          <p className={styles.bridge}>
            Screening and technical interviews don’t reveal how people work under real deadlines.
          </p>

          <div className={styles.caption}>
            <span aria-hidden="true" />
            <p>See how people work before the interview.</p>
          </div>

          <div className={styles.cardsRow}>
            <div className={styles.screeningCard}>
              <StoryCard {...cards.screening} />
            </div>
            <StoryCard {...cards.signals} featured />
            <div className={styles.technicalCard}>
              <StoryCard {...cards.technical} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
