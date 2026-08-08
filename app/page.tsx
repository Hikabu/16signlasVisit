import { BookCall } from "@/app/sections/BookCall";
import { CvMisses } from "@/app/sections/CvMisses";
import { EditorialHero } from "@/app/sections/EditorialHero";
import { HowItWorks } from "@/app/sections/HowItWorks";
import { Positioning } from "@/app/sections/Positioning";
import { PreparedInterview } from "@/app/sections/prepared-interview/PreparedInterview";
import { ProblemValue } from "@/app/sections/ProblemValue";
import { Research } from "@/app/sections/Research";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[var(--radius-base)] focus:bg-[color:var(--surface)] focus:px-4 focus:py-2 focus:text-sm focus:shadow-[var(--shadow-2)]"
      >
        Skip to content
      </a>
      <main id="main" className="page-shell pb-[var(--space-16)] md:pb-0">
        <EditorialHero />
        <PreparedInterview />
        <Positioning />
        <CvMisses />
        <ProblemValue />
        <Research />
        <HowItWorks />
        <BookCall />
      </main>
    </>
  );
}
