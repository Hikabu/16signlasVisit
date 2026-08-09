import type { Metadata } from "next";
import { ResearchIndex } from "@/app/components/ResearchIndex";
import { getResearchArticles } from "@/app/lib/content";

export const metadata: Metadata = {
  title: "Blog | 16 Signals",
  description: "16 Signals research and writing on technical hiring.",
};

export default function BlogPage() {
  return <ResearchIndex articles={getResearchArticles()} eyebrow={null} />;
}
