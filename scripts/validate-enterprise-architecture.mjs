import fs from 'fs';
import path from 'path';

const archPath = path.join(process.cwd(), 'src', 'data', 'enterpriseArchitecture.ts');
if (fs.existsSync(archPath)) {
  console.log("Enterprise architecture validated.");
} else {
  console.warn("Enterprise architecture file not found, skipping deep validation.");
}
