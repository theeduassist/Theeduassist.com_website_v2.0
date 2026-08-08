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
  'https://www.theeduassist.com/contact-us/',
  'https://www.theeduassist.com/services/',
  'https://www.theeduassist.com/services/course-localization-translation/',
  'https://www.theeduassist.com/kajabi-services/',
  'https://www.theeduassist.com/enterprise-solutions/',
  'https://www.theeduassist.com/platforms/',
  'https://www.theeduassist.com/pricing/',
  'https://www.theeduassist.com/case-studies/',
  'https://www.theeduassist.com/blog/',
  'https://www.theeduassist.com/about-us/',

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
    const fsFiles = fs.readdirSync('src/content/blog/');
    const posts = [];

    for (const file of fsFiles) {
      if (!file.endsWith('.md')) continue;

      const content = fs.readFileSync('src/content/blog/' + file, 'utf8');

      // Basic frontmatter parser for our needs
      let isDraft = false;
      let isNoIndex = false;
      let title = '';
      let slug = file.replace('.md', '');
      let publishedAt = '';
      let datePublished = '';
      let updatedAt = '';
      let body = '';
      let status = '';

      if (content.startsWith('---')) {
        const parts = content.split('---');
        if (parts.length >= 3) {
          const fm = parts[1];
          body = parts.slice(2).join('---');

          const lines = fm.split('\n');
          for (const line of lines) {
            if (line.startsWith('title:')) title = line.substring(6).trim().replace(/^["']|["']$/g, '');
            if (line.startsWith('slug:')) slug = line.substring(5).trim().replace(/^["']|["']$/g, '');
            if (line.startsWith('publishedAt:')) publishedAt = line.substring(12).trim().replace(/^["']|["']$/g, '');
            if (line.startsWith('datePublished:')) datePublished = line.substring(14).trim().replace(/^["']|["']$/g, '');
            if (line.startsWith('updatedAt:')) updatedAt = line.substring(10).trim().replace(/^["']|["']$/g, '');
            if (line.startsWith('noindex:') && line.includes('true')) isNoIndex = true;
            if (line.startsWith('status:')) status = line.substring(7).trim().replace(/^["']|["']$/g, '');
          }
        }
      }

      if (
        !isNoIndex &&
        title &&
        !title.toLowerCase().includes('test') &&
        !title.toLowerCase().includes('content coming soon') &&
        !title.toLowerCase().includes('untitled') &&
        slug &&
        !slug.toLowerCase().includes('test') &&
        (publishedAt || datePublished) &&
        (status === 'published' || status === '') &&
        !file.startsWith('drafts.')
      ) {
        posts.push({ title, slug, publishedAt: publishedAt || datePublished, updatedAt });
      } else {
        excludedCount++;
      }
    }

    posts.forEach(post => {
      const fullUrl = `https://www.theeduassist.com/blog/${post.slug}/`;
      blogUrls.push(generateUrlXml(fullUrl, post.updatedAt || post.publishedAt, '0.7', 'monthly'));
      blogUrlsForLlms.push(fullUrl);
    });

    console.log(`Successfully fetched ${posts.length} local Markdown posts.`);
  } catch (err) {
    console.warn("Warning: Exception occurred while reading local Markdown blog posts.", err);
  }






  // Combine all clean routes for llms.txt

  const llmsUrls = [
    '- Homepage: https://www.theeduassist.com/',
    '- Home: https://www.theeduassist.com/home/',
    '- Services: https://www.theeduassist.com/services/',
    '- Enterprise Solutions: https://www.theeduassist.com/enterprise-solutions/',
    '- Kajabi Services: https://www.theeduassist.com/kajabi-services/',
    '- Case Studies: https://www.theeduassist.com/case-studies/',
    '- Pricing: https://www.theeduassist.com/pricing/',
    '- Blog: https://www.theeduassist.com/blog/',
    '- Contact Us: https://www.theeduassist.com/contact-us/'
  ];




  // Add tier 1 and indexable tier 2 locations to sitemap
  try {
    const locationsData = JSON.parse(fs.readFileSync('src/data/locations.json', 'utf8'));

    locationsData.regions.forEach(r => {
      const fullUrl = `https://www.theeduassist.com/locations/${r.slug}/`;
      coreUrls.push(fullUrl);

    });

    locationsData.countries.forEach(c => {
      const fullUrl = `https://www.theeduassist.com/locations/${c.slug}/`;
      coreUrls.push(fullUrl);

    });

    locationsData.cities.forEach(c => {
      if (c.indexStatus === 'index') {
        const fullUrl = `https://www.theeduassist.com/locations/${c.slug}/`;
        coreUrls.push(fullUrl);

      }
    });

  } catch(e) {
    console.error("Error reading locations.json for sitemap generation", e);
  }


  const staticLlmsIntro = `# TheEduAssist

> TheEduAssist is an e-learning design agency helping organizations, training teams, academies and course creators design, build, migrate and improve digital learning experiences.

## Primary Pages

`;

const staticLlmsExpertise = `

## Expertise

- Learning Strategy
- Instructional Design
- Course Development
- LMS Implementation & Migration
- Kajabi
- Enterprise Learning
- Accessibility & Quality
- AI-Supported Learning
- Localization
- Managed Learning

## Editorial

- Blog
- Editorial Team
- Editorial Policy
- Trust Centre

`;


  const llmsContent = staticLlmsIntro + llmsUrls.join('\n') + staticLlmsExpertise;
  fs.writeFileSync(path.join(process.cwd(), 'public', 'llms.txt'), llmsContent);





  // Format core urls NOW
  const coreUrlXml = coreUrls.map(url => {
    let priority = '0.7';
    let changefreq = 'monthly';

    if (url === 'https://www.theeduassist.com/') {
      priority = '1.0';
      changefreq = 'weekly';
    } else if (url.includes('/services/') || url.includes('/kajabi-services/') || url.includes('/enterprise-solutions/') || url.includes('/pricing/') || url.includes('/book-free-audit/')) {
      priority = '0.9';
    } else if (url.includes('/platforms/') || url.includes('/case-studies/') || url.endsWith('/blog/')) {
      priority = '0.8';
      changefreq = 'weekly';
    } else if (url.includes('/about/') || url.includes('/contact/') || url.includes('/trust-centre/')) {
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
