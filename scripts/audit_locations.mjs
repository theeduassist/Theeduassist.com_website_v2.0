import fs from 'fs';

async function main() {
  // Read file manually since we can't easily dynamically import TS without ts-node or similar.
  const citiesTsContent = fs.readFileSync('src/data/cities.ts', 'utf-8');

  // A somewhat hacky but robust enough extraction logic for this specific case
  // since we just need to parse the JSON array from cities.ts
  const citiesStr = citiesTsContent.match(/export const cities = (\[[\s\S]*?\]);/);
  if (!citiesStr) {
      console.error("Could not find cities array");
      process.exit(1);
  }
  let cities = [];
  try {
      // Because it contains expressions or comments sometimes, we might need a safer eval
      const script = `const a = ${citiesStr[1]}; a;`;
      cities = eval(script);
  } catch(e) {
      console.error("Failed to parse cities:", e);
      // fallback just regex the string if eval fails due to imports etc
  }

  const regionsTsContent = fs.readFileSync('src/data/regionsAndCountries.ts', 'utf-8');
  let regions = [];
  let countries = [];
  try {
      const regionsStr = regionsTsContent.match(/export const regions = (\[[\s\S]*?\]);/);
      if (regionsStr) regions = eval(`(${regionsStr[1]})`);

      const countriesStr = regionsTsContent.match(/export const countries = (\[[\s\S]*?\]);/);
      if (countriesStr) countries = eval(`(${countriesStr[1]})`);
  } catch(e) {
      console.error("Failed to parse regions/countries:", e);
  }

  const reportData = [];

  reportData.push("=== LOCATION AUDIT REPORT ===\n\n");

  const tier1Cities = [
    "Dubai", "London", "New York", "Toronto", "Singapore", "Sydney", "Melbourne",
    "Riyadh", "Doha", "Abu Dhabi", "Jeddah", "Manchester", "Vancouver", "Los Angeles",
    "San Francisco", "Chicago", "Dublin", "Berlin", "Amsterdam", "Paris", "Zurich",
    "Kuala Lumpur", "Mumbai", "Bangalore", "Karachi", "Lahore", "Islamabad", "Cape Town",
    "Johannesburg"
  ];

  const duplicateContentRisks = [];
  const fakeOfficeClaims = [];
  const publicContentRisks = [];
  const riskyPhrases = [
    "near me", "local office", "our office in", "address", "phone number",
    "visit our office", "physically located", "Review Pending", "Draft",
    "Admin", "Private", "Internal", "localhost", "vercel.app",
    "sanity.studio", "preview", "/admin", "/api/private"
  ];

  let intros = {};
  let quickAnswers = {};
  let localNeeds = {};
  let faqs = {};

  reportData.push("--- TIER 1 CITY READINESS ---");
  reportData.push(
    "City | URL | Index Status | FAQ Count | LMS Section | Local Intro | CTA | Internal Links | Verdict"
  );
  reportData.push("---------------------------------------------------------------------------------------------------------");

  const checkRisk = (text, name) => {
    if (!text) return;
    const lower = typeof text === 'string' ? text.toLowerCase() : JSON.stringify(text).toLowerCase();
    for (const phrase of riskyPhrases) {
      if (lower.includes(phrase.toLowerCase())) {
         publicContentRisks.push(`[${name}] contains risky phrase: "${phrase}"`);
         if (["near me", "local office", "our office in", "address", "phone number", "visit our office", "physically located"].includes(phrase)) {
           fakeOfficeClaims.push(`[${name}] contains fake local claim: "${phrase}"`);
         }
      }
    }
  };

  const results = [];
  let tier1ReadyCount = 0;
  let tier1NeedsImprovementCount = 0;

  for (const city of cities) {
     const name = city.cityName;

     // Duplicates check
     if (city.shortHero) {
       if (intros[city.shortHero]) duplicateContentRisks.push(`Duplicate intro in ${name} (same as ${intros[city.shortHero]})`);
       else intros[city.shortHero] = name;
     }
     if (city.quickAnswer) {
       if (quickAnswers[city.quickAnswer]) duplicateContentRisks.push(`Duplicate Quick Answer in ${name} (same as ${quickAnswers[city.quickAnswer]})`);
       else quickAnswers[city.quickAnswer] = name;
     }
     if (city.commonTrainingNeeds) {
       if (localNeeds[city.commonTrainingNeeds]) duplicateContentRisks.push(`Duplicate local needs in ${name} (same as ${localNeeds[city.commonTrainingNeeds]})`);
       else localNeeds[city.commonTrainingNeeds] = name;
     }

     // risk check
     checkRisk(city, name);

     if (tier1Cities.includes(name)) {
        let verdict = "ready to index";
        const isIndex = city.indexStatus === "index";
        const faqCount = city.faqs ? city.faqs.length : 0;
        const hasLMS = city.commonlyUsedLMSPlatforms ? "Yes" : "No";
        const hasIntro = city.shortHero ? "Yes" : "No";
        const hasCTA = "Yes"; // assume CTA in template
        const hasInternalLinks = (city.bestServices && city.bestServices.length > 0) ? "Yes" : "No";

        let issues = [];
        if (!hasIntro) issues.push("Needs unique local intro");
        if (!city.quickAnswer) issues.push("Needs Quick Answer");
        if (faqCount < 10) issues.push(`Needs more FAQs (has ${faqCount})`);
        if (!hasLMS) issues.push("Needs LMS section");

        if (issues.length > 0) {
            verdict = issues.join(", ");
            if (isIndex) verdict += " (BUT IS INDEXED!)";
            tier1NeedsImprovementCount++;
        } else {
            if (!isIndex) verdict = "Ready but marked noindex";
            tier1ReadyCount++;
        }

        reportData.push(
          `${name} | /locations/${city.slug} | ${city.indexStatus} | ${faqCount} | ${hasLMS} | ${hasIntro} | ${hasCTA} | ${hasInternalLinks} | ${verdict}`
        );
     }
  }

  reportData.push("\n--- DUPLICATE CONTENT RISKS ---");
  if (duplicateContentRisks.length > 0) {
      reportData.push(duplicateContentRisks.join("\n"));
  } else {
      reportData.push("No exact duplicates found for intro/quick answer/local needs.");
  }

  reportData.push("\n--- PUBLIC CONTENT RISKS ---");
  if (publicContentRisks.length > 0) {
      reportData.push([...new Set(publicContentRisks)].join("\n"));
  } else {
      reportData.push("No public content risks found.");
  }

  reportData.push(`\nTotal Tier 1 Cities ready to index: ${tier1ReadyCount}`);
  reportData.push(`Total Tier 1 Cities needing improvement: ${tier1NeedsImprovementCount}`);

  fs.writeFileSync('location_audit_report.txt', reportData.join("\n"));
  console.log("Location audit complete!");
}

main().catch(console.error);
