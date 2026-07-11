import fs from 'fs';

let hasErrors = false;
console.log("Authentic Validation: Europe Expansion Data...");

const countriesFile = './src/data/locations/europe-expansion-countries.ts';
const citiesFile = './src/data/locations/europe-expansion-cities.ts';

if (!fs.existsSync(countriesFile) || !fs.existsSync(citiesFile)) {
  console.error("ERROR: Missing data files");
  process.exit(1);
}

const cContent = fs.readFileSync(countriesFile, 'utf8');
const cityContent = fs.readFileSync(citiesFile, 'utf8');

// Check for Global
if (cContent.includes('region: "global"') || cContent.includes("region: 'global'") ||
    cityContent.includes('region: "global"') || cityContent.includes("region: 'global'")) {
  console.error("ERROR: Found region 'global' in files. This is forbidden.");
  hasErrors = true;
}

// Check Canonical WWW
if (cContent.includes('canonicalPath: "https://theeduassist') || cityContent.includes('canonicalPath: "https://theeduassist')) {
  console.error("ERROR: Canonical paths must use www.theeduassist.com");
  hasErrors = true;
}

// Verify Indexable records have correct constraints
const indexableCountries = [...cContent.matchAll(/indexStatus:\s*'index'(?:.|\n)*?faqs:\s*\[(.*?)\]/g)];
indexableCountries.forEach(match => {
  const faqBlock = match[1];
  const qCount = (faqBlock.match(/{ q:/g) || []).length;
  if (qCount < 8) {
    console.error("ERROR: Indexable country found with fewer than 8 FAQs.");
    hasErrors = true;
  }
});

const indexableCities = [...cityContent.matchAll(/indexStatus:\s*'index'(?:.|\n)*?faqs:\s*\[(.*?)\]/g)];
indexableCities.forEach(match => {
  const faqBlock = match[1];
  const qCount = (faqBlock.match(/{ q:/g) || []).length;
  if (qCount < 8) {
    console.error("ERROR: Indexable city found with fewer than 8 FAQs.");
    hasErrors = true;
  }
});

if (hasErrors) {
  process.exit(1);
} else {
  console.log("Validation passed successfully.");
}
