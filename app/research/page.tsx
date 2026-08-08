import type { Metadata } from "next";
import { ResearchIndex } from "@/app/components/ResearchIndex";
import { getResearchArticles } from "@/app/lib/content";

export const metadata: Metadata = {
  title: "Research | 16 Signals",
  description: "Research and field notes on evidence-based technical hiring.",
};

export default function ResearchPage() {
  return <ResearchIndex articles={getResearchArticles()} />;
}
