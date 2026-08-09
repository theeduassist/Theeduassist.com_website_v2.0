export interface Heading {
  depth: number;
  slug: string;
  text: string;
}

export function generateSlug(text: string, seenSlugs: Map<string, number>): string {
  const baseSlug = text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  let slug = baseSlug;
  let count = seenSlugs.get(baseSlug) || 0;

  if (count > 0) {
    slug = `${baseSlug}-${count}`;
  }

  seenSlugs.set(baseSlug, count + 1);
  return slug;
}

export function extractHeadings(body: any): Heading[] {
  if (!body) return [];

  const seenSlugs = new Map<string, number>();

  // Handle markdown string (local .md files)
  if (typeof body === 'string') {
    const headings: Heading[] = [];
    const lines = body.split('\n');
    let insideCodeBlock = false;

    for (const line of lines) {
      if (line.trim().startsWith('```')) {
        insideCodeBlock = !insideCodeBlock;
        continue;
      }

      if (insideCodeBlock) continue;

      const match = line.match(/^(#{1,6})\s+(.+)$/);
      if (match) {
        const depth = match[1].length;
        const text = match[2].trim().replace(/[*_~`]/g, ''); // strip basic markdown formatting
        const slug = generateSlug(text, seenSlugs);
        headings.push({ depth, slug, text });
      }
    }
    return headings;
  }

  // Handle Sanity Portable Text (array of blocks) (legacy/migration support)
  if (Array.isArray(body)) {
    return body
      .filter((block) => block._type === 'block' && /^h[1-6]$/.test(block.style))
      .map((block) => {
        const text = block.children
          .map((child: any) => child.text)
          .join('');
        const slug = generateSlug(text, seenSlugs);
        return {
          depth: parseInt(block.style.replace('h', '')),
          slug,
          text,
        };
      });
  }

  return [];
}