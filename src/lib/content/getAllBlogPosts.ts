import { latestBlogPostsQuery } from '../../sanity/queries';
import { fetchFromSanity } from '../../sanity/client';


export function getPlainTextFromPortableText(body: any[]): string {
  if (!body || !Array.isArray(body)) return '';

  return body
    .filter(block => block._type === 'block' && block.children)
    .map(block => block.children.map((child: any) => child.text).join(''))
    .join(' ');
}

export function hasUsefulBody(post: any): boolean {
  if (!post) return false;

  if (post.content && typeof post.content === 'string') {
     const plain = post.content.replace(/<[^>]+>/g, '').trim();
     if (plain.toLowerCase().includes('content coming soon') && plain.length < 50) return false;
     return plain.length >= 300;
  }

  if (post.body && Array.isArray(post.body)) {
     const plain = getPlainTextFromPortableText(post.body).trim();
     if (plain.toLowerCase().includes('content coming soon') && plain.length < 50) return false;
     return plain.length >= 300;
  }

  return false;
}

export function isPlaceholderPost(post: any): boolean {
  if (!post) return true;
  const title = (post.title || '').toLowerCase();
  if (title.includes('content coming soon')) return true;

  if (post.content && typeof post.content === 'string') {
     const plain = post.content.replace(/<[^>]+>/g, '').trim().toLowerCase();
     if (plain === 'content coming soon' || plain === 'very good now') return true;
  }

  if (post.body && Array.isArray(post.body)) {
     const plain = getPlainTextFromPortableText(post.body).trim().toLowerCase();
     if (plain === 'content coming soon' || plain === 'very good now') return true;
  }

  return false;
}

export function isDraftPost(post: any): boolean {
  return post?._id?.startsWith('drafts.') || false;
}

export function isNoindexPost(post: any): boolean {
  return post?.seo?.noindex === true;
}

export function hasValidSlug(post: any): boolean {
  const slug = post?.slug?.current || post?.slug;
  if (!slug || typeof slug !== 'string') return false;
  const cleanSlug = slug.toLowerCase();

  return !cleanSlug.includes('test') &&
         !cleanSlug.includes('do-not-publish') &&
         !cleanSlug.includes('review-pending') &&
         !cleanSlug.includes('content-coming-soon');
}


export function getBlogPostPublicFilterReason(post: any): string | null {
  if (!post) return 'Post is null or undefined';

  if (isDraftPost(post)) return 'Draft document';
  if (isNoindexPost(post)) return 'noindex true';
  if (isPlaceholderPost(post)) return 'placeholder content';
  if (!hasValidSlug(post)) return 'test slug or title';

  const title = (post.title || '').toLowerCase();
  if (!title ||
      title.includes('test') ||
      title.includes('testing') ||
      title.includes('do not publish') ||
      title.includes('review pending') ||
      title.includes('content coming soon') ||
      title.includes('course buliding in the future and the current now')) {
      return 'test title';
  }

  if (post.slug && post.slug.current && post.slug.current.includes('__trashed')) return 'trashed slug';
  if (post.slug && typeof post.slug === 'string' && post.slug.includes('__trashed')) return 'trashed slug';

  if (post.hidden === true) return 'hidden true';
  if (post.reviewPending === true) return 'reviewPending true';
  if (!post.publishedAt) return 'missing publishedAt';

  const status = post.status;
  if (status && ['draft', 'review', 'pending', 'archived'].includes(status.toLowerCase())) return 'blocked status';

  const migrationStatus = post.migrationStatus;
  if (migrationStatus && ['draft', 'review', 'pending', 'archived'].includes(migrationStatus.toLowerCase())) return 'blocked migrationStatus';

  // Final check for body content
  if (!hasUsefulBody(post)) return 'body too short';

  return null;
}

export function isPublicBlogPost(post: any): boolean {
  return getBlogPostPublicFilterReason(post) === null;
}

export type NormalizedBlogPost = {
  id?: string;
  title: string;
  slug: string;
  category: string;
  categories?: any[];
  excerpt: string;
  readingTime?: number;
  publishedAt?: string;
  updatedAt?: string;
  seoTitle?: string;
  seoDescription?: string;
  relatedServices?: any[];
  relatedPlatforms?: any[];
  relatedPosts?: any[];
  blogFaqs?: any[];
  relatedFaqs?: any[];
  relatedCaseStudies?: string[];
  canonicalUrl?: string;
  noIndex?: boolean;
  source: 'sanity';
  body?: any;
  content?: string;
  heroImage?: string;
  mainImage?: any;
  heroImageAlt?: string;
  author?: string;
  tags?: string[];
  seo?: any;
  migrationStatus?: string;
  sources?: any[];
  stats?: any;
  endCta?: any;
};

