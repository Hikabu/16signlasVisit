import type { ResearchArticle } from "@/app/types/landing";
import { EditorialArticleCard } from "./EditorialArticleCard";
import styles from "./ResearchIndex.module.css";

export function ResearchIndex({
  articles,
  eyebrow = "Research / Blog",
}: {
  articles: readonly ResearchArticle[];
  eyebrow?: string | null;
}) {
  return (
    <main className={styles.page}>
      <section
        className={`${styles.hero} ${eyebrow ? "" : styles.heroCompact}`}
        aria-labelledby="research-index-title"
      >
        {eyebrow ? (
          <div className={styles.heroTopline}>
            <p className={styles.eyebrow}>{eyebrow}</p>
          </div>
        ) : null}
        <h1 id="research-index-title">
          Technical hiring has enough opinions. We publish the
          <span> evidence.</span>
        </h1>
        <div className={styles.heroFooter}>
          <p className={styles.lede}>
            Field notes on real engineering work, trustworthy signal to make consequential hiring decisions.
          </p>
        </div>
      </section>

      <section className={styles.collection} aria-label="All research articles">
        <div className={styles.collectionHeader}>
          <p>Latest thinking</p>
          <span>{String(articles.length).padStart(2, "0")} articles</span>
        </div>
        <div className={styles.grid}>
          {articles.map((article, index) => (
            <EditorialArticleCard
              article={article}
              index={index}
              key={article.slug}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
