import fs from 'fs';
import path from 'path';

// The sitemap is generated in the public directory and then copied to dist
const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
let hasErrors = false;

if (fs.existsSync(sitemapPath)) {
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');

    // Check for dev domains
    if (sitemapContent.includes('localhost') || sitemapContent.includes('vercel.app')) {
        console.error('❌ Sitemap contains development or preview domains.');
        hasErrors = true;
    }

    // Parse URLs to ensure they don't contain private endpoints
    const urlMatches = sitemapContent.matchAll(/<loc>([^<]+)<\/loc>/g);
    for (const match of urlMatches) {
        const url = match[1];
        if (url.includes('/api/') || url.includes('/thank-you') || url.includes('/offline') || url.includes('/sanity-test')) {
            console.error(`❌ Sitemap contains invalid URL: ${url}`);
            hasErrors = true;
        }
    }
} else {
    console.error('❌ sitemap.xml not found at ' + sitemapPath);
    hasErrors = true;
}

if (hasErrors) {
    console.error('\n🚨 Sitemap validation failed.');
    process.exit(1);
} else {
    console.log('\n🎉 Sitemap validation passed.');
}
