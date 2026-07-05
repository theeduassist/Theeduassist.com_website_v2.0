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
=== THEEDUASSIST AUDIT REPORT ===

1. Executive Summary
This report summarizes a comprehensive audit of TheEduAssist location pages, blog, SEO/Robots logic, internal links, and schema definitions. Overall build succeeds, but there are major content gaps in indexed Tier 1 cities and several internal statuses leaking into templates.

2. Files/Scripts Created
- scripts/audit_locations.mjs
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
- check:sanity:blog: Missing package originally, passed after install
- build: Built successfully (853 pages built in ~34.5s)

14. Must-Fix Before Merge
1. Add missing FAQs (need 10-14) to all Tier 1 indexed cities (New York, London, Dubai, etc.).
2. Remove "Internal" status phrases leaking into location data arrays/strings.
3. If Tier 1 cities are not ready, set indexStatus to 'noindex' temporarily.

15. Should-Fix After Merge
1. Ensure full unique local intros are populated.
2. Confirm the exact internal linking components (CTA, Services) are actively rendering in the Astro template layout.

16. Recommended Next Prompt for Agent 1 or Final Integration Agent
"Agent 1: Please update the 'faqs' array for all Tier 1 cities (Dubai, London, New York, etc.) in src/data/cities.ts so they contain at least 10 valid FAQs. Additionally, remove any instances of the word 'Internal' from the city data, and verify the indexStatus is accurate based on content readiness."
`;

  fs.writeFileSync('audit_report.txt', summary.trim());
  console.log("Compiled final report to audit_report.txt");
}

main().catch(console.error);
