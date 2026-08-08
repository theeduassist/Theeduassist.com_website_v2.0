export interface Heading {
  depth: number;
  slug: string;
  text: string;
}

export function extractHeadings(body: any): Heading[] {
  if (!body) return [];

  // Handle markdown string (local .md files)
  if (typeof body === 'string') {
    const headings: Heading[] = [];
    const lines = body.split('\n');
    for (const line of lines) {
      const match = line.match(/^(#{1,6})\s+(.+)$/);
      if (match) {
        const depth = match[1].length;
        const text = match[2].trim();
        const slug = text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
        headings.push({ depth, slug, text });
      }
    }
    return headings;
  }

  // Handle Sanity Portable Text (array of blocks)
  if (Array.isArray(body)) {
    return body
      .filter((block) => block._type === 'block' && /^h[1-6]$/.test(block.style))
      .map((block) => {
        const text = block.children
          .map((child: any) => child.text)
          .join('');
        const slug = text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
        return {
          depth: parseInt(block.style.replace('h', '')),
          slug,
          text,
        };
      });
  }

  return [];
}