import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MarkdownContent } from "@/app/components/MarkdownContent";
import { getResearchArticle, getResearchArticles } from "@/app/lib/content";
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
  const previous = articles[(articleIndex - 1 + articles.length) % articles.length];
  const next = articles[(articleIndex + 1) % articles.length];

  return (
    <main className={styles.page}>
      <article>
        <header className={styles.header}>
          <Link href="/research" className={styles.backLink}>
            Research index
          </Link>
          <div className={styles.meta}>
            <span>{article.category}</span>
            <time dateTime={article.date}>{formatDate(article.date)}</time>
          </div>
          <h1>{article.title}</h1>
          <p className={styles.summary}>{article.description}</p>
        </header>

        <div className={styles.cover}>
          <Image
            src={article.image}
            alt=""
            fill
            priority
            sizes="(max-width: 900px) 100vw, 1280px"
          />
        </div>

        <div className={styles.body}>
          <MarkdownContent content={article.body} />
        </div>

        <nav className={styles.articleNav} aria-label="Research articles">
          <Link href={previous.href} className={styles.previous}>
            <span>← Previous research</span>
            <strong>{previous.title}</strong>
          </Link>
          <Link href={next.href} className={styles.next}>
            <span>Next research →</span>
            <strong>{next.title}</strong>
          </Link>
        </nav>
      </article>
    </main>
  );
}
