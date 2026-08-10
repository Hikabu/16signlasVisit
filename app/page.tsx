import { BookCall } from "@/app/sections/BookCall";
import { getFaqItems, getResearchArticles } from "@/app/lib/content";
import { CvMisses } from "@/app/sections/CvMisses";
import { EditorialHero } from "@/app/sections/EditorialHero";
import { HowItWorks } from "@/app/sections/HowItWorks";
import { Positioning } from "@/app/sections/Positioning";
import { PreparedInterview } from "@/app/sections/prepared-interview/PreparedInterview";
import { ProblemValue } from "@/app/sections/ProblemValue";
import { Research } from "@/app/sections/Research";
import { FaqSection } from "@/app/sections/FaqSection";
import { PricingSection } from "@/app/sections/PricingSection";

export default function Home() {
  const articles = getResearchArticles();
  const faqs = getFaqItems();

  return (
    <>
      <main id="main" className="page-shell pb-[var(--space-16)] md:pb-0">
        <EditorialHero />
        <PreparedInterview />
        <Positioning />
        <CvMisses />
        <ProblemValue />
        <Research articles={articles} />
        <HowItWorks />
        {/* <FaqSection items={faqs} /> */}
        {/* <PricingSection /> */}
        <BookCall />
      </main>
    </>
  );
}
