import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EditorialArticleCard } from "@/app/components/EditorialArticleCard";
import { MarkdownContent } from "@/app/components/MarkdownContent";
import { getResearchArticle, getResearchArticles } from "@/app/lib/content";
import { ArticleReadingSurface } from "./ArticleReadingSurface";
import styles from "./page.module.css";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

function getReadingTime(body: string) {
  const words = body.trim().split(/\s+/).length;
  return Math.max(2, Math.ceil(words / 220));
}

export function generateStaticParams() {
  return getResearchArticles().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getResearchArticle(slug);
  if (!article) return {};

  return {
    title: `${article.title} | 16 Signals`,
    description: article.description,
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const articles = getResearchArticles();
  const articleIndex = articles.findIndex((item) => item.slug === slug);
  if (articleIndex === -1) notFound();

  const article = articles[articleIndex];
  const relatedArticles = [
    ...articles.slice(articleIndex + 1),
    ...articles.slice(0, articleIndex + 1),
  ].slice(0, 3);

  return (
    <main className={styles.page}>
      <article>
        <header className={styles.header}>
          <h1>{article.title}</h1>
          <div className={styles.heroFooter}>
            <div>
              <p className={styles.summary}>{article.description}</p>
              <div className={styles.meta}>
                <time dateTime={article.date}>{formatDate(article.date)}</time>
                <span>{getReadingTime(article.body)} min read</span>
              </div>
            </div>
            <Link className={styles.brandStamp} href="/" aria-label="16 Signals home">
              <Image src="/a16zero.png" alt="" width={40} height={40} />
              <span>16 Signals</span>
            </Link>
          </div>
        </header>

        <ArticleReadingSurface category={article.category}>
          <MarkdownContent
            content={article.body.replace(/^#\s+.*\n+/, "")}
          />
        </ArticleReadingSurface>

        <section className={styles.moreArticles} aria-labelledby="more-articles-title">
          <div className={styles.moreHeader}>
            <div>
              <p>Discover</p>
              <h2 id="more-articles-title">See more articles</h2>
            </div>
            <Link href="/research">View all</Link>
          </div>
          <div className={styles.relatedGrid}>
            {relatedArticles.map((related) => (
              <EditorialArticleCard
                article={related}
                compact
                index={articles.findIndex((item) => item.slug === related.slug)}
                key={related.slug}
              />
            ))}
          </div>
        </section>
      </article>
    </main>
  );
}
