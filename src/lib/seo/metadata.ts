import { getSiteSettings } from '../../sanity/queries';
import { buildCanonicalUrl, formatTitle, formatDescription } from '../seo';

export interface PageMetadata {
  title: string;
  description: string;
  canonical: string;
  robots: string;
  pageType: string;
  openGraphTitle?: string;
  openGraphDescription?: string;
  openGraphImage?: string;
  twitterCard?: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
  reviewerName?: string;
  sitemapVisibility: boolean;
}

export async function generateMetadata({
  title,
  description,
  canonicalPath,
  ogTitle,
  ogDescription,
  ogImage,
  twitterCardType,
  noindex = false,
  type = 'website'
}: any): Promise<PageMetadata> {
  const siteSettings = await getSiteSettings();
  const siteName = siteSettings?.name || 'TheEduAssist';

  const formattedTitle = formatTitle(title);
  const formattedDescription = formatDescription(description);
  const canonicalUrl = buildCanonicalUrl(canonicalPath || '');

  const openGraphTitle = ogTitle || formattedTitle;
  const openGraphDescription = ogDescription || formattedDescription;

  // Default fallback image
  let defaultImage = `${siteSettings?.url || 'https://www.theeduassist.com'}/og/theeduassist-og-image.png`;
  // Simple safety check on ogImage if it's passed as a relative path
  let finalOgImage = ogImage || defaultImage;
  if (finalOgImage.startsWith('/')) {
    finalOgImage = `${siteSettings?.url || 'https://www.theeduassist.com'}${finalOgImage}`;
  }

  return {
    title: formattedTitle,
    description: formattedDescription,
    canonical: canonicalUrl,
    robots: noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    pageType: type,
    openGraphTitle,
    openGraphDescription,
    openGraphImage: finalOgImage,
    twitterCard: twitterCardType || 'summary_large_image',
    sitemapVisibility: !noindex
  };
}
