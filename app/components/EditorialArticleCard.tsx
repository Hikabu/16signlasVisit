import Image from "next/image";
import Link from "next/link";
import type { ResearchArticle } from "@/app/types/landing";
import styles from "./EditorialArticleCard.module.css";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    weekday: "short",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

export function EditorialArticleCard({
  article,
}: {
  article: ResearchArticle;
  index: number;
  compact?: boolean;
}) {
  return (
    <article className={styles.card}>
      <Link className={styles.imageLink} href={article.href} tabIndex={-1}>
        <span className={styles.imageFrame}>
          <Image
            src={article.image}
            alt=""
            fill
            sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 440px"
            className={styles.image}
          />
        </span>
      </Link>

      <div className={styles.content}>
        <p className={styles.category}>{article.category}</p>
        <h2>
          <Link href={article.href}>{article.title}</Link>
        </h2>
        <p className={styles.summary}>{article.description}</p>
        <footer className={styles.footer}>
          <time dateTime={article.date}>{formatDate(article.date)}</time>
          <Link className={styles.readLink} href={article.href}>
            <span>Read article</span>
            <span className={styles.arrow} aria-hidden="true">
              ↗
            </span>
          </Link>
        </footer>
      </div>
    </article>
  );
}
