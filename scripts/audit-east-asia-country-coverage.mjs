import fs from 'fs';
import path from 'path';

const coveragePath = path.join(process.cwd(), 'src/data/location-research/east-asia-country-city-coverage.json');
const coverageData = JSON.parse(fs.readFileSync(coveragePath, 'utf8'));

let errors = 0;

coverageData.forEach(country => {
    if (!country.officialName || !country.status) {
        console.error(`Error: Missing mandatory fields in country coverage for ${country.commonName}`);
        errors++;
    }
    if (country.status === 'sovereign country' && country.priorityTier === undefined) {
         console.error(`Error: Missing priority tier for sovereign country ${country.commonName}`);
         errors++;
    }
});

if (errors > 0) {
    process.exit(1);
} else {
    console.log('Country coverage audit passed.');
}
