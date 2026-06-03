import { Header } from "./components/landing/Header";
import { Hero } from "./components/landing/Hero";
import { ValueProposition } from "./components/landing/ValueProposition";
import { FeatureDemo } from "./components/landing/FeatureDemo";
import { SocialProof } from "./components/landing/SocialProof";
import { FeatureDeepDive } from "./components/landing/FeatureDeepDive";
import { UseCases } from "./components/landing/UseCases";
import { Pricing } from "./components/landing/Pricing";
import { RiskReversal } from "./components/landing/RiskReversal";
import { FinalCta } from "./components/landing/FinalCta";
import { Footer } from "./components/landing/Footer";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[var(--radius-base)] focus:bg-[color:var(--surface)] focus:px-4 focus:py-2 focus:text-sm focus:shadow-[var(--shadow-2)]"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" className="page-shell pb-[var(--space-16)] md:pb-0">
        <Hero />
        <ValueProposition />
        <FeatureDemo />
        <SocialProof />
        <FeatureDeepDive />
        <UseCases />
        <Pricing />
        <RiskReversal />
        <FinalCta />
        <Footer />
      </main>
    </>
  );
}
