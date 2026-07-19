import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';

// We'll read built HTML files to validate output metadata
const htmlFiles = globSync('dist/**/*.html');

let hasErrors = false;

const titles = new Set();
const descriptions = new Set();
const canonicals = new Set();

const PRIVATE_ROUTES = [
    '/thank-you',
    '/offline',
    '/sanity-test'
];

htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf-8');
    let route = file.replace('dist/client', '').replace('dist', '').replace('/index.html', '/');
    if (route === '') route = '/';

    // Extract metadata
    const titleMatch = content.match(/<title>([^<]*)<\/title>/i);
    const descMatch = content.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"[^>]*>/i) || content.match(/<meta[^>]*content="([^"]*)"[^>]*name="description"[^>]*>/i);
    const canonicalMatch = content.match(/<link[^>]*rel="canonical"[^>]*href="([^"]*)"[^>]*>/i) || content.match(/<link[^>]*href="([^"]*)"[^>]*rel="canonical"[^>]*>/i);
    const robotsMatch = content.match(/<meta[^>]*name="robots"[^>]*content="([^"]*)"[^>]*>/i) || content.match(/<meta[^>]*content="([^"]*)"[^>]*name="robots"[^>]*>/i);
    const ogTitleMatch = content.match(/<meta[^>]*property="og:title"[^>]*content="([^"]*)"[^>]*>/i);
    const ogDescMatch = content.match(/<meta[^>]*property="og:description"[^>]*content="([^"]*)"[^>]*>/i);
    const ogImageMatch = content.match(/<meta[^>]*property="og:image"[^>]*content="([^"]*)"[^>]*>/i);

    const isPrivate = PRIVATE_ROUTES.some(pr => route.startsWith(pr));

    // Validation
    if (!titleMatch || !titleMatch[1].trim()) {
        console.error(`❌ Missing or empty title in ${route}`);
        hasErrors = true;
    } else {
        if (titles.has(titleMatch[1]) && route !== '/blog/page/') {
            console.error(`❌ Duplicate title found in ${route}: "${titleMatch[1]}"`);
            hasErrors = true;
        }
        titles.add(titleMatch[1]);
        if (titleMatch[1].length < 10) console.warn(`⚠️  Warning: Short title in ${route}`);
    }

    if (!descMatch || !descMatch[1].trim()) {
        console.error(`❌ Missing or empty description in ${route}`);
        hasErrors = true;
    } else {
        if (descriptions.has(descMatch[1]) && route !== '/404.html' && route !== '/blog/page/' && route !== '/about/' && route !== '/home/') {
            console.error(`❌ Duplicate description found in ${route}`);
            hasErrors = true;
        }
        descriptions.add(descMatch[1]);
    }

    if (!canonicalMatch) {
        console.error(`❌ Missing canonical in ${route}`);
        hasErrors = true;
    } else {
        const canUrl = canonicalMatch[1];
        if (canUrl.includes('localhost') || canUrl.includes('vercel.app')) {
            console.error(`❌ Development/Preview domain in canonical for ${route}: ${canUrl}`);
            hasErrors = true;
        }
        if (canonicals.has(canUrl) && route !== '/blog/page/') {
            console.error(`❌ Duplicate canonical URL found in ${route}: ${canUrl}`);
            hasErrors = true;
        }
        canonicals.add(canUrl);
    }

    if (!robotsMatch) {
        console.error(`❌ Missing robots directive in ${route}`);
        hasErrors = true;
    } else {
        const robots = robotsMatch[1].toLowerCase();
        if (isPrivate && !robots.includes('noindex')) {
            console.error(`❌ Private route ${route} is not marked noindex`);
            hasErrors = true;
        } else if (!isPrivate && robots.includes('noindex') && route !== '/404.html' && !route.startsWith('/locations/')) {
            console.error(`❌ Public route ${route} is marked noindex`);
            hasErrors = true;
        }
    }

    if (!ogTitleMatch) {
        console.error(`❌ Missing Open Graph title in ${route}`);
        hasErrors = true;
    }
    if (!ogDescMatch) {
        console.error(`❌ Missing Open Graph description in ${route}`);
        hasErrors = true;
    }
    if (!ogImageMatch) {
        console.error(`❌ Missing Open Graph image in ${route}`);
        hasErrors = true;
    } else if (ogImageMatch[1].startsWith('/')) {
        console.error(`❌ Open Graph image must be absolute URL in ${route}`);
        hasErrors = true;
    }

    const unsupportedClaims = ['zero-data-loss', 'guaranteed turnaround', 'within 48 hours', 'Fortune 500', 'guaranteed ROI', 'ISO/SOC 2 certifications', 'automatic GDPR', 'WCAG compliance', '100% success'];
    unsupportedClaims.forEach(claim => {
        if (descMatch && descMatch[1].toLowerCase().includes(claim.toLowerCase())) {
            console.error(`❌ Unsupported claim phrase "${claim}" in description for ${route}`);
            hasErrors = true;
        }
    });

});

if (hasErrors) {
    console.error('\n🚨 Metadata validation failed.');
    process.exit(1);
} else {
    console.log('\n🎉 Metadata validation passed.');
}
