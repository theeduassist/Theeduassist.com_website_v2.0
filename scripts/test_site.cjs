const http = require('http');
const https = require('https');

async function checkUrl(url) {
  return new Promise((resolve) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, (res) => {
      resolve(res.statusCode);
    }).on('error', (e) => {
      resolve(500);
    });
  });
}

(async () => {
  // We will test the built output directory
  const fs = require('fs');
  const path = require('path');

  const filesToCheck = [
    'sitemap.xml',
    'robots.txt',
    'blog/index.html',
    'blog/page/2/index.html',
    'data/blog/page-2.json'
  ];

  let success = true;
  for (const file of filesToCheck) {
    const filePath = path.join(__dirname, '../dist', file);
    if (fs.existsSync(filePath)) {
      console.log(`[PASS] ${file} exists.`);
    } else {
      console.log(`[FAIL] ${file} is missing.`);
      success = false;
    }
  }

  process.exit(success ? 0 : 1);
})();
