import fs from 'fs';
import path from 'path';

// The sitemap is generated in the public directory and then copied to dist
let sitemapPath = path.join(process.cwd(), 'dist', 'sitemap.xml');
if (!fs.existsSync(sitemapPath)) {
  sitemapPath = path.join(process.cwd(), '.vercel/output/static', 'sitemap.xml');
}
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
        const lastmodMatch = match[0].match(/<lastmod>([^<]+)<\/lastmod>/);
        if (lastmodMatch) {
            const lastmodDate = new Date(lastmodMatch[1]);
            if (lastmodDate > new Date()) {
                console.error(`❌ Future lastmod found: ${lastmodMatch[1]} in ${url}`);
                hasErrors = true;
            }
        }
        if (url.includes('/api/') || url.includes('/thank-you') || url.includes('/offline') || url.includes('/sanity-test') || url.includes('?success=')) {
            console.error(`❌ Sitemap contains invalid URL: ${url}`);
            hasErrors = true;
        }

        if (!url.endsWith('/') && url !== 'https://www.theeduassist.com' && !url.includes('.xml')) {
            console.error(`❌ Sitemap URL missing trailing slash: ${url}`);
            hasErrors = true;
        }

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
