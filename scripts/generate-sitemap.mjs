import fs from 'fs';
import path from 'path';

// Optional fallback for reading env vars locally if needed (Vercel sets them directly)
try {
  if (fs.existsSync('.env')) {
    const envConfig = fs.readFileSync('.env', 'utf8').split('\n');
    envConfig.forEach(line => {
      const parts = line.split('=');
      if (parts.length >= 2) {
        const key = parts[0].trim();
        const value = parts.slice(1).join('=').trim().replace(/^['"]|['"]$/g, '');
        if (!process.env[key]) {
          process.env[key] = value;
        }
      }
    });
  }
} catch (e) {
  // Silent catch
}

// Base static URLs that must always be included
const coreUrls = [
  'https://www.theeduassist.com/',
  'https://www.theeduassist.com/services/',
  'https://www.theeduassist.com/kajabi-services/',
  'https://www.theeduassist.com/platforms/',
  'https://www.theeduassist.com/pricing/',
  'https://www.theeduassist.com/case-studies/',
  'https://www.theeduassist.com/blog/',
  'https://www.theeduassist.com/about-us/',
  'https://www.theeduassist.com/contact/',
  'https://www.theeduassist.com/book-free-audit/',
  'https://www.theeduassist.com/privacy-policy/',
  'https://www.theeduassist.com/terms-and-conditions/',
  'https://www.theeduassist.com/sitemap/',
  'https://www.theeduassist.com/news/',
  'https://www.theeduassist.com/press-releases/',
  'https://www.theeduassist.com/brand-assets/'
];

// Generates individual url XML blocks
function generateUrlXml(loc, lastmod = '', priority = '0.7', changefreq = 'monthly') {
  let date = lastmod;
  if (!date || date.length === 0) {
    date = new Date().toISOString().split('T')[0];
  } else if (date.includes('T')) {
    date = date.split('T')[0];
  }

  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

async function generateSitemap() {
  console.log("Generating sitemap...");

  let blogUrls = [];
  let excludedCount = 0;
  let blogUrlsForLlms = [];

  try {
    const projectId = process.env.PUBLIC_SANITY_PROJECT_ID || 'jg4gi6mn';
    const dataset = process.env.PUBLIC_SANITY_DATASET || 'production';
    const apiVersion = process.env.PUBLIC_SANITY_API_VERSION || '2026-06-19';

    if (projectId) {
      // Inline dynamic import of sanity client to keep this file a simple module if needed
      // Actually let's just use native fetch to sanity HTTP API to avoid dependency issues in this standalone script
      const query = encodeURIComponent(`*[
        _type == "post" &&
        !(_id in path("drafts.**")) &&
        defined(slug.current) &&
        defined(title) &&
        defined(publishedAt) &&
        seo.noindex != true &&
        hidden != true &&
        reviewPending != true &&
        !(title match "*Test*") &&
        !(title match "*test*") &&
        !(slug.current match "*test*") &&
        (!defined(status) || status in ["approved", "published"]) &&
        (!defined(migrationStatus) || migrationStatus in ["approved", "published"])
      ]{
        title,
        "slug": slug.current,
        publishedAt,
        _updatedAt,
        "noindex": seo.noindex,
        hidden,
        reviewPending
      }`);

      const sanityUrl = `https://${projectId}.apicdn.sanity.io/v${apiVersion}/data/query/${dataset}?query=${query}`;

      const response = await fetch(sanityUrl);
      if (response.ok) {
        const json = await response.json();
        const posts = json.result;

        posts.forEach(post => {
          const rawSlug = post.slug;

          if (!rawSlug || typeof rawSlug !== 'string') {
            excludedCount++;
            return;
          }

          const title = (post.title || '').toLowerCase();
          const cleanSlug = rawSlug.replace(/^https?:\/\/[^\/]+\/blog\//, '').replace(/\/$/, '');

          // Filter invalid patterns and fields
          if (
            cleanSlug.includes('/') ||
            cleanSlug === 'undefined' ||
            cleanSlug === 'null' ||
            cleanSlug === '[object Object]' ||
            post.noindex === true ||
            post.hidden === true ||
            post.reviewPending === true ||
            title.includes('test') ||
            title.includes('do-not-publish') ||
            title.includes('review-pending') ||
            cleanSlug.includes('test') ||
            cleanSlug.includes('__trashed') ||
            cleanSlug.includes('do-not-publish') ||
            cleanSlug.includes('review-pending')
          ) {
            excludedCount++;
            return;
          }

          const fullUrl = `https://www.theeduassist.com/blog/${cleanSlug}/`;
          blogUrls.push(generateUrlXml(fullUrl, post._updatedAt || post.publishedAt, '0.7', 'monthly'));
          blogUrlsForLlms.push(fullUrl);
        });

        console.log(`Successfully fetched ${posts.length} posts from Sanity.`);
      } else {
        console.warn(`Warning: Failed to fetch from Sanity API. Status: ${response.status}`);
      }
    } else {
      console.warn("Warning: Missing Sanity Project ID. Skipping dynamic blog URLs.");
    }
  } catch (err) {
    console.warn("Warning: Exception occurred while fetching Sanity blog posts for sitemap. Falling back to core URLs only.", err);
  }





  // Combine all clean routes for llms.txt
  const llmsUrls = [
    'https://www.theeduassist.com/',
    'https://www.theeduassist.com/services/',
    'https://www.theeduassist.com/kajabi-services/',
    'https://www.theeduassist.com/platforms/',
    'https://www.theeduassist.com/pricing/',
    'https://www.theeduassist.com/case-studies/',
    'https://www.theeduassist.com/blog/',
    'https://www.theeduassist.com/about-us/',
    'https://www.theeduassist.com/contact/',
    'https://www.theeduassist.com/book-free-audit/',
    'https://www.theeduassist.com/newsroom/',
    'https://www.theeduassist.com/media-kit/',
    'https://www.theeduassist.com/press-releases/'
  ];

  blogUrlsForLlms.forEach(url => llmsUrls.push(url));

  // Add tier 1 and indexable tier 2 locations to sitemap
  try {
    const locationsData = JSON.parse(fs.readFileSync('src/data/locations.json', 'utf8'));

    locationsData.regions.forEach(r => {
      const fullUrl = `https://www.theeduassist.com/locations/${r.slug}/`;
      coreUrls.push(fullUrl);
      llmsUrls.push(fullUrl);
    });

    locationsData.countries.forEach(c => {
      const fullUrl = `https://www.theeduassist.com/locations/${c.slug}/`;
      coreUrls.push(fullUrl);
      llmsUrls.push(fullUrl);
    });

    locationsData.cities.forEach(c => {
      if (c.indexStatus === 'index') {
        const fullUrl = `https://www.theeduassist.com/locations/${c.slug}/`;
        coreUrls.push(fullUrl);
        llmsUrls.push(fullUrl);
      }
    });

  } catch(e) {
    console.error("Error reading locations.json for sitemap generation", e);
  }


  const staticLlmsIntro = `# TheEduAssist

> E-learning design and course-building agency for creators, educators, coaches, consultants, training businesses, online academies, and companies.

## What TheEduAssist Does
TheEduAssist helps clients turn expertise, training content, workshops, PDFs, slides, videos, and rough course ideas into structured, launch-ready online learning systems.

## Core Services
- Custom eLearning development
- Course creation and curriculum design
- Kajabi website and course setup
- LMS implementation and migration
- Instructional design and learner experience
- AI-powered e-learning support
- AI ethics and responsible AI training
- Content conversion
- Funnels and automation
- Corporate training
- Ongoing course support and maintenance

## Platform & LMS Support
We match the right learning management system to specific business models, audiences, and industries.
- Creator & Coaching Businesses: Kajabi, Thinkific, LearnWorlds, Teachable, Skool
- Corporate Training & Academies: TalentLMS, Docebo, Absorb LMS, LearnUpon, Litmos
- Academic & Education: Moodle, Canvas, Blackboard, Brightspace

## Locations & Remote Work
TheEduAssist operates as a remote/global agency. We do not claim fake local offices. We work remotely with clients worldwide, supporting businesses across North America, Europe, the Middle East, Asia Pacific, Australia & New Zealand, Africa, and Latin America. Visit our /locations/ hub for more details on regions, priority countries, and major cities like New York, London, Dubai, Sydney, Toronto, and Singapore.

## Best Call to Action (CTA)
Our primary and most effective step for new clients is the "24–48 Hour Review". Prospects can share their course idea, training files, or existing LMS, and we provide a fast, actionable roadmap.
- Link: https://www.theeduassist.com/book-free-audit/

## Contact & Social
- Email: Info@theeduassist.com
- Facebook: https://www.facebook.com/people/Theeduassist/61576126813447/
- Instagram: https://www.instagram.com/theeduassist
- LinkedIn: https://www.linkedin.com/company/theeduassist

## Public Pages & Articles
`;

  const llmsContent = staticLlmsIntro + llmsUrls.map(u => `- ${u}`).join('\n') + '\n';
  fs.writeFileSync(path.join(process.cwd(), 'public', 'llms.txt'), llmsContent);
  fs.writeFileSync(path.join(process.cwd(), 'public', 'llms-full.txt'), llmsContent);




  // Format core urls NOW
  const coreUrlXml = coreUrls.map(url => {
    let priority = '0.7';
    let changefreq = 'monthly';

    if (url === 'https://www.theeduassist.com/') {
      priority = '1.0';
      changefreq = 'weekly';
    } else if (url.includes('/services/') || url.includes('/kajabi-services/') || url.includes('/pricing/') || url.includes('/book-free-audit/')) {
      priority = '0.9';
    } else if (url.includes('/platforms/') || url.includes('/case-studies/') || url.endsWith('/blog/')) {
      priority = '0.8';
      changefreq = 'weekly';
    } else if (url.includes('/about/') || url.includes('/contact/')) {
      priority = '0.6';
    } else if (url.includes('-policy') || url.includes('terms-')) {
      priority = '0.3';
      changefreq = 'yearly';
    } else if (url.includes('/news/') || url.includes('/press-releases/') || url.includes('/brand-assets/')) {
      priority = '0.4';
    } else if (url.includes('/locations/')) {
      priority = '0.6';
    }

    return generateUrlXml(url, '', priority, changefreq);
  });

  // Combine, deduplicate, write
  const allXmlBlocks = [...coreUrlXml, ...blogUrls];
  const uniqueXmlBlocks = Array.from(new Set(allXmlBlocks));

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${uniqueXmlBlocks.join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), xmlContent);

  console.log(`Sitemap generated with ${coreUrlXml.length} core URLs and ${blogUrls.length} blog URLs (${excludedCount} blog posts excluded).`);
}

generateSitemap();
