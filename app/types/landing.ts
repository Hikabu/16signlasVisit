export type NavigationItem = {
  label: string;
  href: `#${string}`;
  sectionId: string;
};

export type PositioningCard = {
  title: string;
  summary: string;
};

export type TimelineStage = {
  number: string;
  title: string;
  sentence: string;
};

export type ProcessFolder = {
  label: string;
  accentOffset: string;
  step: string;
  title: string;
  body: string;
  note: string;
};

export type HowItWorksStep = {
  number: string;
  title: string;
  body: string;
  chips: readonly string[];
};

export type ResearchArticle = {
  category: string;
  title: string;
  description: string;
  image: string;
  href: string;
};

export type EvidenceId = "proven" | "verify" | "ask";
export type JobId = "backend" | "frontend" | "product-design";
export type ApplicantId = "alex" | "maya" | "daniel";
export type ReportSectionId =
  | "report"
  | "linked-evidence"
  | "questions-to-explore"
  | "interview-plan"
  | "open-questions";

export type EvidenceOutput = {
  id: EvidenceId;
  index: string;
  label: string;
  conclusion: string;
  evidenceCount: string;
  artifactType: string;
  artifactId: string;
  artifactTitle: string;
  artifactDetail: string;
  artifactMeta: string;
};

export type NavigationOption<Id extends string> = {
  id: Id;
  label: string;
};
