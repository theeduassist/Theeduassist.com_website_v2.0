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
    description: "Explore expert insights on e-learning curriculum planning, learner persona analysis, measurable KPI frameworks, and strategic organizational training governance.",
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
    description: "Discover practical instructional design guides, Bloom's taxonomy frameworks, interactive storyboarding, and adult learning theories to drive engagement.",
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
    description: "Read actionable tutorials on e-learning course development, SCORM packaging, multimedia production, Rise 360 buildouts, and legacy training conversion.",
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
    description: "Explore expert guidance on LMS platform selection, xAPI integrations, SCORM standards, learner tracking analytics, and automated LMS administration.",
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
    description: "Master Kajabi course creation, membership community design, automated marketing pipelines, checkout optimization, and profitable digital product setup.",
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
    description: "Explore enterprise training strategies covering scalable customer education, global partner enablement, internal learning academies, and team upskilling.",
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
    description: "Learn how to responsibly leverage AI in corporate training, from generative curriculum drafting and AI avatars to skills gap analysis and agentic workflows.",
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
    description: "Comprehensive guides on digital e-learning accessibility standards, WCAG 2.2 Level AA compliance, Section 508 adherence, closed captioning, and QA testing.",
    publicVisibility: false,
    sitemapVisibility: false,
    relatedServiceIds: ["quality-assurance"],
    relatedEnterpriseSolutionIds: []
  },
  {
    id: "localization-global-learning",
    title: "Localization & Global Learning",
    slug: "localization-global-learning",
    href: "/blog/category/localization-global-learning/",
    description: "Best practices for translating and localizing e-learning courses into 30+ languages, managing RTL Arabic layouts, and adapting cultural training nuances.",
    publicVisibility: false,
    sitemapVisibility: false,
    relatedServiceIds: ["course-localization-translation"],
    relatedEnterpriseSolutionIds: []
  },
  {
    id: "managed-learning",
    title: "Managed Learning",
    slug: "managed-learning",
    href: "/blog/category/managed-learning/",
    description: "Discover how managed learning services, ongoing course maintenance, and dedicated e-learning operations support help organizations scale training smoothly.",
    publicVisibility: false,
    sitemapVisibility: false,
    relatedServiceIds: ["managed-learning", "ongoing-support-maintenance"],
    relatedEnterpriseSolutionIds: []
  }
];
