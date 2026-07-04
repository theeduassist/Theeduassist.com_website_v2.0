export function normalizeBlogSlug(post: any): string | null {
  if (!post) return null;
  const rawSlug = post.slug?.current || post.slug;
  if (!rawSlug || typeof rawSlug !== 'string') return null;

  if (rawSlug === 'undefined' || rawSlug === 'null' || rawSlug === '[object Object]') return null;

  return rawSlug.replace(/^https?:\/\/[^\/]+\/blog\//, '').replace(/\/$/, '');
}

export function getBlogUrl(post: any): string | null {
  const slug = normalizeBlogSlug(post);
  if (!slug) return null;
  return `/blog/${slug}/`;
}
