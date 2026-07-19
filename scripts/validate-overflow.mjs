import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

const BASE_URL = 'http://localhost:4321';
const ROUTES_TO_TEST = [
  '/',
  '/services/',
  '/enterprise-solutions/',
  '/enterprise-solutions/project-brief/',
  '/trust-centre/',
  '/kajabi-services/',
  '/case-studies/',
  '/pricing/',
  '/blog/',
  '/about-us/',
  '/contact/',
  '/privacy/',
  '/terms/'
];

const VIEWPORTS = [
  { width: 320, height: 800 },
  { width: 360, height: 800 },
  { width: 375, height: 800 },
  { width: 390, height: 800 },
  { width: 412, height: 800 },
  { width: 430, height: 800 },
  { width: 540, height: 800 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 }
];

async function checkOverflow() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  let hasOverflow = false;

  for (const route of ROUTES_TO_TEST) {
    console.log(`\nTesting route: ${route}`);
    try {
      await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle', timeout: 10000 });
      for (const vp of VIEWPORTS) {
        await page.setViewportSize(vp);
        await page.waitForTimeout(500); // Allow layout to settle

        const overflowCheck = await page.evaluate(() => {
          const clientWidth = document.documentElement.clientWidth;
          const scrollWidth = document.documentElement.scrollWidth;

          if (scrollWidth > clientWidth) {
            // Try to find the offending elements
            const allElements = document.querySelectorAll('*');
            let offenders = [];
            for (let el of allElements) {
               if (el.getBoundingClientRect().right > clientWidth) {
                   if (el.tagName !== 'SCRIPT' && el.tagName !== 'STYLE' && el.tagName !== 'LINK') {
                       offenders.push({
                           tag: el.tagName,
                           class: el.className,
                           id: el.id
                       });
                   }
               }
            }
            return {
              overflows: true,
              scrollWidth,
              clientWidth,
              offenders: offenders.slice(0, 5) // limit to first 5
            };
          }
          return { overflows: false };
        });

        if (overflowCheck.overflows) {
          console.error(`❌ Overflow detected on ${route} at viewport ${vp.width}x${vp.height}`);
          console.error(`   clientWidth: ${overflowCheck.clientWidth}, scrollWidth: ${overflowCheck.scrollWidth}`);
          console.error(`   Likely offenders:`, overflowCheck.offenders);
          hasOverflow = true;
        } else {
          console.log(`✅ Passed ${route} at viewport ${vp.width}x${vp.height}`);
        }
      }
    } catch (e) {
      console.error(`Error loading ${route}: ${e.message}`);
    }
  }

  await browser.close();
  if (hasOverflow) {
    console.error('\n🚨 Overflow validation failed.');
    process.exit(1);
  } else {
    console.log('\n🎉 No overflow detected.');
  }
}

// Start dev server in the background and then run tests?
// No, the script expects the server to be running.
console.log('Ensure the app is running on port 4321 before running this script.');
checkOverflow();
