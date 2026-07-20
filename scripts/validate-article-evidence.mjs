import fs from 'fs';
import path from 'path';

console.log("Validating Article Evidence...");

const articlesFile = path.join(process.cwd(), 'scripts/migrations/phase5-part2/articles.json');
if (!fs.existsSync(articlesFile)) {
  console.error("❌ articles.json not found.");
  process.exit(1);
}

const rawData = fs.readFileSync(articlesFile, 'utf8');
const articles = JSON.parse(rawData);

if (articles.length !== 12) {
  console.error(`❌ Expected 12 articles, found ${articles.length}`);
  process.exit(1);
}

const requiredFields = ['title', 'slug', 'articleType', 'targetAudience', 'category', 'author', 'seo', 'body', 'publishedAt'];
let hasErrors = false;

articles.forEach((article, index) => {
  requiredFields.forEach(field => {
    if (!article[field]) {
      console.error(`❌ Article at index ${index} is missing field: ${field}`);
      hasErrors = true;
    }
  });

  if (article.seo) {
    if (!article.seo.title) {
       console.error(`❌ Article at index ${index} is missing SEO title`);
       hasErrors = true;
    }
    if (!article.seo.description) {
       console.error(`❌ Article at index ${index} is missing SEO description`);
       hasErrors = true;
    }
  }

  // Ensure body has a direct answer (some text content)
  if (article.body && Array.isArray(article.body)) {
    const hasText = article.body.some(block => block._type === 'block' && block.children && block.children.length > 0);
    if (!hasText) {
       console.error(`❌ Article at index ${index} has an empty body (no direct answer/text)`);
       hasErrors = true;
    }
  }
});

if (hasErrors) {
  process.exit(1);
}

console.log("✅ Article evidence validated successfully.");
process.exit(0);
