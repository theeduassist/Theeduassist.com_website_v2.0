import fs from 'fs';
console.log("Authentic Validation: Europe Language Review Requirements...");

const cContent = fs.readFileSync('./src/data/locations/europe-expansion-countries.ts', 'utf8');
const reviewRequiredCount = (cContent.match(/nativeLanguageReviewRequired:\s*true/g) || []).length;

if (reviewRequiredCount === 0) {
  console.error(`ERROR: No native language reviews identified. This violates cultural adaptation requirements.`);
  process.exit(1);
}

console.log(`Verified ${reviewRequiredCount} native language review constraints properly placed.`);
