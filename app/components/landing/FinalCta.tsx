export function FinalCta() {
  return (
    <section className="bg-[color:var(--accent)] py-20 md:py-28">
      <div className="container mx-auto max-w-[52ch] px-6 text-center">
        <h2 className="text-[clamp(28px,4.5vw,48px)] font-medium leading-[1.15] tracking-[-0.02em] text-white">
          You already know the interview you are about to schedule should not be happening.
        </h2>
        <p className="mt-6 text-lg leading-[1.8] text-white/90">
          There is a CV in your pipeline right now that looks credible. You are not sure it is real. You are about to
          spend 90 minutes of your senior engineer&apos;s time finding out.
        </p>
        <p className="mt-4 text-lg leading-[1.8] text-white/90">
          Run it through 16 Signals first. 3 minutes. Then decide.
        </p>
        <div className="mt-10 flex justify-center">
          <a
            href="#verify"
            className="inline-flex min-h-[48px] w-full max-w-md items-center justify-center rounded-full bg-white px-6 py-3 text-[15px] font-medium text-[color:var(--accent)] transition hover:bg-white/95 md:w-auto md:min-w-[300px]"
          >
            Verify that candidate now — it is free
          </a>
        </div>
      </div>
    </section>
  );
}
