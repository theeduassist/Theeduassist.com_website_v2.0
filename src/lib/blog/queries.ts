export const blogPostSummariesQuery = `*[_type == "post" && defined(slug.current) && defined(title) && defined(publishedAt) && !(_id in path("drafts.**")) && seo.noindex != true && hidden != true && reviewPending != true && !(title match "*Test*") && !(title match "*test*") && !(slug.current match "*test*") && (!defined(status) || status in ["approved", "published"]) && (!defined(migrationStatus) || migrationStatus in ["approved", "published"])] | order(publishedAt desc, _createdAt desc) {
  _id,
  title,
  slug,
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

export const blogPostDetailQuery = `*[_type == "post" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
  _id,
  title,
  slug,
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
  relatedServices[]->{ slug },
  relatedPosts[]->{ slug },
  stats,
  readingTime,
  featured,
  author->{ name }
}`;

export const blogPostSlugsQuery = `*[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))] {
  "slug": slug.current
}`;

// Fetch RSS items
export const rssPostsQuery = `*[_type == "post" && defined(slug.current) && defined(title) && defined(publishedAt) && !(_id in path("drafts.**")) && seo.noindex != true && hidden != true && reviewPending != true && !(title match "*Test*") && !(title match "*test*") && !(slug.current match "*test*") && (!defined(status) || status in ["approved", "published"]) && (!defined(migrationStatus) || migrationStatus in ["approved", "published"])] | order(publishedAt desc, _createdAt desc) {
  title,
  slug,
  excerpt,
  seo,
  publishedAt,
  originalPublishedAt
}`;
