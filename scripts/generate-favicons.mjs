import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const svgBuffer = fs.readFileSync('theeduassist-logo-cropped.svg');

async function generate() {
  const sizes = [48, 96, 192, 512];
  for (const size of sizes) {
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(`public/favicon-${size}x${size}.png`);
  }

  // apple-touch-icon.png (180x180)
  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile('public/apple-touch-icon.png');

  // android-chrome
  await sharp(svgBuffer)
    .resize(192, 192)
    .png()
    .toFile('public/android-chrome-192x192.png');
  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile('public/android-chrome-512x512.png');

  // social preview (1200x630)
  // Let's create an image that uses the brand colors and centers the logo.
  const bgWidth = 1200;
  const bgHeight = 630;
  const logoSize = 400; // Size of logo in the middle

  const logoBuffer = await sharp(svgBuffer)
    .resize(logoSize, logoSize)
    .png()
    .toBuffer();

  const backgroundSvg = `
    <svg width="${bgWidth}" height="${bgHeight}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff" />
      <text x="600" y="500" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="#27496D" text-anchor="middle">TheEduAssist</text>
      <text x="600" y="550" font-family="Arial, sans-serif" font-size="24" fill="#64748b" text-anchor="middle">E-Learning Design Agency</text>
      <text x="600" y="590" font-family="Arial, sans-serif" font-size="20" fill="#64748b" text-anchor="middle">Course Design • Kajabi • LMS • AI E-Learning</text>
    </svg>
  `;

  await sharp(Buffer.from(backgroundSvg))
    .composite([
      { input: logoBuffer, top: 50, left: (bgWidth - logoSize) / 2 }
    ])
    .png()
    .toFile('public/og/theeduassist-og-image.png');

  console.log('All PNGs generated');
}

generate().catch(console.error);
