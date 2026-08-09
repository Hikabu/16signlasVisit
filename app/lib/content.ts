import "server-only";

import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import type { ResearchArticle } from "@/app/types/landing";

type Frontmatter = Record<string, string>;

export type ResearchArticleWithBody = ResearchArticle & {
  body: string;
};

export type FaqItem = {
  question: string;
  answer: string;
  category: string;
};

const articlePresentation: Record<
  string,
  { category: string; image: string }
> = {
  "how-16signals-works": {
    category: "Methodology note",
    image: "/articles/1.jpg",
  },
  "why-we-hate-take-home-tests": {
    category: "Hiring research",
    image: "/articles/2.jpg",
  },
  "introducing-evidence-cv": {
    category: "Product research",
    image: "/articles/3.jpg",
  },
};

function parseFrontmatter(source: string) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n?/);
  const frontmatter: Frontmatter = {};

  if (!match) return { frontmatter, body: source.trim() };

  for (const line of match[1].split("\n")) {
    const separator = line.indexOf(":");
    if (separator === -1) continue;
    const key = line.slice(0, separator).trim();
    const value = line
      .slice(separator + 1)
      .trim()
      .replace(/^['"]|['"]$/g, "");
    frontmatter[key] = value;
  }

  return { frontmatter, body: source.slice(match[0].length).trim() };
}

export function getResearchArticles(): ResearchArticleWithBody[] {
  const directory = join(process.cwd(), "blog");

  return readdirSync(directory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const source = readFileSync(join(directory, file), "utf8");
      const { frontmatter, body } = parseFrontmatter(source);
      const presentation = articlePresentation[slug] ?? {
        category: "Research",
        image: "/articles/5.jpg",
      };

      return {
        slug,
        title: frontmatter.title ?? slug.replaceAll("-", " "),
        description: frontmatter.summary ?? "",
        date: frontmatter.date ?? "",
        category: presentation.category,
        image: presentation.image,
        href: `/research/${slug}`,
        body,
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getResearchArticle(slug: string) {
  return getResearchArticles().find((article) => article.slug === slug);
}

export function getFaqItems(): FaqItem[] {
  const directory = join(process.cwd(), "faq");
  const order = ["general.md", "technical.md", "legal.md"];

  return order.flatMap((file) => {
    const source = readFileSync(join(directory, file), "utf8").trim();
    const category = file.replace(/\.md$/, "");

    return source
      .split(/^## /m)
      .filter(Boolean)
      .map((section) => {
        const [question, ...answer] = section.trim().split("\n");
        return {
          question: question.trim(),
          answer: answer.join("\n").trim(),
          category,
        };
      });
  });
}

export function getTermsContent() {
  return readFileSync(
    join(process.cwd(), "terms_conditions", "Terms-of-Service.md"),
    "utf8",
  ).trim();
}

export function getPrivacyContent() {
  return readFileSync(
    join(process.cwd(), "terms_conditions", "Privacy-Policy.md"),
    "utf8",
  ).trim();
}
