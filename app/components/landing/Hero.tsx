import {
  HERO_CTA,
  HERO_SECONDARY_CTA,
} from "@/app/lib/landing/constants";
import { Container, PrimaryButton } from "./ui";
import { HeroFanCanvas } from "./HeroFanCanvas";
import { LargeWord } from "./LargeWord";

export function Hero() {
  return (
    <section className="hero-section relative isolate -mt-[var(--nav-height)] min-h-[calc(100svh+var(--nav-height))] overflow-hidden pt-[var(--nav-height)] text-white">
      <LargeWord className="bottom-[-4vw] right-[-2vw]">PROOF</LargeWord>
      <div className="hero-fan-curtain">
        <HeroFanCanvas />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,rgb(1_5_6/0.22),rgb(1_5_6/0.46)_52%,rgb(1_5_6/0.92)_100%)]"
      />

      <Container className="relative z-10 flex min-h-[calc(100svh-var(--nav-height))] flex-col justify-center py-[var(--space-16)]">
        <div className="fade-in-up max-w-4xl">
          <h1 className="hero-display max-w-[11ch] text-white">Only verified engineers.</h1>

          <div className="mt-[var(--space-8)] max-w-2xl space-y-3 text-base leading-[var(--leading-body)] text-white/72 md:text-[19px]">
            <p>We filter candidates before your team interviews.</p>
            <p>Every shortlist is backed by real work signals.</p>
            <p>Inflated profiles are removed early.</p>
            <p>Strong engineers arrive with proof attached.</p>
            <p>You spend time confirming, not guessing.</p>
          </div>

          <div className="mt-[var(--space-8)] flex flex-col gap-[var(--space-3)] sm:flex-row">
            <PrimaryButton href="#book-call" size="large" variant="accent" className="shadow-[var(--shadow-accent)]">
              {HERO_CTA}
            </PrimaryButton>
            <a
              href="#how-it-works"
              className="btn border border-white/12 bg-white/8 text-white shadow-none backdrop-blur-md hover:bg-white/14"
            >
              {HERO_SECONDARY_CTA}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
