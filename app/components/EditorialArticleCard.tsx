import Image from "next/image";
import Link from "next/link";
import type { ResearchArticle } from "@/app/types/landing";
import styles from "./EditorialArticleCard.module.css";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

export function EditorialArticleCard({
  article,
  index,
  compact = false,
}: {
  article: ResearchArticle;
  index: number;
  compact?: boolean;
}) {
  return (
    <article className={`${styles.card} ${compact ? styles.compact : ""}`}>
      <Link className={styles.imageLink} href={article.href} tabIndex={-1}>
        <span className={styles.imageFrame}>
          <Image
            src={article.image}
            alt=""
            fill
            sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 440px"
            className={styles.image}
          />
          <span className={styles.issue} aria-hidden="true">
            16S—{String(index + 1).padStart(2, "0")}
          </span>
        </span>
      </Link>

      <div className={styles.content}>
        <div className={styles.meta}>
          <span>{article.category}</span>
          <time dateTime={article.date}>{formatDate(article.date)}</time>
        </div>
        <h2>
          <Link href={article.href}>{article.title}</Link>
        </h2>
        <p>{article.description}</p>
        <Link className={styles.readLink} href={article.href}>
          <span>{compact ? "Read More" : "Read article"}</span>
          <span className={styles.arrow} aria-hidden="true">
            ↗
          </span>
        </Link>
      </div>
    </article>
  );
}
