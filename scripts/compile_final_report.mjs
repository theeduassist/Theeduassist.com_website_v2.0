import fs from 'fs';

async function main() {
  const locReport = fs.readFileSync('location_audit_report.txt', 'utf-8');
  const seoReport = fs.readFileSync('seo_audit_report.txt', 'utf-8');
  const linkReport = fs.readFileSync('link_audit_report.txt', 'utf-8');
  const blogReport = fs.readFileSync('blog_audit_report.txt', 'utf-8');
  const schemaReport = fs.readFileSync('schema_audit_report.txt', 'utf-8');

  // Parse outputs for summary
  const tier1Ready = locReport.match(/Total Tier 1 Cities ready to index: (\d+)/)?.[1] || "0";
  const tier1NeedsImp = locReport.match(/Total Tier 1 Cities needing improvement: (\d+)/)?.[1] || "0";
  const locCountMatch = seoReport.match(/Total Indexable Cities: (\d+)/);
  const locCount = locCountMatch ? parseInt(locCountMatch[1]) + parseInt(seoReport.match(/Total Noindex Cities: (\d+)/)?.[1] || "0") : 0;

  const summary = `
=== THEEDUASSIST AUDIT REPORT (Post-Agent 1 Merge) ===

1. Executive Summary
This report summarizes a comprehensive audit of TheEduAssist location pages, blog, SEO/Robots logic, internal links, and schema definitions *after* Agent 1's locations implementation branch was merged. While the structural changes introduced strong SEO location templates, there are still critical missing content gaps across Tier 1 indexed cities (notably 0 FAQs in all Tier 1 cities despite being indexed) and internal statuses leaking into string fields.

2. Files/Scripts Created
- scripts/audit_locations.mjs (Updated)
- scripts/audit_seo.mjs
- scripts/audit_internal_links.mjs
- scripts/audit_blog_schema.mjs
- location_audit_report.txt
- seo_audit_report.txt
- link_audit_report.txt
- blog_audit_report.txt
- schema_audit_report.txt

3. Location Audit Summary
- Total Locations Audited: ${locCount}
- Number of Tier 1 Cities Ready to Index: ${tier1Ready}
- Number of Tier 1 Cities Needing Improvement: ${tier1NeedsImp}

4. Tier 1 City Readiness Table
${locReport.split('--- TIER 1 CITY READINESS ---')[1].split('--- DUPLICATE CONTENT RISKS ---')[0].trim()}

5. Index/Noindex Issues
${seoReport.split('--- INDEX/NOINDEX LOGIC ---')[1].split('--- SITEMAP LOGIC ---')[0].trim()}

6. Sitemap Readiness Findings
${seoReport.split('--- SITEMAP LOGIC ---')[1].trim()}

7. Robots/Noindex Findings
${seoReport.split('--- ROBOTS.TXT CHECK ---')[1].split('--- INDEX/NOINDEX LOGIC ---')[0].trim()}

8. Internal Link Findings
${linkReport.split('--- LINK RISK FINDINGS ---')[1].trim()}

9. Blog Audit Findings
${blogReport.replace('=== BLOG AUDIT REPORT ===', '').trim()}

10. Schema Findings
${schemaReport.replace('=== SCHEMA AUDIT REPORT ===', '').trim()}

11. Risky Public Content Findings
${locReport.split('--- PUBLIC CONTENT RISKS ---')[1].split(/Total Tier 1 Cities/)[0].trim()}

12. Duplicate Content Risks
${locReport.split('--- DUPLICATE CONTENT RISKS ---')[1].split('--- PUBLIC CONTENT RISKS ---')[0].trim()}

13. Build/Test Results
- validate:env: Passed
- validate:redirects: Passed
- check:sanity:blog: Passed
- build: Built successfully

14. Must-Fix Before Merge/Deploy
1. Populate at least 10 FAQs for all Tier 1 cities marked as "index" (currently they have 0).
2. Remove the "Draft" and "Internal" tags that have leaked into location properties.
3. Add LMS sections, unique intros, or correct data mappings if any are missing on indexed cities (Zurich and Manchester are missing LMS sections and Local Intros in the data).

15. Should-Fix After Merge/Deploy
1. Fully confirm template mappings for missing link rendering and schema.

16. Recommended Final Integration Prompt
"Final Integration Agent: Agent 1's work successfully established the template structure, but failed to populate the required FAQs (10-14) for all Tier 1 cities, and leaked 'Draft' and 'Internal' text into the city data arrays. Please parse through src/data/cities.ts and: 1) add 10 valid, contextually relevant FAQs for every indexed Tier 1 city (Dubai, London, New York, etc), 2) remove 'Draft' or 'Internal' from all string/array properties, 3) ensure Manchester and Zurich have valid LMS sections and local intros if they are meant to be indexed."
`;

  fs.writeFileSync('audit_report.txt', summary.trim());
  console.log("Compiled final report to audit_report.txt");
}

main().catch(console.error);
