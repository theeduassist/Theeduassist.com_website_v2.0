import sharp from 'sharp';
import fs from 'fs';
import pngToIco from 'png-to-ico';

async function generateIco() {
  const svgBuffer = fs.readFileSync('theeduassist-logo-cropped.svg');

  await sharp(svgBuffer).resize(16, 16).png().toFile('public/tmp-16.png');
  await sharp(svgBuffer).resize(32, 32).png().toFile('public/tmp-32.png');
  await sharp(svgBuffer).resize(48, 48).png().toFile('public/tmp-48.png');

  const buf = await pngToIco(['public/tmp-16.png', 'public/tmp-32.png', 'public/tmp-48.png']);
  fs.writeFileSync('public/favicon.ico', buf);

  fs.unlinkSync('public/tmp-16.png');
  fs.unlinkSync('public/tmp-32.png');
  fs.unlinkSync('public/tmp-48.png');
  console.log('favicon.ico generated successfully');
}

generateIco().catch(console.error);
