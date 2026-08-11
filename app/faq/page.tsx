import type { Metadata } from "next";
import { FaqContent } from "@/app/faq/FaqContent";
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
        <h1>What you need to know</h1>
        <p>
          Straight answers about the product, the analysis, candidate privacy,
          and what happens during the beta.
        </p>
      </header>

      <FaqContent items={items} />
    </main>
  );
}