export async function getAllBlogPosts(): Promise<NormalizedBlogPost[]> {
  try {
    const sanityPosts = await fetchFromSanity(latestBlogPostsQuery);
    if (sanityPosts && Array.isArray(sanityPosts)) {
       // Filter here as well just to be perfectly safe, though the GROQ query handles most of it.
       const formattedSanity: NormalizedBlogPost[] = sanityPosts.filter(isPublicBlogPost).map((post: any) => {
          const rawSlug = post.slug.current || post.slug;
          const cleanSlug = rawSlug.replace(/^https?:\/\/[^\/]+\/blog\//, '').replace(/\/$/, '');

          return {
          id: post._id,
          title: post.title,
          slug: cleanSlug,
          category: post.category || (post.categories?.[0]?.title) || 'General',
          categories: post.categories,
          excerpt: post.excerpt,
          readingTime: post.stats?.readingTime || post.readingTime,
          stats: post.stats,
          publishedAt: post.publishedAt,
          updatedAt: post.updatedAt,
          seoTitle: post.seo?.metaTitle || post.title,
          seoDescription: post.seo?.metaDescription || post.excerpt,
          noIndex: post.seo?.noindex || false,
          canonicalUrl: post.seo?.canonicalPath,
          seo: post.seo,
          source: 'sanity',
          body: post.body,
          endCta: post.endCta,
          content: post.content,
          mainImage: post.mainImage,
          heroImage: post.mainImage?.asset?.url,
          heroImageAlt: post.mainImage?.alt || post.title,
          author: post.author,
          tags: post.tags || [],
          blogFaqs: post.blogFaqs,
          relatedFaqs: post.relatedFaqs,
          relatedServices: post.relatedServices,
          relatedPlatforms: post.relatedPlatforms,
          relatedPosts: Array.isArray(post.relatedPosts) ? post.relatedPosts.filter(isPublicBlogPost).filter((rp: any) => rp.slug?.current !== cleanSlug && rp.slug !== cleanSlug).map((rp: any) => ({
            ...rp,
            slug: (rp.slug?.current || rp.slug || '').replace(/^https?:\/\/[^\/]+\/blog\//, '').replace(/\/$/, '')
          })) : post.relatedPosts,
          migrationStatus: post.migrationStatus,
       };
       });

       // Deduplicate by slug
       const unique = formattedSanity.filter((v, i, a) => a.findIndex(t => (t.slug === v.slug)) === i).filter(isPublicBlogPost);

       // Sort by newest publishedAt first, fallback to updatedAt
       unique.sort((a, b) => {
         const dateA = new Date(a.publishedAt || a.updatedAt || 0).getTime();
         const dateB = new Date(b.publishedAt || b.updatedAt || 0).getTime();
         return dateB - dateA;
       });

       return unique;
    }
  } catch (error) {
    console.log("Sanity posts fetch failed or dataset not found.");
  }

  return [];
}

export async function getUniqueBlogCategoriesAndTags() {
  const posts = await getAllBlogPosts();

  const categories = new Map<string, { title: string, slug: string, description?: string }>();
  const tags = new Set<string>();

  posts.forEach(post => {
    if (post.categories && post.categories.length > 0) {
      post.categories.forEach(cat => {
         if (cat.slug?.current || cat.slug) {
            const catSlug = cat.slug?.current || cat.slug;
            if (!categories.has(catSlug)) {
                categories.set(catSlug, {
                  title: cat.title,
                  slug: catSlug,
                  description: cat.description
                });
            }
         }
      });
    } else if (post.category) {
       // Fallback to simple string category if structured category not available
       const fallbackSlug = post.category.toLowerCase().replace(/[^a-z0-9]+/g, '-');
       if (!categories.has(fallbackSlug)) {
          categories.set(fallbackSlug, {
            title: post.category,
            slug: fallbackSlug
          });
       }
    }

    if (post.tags) {
      post.tags.forEach(tag => tags.add(tag));
    }
  });

  return {
    categories: Array.from(categories.values()),
    tags: Array.from(tags)
  };
}
