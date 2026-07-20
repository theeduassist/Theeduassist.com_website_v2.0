import fs from 'fs';
import path from 'path';

console.log("Validating Phase 5 Part 3 Content Clusters...");
const clusterFile = path.join(process.cwd(), 'src/data/contentClusters/phase5Part3Clusters.ts');

if (!fs.existsSync(clusterFile)) {
  console.error("❌ Cluster file not found:", clusterFile);
  process.exit(1);
}

const content = fs.readFileSync(clusterFile, 'utf8');

const requiredFields = ['cluster:', 'workingTitle:', 'proposedSlug:', 'contentType:', 'primaryAudience:', 'primaryIntent:', 'categoryId:', 'relatedServices:'];
let hasErrors = false;

for (const field of requiredFields) {
  if (!content.includes(field)) {
    console.error(`❌ Missing field in cluster data: ${field}`);
    hasErrors = true;
  }
}

const slugRegex = /proposedSlug:\s*"([^"]+)"/g;
let match;
const slugs = new Set();
let count = 0;
while ((match = slugRegex.exec(content)) !== null) {
  const slug = match[1];
  if (slugs.has(slug)) {
    console.error(`❌ Duplicate slug found: ${slug}`);
    hasErrors = true;
  }
  slugs.add(slug);
  count++;
}

if (count !== 14) {
    console.error(`❌ Expected 14 articles defined in phase5Part3Clusters.ts, found ${count}`);
    hasErrors = true;
}

const supportRegex = /isPillar:\s*false/g;
let supportCount = 0;
while (supportRegex.exec(content) !== null) {
  supportCount++;
}

const pillarSlugRegex = /pillarSlug:\s*"([^"]+)"/g;
let pillarSlugCount = 0;
while (pillarSlugRegex.exec(content) !== null) {
  pillarSlugCount++;
}

if (supportCount !== pillarSlugCount) {
    console.error(`❌ Found ${supportCount} supporting articles but only ${pillarSlugCount} pillarSlugs defined.`);
    hasErrors = true;
}

if (hasErrors) {
  console.error("❌ Phase 5 Part 3 Content cluster validation failed.");
  process.exit(1);
}

console.log("✅ Phase 5 Part 3 Content clusters validated successfully.");
process.exit(0);
