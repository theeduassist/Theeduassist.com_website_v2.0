import fs from 'fs';
import path from 'path';

let errors = 0;

const loadData = () => {
    const countriesText = fs.readFileSync(path.join(process.cwd(), 'src/data/locations/east-asia-countries.ts'), 'utf8');
    const citiesText = fs.readFileSync(path.join(process.cwd(), 'src/data/locations/east-asia-cities.ts'), 'utf8');
    return { countriesText, citiesText };
};

const validate = () => {
    const { countriesText, citiesText } = loadData();

    // Using simple checks for now based on prompt constraints.
    // Ensure no unsupported blocked claims.
    if (countriesText.includes('is completely blocked without local CDN') && !countriesText.includes('testing is required')) {
        console.error('Error: Unsupported blocked claim detected.');
        errors++;
    }

    // canonicalPath check
    if (countriesText.includes('canonicalPath:') && !countriesText.includes('https://www.')) {
         console.error('Error: Canonical path does not use www.');
         errors++;
    }

    if (errors > 0) {
        console.error(`Validation failed with ${errors} errors.`);
        process.exit(1);
    } else {
        console.log('Location data validation passed.');
    }
};

validate();
