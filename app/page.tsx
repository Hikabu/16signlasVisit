import { EditorialHero } from "./components/landing/EditorialHero";
import { PreparedInterview } from "./components/landing/PreparedInterview";
import { Positioning } from "./components/landing/Positioning";
import { CV_Misses } from "./components/landing/CV_Misses";
import { WorkReveals } from "./components/landing/WorkReveals";
import { ProblemValue } from "./components/landing/ProblemValue";
import { HowItWorks } from "./components/landing/HowItWorks";
import { BookCall } from "./components/landing/BookCall";


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
        <CV_Misses />
        <WorkReveals />
        <ProblemValue />
        <HowItWorks />
        <BookCall />
      </main>
    </>
  );
}
