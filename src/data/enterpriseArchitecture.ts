export type EnterpriseSolutionStatus =
  | "live"
  | "planned-part-2"
  | "planned-part-3"
  | "internal"
  | "retired";

export type EnterpriseSolutionCategory =
  | "workforce-learning"
  | "customer-partner-education"
  | "internal-academies"
  | "learning-platforms"
  | "ai-readiness"
  | "global-learning"
  | "managed-learning";

export type EnterpriseSolution = {
  id: string;
  title: string;
  shortTitle: string;
  slug: string;
  canonical: string;
  status: EnterpriseSolutionStatus;
  publicVisibility: boolean;
  hubVisibility: boolean;
  navigationVisibility: boolean;
  category: EnterpriseSolutionCategory;
  shortDescription: string;
  businessProblem: string;
  primaryBuyers: string[];
  supportingStakeholders: string[];
  typicalDeliverables: string[];
  relatedServices: string[]; // references service IDs
  relatedCaseStudies: string[]; // references case study slugs
  relatedBlogCategories: string[];
  trustRequirements: string[];
  CTA: string;
  claimReviewStatus: "verified" | "pending" | "not-applicable";
  plannedPhasePart?: string;
};

export const enterpriseSolutions: EnterpriseSolution[] = [
  // A. WORKFORCE LEARNING
  {
    id: "employee-onboarding",
    title: "Employee Onboarding and Role Readiness",
    shortTitle: "Employee Onboarding",
    slug: "/enterprise-solutions/employee-onboarding/",
    canonical: "/enterprise-solutions/employee-onboarding/",
    status: "live",
    publicVisibility: true,
    hubVisibility: true,
    navigationVisibility: false,
    category: "workforce-learning",
    shortDescription: "Create structured pathways that help employees understand roles, processes, systems, products and expectations.",
    businessProblem: "Employee onboarding is inconsistent and takes too long.",
    primaryBuyers: ["HR or People Development Leader", "L&D Manager"],
    supportingStakeholders: ["Operations Leader", "Subject-matter experts"],
    typicalDeliverables: ["Onboarding curriculum", "Role-based pathways", "Digital courses"],
    relatedServices: ["learning-strategy", "course-development"],
    relatedCaseStudies: [],
    relatedBlogCategories: ["Workforce Learning"],
    trustRequirements: ["Role-based access", "Content approvals"],
    CTA: "/contact/",
    claimReviewStatus: "verified",
    plannedPhasePart: "Part 2"
  },
  {
    id: "workforce-upskilling",
    title: "Workforce Upskilling and Capability Development",
    shortTitle: "Workforce Upskilling",
    slug: "/enterprise-solutions/workforce-upskilling/",
    canonical: "/enterprise-solutions/workforce-upskilling/",
    status: "live",
    publicVisibility: true,
    hubVisibility: true,
    navigationVisibility: false,
    category: "workforce-learning",
    shortDescription: "Build curriculum, academies and role-based learning pathways for ongoing capability development.",
    businessProblem: "The workforce lacks updated skills or capabilities.",
    primaryBuyers: ["Chief Learning Officer", "Head of Learning and Development"],
    supportingStakeholders: ["Executive sponsors"],
    typicalDeliverables: ["Capability framework", "Custom eLearning", "Assessments"],
    relatedServices: ["learning-strategy", "custom-elearning"],
    relatedCaseStudies: ["business-analytics-corporate-training"],
    relatedBlogCategories: ["Workforce Learning"],
    trustRequirements: ["Data privacy", "Accessibility"],
    CTA: "/contact/",
    claimReviewStatus: "verified",
    plannedPhasePart: "Part 2"
  },

  // B. CUSTOMER AND PARTNER EDUCATION
  {
    id: "partner-training",
    title: "Partner and Channel Training",
    shortTitle: "Partner Training",
    slug: "/enterprise-solutions/partner-training/",
    canonical: "/enterprise-solutions/partner-training/",
    status: "live",
    publicVisibility: true,
    hubVisibility: true,
    navigationVisibility: false,
    category: "customer-partner-education",
    shortDescription: "Create consistent learning for partners, channels and external networks.",
    businessProblem: "Partners receive inconsistent information and training is hard to scale.",
    primaryBuyers: ["Partner Enablement Leader", "Channel Manager"],
    supportingStakeholders: ["Sales Enablement", "Operations"],
    typicalDeliverables: ["Partner academy", "Certification paths", "Sales enablement modules"],
    relatedServices: ["learning-strategy", "course-development", "lms-implementation"],
    relatedCaseStudies: [],
    relatedBlogCategories: ["Partner Training"],
    trustRequirements: ["Partner portal access", "Brand alignment"],
    CTA: "/contact/",
    claimReviewStatus: "verified",
    plannedPhasePart: "Part 2"
  },
  {
    id: "customer-education",
    title: "Customer Education Programs",
    shortTitle: "Customer Education",
    slug: "/enterprise-solutions/customer-education/",
    canonical: "/enterprise-solutions/customer-education/",
    status: "live",
    publicVisibility: true,
    hubVisibility: true,
    navigationVisibility: false,
    category: "customer-partner-education",
    shortDescription: "Turn product, service and operational knowledge into organized learning for customers, partners or external networks.",
    businessProblem: "Customer adoption is slow due to lack of training.",
    primaryBuyers: ["Customer Education Leader", "Customer Success Leader"],
    supportingStakeholders: ["Product Education Leader", "Marketing"],
    typicalDeliverables: ["Customer academies", "Product tutorials", "Certification paths"],
    relatedServices: ["instructional-design", "course-development"],
    relatedCaseStudies: [],
    relatedBlogCategories: ["Customer Education"],
    trustRequirements: ["Public/external access controls", "Brand alignment"],
    CTA: "/contact/",
    claimReviewStatus: "verified",
    plannedPhasePart: "Part 2"
  },

  // C. INTERNAL ACADEMIES AND KNOWLEDGE SYSTEMS
  {
    id: "internal-learning-academies",
    title: "Internal Learning Academies",
    shortTitle: "Internal Academies",
    slug: "/enterprise-solutions/internal-learning-academies/",
    canonical: "/enterprise-solutions/internal-learning-academies/",
    status: "live",
    publicVisibility: true,
    hubVisibility: true,
    navigationVisibility: false,
    category: "internal-academies",
    shortDescription: "Organize subject-matter expertise, learning content and platform delivery into maintainable internal academies.",
    businessProblem: "Learning content is spread across documents, slides and systems.",
    primaryBuyers: ["L&D Manager", "Head of Learning and Development"],
    supportingStakeholders: ["Subject-matter experts", "IT"],
    typicalDeliverables: ["Academy architecture", "Content modernization", "LMS organization"],
    relatedServices: ["learning-strategy", "content-conversion", "lms-implementation"],
    relatedCaseStudies: ["sqa-aligned-vocational-training"],
    relatedBlogCategories: ["Learning Strategy"],
    trustRequirements: ["Content governance", "Access control"],
    CTA: "/contact/",
    claimReviewStatus: "verified",
    plannedPhasePart: "Part 2"
  },

  // D. LEARNING PLATFORMS AND MODERNIZATION
  {
    id: "lms-implementation-migration",
    title: "LMS Implementation and Migration",
    shortTitle: "LMS Modernization",
    slug: "/services/lms-implementation-migration/", // Verified live service route
    canonical: "/services/lms-implementation-migration/",
    status: "live",
    publicVisibility: true,
    hubVisibility: true,
    navigationVisibility: true, // Managed by serviceArchitecture, but tracked here
    category: "learning-platforms",
    shortDescription: "Improve platforms, migrate learning, reorganize courses and modernize existing learning content.",
    businessProblem: "The LMS contains duplicated or outdated content, or we need to move platforms.",
    primaryBuyers: ["LMS Administrator", "Learning Technology Leader"],
    supportingStakeholders: ["IT", "Procurement"],
    typicalDeliverables: ["LMS configuration", "Migration plan", "Content audit"],
    relatedServices: ["lms-implementation", "content-conversion"],
    relatedCaseStudies: [],
    relatedBlogCategories: ["Learning Technology"],
    trustRequirements: ["Data security", "Integration security"],
    CTA: "/services/lms-implementation-migration/",
    claimReviewStatus: "verified"
  },

  // E. AI READINESS
  {
    id: "ai-workforce-readiness",
    title: "AI Workforce Readiness",
    shortTitle: "AI Readiness",
    slug: "/enterprise-solutions/ai-workforce-readiness/",
    canonical: "/enterprise-solutions/ai-workforce-readiness/",
    status: "live",
    publicVisibility: true,
    hubVisibility: true,
    navigationVisibility: false,
    category: "ai-readiness",
    shortDescription: "Develop practical and responsible learning that helps teams understand approved AI use, role-specific applications, risks and review responsibilities.",
    businessProblem: "AI adoption is happening without structured learning or governance.",
    primaryBuyers: ["Head of Learning and Development", "Operations Leader"],
    supportingStakeholders: ["Legal or privacy teams", "IT", "Information Security"],
    typicalDeliverables: ["AI literacy courses", "Role-based AI training", "Governance frameworks"],
    relatedServices: ["ai-powered", "learning-strategy"],
    relatedCaseStudies: [],
    relatedBlogCategories: ["AI in Learning"],
    trustRequirements: ["Responsible AI", "Data privacy"],
    CTA: "/contact/",
    claimReviewStatus: "verified",
    plannedPhasePart: "Part 2"
  },

  // F. GLOBAL AND MANAGED LEARNING
  {
    id: "global-learning-rollout",
    title: "Global Learning Rollout",
    shortTitle: "Global Learning",
    slug: "/services/course-localization-translation/", // Use verified localization route for now
    canonical: "/services/course-localization-translation/",
    status: "live", // Map to localization
    publicVisibility: true,
    hubVisibility: true,
    navigationVisibility: false,
    category: "global-learning",
    shortDescription: "Prepare content for new languages or regions and support continuing learning operations after launch.",
    businessProblem: "Learning cannot be rolled out consistently across regions.",
    primaryBuyers: ["Chief Learning Officer", "Digital Learning Manager"],
    supportingStakeholders: ["Regional reviewers"],
    typicalDeliverables: ["Localized courses", "Global delivery strategy"],
    relatedServices: ["course-localization", "managed-learning"],
    relatedCaseStudies: ["language-courses-book-publisher"],
    relatedBlogCategories: ["Global Learning"],
    trustRequirements: ["Cultural review", "Data residency"],
    CTA: "/services/course-localization-translation/",
    claimReviewStatus: "verified"
  },
  {
    id: "managed-learning-operations",
    title: "Managed Learning Services",
    shortTitle: "Managed Services",
    slug: "/services/managed-learning/", // Verified live service route
    canonical: "/services/managed-learning/",
    status: "live",
    publicVisibility: true,
    hubVisibility: true,
    navigationVisibility: false, // Managed elsewhere
    category: "managed-learning",
    shortDescription: "Recurring content, platform, QA and learning-operations support.",
    businessProblem: "The internal learning team has more demand than delivery capacity.",
    primaryBuyers: ["L&D Manager", "Head of Learning and Development"],
    supportingStakeholders: ["Procurement", "Finance"],
    typicalDeliverables: ["Ongoing maintenance", "Content updates", "SLA-based support"],
    relatedServices: ["managed-learning", "ongoing-support", "quality-assurance"],
    relatedCaseStudies: [],
    relatedBlogCategories: ["Managed Services"],
    trustRequirements: ["SLA monitoring", "Access control"],
    CTA: "/services/managed-learning/",
    claimReviewStatus: "verified"
  }
];

export const getLiveEnterpriseSolutions = () => enterpriseSolutions.filter(s => s.status === 'live' && s.publicVisibility);
export const getHubEnterpriseSolutions = () => enterpriseSolutions.filter(s => s.hubVisibility);
