export type BlogContentType =
  | "article"
  | "guide"
  | "comparison"
  | "checklist"
  | "tutorial"
  | "definition"
  | "research-note"
  | "press-release";

export type BlogContentStatus =
  | "published"
  | "draft"
  | "scheduled"
  | "archived"
  | "internal";

export type BlogCategoryId =
  | "learning-strategy"
  | "instructional-design"
  | "course-development"
  | "lms-learning-technology"
  | "kajabi"
  | "enterprise-learning"
  | "ai-learning"
  | "accessibility-quality"
  | "localization-global-learning"
  | "managed-learning";

export interface BlogCategory {
  id: BlogCategoryId;
  title: string;
  slug: string;
  href: string;
  description: string;
  publicVisibility: boolean;
  sitemapVisibility: boolean;
  relatedServiceIds: readonly string[];
  relatedEnterpriseSolutionIds: readonly string[];
}

export const blogCategories: BlogCategory[] = [
  {
    id: "learning-strategy",
    title: "Learning Strategy",
    slug: "learning-strategy",
    href: "/blog/category/learning-strategy/",
    description: "Insights on curriculum planning, audience analysis, and strategic program governance.",
    publicVisibility: true,
    sitemapVisibility: true,
    relatedServiceIds: ["learning-strategy"],
    relatedEnterpriseSolutionIds: ["workforce-upskilling"]
  },
  {
    id: "instructional-design",
    title: "Instructional Design",
    slug: "instructional-design",
    href: "/blog/category/instructional-design/",
    description: "Guidance on learning objectives, instructional models, and learner engagement.",
    publicVisibility: true,
    sitemapVisibility: true,
    relatedServiceIds: ["instructional-design"],
    relatedEnterpriseSolutionIds: ["employee-onboarding"]
  },
  {
    id: "course-development",
    title: "Course Development",
    slug: "course-development",
    href: "/blog/category/course-development/",
    description: "Practical tips for curriculum development, multimedia production, and content conversion.",
    publicVisibility: true,
    sitemapVisibility: true,
    relatedServiceIds: ["course-development", "content-conversion"],
    relatedEnterpriseSolutionIds: []
  },
  {
    id: "lms-learning-technology",
    title: "LMS & Learning Technology",
    slug: "lms-learning-technology",
    href: "/blog/category/lms-learning-technology/",
    description: "LMS selection, integration, SCORM, and platform management.",
    publicVisibility: true,
    sitemapVisibility: true,
    relatedServiceIds: ["lms-implementation-migration"],
    relatedEnterpriseSolutionIds: []
  },
  {
    id: "kajabi",
    title: "Kajabi",
    slug: "kajabi",
    href: "/blog/category/kajabi/",
    description: "Product architecture, email automations, and Kajabi learner experience.",
    publicVisibility: true,
    sitemapVisibility: true,
    relatedServiceIds: [],
    relatedEnterpriseSolutionIds: []
  },
  {
    id: "enterprise-learning",
    title: "Enterprise Learning",
    slug: "enterprise-learning",
    href: "/blog/category/enterprise-learning/",
    description: "Customer education, partner enablement, and internal training academies.",
    publicVisibility: true,
    sitemapVisibility: true,
    relatedServiceIds: [],
    relatedEnterpriseSolutionIds: ["customer-education", "partner-training", "internal-learning-academies"]
  },
  {
    id: "ai-learning",
    title: "AI in Learning",
    slug: "ai-learning",
    href: "/blog/category/ai-learning/",
    description: "Responsible AI, AI-assisted development, and workforce readiness.",
    publicVisibility: true,
    sitemapVisibility: true,
    relatedServiceIds: ["ai-powered-elearning"],
    relatedEnterpriseSolutionIds: ["ai-workforce-readiness"]
  },
  {
    id: "accessibility-quality",
    title: "Accessibility & Quality",
    slug: "accessibility-quality",
    href: "/blog/category/accessibility-quality/",
    description: "Accessibility standards, QA, captions, and inclusive learning.",
    publicVisibility: true,
    sitemapVisibility: true,
    relatedServiceIds: ["quality-assurance"],
    relatedEnterpriseSolutionIds: []
  },
  {
    id: "localization-global-learning",
    title: "Localization & Global Learning",
    slug: "localization-global-learning",
    href: "/blog/category/localization-global-learning/",
    description: "Translation, localization, RTL content, and global delivery.",
    publicVisibility: true,
    sitemapVisibility: true,
    relatedServiceIds: ["course-localization-translation"],
    relatedEnterpriseSolutionIds: []
  },
  {
    id: "managed-learning",
    title: "Managed Learning",
    slug: "managed-learning",
    href: "/blog/category/managed-learning/",
    description: "Content maintenance, LMS operations, and managed support.",
    publicVisibility: true,
    sitemapVisibility: true,
    relatedServiceIds: ["managed-learning", "ongoing-support-maintenance"],
    relatedEnterpriseSolutionIds: []
  }
];
