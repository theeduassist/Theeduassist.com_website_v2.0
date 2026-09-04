import { chromium } from 'playwright';

const ROUTES_TO_TEST = [
  '/',
  '/services/',
  '/blog/',
  '/enterprise-solutions/'
];

async function validateCrawlReadiness() {
  console.log('Testing Crawler Parity (Mobile vs Desktop) and Image Crawlability...');
  const browser = await chromium.launch();
  let hasErrors = false;

  for (const route of ROUTES_TO_TEST) {
    const url = `http://localhost:4321${route}`;
    console.log(`\nTesting ${route}...`);

    // Desktop
    const desktopContext = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const desktopPage = await desktopContext.newPage();
    await desktopPage.goto(url, { waitUntil: 'networkidle' });

    const desktopTitle = await desktopPage.title();
    const desktopCanonical = await desktopPage.getAttribute('link[rel="canonical"]', 'href');
    const desktopH1 = await desktopPage.textContent('h1');
    const desktopImages = await desktopPage.evaluate(() => {
        return Array.from(document.querySelectorAll('img')).map(img => img.alt).filter(Boolean);
    });

    // Mobile (Googlebot Smartphone simulation)
    const mobileContext = await browser.newContext({
      viewport: { width: 412, height: 915 },
      userAgent: 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/W.X.Y.Z Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
      isMobile: true
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto(url, { waitUntil: 'networkidle' });

    const mobileTitle = await mobilePage.title();
    const mobileCanonical = await mobilePage.getAttribute('link[rel="canonical"]', 'href');
    const mobileH1 = await mobilePage.textContent('h1');
    const mobileImages = await mobilePage.evaluate(() => {
        return Array.from(document.querySelectorAll('img')).map(img => img.alt).filter(Boolean);
    });

    // Compare
    if (desktopTitle !== mobileTitle) {
      console.error(`❌ Title mismatch on ${route}: Desktop="${desktopTitle}", Mobile="${mobileTitle}"`);
      hasErrors = true;
    }
    if (desktopCanonical !== mobileCanonical) {
      console.error(`❌ Canonical mismatch on ${route}: Desktop="${desktopCanonical}", Mobile="${mobileCanonical}"`);
      hasErrors = true;
    }
    if (desktopH1?.trim() !== mobileH1?.trim()) {
      console.error(`❌ H1 mismatch on ${route}`);
      hasErrors = true;
    }

    // Check if images with alt tags drop completely
    if (desktopImages.length > 0 && mobileImages.length === 0) {
      console.error(`❌ Significant image alt loss on mobile for ${route}`);
      hasErrors = true;
    }

    if (!hasErrors) console.log(`✅ Parity checks passed for ${route}`);

    await desktopContext.close();
    await mobileContext.close();
  }

  await browser.close();

  if (hasErrors) {
    console.error('\n🚨 Crawl readiness validation failed.');
    process.exit(1);
  } else {
    console.log('\n🎉 Crawl readiness validation passed.');
  }
}

validateCrawlReadiness();
