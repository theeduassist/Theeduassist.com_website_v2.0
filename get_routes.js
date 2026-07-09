import fs from 'fs';
const file = fs.readFileSync('src/lib/content/getAllPublicRoutes.ts', 'utf-8');
console.log("File loaded");
