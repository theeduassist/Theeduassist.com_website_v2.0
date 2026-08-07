export function normalizeBlogSlug(post: any): string | null {
  if (!post) return null;
  const rawSlug = post.slug?.current || post.slug;
  if (!rawSlug || typeof rawSlug !== 'string') return null;

  if (rawSlug === 'undefined' || rawSlug === 'null' || rawSlug === '[object Object]') return null;

  return rawSlug.replace(/^https?:\/\/[^\/]+\/blog\//, '').replace(/\/$/, '');
}

export function normalizeStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .filter((item): item is string => typeof item === "string")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

export function getBlogUrl(post: any): string | null {
  const slug = normalizeBlogSlug(post);
  if (!slug) return null;
  return `/blog/${slug}/`;
}

export function getFallbackDescription(content?: string, body?: any[]): string {
  if (content && typeof content === 'string') {
    const text = content.replace(/<[^>]+>/g, '').trim();
    if (text) {
      return text.length > 150 ? text.substring(0, 150) + '...' : text;
    }
  }

  if (body && Array.isArray(body)) {
    const firstText = body.find(b => b._type === 'block' && b.style === 'normal' && b.children && b.children.length > 0);
    if (firstText) {
      const text = firstText.children.map((c: any) => c.text).join('').trim();
      if (text) {
        return text.length > 150 ? text.substring(0, 150) + '...' : text;
      }
    }
  }

  return "Read our latest insights on course creation and LMS implementation.";
}
