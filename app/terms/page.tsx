import type { Metadata } from "next";
import { MarkdownContent } from "@/app/components/MarkdownContent";
import { getTermsContent } from "@/app/lib/content";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Terms & Conditions | 16 Signals",
  description: "16 Signals terms and conditions.",
};

export default function TermsPage() {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <p>Legal</p>
        <h1>Terms &amp; Conditions</h1>
      </header>
      <article className={styles.body}>
        <MarkdownContent content={getTermsContent()} />
      </article>
    </main>
  );
}
