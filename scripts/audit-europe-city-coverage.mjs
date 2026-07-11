import fs from 'fs';
console.log("Authentic Validation: Europe City Coverage...");

const cityContent = fs.readFileSync('./src/data/locations/europe-expansion-cities.ts', 'utf8');
const generatedCount = (cityContent.match(/type:\s*'city'/g) || []).length;
if (generatedCount < 21) {
  console.error(`ERROR: Found only ${generatedCount} city records in TS file. Expected at least 21.`);
  process.exit(1);
}

console.log(`Verified ${generatedCount} city records generated. City coverage audit passed.`);
