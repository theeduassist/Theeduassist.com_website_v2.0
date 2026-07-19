import fs from 'fs';
import { globSync } from 'glob';

const htmlFiles = globSync('dist/**/*.html');
let hasErrors = false;

htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf-8');
    const route = file.replace('dist', '').replace('/index.html', '/') || '/';

    // Find script type="application/ld+json"
    const schemaMatches = content.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi);

    for (const match of schemaMatches) {
        try {
            const schema = JSON.parse(match[1]);
            // basic checks
            if (!schema['@context']) {
                console.error(`❌ Schema missing @context in ${route}`);
                hasErrors = true;
            }
        } catch (e) {
            console.error(`❌ Invalid JSON in structured data for ${route}`);
            hasErrors = true;
        }
    }
});

if (hasErrors) {
    console.error('\n🚨 Structured data validation failed.');
    process.exit(1);
} else {
    console.log('\n🎉 Structured data validation passed.');
}
