import fs from 'fs';
import path from 'path';

const file = fs.readFileSync(path.join(process.cwd(), 'src/data/locations/east-asia-cities.ts'), 'utf8');

let errors = 0;

const prefixMatch = file.match(/export const eastAsiaCities: EastAsiaLocation\[\] = (\[[\s\S]*\]);\s*$/);
if (prefixMatch) {
    const array = JSON.parse(prefixMatch[1]);

    // Check if Tier 2 cities are incorrectly indexed
    const templatedIndexed = array.filter(c => c.priorityTier === 2 && c.indexStatus === 'index');
    if (templatedIndexed.length > 0) {
        console.error('Error: Templated Tier 2 cities are marked for indexation.');
        errors++;
    }

    const indexedCities = array.filter(c => c.indexStatus === 'index');
    const uniqueHeroes = new Set(indexedCities.map(c => c.heroIntroduction));
    if (uniqueHeroes.size < indexedCities.length) {
         console.error('Error: Hero introductions for indexed cities are templated/repeated.');
         errors++;
    }
} else {
    errors++;
    console.error("Could not parse cities file for audit.");
}

if (errors > 0) {
  process.exit(1);
} else {
  console.log('City coverage audit passed.');
}
