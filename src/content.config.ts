import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    excerpt: z.string(),
    author: z.string(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().optional(),
    publishedAt: z.union([z.string(), z.date()]).optional(),
    updatedAt: z.union([z.string(), z.date()]).optional(),
    heroImage: z.string().optional(),
    heroImageAlt: z.string().optional(),
    heroImageCaption: z.string().optional(),
    heroImageCredit: z.string().optional(),
    aiSummary: z.string().optional(),
    featured: z.boolean().optional(),
    videoUrl: z.string().optional(),
    videoTranscript: z.string().optional(),
    advancedSeo: z.object({
      canonicalOverride: z.string().optional(),
      noindex: z.boolean().optional(),
      hreflang: z.string().optional(),
      socialTitle: z.string().optional(),
      socialDescription: z.string().optional(),
      ogImage: z.string().optional(),
      twitterCardType: z.string().optional()
    }).optional(),
    keyTakeaways: z.array(z.string()).optional(),
    faqs: z.array(z.object({
      question: z.string(),
      answer: z.string()
    })).optional(),
    sources: z.array(z.object({
      title: z.string(),
      url: z.string().optional(),
      publisher: z.string().optional(),
      accessedAt: z.union([z.string(), z.date()]).optional()
    })).optional(),
    relatedArticles: z.array(z.string()).optional(),
    relatedServices: z.array(z.string()).optional(),
    downloadableResource: z.object({
      title: z.string().optional(),
      url: z.string().optional(),
      description: z.string().optional()
    }).optional(),
    endOfArticleCta: z.object({
      ctaHeading: z.string().optional(),
      ctaDescription: z.string().optional(),
      ctaLabel: z.string().optional(),
      ctaUrl: z.string().optional(),
      ctaType: z.string().optional(),
      ctaTrackingLabel: z.string().optional()
    }).optional(),
    editorialManagement: z.object({
      contentStatus: z.string().optional(),
      assignedWriter: z.string().optional(),
      assignedEditor: z.string().optional(),
      seoReviewer: z.string().optional(),
      dueDate: z.union([z.string(), z.date()]).optional(),
      scheduledPublicationDate: z.union([z.string(), z.date()]).optional(),
      lastReviewedDate: z.union([z.string(), z.date()]).optional(),
      nextReviewDate: z.union([z.string(), z.date()]).optional(),
      editorialNotes: z.string().optional(),
      targetAudience: z.string().optional(),
      contentObjective: z.string().optional(),
      campaign: z.string().optional(),
      contentPillar: z.string().optional(),
      priority: z.string().optional(),
      approvalStatus: z.string().optional()
    }).optional()
  })
});

const authors = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    role: z.string().optional(),
    shortBio: z.string().optional(),
    fullBio: z.string().optional(),
    profileImage: z.string().optional(),
    profileImageAlt: z.string().optional(),
    profileUrl: z.string().optional(),
    linkedinUrl: z.string().optional(),
    areasOfExpertise: z.array(z.string()).optional(),
    organization: z.string().optional(),
    schemaType: z.string().optional()
  })
});

const resources = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/resources" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string().optional(),
    category: z.string(),
    resourceType: z.string().optional(),
    language: z.string().optional(),
    locale: z.string().optional(),
    translationOf: z.string().optional(),
    translationStatus: z.string().optional(),
    publishedAt: z.union([z.string(), z.date()]).optional(),
    updatedAt: z.union([z.string(), z.date()]).optional(),
    author: z.string().optional(),
    reviewedBy: z.string().optional(),
    featuredImage: z.string().optional(),
    featuredImageAlt: z.string().optional(),
    summary: z.string().optional(),
    primaryKeyword: z.string().optional(),
    secondaryKeywords: z.array(z.string()).optional(),
    searchIntent: z.string().optional(),
    audience: z.array(z.string()).optional(),
    relatedServices: z.array(z.string()).optional(),
    relatedResources: z.array(z.string()).optional(),
    relatedPlatforms: z.array(z.string()).optional(),
    relatedTerms: z.array(z.string()).optional(),
    faq: z.array(z.object({
      question: z.string(),
      answer: z.string()
    })).optional(),
    sources: z.array(z.object({
      title: z.string(),
      url: z.string().optional(),
      publisher: z.string().optional()
    })).optional(),
    canonical: z.string().optional(),
    noindex: z.boolean().optional(),
    featured: z.boolean().optional(),
    schemaType: z.string().optional(),
    lastReviewed: z.union([z.string(), z.date()]).optional()
  })
});

export const collections = { blog, authors, resources };
