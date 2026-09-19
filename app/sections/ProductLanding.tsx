"use client";

import { useState } from "react";
import Link from "next/link";
import type { ResearchArticle } from "@/app/types/landing";
import { BookCall } from "./BookCall";
import s from "./ProductLanding.module.css";

function Arrow() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="M4 12h16m-6-6 6 6-6 6" /></svg>;
}

function Status({ type, children }: { type: "verified" | "limited" | "unknown"; children: React.ReactNode }) {
  return <span className={`${s.status} ${s[type]}`}><span aria-hidden="true">{type === "verified" ? "✓" : type === "limited" ? "◐" : "○"}</span>{children}</span>;
}

function WorkPreview() {
  return <figure className={s.workPreview} aria-label="Sample candidate evidence for a backend engineer">
    <div className={s.fragmentHeader}><span>Alex Morgan <span className={s.dim}>/ Backend engineer</span></span><span className={s.sample}>Sample</span></div>
    <div className={s.workIntro}><span className={s.mutedLabel}>Public GitHub contributions</span><h3>What their work shows.</h3></div>
    <div className={s.signalRow}><Status type="verified">Reliable backend services</Status><span className={s.source}>Retries + idempotency · PR #142</span></div>
    <div className={s.signalRow}><Status type="limited">Production ownership</Status><span className={s.source}>Release activity · Scope unclear</span></div>
    <div className={s.signalRow}><Status type="unknown">Large-scale operations</Status><span className={s.source}>Not established in reviewed work</span></div>
    <figcaption><a href="#prepared-interview">Your interview brief is ready <Arrow /></a></figcaption>
  </figure>;
}

function RolePreview() {
  return <figure className={s.rolePreview} aria-label="Example role requirements matched to candidate work"><div className={s.fragmentHeader}><span>Backend engineer</span><span className={s.sample}>Role match · Sample</span></div><div className={s.matchLabels}><span>You need</span><span>Their work shows</span></div><div className={s.matchRow}><span>Reliable APIs</span><Status type="verified">Retries + failure handling</Status></div><div className={s.matchRow}><span>PostgreSQL</span><Status type="verified">Query plans + index changes</Status></div><div className={s.matchRow}><span>Production ownership</span><Status type="limited">Release activity; scope unclear</Status></div><figcaption>Relevant contributions. Not just matching keywords.</figcaption></figure>;
}

const evidence = [
  { type: "verified" as const, label: "Verified", source: "payments-api / PR #142", title: "Retries that won’t double-charge.", text: "Implemented idempotency keys, tested duplicate requests, and addressed failure cases in review.", conclusion: "Supports reliable API implementation." },
  { type: "limited" as const, label: "Limited", source: "payments-api / PR #158", title: "Release activity. Unclear ownership.", text: "Updated deployment configuration and joined the release review. The scope of ongoing responsibility is unclear.", conclusion: "Ask what they owned after the release." },
  { type: "unknown" as const, label: "Unknown", source: "Reviewed public contributions", title: "No evidence of operating at scale.", text: "No relevant load tests or capacity planning found in the reviewed work. Private and unshared work is outside this scan.", conclusion: "Missing evidence is not a missing skill." },
];

function EvidencePreview() {
  const [active, setActive] = useState(0);
  const item = evidence[active];
  return <div className={s.evidencePreview}><div className={s.evidenceTabs} aria-label="Explore sample evidence">{evidence.map((entry, index) => <button type="button" key={entry.type} aria-pressed={active === index} aria-controls="sample-evidence" onClick={() => setActive(index)}><Status type={entry.type}>{entry.label}</Status></button>)}<span className={s.sample}>Sample scan</span></div><div id="sample-evidence" className={s.evidenceBody} aria-live="polite"><p className={s.source}>{item.source}</p><h3>{item.title}</h3><p className={s.evidenceText}>{item.text}</p><div className={s.evidenceConclusion}><Status type={item.type}>{item.conclusion}</Status></div></div></div>;
}

