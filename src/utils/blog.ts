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

export function getFallbackDescription(content?: string, body?: any[]): string {
  if (content && typeof content === 'string') {
    const text = content.replace(/<[^>]+>/g, '').trim();
    if (text) return text.substring(0, 150) + '...';
  }

  if (body && Array.isArray(body)) {
    const firstText = body.find(b => b._type === 'block' && b.style === 'normal' && b.children && b.children.length > 0);
    if (firstText) {
      const text = firstText.children.map((c: any) => c.text).join('').trim();
      if (text) return text.substring(0, 150) + '...';
    }
  }

  return "Read our latest insights on course creation and LMS implementation.";
}
