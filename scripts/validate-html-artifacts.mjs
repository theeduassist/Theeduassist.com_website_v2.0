import fs from 'fs';
import path from 'path';

const distBlogDir = path.join(process.cwd(), 'dist/blog');
let hasErrors = false;

function traverseDirectory(dir) {
  if (!fs.existsSync(dir)) return;

  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      traverseDirectory(fullPath);
    } else if (fullPath.endsWith('.html')) {
      const content = fs.readFileSync(fullPath, 'utf8');

      // Specifically look for `++<a` or `</a>++` or standalone `++` wrapping text
      // We look for ++ around standard elements that might be styled.
      if (content.includes('++<a') || content.includes('</a>++')) {
        console.error(`❌ ERROR: Found "++" wrapper artifact around links in generated HTML: ${fullPath}`);
        hasErrors = true;
      }
    }
  }
}

if (fs.existsSync(distBlogDir)) {
  traverseDirectory(distBlogDir);
} else {
  console.log('⚠️ Warning: dist/blog directory does not exist. Run build first.');
}

if (hasErrors) {
  process.exit(1);
} else {
  console.log('✅ HTML Artifacts validation passed.');
}
