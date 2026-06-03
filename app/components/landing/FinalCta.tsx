export function FinalCta() {
  return (
    <section id="verify" className="section scroll-mt-[var(--nav-height)]">
      <div className="container mx-auto px-[var(--space-4)] md:px-[var(--space-6)]">
        <div className="blueprint-panel mx-auto max-w-4xl p-[var(--space-8)] text-center md:p-14">
          <p className="section-label">Get verified</p>
          <h2 className="mx-auto mt-4 max-w-[14ch] text-[clamp(36px,5vw,64px)] font-medium leading-none text-white">
            Proof once. Use everywhere.
          </h2>
          <p className="mx-auto mt-[var(--space-6)] max-w-[58ch] text-base leading-[var(--leading-body)] text-[color:var(--muted)]">
            Turn verified technical evidence into a portable profile employers can trust before they schedule scarce
            engineering time.
          </p>
          <div className="mt-[var(--space-8)] flex justify-center">
            <a href="#verify" className="btn btn-accent min-w-[min(100%,240px)]">
              Get Verified
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