function BriefPreview() {
  const [questions, setQuestions] = useState(false);
  return <figure className={s.briefPreview}><div className={s.fragmentHeader}><span>Alex Morgan <span className={s.dim}>/ Interview brief</span></span><span className={s.sample}>Sample</span></div><div className={s.briefTabs} aria-label="Sample interview views"><button type="button" aria-pressed={!questions} onClick={() => setQuestions(false)}>The brief</button><button type="button" aria-pressed={questions} onClick={() => setQuestions(true)}>Questions to ask</button></div><div className={s.briefBody} aria-live="polite">{questions ? <><div className={s.briefItem}><span className={s.mutedLabel}>Explore their implementation</span><p>“What happens if a payment succeeds, but the response never reaches the client?”</p><small>Based on payments-api / PR #142</small></div><div className={s.briefItem}><span className={s.mutedLabel}>Clarify what is still unknown</span><p>“After the release, what did you monitor—and which decisions were yours?”</p><small>Based on release activity / PR #158</small></div></> : <><div className={s.briefItem}><Status type="verified">Relevant strength</Status><p>Reliable backend services.</p><small>Payment retries, failure handling, and integration tests.</small></div><div className={s.briefItem}><Status type="unknown">Still to explore</Status><p>Ownership at production scale.</p><small>The reviewed work does not establish operational responsibility.</small></div><div className={s.briefQuestion}>Ask how they handled a payment that succeeded without a response.</div></>}</div><figcaption>Evidence informs the interview. You make the decision.</figcaption></figure>;
}

export function ProductLanding({ articles }: { articles: readonly ResearchArticle[] }) {
  return <main id="main" data-product-landing className={s.landing}>
    <section id="hero" className={s.hero} aria-labelledby="hero-title"><div className={s.heroCopy}><p className={s.eyebrow}>Engineering hiring, grounded in work</p><h1 id="hero-title">Know their work.<br /><span>Before you meet.</span></h1><p className={s.heroDescription}>16Signals scans candidates’ GitHub work against your role. See relevant experience, clear gaps, and what to ask—before spending engineering interview time.</p><div className={s.actions}><a href="#write-to-us" className={s.primaryButton}>See it on your role <Arrow /></a><a href="#prepared-interview" className={s.textButton}>Explore a sample <span aria-hidden="true">↗</span></a></div></div><WorkPreview /></section>

    <section id="the-shift" className={s.section} aria-labelledby="fit-title"><div className={s.sectionCopy}><p className={s.eyebrow}>The right experience</p><h2 id="fit-title">Hire for the work<br />you need to ship.</h2><p>A good engineer can still be new to your problems. Find people whose work already shows the experience your team needs.</p></div><RolePreview /></section>

    <section id="cv-misses" className={s.section} aria-labelledby="scan-title"><div className={s.sectionCopy}><p className={s.eyebrow}>The work, already reviewed</p><h2 id="scan-title">Close the tabs.<br />See the evidence.</h2><p>Stop opening repositories, pull requests, and reviews yourself. Get the relevant work in one place—with what’s verified, limited, or still unknown.</p></div><EvidencePreview /></section>

    <section id="prepared-interview" className={s.section} aria-labelledby="interview-title"><div className={s.sectionCopy}><p className={s.eyebrow}>Your interview, prepared</p><h2 id="interview-title">Start with<br />better questions.</h2><p>Walk in with a short brief on the strengths to explore, the gaps to clarify, and questions grounded in their actual work.</p><a className={s.textButton} href="#write-to-us">Get a brief for your role <Arrow /></a></div><BriefPreview /></section>

    <section id="problem-value" className={s.workflowSection} aria-labelledby="workflow-title"><div className={s.workflowIntro}><p className={s.eyebrow}>How it works</p><h2 id="workflow-title">From role to ready.</h2></div><div className={s.workflow}>{[{ title: "Set the role", text: "Add the work and skills your team needs." }, { title: "Bring the candidate", text: "Connect the GitHub work available to review." }, { title: "Run the scan", text: "We organize contributions around your role." }, { title: "Open your brief", text: "See the evidence, gaps, and interview questions." }].map((step, index) => <article key={step.title}><span className={s.stepNumber}>0{index + 1}</span><h3>{step.title}</h3><p>{step.text}</p></article>)}</div></section>

    <section id="research" className={s.researchSection} aria-labelledby="research-title"><div><p className={s.eyebrow}>Behind the product</p><h2 id="research-title">Evidence, examined.</h2><Link href="/research" className={s.textButton}>Read the research <Arrow /></Link></div><div className={s.articles}>{articles.slice(0,3).map(article => <Link href={article.href} key={article.slug}><h3>{article.title.trim().replace("<Insufficient Evidence>", "“Insufficient Evidence”")}</h3><Arrow /></Link>)}</div></section>
    <BookCall />
  </main>;
}
