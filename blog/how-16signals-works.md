---
title: "How 16 Signals Works: A Technical Deep Dive"
date: "2026-03-05"
summary: "Under the hood of the evidence-based candidate evaluation platform."
---

## Architecture at a glance

16 Signals is built on a straightforward premise: real code tells a better story than a résumé ever could. But making that work at scale requires some interesting engineering.

## The analysis pipeline

When an employer requests a brief on a candidate, here's what happens behind the scenes:

1. **Repository ingestion** — our system clones the candidate's selected repositories into an isolated, ephemeral environment. No code is stored beyond the analysis window.

2. **Commit analysis** — we examine the commit history to understand contribution patterns: frequency, size, time of day, and commit message quality.

3. **Code structure evaluation** — we map the architecture of the projects the candidate has worked on. Are they contributing to core logic, tests, documentation, or infrastructure?

4. **Pattern recognition** — our engine looks for signals of good engineering: meaningful test coverage, clear variable naming, appropriate abstraction, and sensible error handling.

5. **Brief generation** — all of these signals are synthesized into a human-readable brief that highlights what the candidate actually did, in plain language the hiring team can act on.

## Privacy by design

We never store source code. Repositories are cloned into memory, analyzed, and immediately destroyed. The analysis brief contains summaries and metrics — never raw code. This keeps candidates safe and employers compliant.