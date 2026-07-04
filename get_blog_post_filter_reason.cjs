const fs = require('fs');

let content = fs.readFileSync('src/lib/content/getAllBlogPosts.ts', 'utf8');

// Insert the new logic
const reasonHelper = `
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
      title.includes('content coming soon')) {
      return 'test title';
  }

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
`;

content = content.replace(
  /export function isPublicBlogPost\(post: any\): boolean \{\n[\s\S]*?return true;\n\}/,
  `${reasonHelper}
export function isPublicBlogPost(post: any): boolean {
  return getBlogPostPublicFilterReason(post) === null;
}`
);

fs.writeFileSync('src/lib/content/getAllBlogPosts.ts', content);
