"use client";

import { useScrollReveal } from "@/app/hooks/useScrollReveal";
import { POSITIONING_CARDS } from "@/app/data/landing";
import styles from "./Positioning.module.css";

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
          <p className={styles.eyebrow}>The problem</p>
          <h2 id="hiring-timeline-title">
            A slow hiring mistake becomes a product delay
          </h2>
          <p className={styles.hook}>Your company ships fast. Hiring should operate at the same speed.</p>
        </header>

        <div className={styles.composition}>
          <div className={styles.cardsRow}>
            <div className={styles.screeningCard}>
              <StoryCard {...POSITIONING_CARDS.screening} />
            </div>
            <StoryCard {...POSITIONING_CARDS.signals} featured />
            <div className={styles.technicalCard}>
              <StoryCard {...POSITIONING_CARDS.technical} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
