import fs from 'fs';
const file = fs.readFileSync('src/pages/sitemap/index.astro', 'utf-8');
console.log(file);
