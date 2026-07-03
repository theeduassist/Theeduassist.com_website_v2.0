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
    from: "/contact-us/",
    to: "/contact/",
    status: "ready",
    statusCode: 301,
    reason: "Old WordPress contact page moved to Astro contact page.",
    sourceGroup: "oldPage",
    targetExists: true
  },
  {
    from: "/about-us/",
    to: "/about/",
    status: "ready",
    statusCode: 301,
    reason: "Old WordPress about page moved to Astro about page.",
    sourceGroup: "oldPage",
    targetExists: true
  },
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
  {
    from: "/kajabi-virtual-assistant-services/",
    to: "/kajabi-services/",
    status: "pending",
    statusCode: 301,
    reason: "Kajabi subpage mapped",
    sourceGroup: "oldKajabi",
    targetExists: true
  },
  {
    from: "/book-a-call/",
    to: "/book-free-audit/",
    status: "ready",
    statusCode: 301,
    reason: "Legacy redirect",
    sourceGroup: "oldPage",
    targetExists: true
  },
  {
    from: "/free-audit/",
    to: "/book-free-audit/",
    status: "ready",
    statusCode: 301,
    reason: "Legacy redirect",
    sourceGroup: "oldPage",
    targetExists: true
  },
  {
    from: "/scenario-based-learning/",
    to: "/services/custom-elearning-development/",
    status: "ready",
    statusCode: 301,
    reason: "Legacy redirect",
    sourceGroup: "oldPage",
    targetExists: true
  },
  {
    from: "/uncategorized/skills-based-learning-or-traditional-training/",
    to: "/blog/skills-based-learning-or-traditional-training/",
    status: "ready",
    statusCode: 301,
    reason: "Legacy redirect",
    sourceGroup: "oldBlog",
    targetExists: true
  },
  {
    from: "/uncategorized/ada-and-wcag-compliance-for-elearning-a-simple-self-audit-checklist/",
    to: "/services/custom-elearning-development/",
    status: "ready",
    statusCode: 301,
    reason: "Legacy redirect",
    sourceGroup: "oldBlog",
    targetExists: true
  },
  {
    from: "/uncategorized/digital-marketing-curriculum-on-skool-how-to-build-high-value/",
    to: "/platforms/",
    status: "ready",
    statusCode: 301,
    reason: "Legacy redirect",
    sourceGroup: "oldBlog",
    targetExists: true
  },
  {
    from: "/uncategorized/",
    to: "/blog/",
    status: "ready",
    statusCode: 301,
    reason: "Legacy redirect",
    sourceGroup: "oldCategory",
    targetExists: true
  },
  {
    from: "/blogs/",
    to: "/blog/",
    status: "ready",
    statusCode: 301,
    reason: "Legacy redirect",
    sourceGroup: "oldPage",
    targetExists: true
  },
  {
    from: "/blog-posts/",
    to: "/blog/",
    status: "ready",
    statusCode: 301,
    reason: "Legacy redirect",
    sourceGroup: "oldPage",
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