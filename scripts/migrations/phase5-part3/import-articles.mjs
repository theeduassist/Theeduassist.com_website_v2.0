import fs from 'fs';
import path from 'path';
import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = createClient({
  projectId: process.env.PUBLIC_SANITY_PROJECT_ID || process.env.VITE_SANITY_PROJECT_ID,
  dataset: process.env.PUBLIC_SANITY_DATASET || process.env.VITE_SANITY_DATASET || 'production',
  token: process.env.SANITY_WRITE_TOKEN,
  apiVersion: '2024-03-01',
  useCdn: false
});

async function main() {
  if (!process.env.SANITY_WRITE_TOKEN) {
    console.log('Sanity write token not provided. Migration script ready for execution.');
    return;
  }

  const rawData = fs.readFileSync(path.join(__dirname, 'articles.json'), 'utf8');
  const articles = JSON.parse(rawData);

  for (const article of articles) {
    try {
      const res = await client.createOrReplace(article);
      console.log(`Created/Updated: ${res._id}`);
    } catch (err) {
      console.error(`Failed to create: ${article._id}`, err.message);
    }
  }
}

main();
