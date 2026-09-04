import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, '../dist');

async function validateAnswerReadiness() {
    console.log("Validating Answer Readiness...");

    let hasErrors = false;

    // Check specific important pages
    const importantPages = [
        'index.html',
        'services/instructional-design/index.html',
        'enterprise-solutions/index.html'
    ];

    for (const page of importantPages) {
        const pagePath = path.join(distDir, page);
        if (!fs.existsSync(pagePath)) {
            console.error(`Page HTML not found at ${pagePath}`);
            hasErrors = true;
            continue;
        }

        const html = fs.readFileSync(pagePath, 'utf8');

        // Ensure there is exactly 1 H1
        const h1Matches = html.match(/<h1[^>]*>/ig) || [];
        if (h1Matches.length === 0) {
            console.error(`No H1 tag found on ${page}.`);
            hasErrors = true;
        } else if (h1Matches.length > 1) {
            console.error(`Multiple H1 tags found on ${page} (${h1Matches.length}). Exactly one is required.`);
            hasErrors = true;
        }

        // simplistic check for target audience context
        if (page.includes('services/')) {
            if (!html.includes('Who This Service is For') && !html.includes('Target Audience') && !html.includes('Audience') && !html.includes('Who this is for')) {
                 console.error(`Service page ${page} does not seem to define its target audience clearly.`);
                 hasErrors = true;
            }
        }
    }

    if (hasErrors) {
        console.error("Answer Readiness validation failed.");
        process.exit(1);
    }

    console.log("Answer Readiness Validated.");
}

validateAnswerReadiness();
