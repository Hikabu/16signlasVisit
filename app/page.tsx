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
    <main className="page-shell pb-24 md:pb-0">
      <Header />
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
  );
}
