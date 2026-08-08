import Image from "next/image";
import type { ResearchArticle } from "@/app/types/landing";
import styles from "./ResearchIndex.module.css";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

export function ResearchIndex({
  articles,
  eyebrow = "Research / Blog",
}: {
  articles: readonly ResearchArticle[];
  eyebrow?: string;
}) {
  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="research-index-title">
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1 id="research-index-title">Evidence, examined.</h1>
        <p className={styles.lede}>
          Notes on real engineering work, signal quality, and a more humane way
          to make technical hiring decisions.
        </p>
      </section>

      <section className={styles.grid} aria-label="All research articles">
        {articles.map((article, index) => (
          <article className={styles.card} key={article.slug}>
            <a className={styles.imageLink} href={article.href}>
              <span className={styles.imageFrame}>
                <Image
                  src={article.image}
                  alt=""
                  fill
                  sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 430px"
                  className={styles.image}
                />
                <span className={styles.issue}>16S / 0{index + 1}</span>
              </span>
            </a>
            <div className={styles.meta}>
              <span>{article.category}</span>
              <time dateTime={article.date}>{formatDate(article.date)}</time>
            </div>
            <h2>
              <a href={article.href}>{article.title}</a>
            </h2>
            <p>{article.description}</p>
            <a className={styles.readLink} href={article.href}>
              Read research <span aria-hidden="true">↗</span>
            </a>
          </article>
        ))}
      </section>
    </main>
  );
}
