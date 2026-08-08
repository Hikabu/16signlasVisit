import type { Metadata } from "next";
import { FaqAccordion } from "@/app/components/FaqAccordion";
import { getFaqItems } from "@/app/lib/content";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "FAQ | 16 Signals",
  description: "Answers about 16 Signals, analysis, privacy, and pricing.",
};

export default function FaqPage() {
  const items = getFaqItems();

  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <p className={styles.eyebrow}>FAQ</p>
        <h1>What you need to know.</h1>
        <p>
          Straight answers about the product, the analysis, candidate privacy,
          and what happens during the beta.
        </p>
      </header>

      <section className={styles.faqs} aria-label="Frequently asked questions">
        <div className={styles.sideNote}>
          <p>{String(items.length).padStart(2, "0")} questions</p>
          <span>General · Technical · Legal</span>
        </div>
        <FaqAccordion items={items} />
      </section>
    </main>
  );
}
