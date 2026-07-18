import fs from 'fs';
import path from 'path';

// Simplistic parsing for validation script to avoid TS execution in basic environment
const conversionFilePath = path.join(process.cwd(), 'src', 'data', 'conversionArchitecture.ts');
const fileContent = fs.readFileSync(conversionFilePath, 'utf-8');

const idMatches = [...fileContent.matchAll(/id:\s*"([^"]+)"/g)].map(m => m[1]);
const canonicalMatches = [...fileContent.matchAll(/canonical:\s*"([^"]+)"/g)].map(m => m[1]);
const hrefMatches = [...fileContent.matchAll(/href:\s*"([^"]+)"/g)].map(m => m[1]);
const formIdMatches = [...fileContent.matchAll(/formId:\s*"([^"]+)"/g)].map(m => m[1]);
const analyticsMatches = [...fileContent.matchAll(/analyticsCategory:\s*"([^"]+)"/g)].map(m => m[1]);

let hasErrors = false;

function checkDuplicates(arr, name) {
  const seen = new Set();
  for (const item of arr) {
    if (seen.has(item)) {
      console.error(`Validation Error: Duplicate ${name} found: ${item}`);
      hasErrors = true;
    }
    seen.add(item);
  }
}

checkDuplicates(idMatches, "id");
checkDuplicates(formIdMatches, "formId");

for (const href of hrefMatches) {
  if (href === '#' || href === '/') {
    console.error(`Validation Error: Invalid href found: ${href}`);
    hasErrors = true;
  }
}

for (const analytics of analyticsMatches) {
  if (/\s/.test(analytics)) {
    console.error(`Validation Error: Analytics category contains spaces: ${analytics}`);
    hasErrors = true;
  }
}

if (hasErrors) {
  process.exit(1);
} else {
  console.log("Conversion architecture validated successfully.");
}
