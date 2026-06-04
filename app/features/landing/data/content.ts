export const PRODUCT_NAME = "16 Signals";

export const navLinks = [
  { label: "Verification layer", href: "#verification-layer" },
  { label: "Problems", href: "#problems" },
  { label: "How it works", href: "#how-it-works" },
] as const;

export const footerColumns = [
  {
    title: "Product",
    links: navLinks,
  },
  {
    title: "Trust",
    links: [
      { label: "Security overview", href: "#" },
      { label: "Privacy policy", href: "#" },
      { label: "Data processing agreement (GDPR)", href: "#" },
    ],
  },
] as const;

export const cta = {
  primary: "Get Verified",
  secondary: "See How It Works",
} as const;

export const socialProofProtocols = "engineering teams that need proof before interviews";

export const heroMetrics = [
  ["16", "independent skill signals"],
  ["1", "portable skill profile"],
  ["0", "interviews spent on guesswork"],
] as const;

export const verificationFlow = [
  "Candidate Evidence",
  "16 Signals",
  "Verification Engine",
  "Portable Skill Profile",
] as const;

export const hiringProblems = [
  {
    code: "P-01",
    title: "AI-inflated profiles",
    symptom: "Applications look precise, current, and senior while the underlying work history is thin or borrowed.",
    signal: "Authorship patterns, commit depth, and AI leverage quality are checked before the first screen.",
  },
  {
    code: "P-02",
    title: "Interview time burn",
    symptom: "Senior engineers spend the first call discovering whether the resume was worth reading.",
    signal: "The brief turns interviews into confirmation of specific evidence gaps.",
  },
  {
    code: "P-03",
    title: "Seniority distortion",
    symptom: "Candidates present as architects when their verified trajectory shows lateral repetition.",
    signal: "Technical depth and systems evolution are scored independently of self-reported level.",
  },
] as const;

export const verificationSteps = [
  {
    title: "Evidence",
    label: "Input",
    body: "Work history, code traces, project context, collaboration patterns, and technical claims enter as separate evidence layers.",
    metrics: ["Source mapped", "Claims separated", "History normalized"],
  },
  {
    title: "Verification",
    label: "Engine",
    body: "16 independent signals test authenticity, execution, technical depth, AI usage, seniority, and collaboration.",
    metrics: ["Signals weighted", "Anomalies flagged", "Confidence scored"],
  },
  {
    title: "Trust",
    label: "Output",
    body: "The result is a portable skill profile with verified strengths, risk areas, and interview probes.",
    metrics: ["Profile issued", "Proof reusable", "Interview focused"],
  },
] as const;

export const engineScenes = [
  {
    label: "VERIFY",
    headline: "Before investing engineering time, know what is real.",
    nodes: ["GitHub", "Projects", "Contributions", "Technical History", "AI Usage", "Collaboration"],
    metrics: ["Identity linked", "Evidence mapped", "Claim surface built", "Source confidence"],
    score: "42",
  },
  {
    label: "ANALYZE",
    headline: "Independent signals reduce hiring uncertainty.",
    nodes: ["P1", "P2", "P3", "P4", "P5", "P6"],
    metrics: ["16 signals active", "Seniority calibrated", "Anomalies isolated", "Interview probes"],
    score: "78",
  },
  {
    label: "PROVE",
    headline: "Portable proof instead of assumptions.",
    nodes: ["Authenticity", "Execution", "Technical Depth", "Collaboration", "Role Fit", "Trust"],
    metrics: ["Verified profile", "Reusable proof", "Employer-ready", "Signal locked"],
    score: "94",
  },
] as const;

export const pricingTiers = [
  {
    name: "Light",
    price: "$299",
    period: "/mo",
    description: "Batch processing, authenticity filter, ranked output. For teams drowning in applicant volume.",
    cta: "Start with Light",
    href: "#verify",
    highlight: false,
  },
  {
    name: "Deep",
    price: "$799",
    period: "/mo",
    description:
      "Everything in Light plus full Evidence Brief, Interview Intelligence, seniority calibration. For every hire that matters.",
    cta: "Try Deep free for 3 candidates",
    href: "#verify",
    highlight: true,
    badge: "Most used by engineering leads",
  },
  {
    name: "Protocol",
    price: "Custom",
    period: "",
    description: "Unlimited, API access, custom role primitives, team seats. For when verification is a recurring process.",
    cta: "Talk to us about Protocol",
    href: "#contact",
    highlight: false,
  },
] as const;

export const comparisonRows = [
  ["Light Mode batch processing", "Included", "Included", "Included"],
  ["Evidence Brief (Deep)", "No", "Included", "Included"],
  ["Interview Intelligence", "No", "Included", "Included"],
  ["API access", "No", "No", "Included"],
  ["Custom role primitives", "No", "No", "Included"],
] as const;
