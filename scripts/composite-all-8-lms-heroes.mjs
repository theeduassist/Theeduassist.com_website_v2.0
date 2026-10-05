import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const artifactsDir = 'C:/Users/ahesh/.gemini/antigravity/brain/b9591901-a5fe-4693-8953-dfef52d8f84b';
const outputDir = 'public/images/blog';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Helper to create an ultra-clean, modern editorial badge
async function createBadgeBuffer({
  logoInput, // Buffer or SVG string
  brandName,
  subtitle = 'PLATFORM ROADMAP 2026–2027',
  badgeWidth = 380,
  badgeHeight = 72,
  logoWidth = 140,
  logoHeight = 44,
  brandColor = '#0f172a'
}) {
  // If logoInput is SVG or PNG, render logo to PNG buffer first
  let renderedLogoBuf;
  if (Buffer.isBuffer(logoInput)) {
    renderedLogoBuf = await sharp(logoInput)
      .resize({ width: logoWidth, height: logoHeight, fit: 'inside' })
      .png()
      .toBuffer();
  } else if (typeof logoInput === 'string' && logoInput.trim().startsWith('<svg')) {
    renderedLogoBuf = await sharp(Buffer.from(logoInput))
      .resize({ width: logoWidth, height: logoHeight, fit: 'inside' })
      .png()
      .toBuffer();
  } else {
    renderedLogoBuf = await sharp(logoInput)
      .resize({ width: logoWidth, height: logoHeight, fit: 'inside' })
      .png()
      .toBuffer();
  }

  const logoMeta = await sharp(renderedLogoBuf).metadata();
  const actualLogoW = logoMeta.width || logoWidth;
  const actualLogoH = logoMeta.height || logoHeight;
  const logoLeft = Math.round(18 + (logoWidth - actualLogoW) / 2);
  const logoTop = Math.round((badgeHeight - actualLogoH) / 2);

  const dividerX = 18 + logoWidth + 14;

  const cardSvg = `
    <svg width="${badgeWidth}" height="${badgeHeight}" viewBox="0 0 ${badgeWidth} ${badgeHeight}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="badgeShadow" x="-10%" y="-10%" width="120%" height="135%">
          <feDropShadow dx="0" dy="5" stdDeviation="8" flood-opacity="0.22" flood-color="#090d16" />
        </filter>
      </defs>
      <!-- White card background -->
      <rect x="2" y="2" width="${badgeWidth - 4}" height="${badgeHeight - 4}" rx="14" fill="#ffffff" filter="url(#badgeShadow)" stroke="#e2e8f0" stroke-width="1.5" />
      
      <!-- Divider -->
      <line x1="${dividerX}" y1="14" x2="${dividerX}" y2="${badgeHeight - 14}" stroke="#cbd5e1" stroke-width="1.5" />
      
      <!-- Typography -->
      <text x="${dividerX + 16}" y="30" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="12" font-weight="800" fill="${brandColor}" letter-spacing="1">${brandName.toUpperCase().replace(/&/g, '&amp;')}</text>
      <text x="${dividerX + 16}" y="48" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="10.5" font-weight="600" fill="#64748b" letter-spacing="0.5">${subtitle.toUpperCase().replace(/&/g, '&amp;')}</text>
    </svg>
  `;

  const baseCard = await sharp(Buffer.from(cardSvg)).png().toBuffer();

  // Composite the rendered logo into the card
  return await sharp(baseCard)
    .composite([
      { input: renderedLogoBuf, top: logoTop, left: logoLeft }
    ])
    .png()
    .toBuffer();
}

