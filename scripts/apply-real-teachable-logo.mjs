import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const svgRaw = fs.readFileSync('teachable-official-logo.svg', 'utf8');

// Function to get clean Teachable SVG in specified color
function getTeachableSvg(color = '#005744', width = 220) {
  const height = Math.round(width * (45.516 / 299.995));
  // Replace fill
  const coloredSvg = svgRaw
    .replace(/width="[^"]+"/, `width="${width}"`)
    .replace(/height="[^"]+"/, `height="${height}"`)
    .replace(/\.cls-1\{fill:[^;]+;\}/, `.cls-1{fill:${color};}`);
  return { svg: Buffer.from(coloredSvg), width, height };
}

// Create a modern, high-end editorial badge for the top corner
function createEditorialBadgeSvg(badgeWidth = 320, badgeHeight = 64, subtitle = 'PLATFORM ROADMAP 2026–2027') {
  const logoWidth = 140;
  const logoHeight = Math.round(logoWidth * (45.516 / 299.995));
  
  // Extract path data from teachable-official-logo.svg
  const pathsMatch = svgRaw.match(/<path[^>]+>/g);
  const pathsClean = pathsMatch ? pathsMatch.map(p => p.replace(/class="cls-1"/g, 'fill="#005744"')).join('') : '';

  return Buffer.from(`
    <svg width="${badgeWidth}" height="${badgeHeight}" viewBox="0 0 ${badgeWidth} ${badgeHeight}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" flood-opacity="0.18" flood-color="#0f172a" />
        </filter>
      </defs>
      <!-- Background Card -->
      <rect x="2" y="2" width="${badgeWidth - 4}" height="${badgeHeight - 4}" rx="12" fill="#ffffff" filter="url(#shadow)" stroke="#e2e8f0" stroke-width="1.5" />
      
      <!-- Real Teachable Official Vector Logo -->
      <g transform="translate(18, 14) scale(${logoWidth / 299.995})">
        ${pathsClean}
      </g>
      
      <!-- Divider -->
      <line x1="${18 + logoWidth + 14}" y1="12" x2="${18 + logoWidth + 14}" y2="${badgeHeight - 12}" stroke="#cbd5e1" stroke-width="1.5" />
      
      <!-- Subtitle & Year -->
      <text x="${18 + logoWidth + 24}" y="26" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" fill="#005744" letter-spacing="1">TEACHABLE</text>
      <text x="${18 + logoWidth + 24}" y="42" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="600" fill="#475569" letter-spacing="0.5">${subtitle}</text>
    </svg>
  `);
}

async function run() {
  console.log('Compositing real Teachable logo onto hero images...');

  // 1. Roadmap Image
  const roadmapImgPath = 'public/images/blog/teachable-roadmap-2026-2027-b2b-payments-ai.jpg';
  if (fs.existsSync(roadmapImgPath)) {
    const badge = createEditorialBadgeSvg(340, 64, 'ROADMAP 2026–2027');
    
    // Also place clean official logo directly over the monitor screen top bar
    // In roadmap image, monitor header is at left: 260, top: 242, width ~180
    const monitorLogo = getTeachableSvg('#005744', 160);
    
    // Background patch for monitor to cleanly cover any AI text
    const monitorPatch = Buffer.from(`
      <svg width="220" height="42" xmlns="http://www.w3.org/2000/svg">
        <rect width="220" height="42" fill="#ffffff" rx="4" />
      </svg>
    `);

    const inputBuf = fs.readFileSync(roadmapImgPath);
    const updatedRoadmap = await sharp(inputBuf)
      .composite([
        // Top-left editorial brand badge with 100% official vector logo
        { input: badge, top: 32, left: 32 },
        // Monitor screen: clean white patch + official vector logo
        { input: monitorPatch, top: 248, left: 262 },
        { input: monitorLogo.svg, top: 256, left: 272 }
      ])
      .jpeg({ quality: 92 })
      .toBuffer();

    fs.writeFileSync(roadmapImgPath, updatedRoadmap);
    console.log('✅ Updated roadmap image with official Teachable logo!');
  }

  // 2. Singapore Healthcare Image
  const singaporeImgPath = 'public/images/blog/teachable-singapore-healthcare-teaching-practice-2027.jpg';
  if (fs.existsSync(singaporeImgPath)) {
    const badge = createEditorialBadgeSvg(360, 64, 'CLINICAL PRACTICE 2027');

    // On Singapore monitor screen (left: 185, top: 382, width ~190)
    const monitorLogo = getTeachableSvg('#005744', 180);
    const monitorPatch = Buffer.from(`
      <svg width="240" height="48" xmlns="http://www.w3.org/2000/svg">
        <rect width="240" height="48" fill="#f8fafc" rx="4" />
      </svg>
    `);

    const inputSingaporeBuf = fs.readFileSync(singaporeImgPath);
    const updatedSingapore = await sharp(inputSingaporeBuf)
      .composite([
        // Top-left editorial brand badge with 100% official vector logo
        { input: badge, top: 32, left: 32 },
        // Monitor screen: clean patch + official vector logo
        { input: monitorPatch, top: 382, left: 186 },
        { input: monitorLogo.svg, top: 392, left: 196 }
      ])
      .jpeg({ quality: 92 })
      .toBuffer();

    fs.writeFileSync(singaporeImgPath, updatedSingapore);
    console.log('✅ Updated Singapore healthcare image with official Teachable logo!');
  }
}

run().catch(console.error);
