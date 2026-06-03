import {
  HERO_CTA,
  HERO_SECONDARY_CTA,
  SOCIAL_PROOF_PROTOCOLS,
} from "@/app/lib/landing/constants";
import { Container, PrimaryButton } from "./ui";
import { HeroFanCanvas } from "./HeroFanCanvas";

export function Hero() {
  return (
    <section className="relative isolate -mt-[var(--nav-height)] min-h-[calc(100svh+var(--nav-height))] overflow-hidden bg-[#010506] pt-[var(--nav-height)] text-white">
      <HeroFanCanvas />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,rgb(1_5_6/0.1),rgb(1_5_6/0.32)_48%,rgb(1_5_6/0.96)_100%)]"
      />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-[color:var(--background)]" />

      <Container className="relative z-10 flex min-h-[calc(100svh-var(--nav-height))] flex-col justify-center py-[var(--space-16)]">
        <div className="fade-in-up max-w-5xl">
          <div className="mb-[var(--space-6)] inline-flex items-center gap-2 rounded-[var(--radius-base)] border border-white/12 bg-white/[0.035] px-3 py-1.5 text-xs font-medium text-[#b9fffb] backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[#40e0d8] shadow-[0_0_16px_#40e0d8]" />
            Verification layer for technical hiring
          </div>

          <h1 className="hero-display max-w-[13ch] text-white">Proof once. Use everywhere.</h1>

          <p className="mt-[var(--space-6)] max-w-2xl text-base leading-[var(--leading-body)] text-white/72 md:text-[19px]">
            16 independent signals verify what someone can actually do before you spend engineering time interviewing
            them.
          </p>

          <div className="mt-[var(--space-8)] flex flex-col gap-[var(--space-3)] sm:flex-row">
            <PrimaryButton href="#verify" size="large" variant="accent" className="shadow-[0_18px_70px_rgb(0_154_147/0.34)]">
              {HERO_CTA}
            </PrimaryButton>
            <a
              href="#how-it-works"
              className="btn border border-white/12 bg-white/8 text-white shadow-none backdrop-blur-md hover:bg-white/14"
            >
              {HERO_SECONDARY_CTA}
            </a>
          </div>

          <div className="mt-[var(--space-12)] grid max-w-3xl gap-3 text-left sm:grid-cols-3">
            {[
              ["16", "independent skill signals"],
              ["1", "portable skill profile"],
              ["0", "interviews spent on guesswork"],
            ].map(([value, label]) => (
              <div key={value} className="rounded-[var(--radius-base)] border border-white/10 bg-white/[0.035] p-4 backdrop-blur-md">
                <p className="text-2xl font-semibold leading-none text-white">{value}</p>
                <p className="mt-2 text-xs leading-[var(--leading-body)] text-white/58">{label}</p>
              </div>
            ))}
          </div>

          <p className="mt-[var(--space-6)] max-w-[58ch] text-sm leading-[var(--leading-body)] text-white/54">
            Built for {SOCIAL_PROOF_PROTOCOLS}.
          </p>
        </div>
      </Container>
    </section>
  );
}
