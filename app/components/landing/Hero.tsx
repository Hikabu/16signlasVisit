import {
  HERO_CTA,
  HERO_SECONDARY_CTA,
  PRODUCT_NAME,
  SOCIAL_PROOF_PROTOCOLS,
} from "@/app/lib/landing/constants";
import { Container, PrimaryButton } from "./ui";
import { HeroFanCanvas } from "./HeroFanCanvas";

export function Hero() {
  return (
    <section className="relative isolate -mt-[var(--nav-height)] min-h-[calc(100svh+var(--nav-height))] overflow-hidden bg-[#020304] pt-[var(--nav-height)] text-white">
      <HeroFanCanvas />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,rgb(2_3_4/0.08),rgb(2_3_4/0.24)_46%,rgb(2_3_4/0.94)_100%)]"
      />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-[color:var(--background)]" />

      <Container className="relative z-10 flex min-h-[calc(100svh-var(--nav-height))] flex-col justify-center py-[var(--space-16)]">
        <div className="fade-in-up mx-auto max-w-5xl text-center">
          <div className="mx-auto mb-[var(--space-6)] inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/7 px-3 py-1.5 text-xs font-medium text-[#b9fffb] shadow-[0_0_40px_rgb(34_200_191/0.18)] backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[#40e0d8] shadow-[0_0_16px_#40e0d8]" />
            Verification layer for technical hiring
          </div>

          <h1 className="hero-display mx-auto max-w-[13ch] text-white">
            Trustless proof for every technical hire.
          </h1>

          <p className="mx-auto mt-[var(--space-6)] max-w-3xl text-base leading-[var(--leading-body)] text-white/76 md:text-[19px]">
            AI-inflated CVs pass every ATS. Interview loops burn 40+ engineering hours. {PRODUCT_NAME} turns work
            history, code evidence, and seniority signals into a board-ready verification brief before the first call.
          </p>

          <div className="mt-[var(--space-8)] flex flex-col items-center justify-center gap-[var(--space-3)] sm:flex-row">
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

          <div className="mx-auto mt-[var(--space-8)] grid max-w-3xl gap-3 text-left sm:grid-cols-3">
            {[
              ["1,200+", "candidate claims verified"],
              ["2m 47s", "median evidence brief"],
              ["40+ hrs", "saved per senior search"],
            ].map(([value, label]) => (
              <div key={value} className="rounded-[var(--radius-base)] border border-white/10 bg-white/[0.055] p-4 backdrop-blur-md">
                <p className="text-2xl font-semibold leading-none text-white">{value}</p>
                <p className="mt-2 text-xs leading-[var(--leading-body)] text-white/58">{label}</p>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-[var(--space-6)] max-w-[58ch] text-sm leading-[var(--leading-body)] text-white/54">
            Used by engineering leads at {SOCIAL_PROOF_PROTOCOLS}.
          </p>
        </div>
      </Container>
    </section>
  );
}
