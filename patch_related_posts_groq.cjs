const fs = require('fs');

let content = fs.readFileSync('src/sanity/queries.ts', 'utf8');

content = content.replace(
  /  relatedPosts\[\]->\[defined\(slug\.current\) && defined\(publishedAt\) && !\(_id in path\("drafts\.\*\*"\)\) && \(!defined\(migrationStatus\) \|\| migrationStatus in \["approved", "published"\]\)\] \{[\s\S]*?\},/g,
  `  relatedPosts[]->[defined(slug.current) && defined(title) && defined(publishedAt) && !(_id in path("drafts.**")) && seo.noindex != true && hidden != true && reviewPending != true && !(title match "*Test*") && !(title match "*test*") && !(slug.current match "*test*") && (!defined(status) || status in ["approved", "published"]) && (!defined(migrationStatus) || migrationStatus in ["approved", "published"])] {
    _id,
    title,
    slug,
    excerpt,
    "image": featuredImage.asset->url,
    category,
    publishedAt,
    status,
    migrationStatus,
    hidden,
    reviewPending,
    seo,
    tags,
    body,
    content
  },`
);

fs.writeFileSync('src/sanity/queries.ts', content);
