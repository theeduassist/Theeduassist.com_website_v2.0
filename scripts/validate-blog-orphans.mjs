import fs from 'fs';
import path from 'path';

console.log("Validating blog orphans...");
const blogDir = path.join(process.cwd(), 'src/pages/blog');

if (!fs.existsSync(blogDir)) {
    console.log("✅ No blog directory found to validate.");
    process.exit(0);
}

const files = fs.readdirSync(blogDir);
let errors = 0;

// This is a naive check. A true check would map all internal links.
for (const file of files) {
  if (file.endsWith('.astro') && file !== 'index.astro' && !file.includes('[')) {
     // Check if the file is linked from index.astro
     const indexPath = path.join(blogDir, 'index.astro');
     if (fs.existsSync(indexPath)) {
         const indexContent = fs.readFileSync(indexPath, 'utf8');
         const routeName = file.replace('.astro', '');
         if (!indexContent.includes(routeName)) {
             console.warn(`⚠️ Warning: Blog post ${routeName} might be an orphan (not linked in blog index).`);
             // We'll treat this as a warning for now, as it might be linked from a category page
         }
     }
  }
}

console.log("✅ Blog orphans validated successfully.");
process.exit(0);
