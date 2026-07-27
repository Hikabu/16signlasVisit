"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { useScrollReveal } from "@/app/hooks/useScrollReveal";
import styles from "./WorkReveals.module.css";

type ResearchArticle = {
  category: string;
  title: string;
  description: string;
  image: string;
  href: string;
};

const RESEARCH_ARTICLES: readonly ResearchArticle[] = [
  {
    category: "Evidence systems",
    title: "Why proof beats opinion in technical hiring",
    description:
      "A practical account of how work evidence reduces interview noise without reducing engineering judgment to a score.",
    image: "/articles/1.jpg",
    href: "/research/why-proof-beats-opinion",
  },
  {
    category: "Signal quality",
    title: "What makes a talent signal trustworthy?",
    description:
      "The conditions a hiring signal must meet before it can support a consequential decision about an engineer.",
    image: "/articles/2.jpg",
    href: "/research/trustworthy-talent-signals",
  },
  {
    category: "Decision science",
    title: "Explainability in hiring: fact, inference, recommendation",
    description:
      "A method for separating observed work from interpretation, so every conclusion remains open to review.",
    image: "/articles/3.jpg",
    href: "/research/explainability-in-hiring",
  },
  {
    category: "Methodology note",
    title: "Why “insufficient evidence” is a trust feature",
    description:
      "Responsible evaluation should expose what cannot be proven—not fill the gaps with confident prediction.",
    image: "/articles/5.jpg",
    href: "/research/insufficient-evidence",
  },
] as const;

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

export function WorkReveals() {
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
            Evidence, examined.
          </h2>
          <p className={styles.description}>
            Original research on how real engineering work can make hiring
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

            <a className={styles.viewAllButton} href="/research">
              View all research
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </header>

        <div className={styles.carousel}>
          <div
            ref={trackRef}
            id="research-track"
            className={styles.track}
            aria-label="Featured research"
          >
            {RESEARCH_ARTICLES.map((article, index) => (
              <article
                key={article.title}
                className={styles.card}
                data-research-card
                style={{ "--card-index": index } as CSSProperties}
              >
                <a
                  className={styles.coverLink}
                  href={article.href}
                  aria-label={`Read ${article.title}`}
                >
                  <span className={styles.cover}>
                    <Image
                      src={article.image}
                      alt=""
                      fill
                      sizes="(max-width: 719px) 84vw, (max-width: 1199px) 60vw, 440px"
                      className={styles.coverImage}
                    />
                    <span className={styles.coverTreatment} aria-hidden="true" />
                    <span className={styles.issueNumber} aria-hidden="true">
                      16S / 0{index + 1}
                    </span>
                  </span>
                </a>

                <div className={styles.cardBody}>
                  <p className={styles.category}>{article.category}</p>
                  <h3 className={styles.cardTitle}>
                    <a href={article.href}>{article.title}</a>
                  </h3>
                  <p className={styles.cardDescription}>
                    {article.description}
                  </p>
                  <a className={styles.readButton} href={article.href}>
                    Read research
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
