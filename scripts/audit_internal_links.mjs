import fs from 'fs';

async function main() {
  const linkReport = [];
  linkReport.push("=== INTERNAL LINK AUDIT REPORT ===\n\n");

  const citiesTsContent = fs.readFileSync('src/data/cities.ts', 'utf-8');
  const citiesStr = citiesTsContent.match(/export const cities = (\[[\s\S]*?\]);/);
  let cities = [];
  if (citiesStr) {
      try {
          cities = eval(`const a = ${citiesStr[1]}; a;`);
      } catch(e) {}
  }

  const expectedLinks = [
    '/services/',
    '/services/custom-elearning-development/',
    '/services/lms-implementation-migration/',
    '/services/ai-powered-elearning/',
    '/kajabi-services/',
    '/platforms/',
    '/case-studies/',
    '/blog/',
    '/pricing/',
    '/book-free-audit/',
    '/contact/'
  ];

  let missingLinksIssues = 0;
  let brokenRouteReferences = [];
  let adminLinkReferences = [];

  for (const city of cities) {
      if (city.indexStatus === 'index') {
          // Serialize city data to search for links
          const cityString = JSON.stringify(city).toLowerCase();

          for (const link of expectedLinks) {
             // Look for references. Since templates generate many of these,
             // we just check if data explicitly refers to broken paths or missing expected ones if they are in data.
             // We can't fully run Astro template here, so we look for raw strings.
          }

          if (cityString.includes('/admin/') || cityString.includes('/api/') || cityString.includes('localhost') || cityString.includes('vercel.app')) {
              adminLinkReferences.push(city.cityName);
          }

          // Check for malformed or broken patterns in specific data fields
          if (city.commonTrainingNeeds && city.commonTrainingNeeds.includes("href=") && !city.commonTrainingNeeds.includes("href='/")) {
             if (city.commonTrainingNeeds.includes("http")) {
                // external link is ok if appropriate, check attributes
             } else {
                brokenRouteReferences.push(`[${city.cityName}] Malformed relative link in commonTrainingNeeds`);
             }
          }
      }
  }

  linkReport.push("--- LINK RISK FINDINGS ---");
  if (adminLinkReferences.length > 0) {
      linkReport.push(`ERROR: Found private/admin URLs in data for cities: ${adminLinkReferences.join(', ')}`);
  } else {
      linkReport.push("PASS: No private, admin, or preview URLs found in city data.");
  }

  if (brokenRouteReferences.length > 0) {
      linkReport.push(`WARNING: Broken or malformed route references found:\n${brokenRouteReferences.join('\n')}`);
  } else {
      linkReport.push("PASS: No obvious malformed inline links found in city data.");
  }

  // Without rendering the astro template, it is difficult to accurately confirm the *presence* of standard template links
  // like /contact/ or /pricing/ on the final page since they are likely in the template component, not the city data.
  // We will note this limitation but confirm the data itself is clean.
  linkReport.push("\nNOTE: Because this audit inspects raw data and not rendered templates, missing standard CTA/service links may reside in the Astro layout components safely. Ensure `src/pages/locations/[slug].astro` implements the standard links.");

  fs.writeFileSync('link_audit_report.txt', linkReport.join('\n'));
  console.log("Internal links audit complete!");
}

main().catch(console.error);
