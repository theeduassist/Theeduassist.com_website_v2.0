import fs from 'fs';
import path from 'path';

console.log("Validating Article Evidence...");

const part2File = path.join(process.cwd(), 'scripts/migrations/phase5-part2/articles.json');
const part3File = path.join(process.cwd(), 'scripts/migrations/phase5-part3/articles.json');

let hasErrors = false;

function validateArticles(filePath, expectedCount) {
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️ ${filePath} not found yet, skipping.`);
    return;
  }
  const rawData = fs.readFileSync(filePath, 'utf8');
  const articles = JSON.parse(rawData);

  if (articles.length !== expectedCount) {
    console.error(`❌ Expected ${expectedCount} articles in ${filePath}, found ${articles.length}`);
    hasErrors = true;
  }

  const requiredFields = ['title', 'slug', 'articleType', 'targetAudience', 'category', 'author', 'seo', 'body', 'publishedAt'];

  articles.forEach((article, index) => {
    requiredFields.forEach(field => {
      if (!article[field]) {
        console.error(`❌ Article at index ${index} in ${filePath} is missing field: ${field}`);
        hasErrors = true;
      }
    });

    if (article.seo) {
      if (!article.seo.title) {
         console.error(`❌ Article at index ${index} in ${filePath} is missing SEO title`);
         hasErrors = true;
      }
      if (!article.seo.description) {
         console.error(`❌ Article at index ${index} in ${filePath} is missing SEO description`);
         hasErrors = true;
      }
    }

    if (article.body && Array.isArray(article.body)) {
      const hasText = article.body.some(block => block._type === 'block' && block.children && block.children.length > 0);
      if (!hasText) {
         console.error(`❌ Article at index ${index} in ${filePath} has an empty body (no direct answer/text)`);
         hasErrors = true;
      }
    }
  });
}

validateArticles(part2File, 12);
validateArticles(part3File, 14);

if (hasErrors) {
  process.exit(1);
}

console.log("✅ Article evidence validated successfully.");
process.exit(0);
