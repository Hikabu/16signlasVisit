import type { Metadata } from "next";
import { MarkdownContent } from "@/app/components/MarkdownContent";
import { getPrivacyContent } from "@/app/lib/content";
import styles from "../terms/page.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy | 16 Signals",
  description:
    "How 16 Signals collects, uses, protects, and retains personal data.",
};

export default function PrivacyPage() {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <p>Legal</p>
        <h1>Privacy Policy</h1>
      </header>
      <article className={styles.body}>
        <MarkdownContent content={getPrivacyContent()} />
      </article>
    </main>
  );
}
