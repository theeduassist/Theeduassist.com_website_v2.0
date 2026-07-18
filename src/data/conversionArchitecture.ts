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
  formId?: string;
  endpoint?: string;
  successRoute?: string;
  analyticsCategory: string;
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
    formId: "contact-form",
    analyticsCategory: "contact",
    primaryCtaLabel: "Contact Our Team",
    shortDescription: "General inquiries and support."
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
    analyticsCategory: "audit",
    primaryCtaLabel: "Get a 24-48 Hour Review",
    shortDescription: "Free eLearning audit."
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
    analyticsCategory: "kajabi_audit",
    primaryCtaLabel: "Get a Kajabi Review",
    shortDescription: "Free Kajabi platform audit."
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
    formId: "enterprise-brief-form",
    endpoint: "/api/forms/enterprise-brief",
    successRoute: "/enterprise-solutions/project-brief/thank-you/",
    analyticsCategory: "enterprise_brief",
    primaryCtaLabel: "Submit an Enterprise Project Brief",
    shortDescription: "Submit details for enterprise eLearning projects."
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
    primaryCtaLabel: "Submit Initial Project Requirements",
    shortDescription: "Procurement readiness and project discussion."
  }
];
