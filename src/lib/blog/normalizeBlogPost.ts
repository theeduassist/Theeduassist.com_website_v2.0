import type { BlogContentType, BlogContentStatus, BlogCategoryId } from '../../data/blogArchitecture';
import { blogCategories } from '../../data/blogArchitecture';
import { authors } from '../../data/authors';

export interface NormalizedBlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  contentType: BlogContentType;
  primaryCategory: BlogCategoryId;
  tags: string[];
  primaryAudience: string;
  primaryIntent: string;
  buyerStage: string;
  shortAnswer?: string;
  author: any;
  reviewer?: any;
  datePublished: string;
  dateModified?: string;
  lastReviewedAt?: string;
  featuredImage?: string;
  featuredImageAlt?: string;
  body: any;
  sources?: any[];
  relatedServiceIds: string[];
  relatedEnterpriseSolutionIds: string[];
  relatedCaseStudySlugs: string[];
  relatedArticleSlugs: string[];
  canonical: string;
  robots: string;
  indexStatus: string;
  featured: boolean;
  readingTime?: number;
  wordCount?: number;
}

export function normalizeBlogPost(raw: any): NormalizedBlogPost {
  const fallbackDate = new Date().toISOString();

  // Try to match category, fallback to 'learning-strategy' if none or invalid
  const categoryMatch = blogCategories.find(c => c.title.toLowerCase() === raw.category?.toLowerCase() || c.slug === raw.category)
    || blogCategories[0];

  const authorMatch = authors.find(a => a.name === raw.author?.name) || authors[0];

  return {
    id: raw._id || raw.id || "unknown",
    title: raw.title || 'Untitled',
    slug: raw.slug?.current || raw.slug || 'no-slug',
    excerpt: raw.excerpt || raw.seo?.description || '',
    contentType: (raw.articleType?.toLowerCase().replace(' ', '-') as BlogContentType) || "article",
    primaryCategory: categoryMatch.id,
    tags: raw.tags || [],
    primaryAudience: raw.targetAudience?.[0] || 'L&D Professional',
    primaryIntent: 'learn',
    buyerStage: 'awareness',
    author: authorMatch,
    datePublished: raw.publishedAt || raw.originalPublishedAt || fallbackDate,
    dateModified: raw.updatedAt || raw.legacyModifiedAt,
    lastReviewedAt: raw.lastReviewedAt,
    featuredImage: raw.featuredImage?.asset?.url || raw.legacyFeaturedImageUrl,
    featuredImageAlt: raw.featuredImage?.alt || raw.title,
    body: raw.body || [],
    sources: raw.sources || [],
    relatedServiceIds: raw.relatedServices?.map((s: any) => s.slug?.current || s.slug) || [],
    relatedEnterpriseSolutionIds: [],
    relatedCaseStudySlugs: [],
    relatedArticleSlugs: raw.relatedPosts?.map((p: any) => p.slug?.current || p.slug) || [],
    canonical: raw.seo?.canonicalUrl || `/blog/${raw.slug?.current || raw.slug}/`,
    robots: raw.seo?.noindex ? 'noindex, nofollow' : 'index, follow',
    indexStatus: raw.seo?.noindex ? 'noindex' : 'index',
    featured: raw.featured || false,
    readingTime: raw.readingTime || Math.ceil((raw.stats?.wordCount || 0) / 200),
    wordCount: raw.stats?.wordCount || 0,
  };
}
