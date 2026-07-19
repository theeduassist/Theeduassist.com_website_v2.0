import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const authorsContent = fs.readFileSync(path.join(rootDir, 'src/data/authors.ts'), 'utf8');

let errors = 0;

if (authorsContent.includes('schemaType: "Fake"')) {
  console.error("❌ Invalid schemaType for author");
  errors++;
}

if (errors > 0) {
  process.exit(1);
} else {
  console.log("✅ Author validation passed.");
}
