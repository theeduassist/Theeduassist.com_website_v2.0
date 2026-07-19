import fs from 'fs';
import { globSync } from 'glob';

const htmlFiles = globSync('dist/**/*.html');
let hasErrors = false;

const VALID_DOMAINS = ['https://www.theeduassist.com', '/'];

htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf-8');
    const route = file.replace('dist', '').replace('/index.html', '/') || '/';

    const links = [...content.matchAll(/href="([^"]+)"/g)].map(m => m[1]);

    links.forEach(link => {
        // Skip external links that aren't the main domain
        if (link.startsWith('http') && !VALID_DOMAINS.some(d => link.startsWith(d))) {
            return;
        }

        // Validate internal links
        if (link === '#') {
            console.error(`❌ Empty hash link found in ${route}`);
            hasErrors = true;
        } else if (link === '') {
            console.error(`❌ Empty href found in ${route}`);
            hasErrors = true;
        } else if (link.includes('/thank-you') || link.includes('/sanity-test')) {
             console.error(`❌ Link to removed/private route ${link} found in ${route}`);
             hasErrors = true;
        } else if (link.includes('localhost') || link.includes('vercel.app')) {
             console.error(`❌ Development/preview domain found in link ${link} in ${route}`);
             hasErrors = true;
        } else if (link.includes('/insights/')) {
             console.error(`❌ Legacy /insights/ link found in ${route}: ${link}`);
             hasErrors = true;
        }
    });
});

if (hasErrors) {
    console.error('\n🚨 Internal link validation failed.');
    process.exit(1);
} else {
    console.log('\n🎉 Internal link validation passed.');
}
