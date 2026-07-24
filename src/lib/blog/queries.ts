export const publicBlogEligibility = `_type == "post" && defined(slug.current) && defined(title) && defined(publishedAt) && !(_id in path("drafts.**")) && seo.noindex != true && hidden != true && reviewPending != true && !(title match "*Test*") && !(title match "*test*") && !(slug.current match "*test*") && (!defined(status) || status in ["approved", "published"]) && (!defined(migrationStatus) || migrationStatus in ["approved", "published"])`;

export const blogPostSummariesQuery = `*[${publicBlogEligibility}] | order(publishedAt desc, _createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  seo,
  articleType,
  category,
  tags,
  targetAudience,
  publishedAt,
  originalPublishedAt,
  updatedAt,
  legacyModifiedAt,
  lastReviewedAt,
  featuredImage {
    asset->{
      url
    },
    alt
  },
  legacyFeaturedImageUrl,
  stats,
  readingTime,
  featured
}`;

export const blogPostDetailQuery = `*[${publicBlogEligibility} && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  seo,
  articleType,
  category,
  tags,
  targetAudience,
  publishedAt,
  originalPublishedAt,
  updatedAt,
  legacyModifiedAt,
  lastReviewedAt,
  featuredImage {
    asset->{
      url
    },
    alt
  },
  legacyFeaturedImageUrl,
  body,
  sources,
  relatedServices[]->{ "slug": slug.current },
  relatedPosts[]->{ "slug": slug.current },
  stats,
  readingTime,
  featured,
  author->{ name }
}`;

export const blogPostSlugsQuery = `*[${publicBlogEligibility}] {
  "slug": slug.current
}`;

// Fetch RSS items
export const rssPostsQuery = `*[${publicBlogEligibility}] | order(publishedAt desc, _createdAt desc) {
  title,
  "slug": slug.current,
  excerpt,
  seo,
  publishedAt,
  originalPublishedAt
}`;
