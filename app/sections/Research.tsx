"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { useScrollReveal } from "@/app/hooks/useScrollReveal";
import { EditorialArticleCard } from "@/app/components/EditorialArticleCard";
import type { ResearchArticle } from "@/app/types/landing";
import styles from "./Research.module.css";

function ArrowIcon({ direction }: { direction: "previous" | "next" }) {
  const isPrevious = direction === "previous";

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={styles.arrowIcon}
    >
      <path
        d={isPrevious ? "M19 12H5M11 6l-6 6 6 6" : "M5 12h14m-6-6 6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Research({ articles }: { articles: readonly ResearchArticle[] }) {
  const { ref: sectionRef, isRevealed } = useScrollReveal<HTMLElement>({
    threshold: 0.14,
    rootMargin: "0px 0px -8% 0px",
  });
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollPrevious, setCanScrollPrevious] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const updateControls = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const maxScroll = track.scrollWidth - track.clientWidth;
    setCanScrollPrevious(track.scrollLeft > 4);
    setCanScrollNext(maxScroll > 4 && track.scrollLeft < maxScroll - 4);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    updateControls();
    track.addEventListener("scroll", updateControls, { passive: true });
    window.addEventListener("resize", updateControls);

    return () => {
      track.removeEventListener("scroll", updateControls);
      window.removeEventListener("resize", updateControls);
    };
  }, [updateControls]);

  const moveCarousel = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;

    const firstCard = track.querySelector<HTMLElement>(
      "[data-research-card]",
    );
    const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 0;
    const distance = firstCard
      ? firstCard.getBoundingClientRect().width + gap
      : track.clientWidth * 0.8;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    track.scrollBy({
      left: distance * direction,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <section
      ref={sectionRef}
      id="research"
      className={`${styles.section} ${
        isRevealed ? styles.sectionRevealed : ""
      }`}
      aria-labelledby="research-title"
    >
      <div className={styles.topRule} aria-hidden="true" />

      <div className={styles.inner}>
        <header className={styles.intro}>
          <p className={styles.eyebrow}>Research</p>
          <h2 id="research-title" className={styles.title}>
            Evidence, examined
          </h2>
          <p className={styles.description}>
            Research on how real engineering work can make hiring
            faster, more accurate, and easier to verify.
          </p>

          <div className={styles.actions}>
            <div className={styles.arrowGroup} aria-label="Research carousel">
              <button
                type="button"
                className={styles.arrowButton}
                onClick={() => moveCarousel(-1)}
                disabled={!canScrollPrevious}
                aria-label="Previous research articles"
                aria-controls="research-track"
              >
                <ArrowIcon direction="previous" />
              </button>
              <button
                type="button"
                className={styles.arrowButton}
                onClick={() => moveCarousel(1)}
                disabled={!canScrollNext}
                aria-label="Next research articles"
                aria-controls="research-track"
              >
                <ArrowIcon direction="next" />
              </button>
            </div>

            <Link className={styles.viewAllButton} href="/research">
              View all research
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </header>

        <div className={styles.carousel}>
          <div
            ref={trackRef}
            id="research-track"
            className={styles.track}
            aria-label="Featured research"
          >
            {articles.map((article, index) => (
              <div
                key={article.slug}
                className={styles.card}
                data-research-card
                style={{ "--card-index": index } as CSSProperties}
              >
                <EditorialArticleCard article={article} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
