import fs from 'fs';

async function main() {
  const blogReport = [];
  const schemaReport = [];

  blogReport.push("=== BLOG AUDIT REPORT ===\n\n");
  schemaReport.push("=== SCHEMA AUDIT REPORT ===\n\n");

  const schemaFile = fs.readFileSync('src/lib/seo/schema.ts', 'utf-8');

  // SCHEMA CHECKS
  schemaReport.push("--- SCHEMA PRESENCE ---");
  const expectedSchemas = ['WebPage', 'Service', 'BreadcrumbList', 'FAQPage', 'Organization', 'WebSite', 'BlogPosting'];
  for (const s of expectedSchemas) {
      if (schemaFile.includes(`"@type": "${s}"`)) {
          schemaReport.push(`PASS: Found schema definition for: ${s}`);
      } else {
          schemaReport.push(`WARNING: Missing schema definition for: ${s}`);
      }
  }

  schemaReport.push("\n--- SCHEMA RISKS ---");
  const schemaRisks = ['LocalBusiness', 'address', 'telephone'];
  let riskFound = false;
  for (const risk of schemaRisks) {
       if (schemaFile.includes(risk)) {
           schemaReport.push(`ERROR: Found potentially fake or risky local schema property: ${risk}`);
           riskFound = true;
       }
  }
  if (!riskFound) schemaReport.push("PASS: No fake LocalBusiness, addresses, or phone numbers found in base schema definitions.");

  // BLOG CHECKS
  let blogIndex = '';
  let blogSlug = '';
  try {
     blogIndex = fs.readFileSync('src/pages/blog/index.astro', 'utf-8');
     blogSlug = fs.readFileSync('src/pages/blog/[slug].astro', 'utf-8');
  } catch(e) {
     blogReport.push("ERROR: Could not read blog Astro files.");
  }

  blogReport.push("--- BLOG COMPONENTS ---");
  if (blogIndex.includes('FeaturedArticle') || blogIndex.includes('featured')) {
      blogReport.push("PASS: Blog index appears to support Featured Article.");
  } else {
      blogReport.push("WARNING: Blog index might be missing Featured Article logic.");
  }

  if (blogIndex.includes('Category') || blogIndex.includes('filter')) {
      blogReport.push("PASS: Blog index appears to have category/filter logic.");
  } else {
      blogReport.push("WARNING: Blog index might be missing category/filter logic.");
  }

  blogReport.push("\n--- BLOG DETAIL QUALITY ---");
  if (blogSlug.includes('Quick Summary') || blogSlug.includes('aiSummary') || blogSlug.includes('summary')) {
       blogReport.push("PASS: Blog detail page supports Quick Summary/aiSummary.");
  } else {
       blogReport.push("WARNING: Blog detail page missing Quick Summary logic.");
  }

  if (blogSlug.includes('RelatedArticles') || blogSlug.includes('related')) {
       blogReport.push("PASS: Blog detail page supports Related Articles.");
  } else {
       blogReport.push("WARNING: Blog detail page missing Related Articles logic.");
  }

  // STATUS CHECKS in codebase
  const publicRisks = ['Review Pending', 'Draft', 'Internal', 'Admin', 'Private', 'Needs Review'];
  const allFilesText = blogIndex + blogSlug;
  let statusLeak = false;
  blogReport.push("\n--- INTERNAL STATUS LEAKS ---");
  for (const status of publicRisks) {
      if (allFilesText.includes(status)) {
         // Usually ok if it's in a comment or a filter, but we flag just in case
         blogReport.push(`INFO: Found mention of "${status}" in blog templates (check if it's exposed or just logic).`);
         statusLeak = true;
      }
  }
  if (!statusLeak) {
       blogReport.push("PASS: No direct references to internal statuses leaking in blog templates.");
  }

  fs.writeFileSync('blog_audit_report.txt', blogReport.join('\n'));
  fs.writeFileSync('schema_audit_report.txt', schemaReport.join('\n'));
  console.log("Blog and Schema audit complete!");
}

main().catch(console.error);
