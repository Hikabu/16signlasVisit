export default function Home() {
  const delayClasses = ['delay-1', 'delay-2', 'delay-3'];

  const trustSignals = [
    {
      title: 'Skill Graph Index',
      body: 'Continuously aggregates verified project outcomes, peer attestations, and benchmarked performance into one portable skills identity.',
    },
    {
      title: 'Verification Engine',
      body: 'Normalizes evidence from code, delivery metrics, and role context so hiring teams compare candidates on proven capability, not presentation.',
    },
    {
      title: 'Reusable Talent Passport',
      body: 'Each validated signal can be reused across hiring platforms, ecosystems, and workflows without repeating manual proof each time.',
    },
  ];

  const infrastructureCards = [
    {
      title: 'Identity Layer',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc faucibus lectus non lacus volutpat, nec tincidunt erat accumsan.',
    },
    {
      title: 'Verification Rails',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ullamcorper sapien at sapien porta, eget aliquet nisl fermentum.',
    },
    {
      title: 'Global Access',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer interdum massa et tortor feugiat, in vehicula tellus mattis.',
    },
  ];

  const solutionCards = [
    {
      title: 'Hiring Intelligence',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur commodo erat sed ex facilisis, a placerat lorem hendrerit.',
    },
    {
      title: 'Candidate Confidence',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tempus erat ac tortor pharetra tincidunt.',
    },
    {
      title: 'Workflow Integration',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eu enim tristique, blandit sem et, venenatis lectus.',
    },
  ];

  return (
    <main className="page-shell bg-[color:var(--background)]">
      <header className="border-b border-[color:var(--border)]/70 bg-[color:var(--surface)]/70 backdrop-blur-xl">
        <div className="container flex items-center justify-between py-5">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-md border border-white/25 bg-white/10 text-xs font-semibold tracking-[0.08em] text-white">
              16
            </div>
            <span className="text-sm font-medium tracking-tight text-white">16 Signals</span>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-[color:var(--muted)] md:flex">
            <a className="hover:text-white" href="#core-idea">
              Verification
            </a>
            <a className="hover:text-white" href="#infrastructure">
              Infrastructure
            </a>
            <a className="hover:text-white" href="#solution">
              Solution
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <a
              className="pill hidden border border-white/20 px-4 py-2 text-sm text-white transition hover:border-white/40 hover:bg-white/10 md:inline-flex"
              href="#core-idea"
            >
              Why 16 Signals
            </a>
            <a
              className="pill inline-flex min-h-[40px] min-w-[181px] items-center justify-center bg-[color:var(--primary)] px-[18px] py-[12px] text-sm font-medium text-white transition hover:brightness-110"
              href="#quote"
            >
              Start verifying skills
            </a>
          </div>
        </div>
      </header>

      <section className="relative isolate overflow-hidden">
        <div aria-hidden="true" className="hero-glow hero-glow-left" />
        <div aria-hidden="true" className="hero-glow hero-glow-right" />

        <div className="container grid items-center gap-12 py-20 md:grid-cols-2 md:py-28">
          <div className="fade-in-up">
            <p className="mb-6 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-[color:var(--muted)]">
              <span className="pill border border-[color:var(--border)] px-3 py-1 text-[10px]">Verification Layer</span>
              Future of skills identity
            </p>

            <h1 className="max-w-[14ch] text-balance text-[44px] font-light leading-[1.06] tracking-[-0.03em] text-white md:text-[68px]">
              Tokenise your skills so they work for you.
            </h1>

            <p className="mt-6 max-w-[58ch] text-pretty text-[17px] leading-7 text-[color:var(--muted-strong)]">
              We verify real skills and performance of people, so instead of blindly trusting resumes, companies can
              instantly see whether a candidate truly fits their needs.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                className="pill inline-flex min-h-[40px] min-w-[210px] items-center justify-center bg-[color:var(--primary)] px-6 py-3 text-sm font-medium text-white transition hover:brightness-110"
                href="#infrastructure"
              >
                Learn more about infrastructure
              </a>
              <a
                className="pill inline-flex min-h-[40px] min-w-[181px] items-center justify-center border border-white/25 bg-transparent px-6 py-3 text-sm font-medium text-white transition hover:border-white/45 hover:bg-white/10"
                href="#solution"
              >
                Learn about the solution
              </a>
            </div>
          </div>

          <div className="fade-in-up delay-1">
            <div className="glass-card relative overflow-hidden rounded-2xl p-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(130,89,239,0.32),transparent_45%),radial-gradient(circle_at_80%_20%,rgba(45,132,235,0.2),transparent_45%),linear-gradient(130deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01))]" />
              <div className="relative space-y-6">
                <p className="text-xs uppercase tracking-[0.14em] text-[color:var(--muted)]">Signal Network</p>
                <div className="space-y-4">
                  {trustSignals.map((item) => (
                    <article key={item.title} className="rounded-xl border border-white/10 bg-black/35 p-4">
                      <h2 className="text-base font-medium text-white">{item.title}</h2>
                      <p className="mt-2 text-sm leading-6 text-[color:var(--muted-strong)]">{item.body}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="core-idea" className="container py-20">
        <div className="fade-in-up max-w-[72ch]">
          <p className="text-xs uppercase tracking-[0.14em] text-[color:var(--muted)]">Core Idea</p>
          <h2 className="mt-5 text-pretty text-[34px] font-light leading-tight tracking-[-0.02em] text-white md:text-[52px] md:leading-[1.12]">
            We replace resume-based hiring with skill verification.
          </h2>
          <p className="mt-6 text-pretty text-lg leading-8 text-[color:var(--muted-strong)]">
            Companies can evaluate real proof of work and validated signals instead of assumptions.
          </p>
        </div>
      </section>

      <section id="quote" className="container py-10">
        <blockquote className="fade-in-up delay-1 rounded-3xl border border-[color:var(--border)] bg-[linear-gradient(135deg,rgba(130,89,239,0.18),rgba(18,18,18,0.9)_45%,rgba(45,132,235,0.2))] p-8 md:p-12">
          <p className="max-w-[58ch] text-pretty text-[28px] font-light leading-[1.3] tracking-[-0.02em] text-white md:text-[40px]">
            “Proof once, use everywhere. When you tokenize your skills with 16 Signals, your verified abilities become
            globally accessible and reusable across platforms.”
          </p>
        </blockquote>
      </section>

      <section id="infrastructure" className="container py-20">
        <div className="mb-10 fade-in-up">
          <p className="text-xs uppercase tracking-[0.14em] text-[color:var(--muted)]">Infrastructure</p>
          <h3 className="mt-4 text-[32px] font-light tracking-[-0.02em] text-white md:text-[46px]">
            Built as a trust framework for skills identity at scale.
          </h3>
          <p className="mt-4 max-w-[62ch] text-base leading-7 text-[color:var(--muted-strong)]">
            Minimal interfaces and auditable rails create confidence for enterprises while remaining portable for
            talent.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {infrastructureCards.map((item, index) => (
            <article
              key={item.title}
              className={`feature-card reveal-card ${delayClasses[index] ?? ''} rounded-2xl border border-[color:var(--border)] p-6`}
            >
              <h4 className="text-lg font-medium text-white">{item.title}</h4>
              <p className="mt-3 text-sm leading-6 text-[color:var(--muted-strong)]">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="solution" className="container pb-24 pt-8">
        <div className="mb-10 fade-in-up">
          <p className="text-xs uppercase tracking-[0.14em] text-[color:var(--muted)]">Solution</p>
          <h3 className="mt-4 text-[32px] font-light tracking-[-0.02em] text-white md:text-[46px]">
            Premium hiring workflows powered by validated capability.
          </h3>
          <p className="mt-4 max-w-[62ch] text-base leading-7 text-[color:var(--muted-strong)]">
            Teams discover fit faster, candidates move with proof in hand, and every decision is backed by measurable
            performance signals.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {solutionCards.map((item, index) => (
            <article
              key={item.title}
              className={`feature-card reveal-card ${delayClasses[index] ?? ''} rounded-2xl border border-[color:var(--border)] p-6`}
            >
              <h4 className="text-lg font-medium text-white">{item.title}</h4>
              <p className="mt-3 text-sm leading-6 text-[color:var(--muted-strong)]">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="container pb-12">
        <div className="border-t border-[color:var(--border)] pt-8 text-sm text-[color:var(--muted)]">
          © {new Date().getFullYear()} 16 Signals. Verification layer for skills.
        </div>
      </footer>
    </main>
  );
}
