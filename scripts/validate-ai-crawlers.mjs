import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, '../dist');

async function validateAiCrawlers() {
    console.log("Validating AI Crawlers policy...");
    const robotsPath = path.join(distDir, 'robots.txt');
    let hasErrors = false;
    if (fs.existsSync(robotsPath)) {
        const robotsContent = fs.readFileSync(robotsPath, 'utf8');
        if (!robotsContent.includes('User-agent: OAI-SearchBot')) {
            console.error('OAI-SearchBot policy not explicitly defined in robots.txt');
            hasErrors = true;
        }
        if (!robotsContent.includes('User-agent: GPTBot')) {
            console.error('GPTBot policy not explicitly defined in robots.txt');
            hasErrors = true;
        }
    } else {
        console.error('robots.txt not found in dist dir');
        hasErrors = true;
    }

    if (hasErrors) {
        console.error("AI Crawlers policy validation failed.");
        process.exit(1);
    }
    console.log("AI Crawlers policy Validated.");
}

validateAiCrawlers();
