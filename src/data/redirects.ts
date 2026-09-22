export type RedirectStatus = "ready" | "pending" | "doNotRedirect" | "needsReview";

export type RedirectRule = {
  from: string;
  to: string;
  status: RedirectStatus;
  statusCode: 301 | 302;
  reason: string;
  sourceGroup:
    | "oldPage"
    | "oldService"
    | "oldKajabi"
    | "oldBlog"
    | "oldCategory"
    | "oldTag"
    | "oldPlugin"
    | "oldTemplate"
    | "oldJob"
    | "oldArchive"
    | "other";
  targetExists: boolean;
  notes?: string;
};

export const redirects: RedirectRule[] = [

  {
    from: "/case-studies-1/",
    to: "/case-studies/",
    status: "ready",
    statusCode: 301,
    reason: "Old WordPress case studies page moved to Astro case studies page.",
    sourceGroup: "oldPage",
    targetExists: true
  },
  {
    from: "/blog/internal-academy-software-15-must-have-features-in-2026/",
    to: "/blog/internal-academy-software-features-2026/",
    status: "ready",
    statusCode: 301,
    reason: "Genuine replacement for old blog URL",
    sourceGroup: "oldBlog",
    targetExists: true
  },
  {
    from: "/mobile-learning-solutions/",
    to: "/services/course-development/",
    status: "ready",
    statusCode: 301,
    reason: "Legacy mobile learning URL redirected to course development service",
    sourceGroup: "oldService",
    targetExists: true
  },
  {
    from: "/elearninglocalization-services/",
    to: "/services/course-localization-translation/",
    status: "ready",
    statusCode: 301,
    reason: "Legacy localization URL redirected to localization service",
    sourceGroup: "oldService",
    targetExists: true
  },
  {
    from: "/rapid-elearning-development-services/",
    to: "/services/course-development/",
    status: "ready",
    statusCode: 301,
    reason: "Legacy rapid elearning URL redirected to course development service",
    sourceGroup: "oldService",
    targetExists: true
  },
  {
    from: "/off-the-shelf-elearning/",
    to: "/services/",
    status: "ready",
    statusCode: 301,
    reason: "Legacy off-the-shelf URL redirected to services hub",
    sourceGroup: "oldService",
    targetExists: true
  },
  {
    from: "/technical-proficiency-definition/",
    to: "/blog/what-is-technical-proficiency/",
    status: "ready",
    statusCode: 301,
    reason: "Legacy technical proficiency definition redirected to pillar article",
    sourceGroup: "oldBlog",
    targetExists: true
  },
  {
    from: "/what-is-technical-proficiency-and-why-is-it-important/",
    to: "/blog/what-is-technical-proficiency/",
    status: "ready",
    statusCode: 301,
    reason: "Legacy technical proficiency article redirected to pillar article",
    sourceGroup: "oldBlog",
    targetExists: true
  },
  {
    from: "/2025/07/technical-proficiency-definition/",
    to: "/blog/what-is-technical-proficiency/",
    status: "ready",
    statusCode: 301,
    reason: "Legacy dated technical proficiency URL redirected to pillar article",
    sourceGroup: "oldBlog",
    targetExists: true
  },
  {
    from: "/blog/teachability/",
    to: "/blog/what-is-teachability/",
    status: "ready",
    statusCode: 301,
    reason: "Legacy teachability URL redirected to pillar article",
    sourceGroup: "oldBlog",
    targetExists: true
  },
  {
    from: "/2025/07/list-your-primary-and-secondary-technical-domain-skills/",
    to: "/blog/primary-and-secondary-technical-domain-skills/",
    status: "ready",
    statusCode: 301,
    reason: "Legacy domain skills URL redirected to pillar article",
    sourceGroup: "oldBlog",
    targetExists: true
  },
  {
    from: "/technical-skills-for-your-resume/",
    to: "/blog/primary-and-secondary-technical-domain-skills/",
    status: "ready",
    statusCode: 301,
    reason: "Legacy technical skills resume URL redirected to pillar article",
    sourceGroup: "oldBlog",
    targetExists: true
  },
  {
    from: "/mobile-apps-for-math-problem-solving-practice-in-2025/",
    to: "/blog/how-to-create-engaging-educational-content-for-online-platforms/",
    status: "ready",
    statusCode: 301,
    reason: "Legacy math apps URL redirected to educational content guide",
    sourceGroup: "oldBlog",
    targetExists: true
  },
  {
    from: "/2025/07/mobile-apps-for-math-problem-solving-practice/",
    to: "/blog/how-to-create-engaging-educational-content-for-online-platforms/",
    status: "ready",
    statusCode: 301,
    reason: "Legacy dated math apps URL redirected to educational content guide",
    sourceGroup: "oldBlog",
    targetExists: true
  },
  {
    from: "/kajabi-virtual-assistant-services/",
    to: "/kajabi-services/",
    status: "ready",
    statusCode: 301,
    reason: "Kajabi subpage mapped",
    sourceGroup: "oldKajabi",
    targetExists: true
  },
  {
    from: "/ebook-services/",
    to: "/services/content-conversion/",
    status: "ready",
    statusCode: 301,
    reason: "Mapped to content conversion",
    sourceGroup: "oldService",
    targetExists: true
  },

  {
    from: "/contact/",
    to: "/contact-us/",
    status: "ready",
    statusCode: 301,
    reason: "Legacy contact URL redirect to official contact page.",
    sourceGroup: "oldPage",
    targetExists: true
  },
  {
    from: "/about/",
    to: "/about-us/",
    status: "ready",
    statusCode: 301,
    reason: "Old WordPress about page moved to Astro about page.",
    sourceGroup: "oldPage",
    targetExists: true
  },

  {
    from: "/case-studies-2/",
    to: "/case-studies/",
    status: "ready",
    statusCode: 301,
    reason: "Old WordPress case studies page moved to Astro case studies page.",
    sourceGroup: "oldPage",
    targetExists: true
  },
  {
    from: "/case-studies-3/",
    to: "/case-studies/",
    status: "ready",
    statusCode: 301,
    reason: "Old WordPress case studies page moved to Astro case studies page.",
    sourceGroup: "oldPage",
    targetExists: true
  },
  {
    from: "/custom-elearning-content-development/",
    to: "/services/custom-elearning-development/",
    status: "ready",
    statusCode: 301,
    reason: "Service page migrated",
    sourceGroup: "oldService",
    targetExists: true
  },
  {
    from: "/lms-integration-migration-services/",
    to: "/services/lms-implementation-migration/",
    status: "ready",
    statusCode: 301,
    reason: "Service page migrated",
    sourceGroup: "oldService",
    targetExists: true
  },
  {
    from: "/ai-powered-elearning/",
    to: "/services/ai-powered-elearning/",
    status: "ready",
    statusCode: 301,
    reason: "Service page migrated",
    sourceGroup: "oldService",
    targetExists: true
  },
  {
    from: "/terms-conditions/",
    to: "/terms-and-conditions/",
    status: "ready",
    statusCode: 301,
    reason: "Terms page migrated",
    sourceGroup: "oldPage",
    targetExists: true
  },
  {
    from: "/privacy-policy-2/",
    to: "/privacy-policy/",
    status: "ready",
    statusCode: 301,
    reason: "Privacy page migrated",
    sourceGroup: "oldPage",
    targetExists: true
  },
  {
    from: "/career/",
    to: "/careers/",
    status: "ready",
    statusCode: 301,
    reason: "Careers page migrated",
    sourceGroup: "oldPage",
    targetExists: true
  },
  {
    from: "/kajabi-funnel-setup-services/",
    to: "/kajabi-services/",
    status: "pending",
    statusCode: 301,
    reason: "Kajabi subpage mapped",
    sourceGroup: "oldKajabi",
    targetExists: true
  },
  {
    from: "/kajabi-course-setup-services/",
    to: "/kajabi-services/",
    status: "pending",
    statusCode: 301,
    reason: "Kajabi subpage mapped",
    sourceGroup: "oldKajabi",
    targetExists: true
  },
  {
    from: "/kajabi-course-upload-services/",
    to: "/kajabi-services/",
    status: "pending",
    statusCode: 301,
    reason: "Kajabi subpage mapped",
    sourceGroup: "oldKajabi",
    targetExists: true
  },
  {
    from: "/kajabi-migration-services/",
    to: "/kajabi-services/",
    status: "pending",
    statusCode: 301,
    reason: "Kajabi subpage mapped",
    sourceGroup: "oldKajabi",
    targetExists: true
  },


  // WordPress JUNK
  { from: "/?wpr_templates=user-single-online-course-v1-post", to: "", status: "doNotRedirect", statusCode: 301, reason: "WP Template", sourceGroup: "oldTemplate", targetExists: false },
  { from: "/?wpr_templates=user-footer-online-course-v1-footer", to: "", status: "doNotRedirect", statusCode: 301, reason: "WP Template", sourceGroup: "oldTemplate", targetExists: false },
  { from: "/?wpr_templates=user-header-online-course-v1-header", to: "", status: "doNotRedirect", statusCode: 301, reason: "WP Template", sourceGroup: "oldTemplate", targetExists: false },
  { from: "/?wpr_templates=user-archive-online-course-v1-blog", to: "", status: "doNotRedirect", statusCode: 301, reason: "WP Template", sourceGroup: "oldTemplate", targetExists: false },
  { from: "/?wpr_templates=user-single-online-course-v1-page", to: "", status: "doNotRedirect", statusCode: 301, reason: "WP Template", sourceGroup: "oldTemplate", targetExists: false },
  { from: "/?wpr_templates=user-single-online-course-v1-404", to: "", status: "doNotRedirect", statusCode: 301, reason: "WP Template", sourceGroup: "oldTemplate", targetExists: false },
  { from: "/?wpr_templates=user-archive-online-course-v1-category-tag", to: "", status: "doNotRedirect", statusCode: 301, reason: "WP Template", sourceGroup: "oldTemplate", targetExists: false },
  { from: "/?wpr_templates=user-archive-online-course-v1-search", to: "", status: "doNotRedirect", statusCode: 301, reason: "WP Template", sourceGroup: "oldTemplate", targetExists: false },
  { from: "/?mailpoet_page=subscriptions", to: "", status: "doNotRedirect", statusCode: 301, reason: "WP Plugin", sourceGroup: "oldPlugin", targetExists: false },
  { from: "/?mailpoet_page=captcha", to: "", status: "doNotRedirect", statusCode: 301, reason: "WP Plugin", sourceGroup: "oldPlugin", targetExists: false },
  { from: "/job-category/marketing/", to: "", status: "doNotRedirect", statusCode: 301, reason: "WP Job Taxonomy", sourceGroup: "oldJob", targetExists: false },
  { from: "/job-category/sales/", to: "", status: "doNotRedirect", statusCode: 301, reason: "WP Job Taxonomy", sourceGroup: "oldJob", targetExists: false },
  { from: "/job-type/part-time/", to: "", status: "doNotRedirect", statusCode: 301, reason: "WP Job Taxonomy", sourceGroup: "oldJob", targetExists: false },
  { from: "/job-type/internship/", to: "", status: "doNotRedirect", statusCode: 301, reason: "WP Job Taxonomy", sourceGroup: "oldJob", targetExists: false },
  { from: "/job-location-sitemap.xml", to: "", status: "doNotRedirect", statusCode: 301, reason: "WP Archive Sitemap", sourceGroup: "oldArchive", targetExists: false },
  { from: "/post-archive-sitemap.xml", to: "", status: "doNotRedirect", statusCode: 301, reason: "WP Archive Sitemap", sourceGroup: "oldArchive", targetExists: false }
];
