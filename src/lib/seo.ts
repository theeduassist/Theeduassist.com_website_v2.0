export const site = {
  url: 'https://www.theeduassist.com',
  name: 'TheEduAssist',
  title: 'TheEduAssist | E-Learning Design Agency for Courses, Kajabi & LMS Builds',
  description: 'TheEduAssist helps creators, coaches, educators, consultants, training companies, online academies, and businesses turn knowledge into structured, launch-ready online learning systems.',
};

export function buildCanonicalUrl(path: string): string {
  if (!path) return `${site.url}/`;

  // If the path is already a full absolute URL, parse and normalize it
  if (path.startsWith('http://') || path.startsWith('https://')) {
    try {
      const url = new URL(path);
      // Ensure we always use the canonical domain
      let pathname = url.pathname;
      if (!pathname.endsWith('/')) {
        pathname = `${pathname}/`;
      }
      pathname = pathname.replace(/\/{2,}/g, '/');
      return `${site.url}${pathname}`;
    } catch (e) {
      // Fallback if parsing fails
    }
  }

  // Ensure we don't have double slashes at start
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  // Ensure URL always ends with trailing slash
  const finalPath = cleanPath.endsWith('/') ? cleanPath : `${cleanPath}/`;

  if (finalPath === '/') {
    return `${site.url}/`;
  }

  // replace double slashes
  const pathWithoutDoubleSlashes = finalPath.replace(/\/{2,}/g, '/');
  return `${site.url}${pathWithoutDoubleSlashes}`;
}

export function formatTitle(title?: string): string {
  if (!title) return site.title;

  // Check if title already includes branding
  if (title.includes(site.name)) {
    return title;
  }

  return `${title} | ${site.name}`;
}

export function formatDescription(description?: string): string {
  return description || "TheEduAssist is an e-learning design and course-building agency helping creators, coaches, consultants, educators, training companies, online academies, and businesses build structured online courses, Kajabi systems, LMS experiences, and launch-ready e-learning content.";
}
