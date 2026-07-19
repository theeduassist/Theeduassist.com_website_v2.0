// Read existing and add category and author routes
const fs = require('fs');
const path = require('path');

// We have typescript code, so we cannot easily require it directly in Node without ts-node or similar.
// But we can do a simple read/regex since it's an array of objects.

function extractCategories() {
  const content = fs.readFileSync(path.join(process.cwd(), 'src/data/blogArchitecture.ts'), 'utf-8');
  // Simple regex to extract id and sitemapVisibility
  const matches = [...content.matchAll(/id:\s*"([^"]+)"[\s\S]*?sitemapVisibility:\s*(true|false)/g)];
  return matches.filter(m => m[2] === 'true').map(m => m[1]);
}

function extractAuthors() {
  const content = fs.readFileSync(path.join(process.cwd(), 'src/data/authors.ts'), 'utf-8');
  // Simple regex to extract slug and publicVisibility
  const matches = [...content.matchAll(/slug:\s*"([^"]+)"[\s\S]*?publicVisibility:\s*(true|false)/g)];
  return matches.filter(m => m[2] === 'true').map(m => m[1]);
}

const categories = extractCategories();
const authors = extractAuthors();

const additionalUrls = [];
categories.forEach(c => additionalUrls.push(`https://www.theeduassist.com/blog/category/${c}/`));
authors.forEach(a => additionalUrls.push(`https://www.theeduassist.com/authors/${a}/`));

// Add RSS feed
additionalUrls.push('https://www.theeduassist.com/rss.xml');

// Read public/sitemap.xml
const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
let xml = fs.readFileSync(sitemapPath, 'utf-8');

// Insert before </urlset>
const newBlocks = additionalUrls.map(url => `  <url>
    <loc>${url}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>`).join('\n');

xml = xml.replace('</urlset>', `${newBlocks}\n</urlset>`);
fs.writeFileSync(sitemapPath, xml);
console.log(`Added ${additionalUrls.length} additional URLs to sitemap.`);
