import { readFileSync, writeFileSync } from 'fs';

// Read cities.ts
const citiesContent = readFileSync('src/data/cities.ts', 'utf8');
const regionsContent = readFileSync('src/data/regionsAndCountries.ts', 'utf8');

// Extract just the array content using a simpler approach
// Find all city slugs and indexStatus
const cityMatches = [...citiesContent.matchAll(/"slug":\s*"([^"]+)"[\s\S]*?"indexStatus":\s*"([^"]+)"/g)];
const regionMatches = [...regionsContent.matchAll(/"slug":\s*"([^"]+)"/g)];

const cities = cityMatches.map(m => ({ slug: m[1], indexStatus: m[2] }));

// Get region and country slugs from regionsAndCountries.ts
const regionSection = regionsContent.split('export const countries')[0];
const countrySection = regionsContent.split('export const countries')[1];

const regionSlugs = [...regionSection.matchAll(/"slug":\s*"([^"]+)"/g)].map(m => ({ slug: m[1] }));
const countrySlugs = [...(countrySection || '').matchAll(/"slug":\s*"([^"]+)"/g)].map(m => ({ slug: m[1] }));

const locationsData = {
  regions: regionSlugs,
  countries: countrySlugs,
  cities: cities
};

writeFileSync('src/data/locations.json', JSON.stringify(locationsData, null, 2), 'utf8');
console.log(`✅ Generated locations.json with ${cities.length} cities, ${regionSlugs.length} regions, ${countrySlugs.length} countries`);