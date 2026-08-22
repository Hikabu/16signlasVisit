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
  { label: "I will know", href: "#cv-misses", sectionId: "cv-misses" },
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
    title: "What their work shows",
    sentence: "Evidence behind the experience they describe",
  },
  {
    number: "02",
    title: "What remains unknown",
    sentence: "What their work cannot tell you yet",
  },
  {
    number: "03",
    title: "What is worth asking",
    sentence: "Questions grounded in what they actually did",
  },
];

export const PROCESS_FOLDERS: readonly ProcessFolder[] = [
  {
    label: "01",
    accentOffset: "8%",
    step: "ROLE",
    title: "Define what you need",
    body: "Add the role, stack, and responsibilities.",
    note: "A few minutes.",
  },
  {
    label: "02",
    accentOffset: "27%",
    step: "CANDIDATE",
    title: "Invite the candidate",
    body: "They securely connect the work they want reviewed.",
    note: "Candidate-controlled.",
  },
  {
    label: "03",
    accentOffset: "54%",
    step: "EVIDENCE",
    title: "We examine the work",
    body: "16Signals traces contributions, decisions, collaboration, and work over time.",
    note: "Evidence, not self-description.",
  },
  {
    label: "04",
    accentOffset: "73%",
    step: "INTERVIEW",
    title: "Open the brief",
    body: "See what is supported, what is unclear, and what to ask.",
    note: "Ready before the interview.",
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
