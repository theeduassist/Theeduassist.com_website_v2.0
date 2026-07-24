import fs from 'fs';
import path from 'path';

const DIST_DIR = path.join(process.cwd(), 'dist');

function getHtmlFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getHtmlFiles(filePath, fileList);
    } else if (filePath.endsWith('.html')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

function validateCanonicals() {
  console.log('Validating Canonicals...');

  // Vercel output for Astro is typically inside dist or .vercel/output/static depending on the adapter setup
  let htmlFiles = getHtmlFiles(DIST_DIR);
  if (htmlFiles.length === 0) {
      const vercelStatic = path.join(process.cwd(), '.vercel/output/static');
      if (fs.existsSync(vercelStatic)) {
          htmlFiles = getHtmlFiles(vercelStatic);
      }
  }

  if (htmlFiles.length === 0) {
    console.error('❌ No HTML files found in build output for canonical validation.');
    process.exit(1);
  }

  let failed = false;

  for (const file of htmlFiles) {
    const content = fs.readFileSync(file, 'utf8');

    // Looking for exactly one canonical
    const canonicalMatches = content.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"[^>]*>/g) || [];

    // Ignore offline page or 404
    if (file.includes('404.html') || file.includes('offline.html')) continue;

    if (canonicalMatches.length === 0) {
      console.error(`❌ Missing canonical tag in ${file}`);
      failed = true;
      continue;
    }

    if (canonicalMatches.length > 1) {
      console.error(`❌ Duplicate canonical tags in ${file}`);
      failed = true;
      continue;
    }

    const canonicalTag = canonicalMatches[0];
    const urlMatch = canonicalTag.match(/href="([^"]+)"/);
    if (!urlMatch) {
       console.error(`❌ Malformed canonical tag in ${file}`);
       failed = true;
       continue;
    }

    const url = urlMatch[1];

    if (!url.startsWith('https://www.theeduassist.com')) {
      console.error(`❌ Canonical URL does not match preferred hostname in ${file}: ${url}`);
      failed = true;
    }

    if (url.includes('?') || url.includes('#')) {
       console.error(`❌ Canonical URL contains query parameters or fragments in ${file}: ${url}`);
       failed = true;
    }

    if (url.includes('localhost') || url.includes('vercel.app')) {
       console.error(`❌ Canonical URL contains dev/preview hostname in ${file}: ${url}`);
       failed = true;
    }

    // For trailing slash check, we only check if it ends with / (unless it's the bare domain which is ok)
    if (!url.endsWith('/') && url !== 'https://www.theeduassist.com' && !url.includes('.xml') && !url.includes('.txt')) {
       // Since Astro build format is directory, we expect trailing slashes
       console.error(`❌ Canonical URL missing trailing slash in ${file}: ${url}`);
       failed = true;
    }
  }

  if (failed) {
    console.error('🚨 Canonical validation failed.');
    process.exit(1);
  } else {
    console.log('✅ Canonical URLs validated successfully.');
  }
}

validateCanonicals();
