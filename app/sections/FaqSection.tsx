import type { FaqItem } from "@/app/lib/content";
import { FaqAccordion } from "@/app/components/FaqAccordion";
import styles from "./FaqSection.module.css";

export function FaqSection({ items }: { items: readonly FaqItem[] }) {
  return (
    <section id="faq" className={styles.section} aria-labelledby="home-faq-title">
      <div className={styles.inner}>
        <header className={styles.intro}>
          <p className={styles.eyebrow}>FAQ</p>
          <h2 id="home-faq-title">Clear answers, without the pitch.</h2>
          <p>
            The practical details about evidence, privacy, analysis, and the
            beta program.
          </p>
          <a href="/faq">
            View all FAQs <span aria-hidden="true">↗</span>
          </a>
        </header>

        <FaqAccordion items={items} />
      </div>
    </section>
  );
}
