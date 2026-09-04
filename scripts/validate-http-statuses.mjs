import http from 'http';

const ROUTES_TO_TEST = [
  '/',
  '/services/',
  '/blog/',
  '/robots.txt',
  '/sitemap.xml',
  '/rss.xml'
];

const ROUTES_404 = [
  '/blog/this-is-a-fake-article-that-does-not-exist/',
  '/authors/fake-author-does-not-exist/',
  '/category/fake-category-does-not-exist/',
  '/locations/fake-location-does-not-exist/'
];

function checkUrl(path) {
  return new Promise((resolve) => {
    http.get(`http://localhost:4321${path}`, (res) => {
      resolve({ path, statusCode: res.statusCode, headers: res.headers });
    }).on('error', (err) => {
      console.error(`Error requesting ${path}: ${err.message}`);
      resolve({ path, statusCode: 0, error: err.message });
    });
  });
}

async function validateHttpStatuses() {
  console.log('Validating HTTP Statuses on http://localhost:4321 ...');
  let failed = false;

  for (const route of ROUTES_TO_TEST) {
    const res = await checkUrl(route);
    // Note: Astro dev server might do 301 redirects to trailing slashes
    if (res.statusCode !== 200 && res.statusCode !== 301 && res.statusCode !== 308) {
      console.error(`❌ Expected 200/301 for ${route}, got ${res.statusCode}`);
      failed = true;
    } else {
      console.log(`✅ ${route} -> ${res.statusCode}`);
    }
  }

  for (const route of ROUTES_404) {
    const res = await checkUrl(route);
    if (res.statusCode !== 404) {
      console.error(`❌ Expected 404 for missing route ${route}, got ${res.statusCode}`);
      failed = true;
    } else {
      console.log(`✅ ${route} -> 404`);
    }
  }

  if (failed) {
    console.error('🚨 HTTP Status validation failed.');
    process.exit(1);
  } else {
    console.log('✅ HTTP Statuses validated successfully.');
  }
}

console.log("Ensure the app is running on port 4321 before running this script.");
validateHttpStatuses();
