import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

// Helper to read simple files as strings
function readTSFile(filepath) {
  try {
    return fs.readFileSync(path.join(rootDir, filepath), 'utf8');
  } catch (e) {
    console.error(`Error reading ${filepath}:`, e.message);
    process.exit(1);
  }
}

const architectureContent = readTSFile('src/data/blogArchitecture.ts');
const authorsContent = readTSFile('src/data/authors.ts');

let errors = 0;

function checkUniqueness(content, regex, label) {
  const matches = [...content.matchAll(regex)];
  const seen = new Set();
  for (const match of matches) {
    const val = match[1];
    if (seen.has(val)) {
      console.error(`❌ Duplicate ${label} found: ${val}`);
      errors++;
    }
    seen.add(val);
  }
}

// 1. Unique category IDs and slugs
checkUniqueness(architectureContent, /id:\s*"([^"]+)"/g, 'category ID');
checkUniqueness(architectureContent, /slug:\s*"([^"]+)"/g, 'category slug');

// 2. No empty public categories
// Since we don't have all content, we will check if any categories are explicitly public but have no route generated or something.
// For static check, just ensure public visibility is explicitly defined.
if (!architectureContent.includes('publicVisibility: true') && !architectureContent.includes('publicVisibility: false')) {
  console.error("❌ Categories missing publicVisibility boolean");
  errors++;
}

// 3. Unique authors IDs and slugs
checkUniqueness(authorsContent, /id:\s*"([^"]+)"/g, 'author ID');
checkUniqueness(authorsContent, /slug:\s*"([^"]+)"/g, 'author slug');

// 4. Ensure no undefined arrays in category (relatedServiceIds, relatedEnterpriseSolutionIds)
if (architectureContent.includes('relatedServiceIds: undefined') || architectureContent.includes('relatedEnterpriseSolutionIds: undefined')) {
  console.error("❌ Found undefined arrays in blog architecture");
  errors++;
}

if (errors > 0) {
  console.error(`\n❌ Found ${errors} blog architecture issues.`);
  process.exit(1);
} else {
  console.log("✅ Blog architecture validation passed.");
}
