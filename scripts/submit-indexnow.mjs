import fs from 'fs';
import path from 'path';
import https from 'https';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const HOST = 'www.theeduassist.com';
const KEY = 'b50f16bdf5ffe352f6c93e5bcdfdd691';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = 'api.indexnow.org';

const isProduction = process.argv.includes('--production');
const isAuto = process.argv.includes('--auto');

function getChangedUrlsFromGit() {
  try {
    const diffOutput = execSync('git diff --name-only HEAD~1 HEAD', { encoding: 'utf8' });
    const files = diffOutput.split('\n').map(f => f.trim()).filter(Boolean);
    const urls = [];
    files.forEach(file => {
      if (file.startsWith('src/content/blog/') && file.endsWith('.md')) {
        const slug = path.basename(file, '.md');
        urls.push(`https://${HOST}/blog/${slug}/`);
      } else if (file.startsWith('src/pages/') && (file.endsWith('.astro') || file.endsWith('.md'))) {
        let route = file.replace('src/pages/', '').replace(/index\.(astro|md)$/, '').replace(/\.(astro|md)$/, '');
        if (!route.endsWith('/')) route += '/';
        if (route === '/') {
          urls.push(`https://${HOST}/`);
        } else if (!route.includes('[') && !route.includes('api/')) {
          urls.push(`https://${HOST}/${route}`);
        }
      }
    });
    return Array.from(new Set(urls));
  } catch (error) {
    console.warn(`⚠️ Git diff check skipped: ${error.message}`);
    return [];
  }
}

function loadManifest() {
  const manifestPath = path.join(__dirname, '../reports/website-2.5-phase-6-part-2-submission-manifest.json');
  try {
    if (fs.existsSync(manifestPath)) {
      const data = fs.readFileSync(manifestPath, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.warn(`⚠️ Failed to read submission manifest: ${error.message}`);
  }
  return { indexNowChanges: { added: [], updated: [], deleted: [] } };
}

function validateUrl(url) {
  if (!url.startsWith(`https://${HOST}/`)) return false;
  if (url.includes('localhost') || url.includes('.vercel.app')) return false;
  if (url.includes('/api/')) return false;
  if (url.includes('?')) return false;
  return true;
}

export async function submitIndexNow(urlList) {
  const validUrls = Array.from(new Set(urlList)).filter(validateUrl);

  if (validUrls.length === 0) {
    console.log('ℹ️ No valid URLs to submit to IndexNow.');
    return;
  }

  if (validUrls.length > 10000) {
    console.error('❌ Batch size exceeds IndexNow limit of 10,000 URLs.');
    process.exit(1);
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
    console.log(`URLs to submit (${validUrls.length}):`);
    validUrls.forEach(u => console.log(`  - ${u}`));
    console.log('\nPass --production to submit live.');
    return;
  }

  console.log(`\n🚀 Submitting ${validUrls.length} URLs to IndexNow (${ENDPOINT})...`);

  return new Promise((resolve, reject) => {
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
      console.log(`IndexNow Response Status: ${res.statusCode}`);
      if (res.statusCode === 200 || res.statusCode === 202) {
        console.log('✅ URLs submitted successfully to IndexNow.');
        resolve(true);
      } else {
        console.error(`❌ IndexNow submission failed with status: ${res.statusCode}`);
        resolve(false);
      }
    });

    req.on('error', (error) => {
      console.error(`❌ IndexNow request error: ${error.message}`);
      reject(error);
    });

    req.write(payload);
    req.end();
  });
}

// Determine URLs to submit
let targetUrls = [];

// 1. Direct URLs passed via command line
const urlArgs = process.argv.filter(arg => arg.startsWith('https://'));
if (urlArgs.length > 0) {
  targetUrls = urlArgs;
} else if (isAuto) {
  // 2. Automated detection from git changes
  const gitUrls = getChangedUrlsFromGit();
  if (gitUrls.length > 0) {
    console.log(`Found ${gitUrls.length} modified/added URLs from git diff.`);
    targetUrls = gitUrls;
  } else {
    console.log('No blog or page changes detected in recent commit.');
  }
} else {
  // 3. Fallback to manifest
  const manifest = loadManifest();
  const changes = manifest.indexNowChanges || { added: [], updated: [], deleted: [] };
  targetUrls = [...changes.added, ...changes.updated, ...changes.deleted];
}

if (targetUrls.length > 0) {
  submitIndexNow(targetUrls);
} else {
  console.log('ℹ️ IndexNow: No target URLs identified for submission.');
}
