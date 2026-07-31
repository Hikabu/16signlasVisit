"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

import { HERO_CTA } from "@/app/lib/landing/constants";
import { LargeWord } from "./LargeWord";

export function BookCall() {
  useEffect(() => {
    const configureCal = async () => {
      const cal = await getCalApi({
        namespace: "product-explore",
      });

      cal("ui", {
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    };

    void configureCal();
  }, []);

  const scrollToCalendar = () => {
    document
      .getElementById("booking-calendar")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section
      id="book-call"
      className="landing-section relative isolate overflow-clip"
    >
      <LargeWord className="left-[8vw] top-4">TRUST</LargeWord>

      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="section-label">Book a call</p>

          <h2 className="section-title mt-4 text-white">
            See what real work reveals before the interview.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-[var(--leading-body)] text-[color:var(--muted-strong)]">
            Bring us a role and your current hiring process. We will show where
            16Signals fits before your next hiring cycle.
          </p>

          <button
            type="button"
            onClick={scrollToCalendar}
            className="btn btn-accent mt-10 min-w-[220px] shadow-[var(--shadow-accent-soft)]"
          >
            {HERO_CTA}
          </button>
        </div>

        <div
          id="booking-calendar"
          className="cal-embed relative mt-14 min-h-[720px] overflow-hidden rounded-[28px] border border-white/10 bg-white"
          aria-label="Book a call with 16Signals"
        >
          <Cal
            namespace="product-explore"
            calLink="16-signals/quick-chat"
            style={{
              width: "100%",
              height: "100%",
              minHeight: "720px",
              overflow: "auto",
            }}
            config={{
              layout: "month_view",
              useSlotsViewOnSmallScreen: "true",
            }}
          />
        </div>

        <div className="mt-5 text-center">
          <a
            href="https://cal.com/16-signals/quick-chat"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-white/55 transition-colors hover:text-white"
          >
            Having trouble with the calendar? Open Cal.com directly ↗
          </a>
        </div>
      </div>
    </section>
  );
}