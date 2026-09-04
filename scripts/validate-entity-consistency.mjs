import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, '../dist');

async function validateEntityConsistency() {
    console.log("Validating Entity Consistency...");
    let hasErrors = false;

    // Check Organization Schema on Homepage
    const homeHtmlPath = path.join(distDir, 'index.html');
    if (!fs.existsSync(homeHtmlPath)) {
        console.error(`Homepage HTML not found at ${homeHtmlPath}`);
        process.exit(1);
    }
    const homeHtml = fs.readFileSync(homeHtmlPath, 'utf8');

    // Simplistic check for schema structure
    if (!homeHtml.includes('"@type":"Organization"')) {
        console.error("Organization schema missing or differently formatted on homepage.");
        hasErrors = true;
    }

    if (!homeHtml.includes('TheEduAssist')) {
        console.error("Organization name 'TheEduAssist' not found in homepage HTML.");
        hasErrors = true;
    }

    // Validate organization data source
    const entityFile = path.join(__dirname, '../src/data/organizationEntity.ts');
    if (!fs.existsSync(entityFile)) {
        console.error(`Organization entity definition missing at ${entityFile}`);
        hasErrors = true;
    } else {
        const entityContent = fs.readFileSync(entityFile, 'utf8');
        if (!entityContent.includes('TheEduAssist')) {
            console.error('Organization entity name incorrect or missing in data source.');
            hasErrors = true;
        }
    }

    if (hasErrors) {
        console.error('Entity consistency validation failed.');
        process.exit(1);
    }

    console.log("Entity Consistency Validated.");
}

validateEntityConsistency();
