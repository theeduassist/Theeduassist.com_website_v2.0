import fs from 'fs';
import path from 'path';

console.log("Validating Platform Claims for Phase 5 Part 3...");

const articlesFile = path.join(process.cwd(), 'scripts/migrations/phase5-part3/articles.json');
if (!fs.existsSync(articlesFile)) {
  console.log("⚠️ phase5-part3 articles.json not found yet, skipping content validation.");
  process.exit(0);
}

const rawData = fs.readFileSync(articlesFile, 'utf8');
const articles = JSON.parse(rawData);

let hasErrors = false;

articles.forEach((article, index) => {
  const bodyText = JSON.stringify(article.body || []).toLowerCase();

  if (bodyText.includes("zero-data-loss") || bodyText.includes("zero data loss")) {
    console.error(`❌ Article at index ${index} contains unapproved claim: zero data loss`);
    hasErrors = true;
  }
  if (bodyText.includes("official kajabi partner")) {
    console.error(`❌ Article at index ${index} contains unapproved claim: official kajabi partner`);
    hasErrors = true;
  }
  if (bodyText.includes("certified kajabi expert")) {
    console.error(`❌ Article at index ${index} contains unapproved claim: certified kajabi expert`);
    hasErrors = true;
  }
  if (bodyText.includes("guaranteed migration")) {
    console.error(`❌ Article at index ${index} contains unapproved claim: guaranteed migration`);
    hasErrors = true;
  }
  if (bodyText.includes("nist certified") || bodyText.includes("certified by nist") || bodyText.includes("nist certification")) {
    console.error(`❌ Article at index ${index} contains unapproved claim: nist certification`);
    hasErrors = true;
  }
  if (bodyText.includes("automatic wcag compliance") || bodyText.includes("automatically compliant")) {
    console.error(`❌ Article at index ${index} contains unapproved claim: automatic compliance`);
    hasErrors = true;
  }
  if (bodyText.includes("todo") || bodyText.includes("placeholder")) {
    console.error(`❌ Article at index ${index} contains TODO or placeholder`);
    hasErrors = true;
  }

  // Platform Review Date check
  if (article.category === 'kajabi' || article.category === 'lms-learning-technology') {
      if (!bodyText.includes("review date") && !bodyText.includes("last reviewed")) {
          console.error(`❌ Article at index ${index} (Platform category) is missing a review date constraint in body.`);
          hasErrors = true;
      }
  }
});

if (hasErrors) {
  process.exit(1);
}

console.log("✅ Platform claims validated successfully.");
process.exit(0);
