import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

const priorityUrls = [
  '/',
  '/services/',
  '/kajabi-services/',
  '/pricing/',
  '/blog/',
  '/blog/page/2/',
  '/book-free-audit/',
  '/contact/',
  '/about/',
  '/platforms/',
  '/locations/',
  '/case-studies/',
  '/sitemap/',
  '/services/custom-elearning-development/',
  '/services/lms-implementation-migration/',
  '/services/ai-powered-elearning/',
  '/services/ai-ethics-corporate-training/',
  '/sitemap.xml',
  '/robots.txt',
  '/data/blog/page-2.json'
];

async function auditDist() {
  console.log('Auditing dist/ directory...');
  const distDir = path.join(projectRoot, 'dist');

  if (!fs.existsSync(distDir)) {
    console.error('dist/ directory not found. Please build the project first.');
    return;
  }

  let report = 'Sitewide Indexability Head Audit Report\n';
  report += '=======================================\n\n';

  for (const urlPath of priorityUrls) {
    let filePath;
    let isFile = false;

    // Determine exact file path in dist
    if (urlPath.endsWith('.xml') || urlPath.endsWith('.txt') || urlPath.endsWith('.json')) {
      filePath = path.join(distDir, urlPath);
      isFile = true;
    } else {
      filePath = path.join(distDir, urlPath, 'index.html');
      if (!fs.existsSync(filePath) && urlPath === '/') {
          filePath = path.join(distDir, 'index.html');
      }
    }

    report += `URL: ${urlPath}\n`;

    if (!fs.existsSync(filePath)) {
      report += `Status: 404 Not Found (Missing in dist)\n`;
      report += `Issue found: 404/500\n\n`;
      continue;
    }

    report += `Status: Exists in dist\n`;

    if (isFile) {
       report += `Content Type: ${urlPath.split('.').pop()}\n\n`;
       continue;
    }

    report += `Content Type: text/html\n`;
    const content = fs.readFileSync(filePath, 'utf8');

    // Extract Title
    const titleMatch = content.match(/<title>(.*?)<\/title>/);
    const title = titleMatch ? titleMatch[1] : 'MISSING';
    report += `Title: ${title}\n`;
    if (title === 'MISSING') report += `Flag: missing title\n`;

    // Extract Meta Description
    const descMatch = content.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i);
    const desc = descMatch ? descMatch[1] : 'MISSING';
    report += `Meta Description: ${desc ? 'Present' : 'Empty'}\n`;
    if (desc === 'MISSING') report += `Flag: missing meta description\n`;

    // Extract Canonical
    const canonicalMatch = content.match(/<link\s+rel=["']canonical["']\s+href=["'](.*?)["']/i);
    const canonical = canonicalMatch ? canonicalMatch[1] : 'MISSING';
    report += `Canonical: ${canonical}\n`;

    if (canonical === 'MISSING') {
       report += `Flag: missing canonical\n`;
    } else if (canonical.includes('https://www.theeduassist.com/https:/')) {
       report += `Flag: duplicated-domain canonical\n`;
    } else if (canonical.includes('https:/') && !canonical.includes('https://')) {
       report += `Flag: malformed canonical\n`;
    } else if (canonical.startsWith('http://localhost') || canonical.startsWith('https://localhost')) {
       report += `Flag: localhost canonical\n`;
    } else if (canonical.includes('vercel.app')) {
       report += `Flag: Vercel preview canonical\n`;
    } else if (canonical.startsWith('https://theeduassist.com') || canonical.startsWith('http://theeduassist.com')) {
       report += `Flag: non-www canonical\n`;
    }

    // Extract Robots Meta
    const robotsMatch = content.match(/<meta\s+name=["']robots["']\s+content=["'](.*?)["']/i);
    const robots = robotsMatch ? robotsMatch[1] : 'OMITTED';
    report += `Robots Meta: ${robots}\n`;

    const isNoindex = robots.toLowerCase().includes('noindex');
    const isNofollow = robots.toLowerCase().includes('nofollow');
    report += `Indexable: ${!isNoindex ? 'Yes' : 'No'}\n`;

    if (isNoindex) report += `Flag: noindex on public page\n`;
    if (isNofollow) report += `Flag: nofollow on public page\n`;

    // Extract OG URL
    const ogMatch = content.match(/<meta\s+property=["']og:url["']\s+content=["'](.*?)["']/i);
    const ogUrl = ogMatch ? ogMatch[1] : 'MISSING';
    report += `Open Graph URL: ${ogUrl}\n`;

    // Internal error check
    if (content.includes('Internal Error') || content.includes('500 Internal Server Error')) {
        report += `Flag: Internal Error\n`;
    }

    report += '\n';
  }

  const reportPath = path.join(projectRoot, 'reports', 'sitewide_indexability_head_audit_report.txt');
  fs.writeFileSync(reportPath, report);
  console.log(`Audit complete. Report written to ${reportPath}`);
}

auditDist();
