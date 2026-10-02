import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const HOST = 'www.theeduassist.com';
const KEY = 'b50f16bdf5ffe352f6c93e5bcdfdd691';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = 'api.indexnow.org';

const isProduction = process.argv.includes('--production');

function extractSitemapUrls() {
  const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
  if (!fs.existsSync(sitemapPath)) {
    console.error(`❌ sitemap.xml not found at ${sitemapPath}`);
    process.exit(1);
  }

  const content = fs.readFileSync(sitemapPath, 'utf8');
  const matches = [...content.matchAll(/<loc>(https:\/\/[^<]+)<\/loc>/g)].map(m => m[1]);
  return [...new Set(matches)];
}

async function submitIndexNow(urlList) {
  const validUrls = urlList.filter(u => u.startsWith(`https://${HOST}/`));

  console.log(`Extracted ${validUrls.length} valid URLs from sitemap.xml for ${HOST}`);

  if (validUrls.length === 0) {
    console.log('No valid URLs to submit.');
    return;
  }

  const payload = JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: validUrls
  });

  if (!isProduction) {
    console.log('\n[DRY RUN] IndexNow Submission:');
    console.log(`Endpoint: https://${ENDPOINT}/indexnow`);
    console.log(`Host: ${HOST}`);
    console.log(`Key Location: ${KEY_LOCATION}`);
    console.log(`Total URLs: ${validUrls.length}`);
    console.log(`Sample URLs:`);
    validUrls.slice(0, 5).forEach(u => console.log(`  - ${u}`));
    console.log('...\nTo submit to live Bing / IndexNow API, run with --production');
    return;
  }

  console.log(`\nSubmitting ${validUrls.length} URLs to https://${ENDPOINT}/indexnow...`);

  const options = {
    hostname: ENDPOINT,
    port: 443,
    path: '/indexnow',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': Buffer.byteLength(payload)
    }
  };

  const req = https.request(options, (res) => {
    console.log(`IndexNow Response Status: ${res.statusCode} ${res.statusMessage || ''}`);
    let data = '';
    res.on('data', chunk => { data += chunk; });
    res.on('end', () => {
      if (res.statusCode === 200 || res.statusCode === 202) {
        console.log(`✅ Success! ${validUrls.length} URLs submitted to Bing / IndexNow network.`);
        if (data) console.log(`Response message: ${data}`);
      } else {
        console.error(`❌ Submission failed with status: ${res.statusCode}`);
        if (data) console.error(`Response details: ${data}`);
      }
    });
  });

  req.on('error', (error) => {
    console.error(`❌ Request error: ${error.message}`);
  });

  req.write(payload);
  req.end();
}

const allUrls = extractSitemapUrls();
submitIndexNow(allUrls);
