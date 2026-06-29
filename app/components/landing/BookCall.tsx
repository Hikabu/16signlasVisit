import { HERO_CTA } from "@/app/lib/landing/constants";
import { LargeWord } from "./LargeWord";

export function BookCall() {
  return (
    <section id="book-call" className="landing-section relative isolate overflow-clip">
      <LargeWord className="left-[8vw] top-4">TRUST</LargeWord>
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="section-label">Book a call</p>
          <h2 className="section-title mt-4 text-white">Interview people who are already verified.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-[var(--leading-body)] text-[color:var(--muted-strong)]">
            Bring us a role and the candidate volume. We will show where 16 Signals fits before your next hiring cycle.
          </p>
          <a href="https://cal.com/" className="btn btn-accent mt-10 min-w-[220px] shadow-[var(--shadow-accent-soft)]">
            {HERO_CTA}
          </a>
        </div>

        <div className="cal-embed mt-14" aria-label="Cal.com booking placeholder">
          <div>
            <p className="text-sm font-medium uppercase text-[color:var(--accent-soft)]">Cal.com</p>
            <p className="mt-3 text-2xl font-medium text-white">Booking embed ready</p>
            <p className="mt-3 max-w-md text-sm leading-[1.6] text-white/58">
              Replace the placeholder URL with your Cal.com link when the booking account is connected.
            </p>
          </div>
          <a href="https://cal.com/" className="btn btn-glass">Open calendar</a>
        </div>
      </div>
    </section>
  );
}
