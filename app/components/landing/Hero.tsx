import {
  HERO_CTA,
  PRODUCT_NAME,
  SOCIAL_PROOF_PROTOCOLS,
} from "@/app/lib/landing/constants";
import { Container, PrimaryButton } from "./ui";
import { HeroVisual } from "./HeroVisual";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[color:var(--background)] pb-16 pt-8 md:pb-24 md:pt-12">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="fade-in-up order-2 lg:order-1">
            <h1 className="max-w-[18ch] text-[clamp(36px,5.5vw,56px)] font-semibold leading-[1.08] tracking-[-0.03em] text-[color:var(--foreground)]">
              Your protocol is trustless. Your hiring still runs on trust-me resumes.
            </h1>
            <p className="body-lg mt-6 max-w-[58ch]">
              AI-inflated CVs pass every ATS. Interview loops burn 40+ engineering hours. You still don&apos;t know if
              they can actually ship. {PRODUCT_NAME} is a verification layer that surfaces real proof of work — so you
              see exactly who you&apos;re hiring before the first call.
            </p>
            <div className="mt-8">
              <PrimaryButton href="#verify">{HERO_CTA}</PrimaryButton>
            </div>
            <p className="mt-6 max-w-[52ch] text-sm leading-relaxed text-[color:var(--muted)]">
              Used by engineering leads at {SOCIAL_PROOF_PROTOCOLS} to verify 1,200+ candidates.
            </p>
          </div>

          <div className="fade-in-up order-1 lg:order-2">
            <HeroVisual />
          </div>
        </div>
      </Container>
    </section>
  );
}
