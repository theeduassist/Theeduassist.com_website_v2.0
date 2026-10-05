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
    shortDescription: "Learn how TheEduAssist manages project delivery, quality standards, and risk mitigation across corporate e-learning and LMS implementations.",
    intendedAudience: ["Enterprise Buyers", "Procurement"],
    relatedEnterpriseSolutionIds: [],
    relatedServiceIds: [],
    evidenceStatus: "verified",
    primaryCta: { label: "Discuss Your Project Requirements", href: "/contact-us/" },
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
    shortDescription: "Explore our proven 5-stage e-learning delivery methodology for scoping, designing, building, and reviewing high-impact corporate training systems.",
    intendedAudience: ["Learning Leaders", "Project Managers"],
    relatedEnterpriseSolutionIds: ["workforce-upskilling"],
    relatedServiceIds: ["learning-strategy"],
    evidenceStatus: "verified",
    primaryCta: { label: "Discuss Delivery Requirements", href: "/contact-us/" }
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
    shortDescription: "Discover our responsible AI framework for corporate training, combining AI efficiency with strict human expert oversight, accuracy, and data ethics.",
    intendedAudience: ["AI Governance", "Legal"],
    relatedEnterpriseSolutionIds: ["ai-workforce-readiness"],
    relatedServiceIds: [],
    evidenceStatus: "verified",
    primaryCta: { label: "Discuss AI Requirements", href: "/contact-us/" }
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
    shortDescription: "Learn how TheEduAssist integrates accessibility principles, WCAG 2.2 guidance, and Section 508 best practices into digital learning design and builds.",
    intendedAudience: ["Accessibility Officers", "Content Reviewers"],
    relatedEnterpriseSolutionIds: [],
    relatedServiceIds: ["quality-assurance"],
    evidenceStatus: "verified",
    primaryCta: { label: "Discuss Accessibility Requirements", href: "/contact-us/" }
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
    shortDescription: "Understand TheEduAssist's data privacy protocols, role-based access controls, and secure data handling standards for corporate client engagements.",
    intendedAudience: ["IT Security", "Privacy Reviewers"],
    relatedEnterpriseSolutionIds: [],
    relatedServiceIds: [],
    evidenceStatus: "verified",
    primaryCta: { label: "Discuss Security Requirements", href: "/contact-us/" }
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
    shortDescription: "Review enterprise procurement criteria, vendor compliance documentation, billing models, and RFP readiness guidelines for partnering with TheEduAssist.",
    intendedAudience: ["Procurement Teams", "Vendor Management"],
    relatedEnterpriseSolutionIds: [],
    relatedServiceIds: [],
    evidenceStatus: "verified",
    primaryCta: { label: "Discuss Procurement Requirements", href: "/contact-us/" }
  }
];
