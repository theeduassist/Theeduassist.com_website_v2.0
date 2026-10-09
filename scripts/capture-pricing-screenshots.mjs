import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import http from 'http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const artifactDir = 'C:\\Users\\ahesh\\.gemini\\antigravity\\brain\\9e779cad-d49e-4932-a6db-42b41cbef81c';

// Simple static server for dist
function startServer(port = 8765) {
  return new Promise((resolve, reject) => {
    const mimeTypes = {
      '.html': 'text/html',
      '.css': 'text/css',
      '.js': 'text/javascript',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.svg': 'image/svg+xml',
      '.webp': 'image/webp',
      '.ico': 'image/x-icon'
    };

    const server = http.createServer((req, res) => {
      let reqPath = req.url.split('?')[0];
      if (reqPath.endsWith('/')) reqPath += 'index.html';
      let filePath = path.join(distDir, reqPath);

      if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, 'index.html');
      }

      if (!fs.existsSync(filePath)) {
        res.writeHead(404);
        res.end('Not found: ' + reqPath);
        return;
      }

      const ext = path.extname(filePath);
      const mime = mimeTypes[ext] || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': mime });
      fs.createReadStream(filePath).pipe(res);
    });

    server.listen(port, () => resolve(server));
    server.on('error', reject);
  });
}

async function capture() {
  const port = 8765;
  const server = await startServer(port);
  console.log(`Server running at http://localhost:${port}`);

  let browser;
  try {
    browser = await chromium.launch({
      channel: 'msedge', // use installed Edge or Chrome
      headless: true
    });
  } catch (e) {
    try {
      browser = await chromium.launch({
        channel: 'chrome',
        headless: true
      });
    } catch (err) {
      browser = await chromium.launch({ headless: true });
    }
  }

  // 1. Capture Western Visitor View (US Timezone, US IP mock)
  const usContext = await browser.newContext({
    viewport: { width: 1280, height: 1600 },
    timezoneId: 'America/New_York',
    locale: 'en-US'
  });

  const usPage = await usContext.newPage();
  // Mock country.is response to US
  await usPage.route('https://api.country.is/**', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ ip: '8.8.8.8', country: 'US' })
    });
  });

  await usPage.goto(`http://localhost:${port}/pricing/`, { waitUntil: 'networkidle' });
  await usPage.waitForTimeout(1000);

  // Screenshot of the Interactive Cost Estimator in Western mode (USD)
  const estimatorSection = await usPage.$('#estimator');
  if (estimatorSection) {
    await estimatorSection.screenshot({
      path: path.join(artifactDir, 'pricing_estimator_western_usd.png')
    });
    console.log('Saved pricing_estimator_western_usd.png');
  }

  // Click GBP currency button to show Multi-Currency in action
  const gbpBtn = await usPage.$('button[data-curr="GBP"]');
  if (gbpBtn) {
    await gbpBtn.click();
    await usPage.waitForTimeout(500);
    if (estimatorSection) {
      await estimatorSection.screenshot({
        path: path.join(artifactDir, 'pricing_estimator_western_gbp.png')
      });
      console.log('Saved pricing_estimator_western_gbp.png');
    }
  }

  // Screenshot of the Engagement Models & Audience Tabs
  const modelsSection = await usPage.$('#pricing-audience-tabs');
  if (modelsSection) {
    const parentSection = await usPage.evaluateHandle(() => {
      const el = document.getElementById('pricing-audience-tabs');
      return el ? el.closest('section') : null;
    });
    if (parentSection) {
      await parentSection.asElement().screenshot({
        path: path.join(artifactDir, 'pricing_engagement_models.png')
      });
      console.log('Saved pricing_engagement_models.png');
    }
  }

  // Full page view of hero + estimator + cards
  await usPage.screenshot({
    path: path.join(artifactDir, 'pricing_page_western_full.png'),
    fullPage: false
  });
  console.log('Saved pricing_page_western_full.png');

  await usContext.close();

  // 2. Capture South Asia Visitor View (Pakistan/India Timezone & IP)
  const saContext = await browser.newContext({
    viewport: { width: 1280, height: 1600 },
    timezoneId: 'Asia/Karachi',
    locale: 'en-PK'
  });

  const saPage = await saContext.newPage();
  await saPage.route('https://api.country.is/**', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ ip: '111.119.187.1', country: 'PK' })
    });
  });

  await saPage.goto(`http://localhost:${port}/pricing/`, { waitUntil: 'networkidle' });
  await saPage.waitForTimeout(1000);

  const saEstimator = await saPage.$('#estimator');
  if (saEstimator) {
    await saEstimator.screenshot({
      path: path.join(artifactDir, 'pricing_estimator_south_asia.png')
    });
    console.log('Saved pricing_estimator_south_asia.png');
  }

  await saContext.close();
  await browser.close();
  server.close();
  console.log('All screenshots captured successfully.');
}

capture().catch(err => {
  console.error('Error capturing screenshots:', err);
  process.exit(1);
});
