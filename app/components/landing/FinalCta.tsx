export function FinalCta() {
  return (
    <section className="bg-[color:var(--brand)] py-[var(--space-16)] md:py-28">
      <div className="container mx-auto max-w-[52ch] px-[var(--space-4)] text-center md:px-[var(--space-6)]">
        <h2 className="text-[clamp(var(--text-xl),4.5vw,var(--text-2xl))] font-medium leading-[var(--leading-heading)] tracking-[-0.02em] text-[color:var(--brand-foreground)]">
          You already know the interview you are about to schedule should not be happening.
        </h2>
        <p className="mt-[var(--space-6)] text-base leading-[var(--leading-body)] text-[color:var(--brand-foreground)]/90">
          There is a CV in your pipeline right now that looks credible. You are not sure it is real. You are about to
          spend 90 minutes of your senior engineer&apos;s time finding out.
        </p>
        <p className="mt-[var(--space-4)] text-base leading-[var(--leading-body)] text-[color:var(--brand-foreground)]/90">
          Run it through 16 Signals first. 3 minutes. Then decide.
        </p>
        <div className="mt-[var(--space-8)] flex justify-center">
          <a
            href="#verify"
            className="btn min-w-[min(100%,280px)] bg-[color:var(--neutral-0)] text-[color:var(--brand)] hover:bg-[color:var(--neutral-50)] focus-visible:outline-[color:var(--neutral-0)]"
          >
            Verify that candidate now — free →
          </a>
        </div>
      </div>
    </section>
  );
}
