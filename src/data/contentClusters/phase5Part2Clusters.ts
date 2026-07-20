import { type BlogCategoryId } from "../blogArchitecture";
import { type AuthorId } from "../authors";

export interface ContentClusterItem {
  cluster: string;
  workingTitle: string;
  proposedSlug: string;
  contentType: "guide" | "article" | "checklist";
  primaryAudience: string;
  secondaryAudience: string;
  primaryIntent: string;
  buyerStage: string;
  problemAddressed: string;
  directQuestionAnswered: string;
  originalValue: string;
  evidenceRequired: boolean;
  author: AuthorId;
  reviewer?: string;
  relatedServices: string[];
  relatedEnterpriseSolutions: string[];
  relatedCaseStudies: string[];
  relatedArticles: string[];
  canonicalStatus: "canonical";
  publicationStatus: "published" | "draft" | "scheduled";
  categoryId: BlogCategoryId;
  isPillar: boolean;
  pillarSlug?: string;
}

export const phase5Part2Clusters: ContentClusterItem[] = [
  // Learning Strategy
  {
    cluster: "Learning Strategy",
    workingTitle: "Learning Strategy for Organizations: A Practical Planning Framework",
    proposedSlug: "learning-strategy-organizations-framework",
    contentType: "guide",
    primaryAudience: "Head of Learning and Development",
    secondaryAudience: "L&D Manager",
    primaryIntent: "Learn how to build a learning strategy",
    buyerStage: "Awareness/Consideration",
    problemAddressed: "Lack of alignment between training and business goals",
    directQuestionAnswered: "How do I create an effective learning strategy for my organization?",
    originalValue: "Practical 5-step framework",
    evidenceRequired: true,
    author: "editorial-team",
    relatedServices: ["learning-strategy"],
    relatedEnterpriseSolutions: ["workforce-upskilling"],
    relatedCaseStudies: ["business-analytics-corporate-training"],
    relatedArticles: ["learning-needs-analysis-guide", "learning-pathways-design"],
    canonicalStatus: "canonical",
    publicationStatus: "published",
    categoryId: "learning-strategy",
    isPillar: true
  },
  {
    cluster: "Learning Strategy",
    workingTitle: "How to Conduct a Learning Needs Analysis Before Building Training",
    proposedSlug: "learning-needs-analysis-guide",
    contentType: "article",
    primaryAudience: "Instructional Designer",
    secondaryAudience: "L&D Manager",
    primaryIntent: "Learn how to conduct an LNA",
    buyerStage: "Awareness",
    problemAddressed: "Building training without understanding the real need",
    directQuestionAnswered: "How do I perform a learning needs analysis?",
    originalValue: "Practical checklist and evidence sources",
    evidenceRequired: false,
    author: "editorial-team",
    relatedServices: ["learning-strategy"],
    relatedEnterpriseSolutions: [],
    relatedCaseStudies: [],
    relatedArticles: ["learning-strategy-organizations-framework", "learning-pathways-design"],
    canonicalStatus: "canonical",
    publicationStatus: "published",
    categoryId: "learning-strategy",
    isPillar: false,
    pillarSlug: "learning-strategy-organizations-framework"
  },
  {
    cluster: "Learning Strategy",
    workingTitle: "How to Design Learning Pathways for Different Roles and Skill Levels",
    proposedSlug: "learning-pathways-design",
    contentType: "article",
    primaryAudience: "Learning Experience Designer",
    secondaryAudience: "L&D Manager",
    primaryIntent: "Learn how to structure learning paths",
    buyerStage: "Consideration",
    problemAddressed: "Disjointed, one-size-fits-all training",
    directQuestionAnswered: "How should I structure learning pathways for different roles?",
    originalValue: "Sequencing matrix example",
    evidenceRequired: false,
    author: "editorial-team",
    relatedServices: ["learning-strategy"],
    relatedEnterpriseSolutions: [],
    relatedCaseStudies: [],
    relatedArticles: ["learning-strategy-organizations-framework", "learning-needs-analysis-guide"],
    canonicalStatus: "canonical",
    publicationStatus: "published",
    categoryId: "learning-strategy",
    isPillar: false,
    pillarSlug: "learning-strategy-organizations-framework"
  },

  // Instructional Design
  {
    cluster: "Instructional Design",
    workingTitle: "Instructional Design: A Practical Guide to Planning Effective Learning",
    proposedSlug: "instructional-design-practical-guide",
    contentType: "guide",
    primaryAudience: "Instructional Designer",
    secondaryAudience: "L&D Manager",
    primaryIntent: "Understand the end-to-end ID process",
    buyerStage: "Awareness",
    problemAddressed: "Ineffective or unengaging course design",
    directQuestionAnswered: "What is the practical process for instructional design?",
    originalValue: "End-to-end implementation sequence",
    evidenceRequired: true,
    author: "editorial-team",
    relatedServices: ["instructional-design"],
    relatedEnterpriseSolutions: ["employee-onboarding"],
    relatedCaseStudies: ["sqa-aligned-vocational-training"],
    relatedArticles: ["writing-effective-learning-objectives", "aligning-assessment-learning-objectives"],
    canonicalStatus: "canonical",
    publicationStatus: "published",
    categoryId: "instructional-design",
    isPillar: true
  },
  {
    cluster: "Instructional Design",
    workingTitle: "How to Write Learning Objectives That Support Real Performance",
    proposedSlug: "writing-effective-learning-objectives",
    contentType: "article",
    primaryAudience: "Instructional Designer",
    secondaryAudience: "Course Developer",
    primaryIntent: "Learn to write better objectives",
    buyerStage: "Awareness",
    problemAddressed: "Vague, unmeasurable learning goals",
    directQuestionAnswered: "How do I write actionable learning objectives?",
    originalValue: "Before/After examples with cognitive complexity mapping",
    evidenceRequired: false,
    author: "editorial-team",
    relatedServices: ["instructional-design"],
    relatedEnterpriseSolutions: [],
    relatedCaseStudies: [],
    relatedArticles: ["instructional-design-practical-guide", "aligning-assessment-learning-objectives"],
    canonicalStatus: "canonical",
    publicationStatus: "published",
    categoryId: "instructional-design",
    isPillar: false,
    pillarSlug: "instructional-design-practical-guide"
  },
  {
    cluster: "Instructional Design",
    workingTitle: "How to Align Learning Activities and Assessments With Learning Objectives",
    proposedSlug: "aligning-assessment-learning-objectives",
    contentType: "article",
    primaryAudience: "Instructional Designer",
    secondaryAudience: "Learning Experience Designer",
    primaryIntent: "Ensure assessments measure what was taught",
    buyerStage: "Consideration",
    problemAddressed: "Assessments that don't match the learning goals",
    directQuestionAnswered: "How do I map assessments to learning objectives?",
    originalValue: "Objective-to-assessment mapping table",
    evidenceRequired: false,
    author: "editorial-team",
    relatedServices: ["assessment-design"],
    relatedEnterpriseSolutions: [],
    relatedCaseStudies: [],
    relatedArticles: ["instructional-design-practical-guide", "writing-effective-learning-objectives"],
    canonicalStatus: "canonical",
    publicationStatus: "published",
    categoryId: "instructional-design",
    isPillar: false,
    pillarSlug: "instructional-design-practical-guide"
  },

  // Course Development
  {
    cluster: "Course Development",
    workingTitle: "The Course Development Process: From Project Brief to Quality Review",
    proposedSlug: "course-development-process-guide",
    contentType: "guide",
    primaryAudience: "Learning Project Manager",
    secondaryAudience: "Course Developer",
    primaryIntent: "Understand the course production lifecycle",
    buyerStage: "Awareness/Consideration",
    problemAddressed: "Disorganized or delayed course production",
    directQuestionAnswered: "What is the step-by-step process for developing a digital course?",
    originalValue: "Role-responsibility table and phase checklist",
    evidenceRequired: false,
    author: "editorial-team",
    relatedServices: ["course-development"],
    relatedEnterpriseSolutions: [],
    relatedCaseStudies: ["language-courses-book-publisher"],
    relatedArticles: ["sme-instructional-designer-collaboration", "course-quality-assurance-checklist"],
    canonicalStatus: "canonical",
    publicationStatus: "published",
    categoryId: "course-development",
    isPillar: true
  },
  {
    cluster: "Course Development",
    workingTitle: "How Instructional Designers and Subject-Matter Experts Can Work Together",
    proposedSlug: "sme-instructional-designer-collaboration",
    contentType: "article",
    primaryAudience: "Instructional Designer",
    secondaryAudience: "Subject-Matter Expert",
    primaryIntent: "Improve ID-SME workflows",
    buyerStage: "Awareness",
    problemAddressed: "Friction and delays in SME reviews",
    directQuestionAnswered: "How can IDs and SMEs collaborate more effectively?",
    originalValue: "Meeting structure template and conflict resolution guide",
    evidenceRequired: false,
    author: "editorial-team",
    relatedServices: ["course-development"],
    relatedEnterpriseSolutions: [],
    relatedCaseStudies: [],
    relatedArticles: ["course-development-process-guide", "course-quality-assurance-checklist"],
    canonicalStatus: "canonical",
    publicationStatus: "published",
    categoryId: "course-development",
    isPillar: false,
    pillarSlug: "course-development-process-guide"
  },
  {
    cluster: "Course Development",
    workingTitle: "A Practical Quality-Assurance Checklist for Digital Courses",
    proposedSlug: "course-quality-assurance-checklist",
    contentType: "checklist",
    primaryAudience: "Course Developer",
    secondaryAudience: "Learning Project Manager",
    primaryIntent: "Ensure course quality before launch",
    buyerStage: "Consideration",
    problemAddressed: "Errors, broken links, or accessibility issues in final courses",
    directQuestionAnswered: "What should I check before launching an eLearning course?",
    originalValue: "Comprehensive QA checklist",
    evidenceRequired: false,
    author: "editorial-team",
    relatedServices: ["quality-assurance"],
    relatedEnterpriseSolutions: [],
    relatedCaseStudies: [],
    relatedArticles: ["course-development-process-guide", "sme-instructional-designer-collaboration"],
    canonicalStatus: "canonical",
    publicationStatus: "published",
    categoryId: "course-development",
    isPillar: false,
    pillarSlug: "course-development-process-guide"
  },

  // Content Modernization
  {
    cluster: "Content Modernization",
    workingTitle: "How to Modernize Existing Learning Content Without Starting From Scratch",
    proposedSlug: "modernize-existing-learning-content",
    contentType: "guide",
    primaryAudience: "L&D Manager",
    secondaryAudience: "Instructional Designer",
    primaryIntent: "Framework for updating legacy content",
    buyerStage: "Consideration",
    problemAddressed: "Outdated, inaccessible, or mobile-unfriendly legacy courses",
    directQuestionAnswered: "How do I effectively modernize old training materials?",
    originalValue: "Keep/Update/Retire/Rebuild decision matrix",
    evidenceRequired: true,
    author: "editorial-team",
    relatedServices: ["content-conversion"],
    relatedEnterpriseSolutions: [],
    relatedCaseStudies: [],
    relatedArticles: ["audit-legacy-course-before-redesign", "document-to-course-conversion"],
    canonicalStatus: "canonical",
    publicationStatus: "published",
    categoryId: "course-development", // using existing category
    isPillar: true
  },
  {
    cluster: "Content Modernization",
    workingTitle: "How to Audit a Legacy Course Before Redesign or Migration",
    proposedSlug: "audit-legacy-course-before-redesign",
    contentType: "article",
    primaryAudience: "Instructional Designer",
    secondaryAudience: "Learning Project Manager",
    primaryIntent: "Evaluate existing courses for modernization",
    buyerStage: "Awareness",
    problemAddressed: "Blindly migrating bad content to new platforms",
    directQuestionAnswered: "What should I look for when auditing an old eLearning course?",
    originalValue: "Audit evaluation criteria",
    evidenceRequired: false,
    author: "editorial-team",
    relatedServices: ["content-conversion"],
    relatedEnterpriseSolutions: [],
    relatedCaseStudies: [],
    relatedArticles: ["modernize-existing-learning-content", "document-to-course-conversion"],
    canonicalStatus: "canonical",
    publicationStatus: "published",
    categoryId: "course-development",
    isPillar: false,
    pillarSlug: "modernize-existing-learning-content"
  },
  {
    cluster: "Content Modernization",
    workingTitle: "Turning Documents and Presentations Into Structured Digital Learning",
    proposedSlug: "document-to-course-conversion",
    contentType: "article",
    primaryAudience: "Instructional Designer",
    secondaryAudience: "Trainer",
    primaryIntent: "Convert static files to interactive learning",
    buyerStage: "Consideration",
    problemAddressed: "Boring 'click-next' courses converted directly from PDFs",
    directQuestionAnswered: "How do I turn a document or presentation into an actual course?",
    originalValue: "Extraction and sequencing method",
    evidenceRequired: false,
    author: "editorial-team",
    relatedServices: ["content-conversion"],
    relatedEnterpriseSolutions: [],
    relatedCaseStudies: [],
    relatedArticles: ["modernize-existing-learning-content", "audit-legacy-course-before-redesign"],
    canonicalStatus: "canonical",
    publicationStatus: "published",
    categoryId: "course-development",
    isPillar: false,
    pillarSlug: "modernize-existing-learning-content"
  }
];
