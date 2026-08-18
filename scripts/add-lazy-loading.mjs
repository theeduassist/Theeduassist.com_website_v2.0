import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

function getAllAstroFiles(dir) {
  const files = [];
  const items = readdirSync(dir);
  for (const item of items) {
    const fullPath = join(dir, item);
    if (statSync(fullPath).isDirectory() && !item.includes('node_modules') && !item.includes('.git')) {
      files.push(...getAllAstroFiles(fullPath));
    } else if (item.endsWith('.astro')) {
      files.push(fullPath);
    }
  }
  return files;
}

const files = getAllAstroFiles('src');
let updatedCount = 0;

for (const file of files) {
  let content = readFileSync(file, 'utf8');
  const newContent = content.replace(/<img(?!\s[^>]*loading=)(\s)/g, '<img loading="lazy"$1');
  if (newContent !== content) {
    writeFileSync(file, newContent, 'utf8');
    console.log(`✅ Updated: ${file}`);
    updatedCount++;
  }
}

console.log(`Done! Updated ${updatedCount} files.`);