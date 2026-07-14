export type TrustPageId =
  | "trust-centre"
  | "delivery-methodology"
  | "responsible-ai"
  | "accessibility"
  | "security-privacy"
  | "procurement";

export type TrustPageStatus =
  | "live"
  | "planned"
  | "internal"
  | "retired";

export type TrustCategory =
  | "delivery"
  | "quality-accessibility"
  | "ai-governance"
  | "security-privacy"
  | "procurement";

export interface TrustPage {
  id: TrustPageId;
  title: string;
  shortTitle: string;
  href: string;
  canonical: string;
  status: TrustPageStatus;
  category: TrustCategory;
  publicVisibility: boolean;
  navigationVisibility: boolean;
  shortDescription: string;
  intendedAudience: readonly string[];
  relatedEnterpriseSolutionIds: readonly string[];
  relatedServiceIds: readonly string[];
  evidenceStatus: "verified" | "qualified" | "pending";
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
}

export const trustPages: readonly TrustPage[] = [
  {
    id: "trust-centre",
    title: "Trust Centre | TheEduAssist",
    shortTitle: "Trust Centre",
    href: "/trust-centre/",
    canonical: "/trust-centre/",
    status: "live",
    category: "delivery",
    publicVisibility: true,
    navigationVisibility: true,
    shortDescription: "Understand How TheEduAssist Approaches Learning Delivery and Project Risk.",
    intendedAudience: ["Enterprise Buyers", "Procurement"],
    relatedEnterpriseSolutionIds: [],
    relatedServiceIds: [],
    evidenceStatus: "verified",
    primaryCta: { label: "Discuss Your Project Requirements", href: "/contact/" },
    secondaryCta: { label: "Explore Our Delivery Methodology", href: "/trust-centre/delivery-methodology/" }
  },
  {
    id: "delivery-methodology",
    title: "Learning Project Delivery Methodology | TheEduAssist",
    shortTitle: "Delivery Methodology",
    href: "/trust-centre/delivery-methodology/",
    canonical: "/trust-centre/delivery-methodology/",
    status: "live",
    category: "delivery",
    publicVisibility: true,
    navigationVisibility: true,
    shortDescription: "A Structured Method for Planning, Building and Reviewing Learning Projects.",
    intendedAudience: ["Learning Leaders", "Project Managers"],
    relatedEnterpriseSolutionIds: ["workforce-upskilling"],
    relatedServiceIds: ["learning-strategy"],
    evidenceStatus: "verified",
    primaryCta: { label: "Discuss Delivery Requirements", href: "/contact/" }
  },
  {
    id: "responsible-ai",
    title: "Responsible AI Approach for Learning Projects | TheEduAssist",
    shortTitle: "Responsible AI",
    href: "/trust-centre/responsible-ai/",
    canonical: "/trust-centre/responsible-ai/",
    status: "live",
    category: "ai-governance",
    publicVisibility: true,
    navigationVisibility: true,
    shortDescription: "Responsible Human Oversight for AI-Supported Learning Work.",
    intendedAudience: ["AI Governance", "Legal"],
    relatedEnterpriseSolutionIds: ["ai-workforce-readiness"],
    relatedServiceIds: [],
    evidenceStatus: "verified",
    primaryCta: { label: "Discuss AI Requirements", href: "/contact/" }
  },
  {
    id: "accessibility",
    title: "Accessibility Approach for Digital Learning | TheEduAssist",
    shortTitle: "Accessibility",
    href: "/trust-centre/accessibility/",
    canonical: "/trust-centre/accessibility/",
    status: "live",
    category: "quality-accessibility",
    publicVisibility: true,
    navigationVisibility: true,
    shortDescription: "Designing Learning Content with Accessibility in Mind.",
    intendedAudience: ["Accessibility Officers", "Content Reviewers"],
    relatedEnterpriseSolutionIds: [],
    relatedServiceIds: ["quality-assurance"],
    evidenceStatus: "verified",
    primaryCta: { label: "Discuss Accessibility Requirements", href: "/contact/" }
  },
  {
    id: "security-privacy",
    title: "Security and Privacy Approach | TheEduAssist",
    shortTitle: "Security & Privacy",
    href: "/trust-centre/security-privacy/",
    canonical: "/trust-centre/security-privacy/",
    status: "live",
    category: "security-privacy",
    publicVisibility: true,
    navigationVisibility: true,
    shortDescription: "Project-Specific Security, Access and Privacy Considerations.",
    intendedAudience: ["IT Security", "Privacy Reviewers"],
    relatedEnterpriseSolutionIds: [],
    relatedServiceIds: [],
    evidenceStatus: "verified",
    primaryCta: { label: "Discuss Security Requirements", href: "/contact/" }
  },
  {
    id: "procurement",
    title: "Enterprise Procurement and Project Readiness | TheEduAssist",
    shortTitle: "Procurement",
    href: "/trust-centre/procurement/",
    canonical: "/trust-centre/procurement/",
    status: "live",
    category: "procurement",
    publicVisibility: true,
    navigationVisibility: true,
    shortDescription: "Prepare the Information Needed to Review an Enterprise Learning Engagement.",
    intendedAudience: ["Procurement Teams", "Vendor Management"],
    relatedEnterpriseSolutionIds: [],
    relatedServiceIds: [],
    evidenceStatus: "verified",
    primaryCta: { label: "Discuss Procurement Requirements", href: "/contact/" }
  }
];
