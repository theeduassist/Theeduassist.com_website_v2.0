import fs from 'fs';

async function main() {
  const seoReport = [];
  seoReport.push("=== SEO & ROBOTS AUDIT REPORT ===\n\n");

  const robotsTxt = fs.readFileSync('public/robots.txt', 'utf-8');
  const sitemapMjs = fs.readFileSync('scripts/generate-sitemap.mjs', 'utf-8');

  // Basic robots.txt checks
  seoReport.push("--- ROBOTS.TXT CHECK ---");
  const blockedPages = [];
  const importantPages = ['/locations/', '/blog/', '/services/', '/case-studies/', '/pricing/', '/contact/', '/book-free-audit/'];

  for (const page of importantPages) {
    if (robotsTxt.includes(`Disallow: ${page}`)) {
      blockedPages.push(page);
    }
  }

  if (blockedPages.length > 0) {
    seoReport.push(`ERROR: Important pages are blocked in robots.txt: ${blockedPages.join(', ')}`);
  } else {
    seoReport.push("PASS: No important public pages are blocked in robots.txt.");
  }

  // Check if private routes are excluded
  const expectedPrivateBlocks = ['/admin/', '/api/', '/preview/'];
  const missingPrivateBlocks = expectedPrivateBlocks.filter(route => !robotsTxt.includes(`Disallow: ${route}`));
  if (missingPrivateBlocks.length > 0) {
      seoReport.push(`WARNING: Expected private routes not blocked in robots.txt: ${missingPrivateBlocks.join(', ')}`);
  } else {
      seoReport.push("PASS: Private routes are blocked in robots.txt.");
  }


  seoReport.push("\n--- INDEX/NOINDEX LOGIC ---");
  // Check indexable cities using same logic as above
  const citiesTsContent = fs.readFileSync('src/data/cities.ts', 'utf-8');
  const citiesStr = citiesTsContent.match(/export const cities = (\[[\s\S]*?\]);/);
  let cities = [];
  if (citiesStr) {
      try {
          cities = eval(`const a = ${citiesStr[1]}; a;`);
      } catch(e) {}
  }

  let indexCount = 0;
  let noindexCount = 0;
  let incompleteButIndexed = [];

  for (const city of cities) {
      if (city.indexStatus === 'index') {
          indexCount++;
          const faqCount = city.faqs ? city.faqs.length : 0;
          if (faqCount < 10) {
             incompleteButIndexed.push(city.cityName);
          }
      } else {
          noindexCount++;
      }
  }

  seoReport.push(`Total Indexable Cities: ${indexCount}`);
  seoReport.push(`Total Noindex Cities: ${noindexCount}`);

  if (incompleteButIndexed.length > 0) {
      seoReport.push(`WARNING: The following cities are marked 'index' but lack sufficient content (e.g., < 10 FAQs): ${incompleteButIndexed.join(', ')}`);
  } else {
      seoReport.push("PASS: All indexed cities appear to have sufficient content.");
  }

  seoReport.push("\n--- SITEMAP LOGIC ---");
  if (sitemapMjs.includes("city.indexStatus === 'index'") || sitemapMjs.includes('indexStatus: "index"')) {
      seoReport.push("PASS: Sitemap logic appears to check for indexStatus.");
  } else if (sitemapMjs.includes('indexStatus !==') || sitemapMjs.includes('noindex')) {
      seoReport.push("PASS: Sitemap logic appears to exclude noindex.");
  } else {
      seoReport.push("WARNING: Could not explicitly find 'indexStatus' check in generate-sitemap.mjs.");
  }

  if (sitemapMjs.includes('/locations/')) {
       seoReport.push("INFO: Sitemap includes /locations/ hub.");
  }

  fs.writeFileSync('seo_audit_report.txt', seoReport.join('\n'));
  console.log("SEO audit complete!");
}

main().catch(console.error);
