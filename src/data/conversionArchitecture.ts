export type ConversionJourneyId =
  | "general-contact"
  | "general-review"
  | "kajabi-review"
  | "enterprise-project-brief"
  | "procurement-inquiry";

export type ConversionStatus =
  | "live"
  | "planned"
  | "internal"
  | "retired";

export type ConversionAudience =
  | "general"
  | "enterprise"
  | "kajabi"
  | "procurement";

export interface ConversionJourney {
  id: ConversionJourneyId;
  title: string;
  href: string;
  canonical: string;
  status: ConversionStatus;
  audience: ConversionAudience;
  publicVisibility: boolean;
  sitemapVisibility: boolean;
  analyticsCategory: string;
  recommendedGa4Event: string;
  destinationType:
    | "contact"
    | "review"
    | "project-brief"
    | "procurement";
  formId?: string;
  successRoute?: string;
  primaryCtaLabel: string;
  shortDescription: string;
}

export const conversionJourneys: ConversionJourney[] = [
  {
    id: "general-contact",
    title: "General Contact",
    href: "/contact/",
    canonical: "/contact/",
    status: "live",
    audience: "general",
    publicVisibility: true,
    sitemapVisibility: true,
    analyticsCategory: "contact",
    recommendedGa4Event: "generate_lead",
    destinationType: "contact",
    formId: "general_contact_form",
    primaryCtaLabel: "Contact Our Team",
    shortDescription: "General inquiries and contact."
  },
  {
    id: "general-review",
    title: "General Review",
    href: "/book-free-audit/",
    canonical: "/book-free-audit/",
    status: "live",
    audience: "general",
    publicVisibility: true,
    sitemapVisibility: true,
    analyticsCategory: "review",
    recommendedGa4Event: "generate_lead",
    destinationType: "review",
    formId: "general_review_form",
    primaryCtaLabel: "Get 24–48 Hour Review",
    shortDescription: "Submit course ideas and get a 24-48 hour review."
  },
  {
    id: "kajabi-review",
    title: "Kajabi Review",
    href: "/book-free-kajabi-audit/",
    canonical: "/book-free-kajabi-audit/",
    status: "live",
    audience: "kajabi",
    publicVisibility: true,
    sitemapVisibility: true,
    analyticsCategory: "kajabi_review",
    recommendedGa4Event: "generate_lead",
    destinationType: "review",
    formId: "kajabi_review_form",
    primaryCtaLabel: "Get a Kajabi Review",
    shortDescription: "Kajabi specific project review."
  },
  {
    id: "enterprise-project-brief",
    title: "Enterprise Project Brief",
    href: "/enterprise-solutions/project-brief/",
    canonical: "/enterprise-solutions/project-brief/",
    status: "live",
    audience: "enterprise",
    publicVisibility: true,
    sitemapVisibility: true,
    analyticsCategory: "enterprise_brief",
    recommendedGa4Event: "generate_lead",
    destinationType: "project-brief",
    formId: "enterprise_project_brief_form",
    successRoute: "/enterprise-solutions/project-brief/thank-you/",
    primaryCtaLabel: "Submit an Enterprise Project Brief",
    shortDescription: "Share information needed to review an enterprise learning initiative."
  },
  {
    id: "procurement-inquiry",
    title: "Procurement Inquiry",
    href: "/enterprise-solutions/project-brief/",
    canonical: "/enterprise-solutions/project-brief/",
    status: "live",
    audience: "procurement",
    publicVisibility: true,
    sitemapVisibility: false,
    analyticsCategory: "procurement",
    recommendedGa4Event: "generate_lead",
    destinationType: "project-brief",
    formId: "procurement_inquiry_form",
    primaryCtaLabel: "Discuss Procurement Requirements",
    shortDescription: "Submit details for procurement requirements."
  }
];
