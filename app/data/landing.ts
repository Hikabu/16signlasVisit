import type {
  ApplicantId,
  EvidenceOutput,
  HowItWorksStep,
  JobId,
  NavigationItem,
  NavigationOption,
  PositioningCard,
  ProcessFolder,
  ReportSectionId,
  TimelineStage,
} from "@/app/types/landing";

export const HERO_NAVIGATION: readonly NavigationItem[] = [
  { label: "Problem", href: "#the-shift", sectionId: "the-shift" },
  { label: "CV never shows", href: "#cv-misses", sectionId: "cv-misses" },
  { label: "Report", href: "#prepared-interview", sectionId: "prepared-interview" },
  { label: "Principles", href: "#problem-value", sectionId: "problem-value" },
  { label: "Research", href: "#research", sectionId: "research" },
  { label: "Method", href: "#how-it-works", sectionId: "how-it-works" },
  { label: "Contact us", href: "#write-to-us", sectionId: "book-call" },
];

export const LANDING_SECTION_IDS = [
  "hero",
  "prepared-interview",
  "the-shift",
  "cv-misses",
  "problem-value",
  "research",
  "how-it-works",
  "book-call",
  "faq",
  "pricing",
] as const;

export const POSITIONING_CARDS: Record<"screening" | "technical" | "signals", PositioningCard> = {
  screening: {
    title: "Screening / HR",
    summary: "Shows how clearly someone can describe their experience",
  },
  technical: {
    title: "Technical interview",
    summary: "Shows how someone performs in a prepared conversation or exercise",
  },
  signals: {
    title: "16Signals",
    summary: "Shows whether candidate's real work fits this role before engineering time is spent",
  },
};

export const CV_TIMELINE_STAGES: readonly TimelineStage[] = [
  {
    number: "01",
    title: "What have they used?",
    sentence: "- See the languages, systems, and technical complexity demonstrated in their work",
  },
  {
    number: "02",
    title: "What is relevant?",
    sentence: "- Find the experience that directly relates to the role your team is hiring for",
  },
  {
    number: "03",
    title: "What does the code show?",
    sentence: "- Review evidence of structure, testing, maintainability, security, and technical complexity",
  },
  {
    number: "04",
    title: "Working style",
    sentence: "- See how they communicate, review work, solve problems, and take ownership",
  },
  {
    number: "05",
    title: "Evidence gaps",
    sentence: "- See which role requirements are supported by their work and which still need to be checked",
  },
  {
    number: "06",
    title: "What should you ask next?",
    sentence: "- Enter the interview knowing what is already supported and where to go deeper",
  },
];

export const PROCESS_FOLDERS: readonly ProcessFolder[] = [
  {
    label: "01",
    accentOffset: "8%",
    step: "DEFINE THE ROLE",
    title: "Add the role",
    body: "Share the job description or define the stack, responsibilities, and experience your team needs.",
    note: "Takes a few minutes.",
  },
  {
    label: "02",
    accentOffset: "27%",
    step: "INVITE THE CANDIDATE",
    title: "Invite the candidate",
    body: "Send a secure link. The candidate chooses and connects the professional work they want assessed.",
    note: "Candidate-controlled access.",
  },
  {
    label: "03",
    accentOffset: "54%",
    step: "REVIEW THE EVIDENCE",
    title: "16Signals reads the work",
    body: "We examine relevant contributions, technical decisions, code quality, collaboration, and evidence over time.",
    note: "Analysis runs automatically.",
  },
  {
    label: "04",
    accentOffset: "73%",
    step: "PREPARE THE INTERVIEW",
    title: "Open the brief",
    body: "See what matches the role, what is supported by evidence, what remains unclear, and what to ask next.",
    note: "Ready before the interview.",
  },
];

export const HOW_IT_WORKS_STEPS: readonly HowItWorksStep[] = [
  {
    number: "01",
    title: "Send the candidate pool.",
    body: "Applications, work links, GitHub profiles, and role context become a clean evidence set.",
    chips: ["Claims split", "Sources mapped", "Role context"],
  },
  {
    number: "02",
    title: "16 Signals verifies what is real.",
    body: "Independent checks score authenticity, depth, ownership, collaboration, consistency, and AI-assisted work.",
    chips: ["16 checks", "Risk flags", "Confidence score"],
  },
  {
    number: "03",
    title: "Receive the shortlist.",
    body: "You get verified engineers, concise briefs, and targeted interview probes for the gaps that still matter.",
    chips: ["Shortlist ready", "Brief included", "Interview probes"],
  },
];

export const EVIDENCE_OUTPUTS: readonly EvidenceOutput[] = [
  {
    id: "proven",
    index: "01",
    label: "Verified capability",
    conclusion: "Owns complex backend systems from technical decision through production release.",
    evidenceCount: "12",
    artifactType: "CAPABILITY TRACE",
    artifactId: "12 connected artifacts · 4 repositories",
    artifactTitle: "Production ownership repeated across multiple projects",
    artifactDetail: "16Signals connected architecture decisions, review responses, test coverage and release activity across 18 months of work.",
    artifactMeta: "3 major changes · 6 collaborators · production outcomes verified",
  },
  {
    id: "verify",
    index: "02",
    label: "Unproven area",
    conclusion: "Technical leadership is visible; sustained mentorship is not yet proven.",
    evidenceCount: "4",
    artifactType: "EVIDENCE LIMIT",
    artifactId: "32 review threads examined",
    artifactTitle: "Strong technical guidance, limited coaching history",
    artifactDetail: "The record shows frequent technical influence, but not enough repeated evidence of delegation, coaching or developing other engineers.",
    artifactMeta: "4 guidance examples · 1 coaching thread · insufficient evidence",
  },
  {
    id: "ask",
    index: "03",
    label: "Interview focus",
    conclusion: "Test how they make architecture decisions when delivery speed and system flexibility conflict.",
    evidenceCount: "3",
    artifactType: "PREPARED QUESTION",
    artifactId: "PR #284 · decision thread",
    artifactTitle: "Why was the event-driven approach rejected in favor of a synchronous boundary?",
    artifactDetail: "The final implementation is clear, but the record does not fully explain how the candidate weighed migration cost, operational risk and future scale.",
    artifactMeta: "3 linked artifacts · 2 alternatives · rationale partially recorded",
  },
];

export const JOBS: readonly NavigationOption<JobId>[] = [
  { id: "backend", label: "Backend Developer" },
  { id: "frontend", label: "Frontend Developer" },
  { id: "product-design", label: "Product Designer" },
];

export const APPLICANTS: readonly NavigationOption<ApplicantId>[] = [
  { id: "alex", label: "Alex Morgan" },
  { id: "maya", label: "Maya Chen" },
  { id: "daniel", label: "Daniel Kim" },
];

export const REPORT_SECTIONS: readonly NavigationOption<ReportSectionId>[] = [
  { id: "report", label: "Report" },
  { id: "linked-evidence", label: "Linked evidence" },
  { id: "questions-to-explore", label: "Questions to explore" },
  { id: "interview-plan", label: "Interview plan" },
  { id: "open-questions", label: "Open questions" },
];

export const BOOK_CALL_CTA = "Explore a real report";
