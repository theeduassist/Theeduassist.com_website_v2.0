import fs from 'fs';
import path from 'path';

console.log("Validating Phase 5 Content Quality...");

const srcDir = path.join(process.cwd(), 'src');

function validateContentFile(filePath) {
  let errors = 0;
  const content = fs.readFileSync(filePath, 'utf8');

  // Simple heuristics for placeholder text
  if (content.includes('TODO:') || content.includes('TODO ')) {
    console.error(`❌ Found TODO marker in ${filePath}`);
    errors++;
  }
  if (content.includes('Lorem ipsum')) {
    console.error(`❌ Found placeholder text 'Lorem ipsum' in ${filePath}`);
    errors++;
  }

  return errors;
}

function traverseDirectory(dir) {
  let totalErrors = 0;
  if (!fs.existsSync(dir)) return totalErrors;
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      totalErrors += traverseDirectory(fullPath);
    } else if (file.endsWith('.ts') || file.endsWith('.astro') || file.endsWith('.md')) {
      totalErrors += validateContentFile(fullPath);
    }
  }
  return totalErrors;
}

const totalErrors = traverseDirectory(srcDir);

if (totalErrors > 0) {
    console.error(`❌ Phase 5 content quality validation failed with ${totalErrors} errors.`);
    process.exit(1);
}

console.log("✅ Phase 5 content quality validated successfully.");
process.exit(0);