async function run() {
  console.log('🚀 Starting compositing for all 8 LMS hero images...');

  const platforms = [
    {
      id: 'docebo',
      slug: 'docebo-in-2026-and-2027-inside-harmony-tutor-ai-search-and-mcp-workflow-integration',
      heroFile: 'docebo_hero_2027_1791198829209.jpg',
      logoFile: 'docebo-logo.svg',
      brandName: 'Docebo',
      subtitle: 'Harmony AI & MCP 2026–2027',
      brandColor: '#0b3c61',
      badgeWidth: 390,
      logoWidth: 130,
      logoHeight: 40
    },
    {
      id: 'canvas',
      slug: 'canvas-lms-in-2026-and-2027-notebook-upgrades-speedgrader-admin-mfa-and-ai-roadmap',
      heroFile: 'canvas_hero_2027_1791198843246.jpg',
      logoFile: 'canvas-logo.svg',
      brandName: 'Canvas LMS',
      subtitle: 'Notebook & SpeedGrader 2027',
      brandColor: '#e72429',
      badgeWidth: 395,
      logoWidth: 140,
      logoHeight: 38
    },
    {
      id: 'blackboard',
      slug: 'blackboard-learn-in-2026-and-2027-ai-teaching-tools-and-the-lti-1-1-retirement-deadline',
      heroFile: 'blackboard_hero_2027_1791198855602.jpg',
      logoFile: 'blackboard-logo.svg',
      brandName: 'Blackboard',
      subtitle: 'AI Tools & LTI 1.3 Transition',
      brandColor: '#254c4c',
      badgeWidth: 390,
      logoWidth: 130,
      logoHeight: 44
    },
    {
      id: 'moodle',
      slug: 'moodle-5-2-and-5-3-in-2026-and-2027-open-source-governance-ai-controls-and-lts-roadmap',
      heroFile: 'moodle_hero_2027_1791198869397.jpg',
      logoFile: 'moodle-logo.svg',
      brandName: 'Moodle',
      subtitle: '5.2 & 5.3 LTS Governance 2027',
      brandColor: '#f98012',
      badgeWidth: 395,
      logoWidth: 130,
      logoHeight: 40
    },
    {
      id: 'brightspace',
      slug: 'd2l-brightspace-in-2026-and-2027-the-new-content-experience-and-learning-operations-hub',
      heroFile: 'brightspace_hero_2027_1791198905215.jpg',
      logoFile: 'd2l-brightspace-logo.png',
      brandName: 'D2L Brightspace',
      subtitle: 'Learning Operations Hub 2027',
      brandColor: '#f26522',
      badgeWidth: 400,
      logoWidth: 145,
      logoHeight: 40
    },
    {
      id: 'talentlms',
      slug: 'talentlms-in-2026-and-2027-inside-learning-playground-workday-beta-and-ai-video',
      heroFile: 'talentlms_hero_2027_1791198917971.jpg',
      logoFile: 'talentlms-logo.png',
      brandName: 'TalentLMS',
      subtitle: 'Playground & AI Video 2026–27',
      brandColor: '#0083ca',
      badgeWidth: 395,
      logoWidth: 135,
      logoHeight: 40
    },
    {
      id: 'learnupon',
      slug: 'learnupon-in-2026-and-2027-the-rise-of-create-plus-and-the-agentic-learning-platform',
      heroFile: 'learnupon_hero_2027_1791198929534.jpg',
      logoFile: 'learnupon-logo.png',
      brandName: 'LearnUpon',
      subtitle: 'Agentic Learning Platform 2027',
      brandColor: '#2b3087',
      badgeWidth: 400,
      logoWidth: 135,
      logoHeight: 42
    },
    {
      id: 'absorb',
      slug: 'absorb-lms-in-2026-and-2027-skills-onboarding-real-time-data-transfers-and-admin-hub',
      heroFile: 'absorb_hero_2027_1791198944237.jpg',
      logoFile: 'absorb-logo.svg',
      brandName: 'Absorb LMS',
      subtitle: 'Skills Data & Admin Hub 2027',
      brandColor: '#0c1b54',
      badgeWidth: 395,
      logoWidth: 135,
      logoHeight: 42
    }
  ];

  for (const item of platforms) {
    const heroPath = path.join(artifactsDir, item.heroFile);
    const logoPath = path.resolve('src/assets/logos/lms', item.logoFile);
    const outputPath = path.join(outputDir, `${item.slug}.jpg`);

    if (!fs.existsSync(heroPath)) {
      console.error(`❌ Hero file not found: ${heroPath}`);
      continue;
    }
    if (!fs.existsSync(logoPath)) {
      console.error(`❌ Logo file not found: ${logoPath}`);
      continue;
    }

    console.log(`Processing ${item.brandName}...`);
    const logoBuf = fs.readFileSync(logoPath);
    const badge = await createBadgeBuffer({
      logoInput: logoBuf,
      brandName: item.brandName,
      subtitle: item.subtitle,
      brandColor: item.brandColor,
      badgeWidth: item.badgeWidth,
      badgeHeight: 72,
      logoWidth: item.logoWidth,
      logoHeight: item.logoHeight
    });

    const heroBuf = fs.readFileSync(heroPath);
    const compositeOps = [
      { input: badge, top: 40, left: 40 }
    ];

    // For Absorb LMS, notice the background wall on the right has "Aethelred Corp." text
    // Let's cover that with a sleek official Absorb corporate wall plaque!
    if (item.id === 'absorb') {
      const wallPlaqueWidth = 260;
      const wallPlaqueHeight = 90;
      const absorbOfficialLogoBuf = await sharp(logoBuf)
        .resize({ width: 180, height: 50, fit: 'inside' })
        .png()
        .toBuffer();

      const plaqueSvg = Buffer.from(`
        <svg width="${wallPlaqueWidth}" height="${wallPlaqueHeight}" xmlns="http://www.w3.org/2000/svg">
          <rect width="${wallPlaqueWidth}" height="${wallPlaqueHeight}" fill="#f1f5f9" rx="8" />
        </svg>
      `);

      const wallPlaque = await sharp(plaqueSvg)
        .composite([
          { input: absorbOfficialLogoBuf, gravity: 'center' }
        ])
        .png()
        .toBuffer();

      // In the Absorb hero image, the wall logo is at approx top: 280, left: 1470
      compositeOps.push({ input: wallPlaque, top: 280, left: 1460 });
    }

    const finalImage = await sharp(heroBuf)
      .composite(compositeOps)
      .jpeg({ quality: 92, mozjpeg: true })
      .toBuffer();

    fs.writeFileSync(outputPath, finalImage);
    console.log(`✅ Saved: ${outputPath} (${finalImage.length} bytes)`);
  }

  console.log('🎉 All 8 LMS hero images composited and saved successfully!');
}

run().catch(err => {
  console.error('Fatal error during compositing:', err);
  process.exit(1);
});
