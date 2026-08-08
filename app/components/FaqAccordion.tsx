"use client";

import { useState } from "react";
import type { FaqItem } from "@/app/lib/content";
import { MarkdownContent } from "@/app/components/MarkdownContent";
import styles from "./FaqAccordion.module.css";

export function FaqAccordion({ items }: { items: readonly FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={styles.list}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const answerId = `faq-answer-${index}`;

        return (
          <div className={styles.item} key={item.question}>
            <button
              type="button"
              className={styles.question}
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              aria-controls={answerId}
            >
              <span>{item.question}</span>
              <span className={styles.icon} aria-hidden="true">
                <span />
                <span />
              </span>
            </button>
            <div
              id={answerId}
              className={`${styles.answerGrid} ${isOpen ? styles.answerOpen : ""}`}
            >
              <div>
                <div className={styles.answer}>
                  <MarkdownContent content={item.answer} />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
