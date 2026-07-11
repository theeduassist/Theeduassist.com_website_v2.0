import fs from 'fs';
console.log("Authentic Validation: Europe Country Coverage...");

const coverageContent = fs.readFileSync('./src/data/location-research/europe-country-city-coverage.json', 'utf8');
const coverage = JSON.parse(coverageContent);

if (coverage.length < 32) {
  console.error("ERROR: Country coverage JSON contains less than 32 required records.");
  process.exit(1);
}

const cContent = fs.readFileSync('./src/data/locations/europe-expansion-countries.ts', 'utf8');
const generatedCount = (cContent.match(/type:\s*'country'/g) || []).length;
if (generatedCount < 32) {
  console.error(`ERROR: Found only ${generatedCount} country records in TS file. Expected at least 32.`);
  process.exit(1);
}

console.log(`Verified ${generatedCount} country records generated. Coverage audit passed.`);
