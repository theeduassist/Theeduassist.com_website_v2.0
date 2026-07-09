import fs from 'fs';
import https from 'https';

const urls = [
  'https://www.theeduassist.com/',
  'https://www.theeduassist.com/services/',
  'https://www.theeduassist.com/kajabi-services/',
  'https://www.theeduassist.com/pricing/',
  'https://www.theeduassist.com/blog/',
  'https://www.theeduassist.com/book-free-audit/',
  'https://www.theeduassist.com/contact/',
  'https://www.theeduassist.com/about/'
];

let report = 'X-Robots-Tag Header Audit\n';
report += '===========================\n\n';

async function checkHeaders() {
  for (const url of urls) {
    try {
      await new Promise((resolve) => {
        https.get(url, (res) => {
          const xRobotsTag = res.headers['x-robots-tag'] || 'NONE';
          report += `URL: ${url}\n`;
          report += `X-Robots-Tag: ${xRobotsTag}\n\n`;
          resolve();
        }).on('error', (e) => {
          report += `URL: ${url}\n`;
          report += `Error checking headers: ${e.message}\n\n`;
          resolve();
        });
      });
    } catch (e) {
      console.error(e);
    }
  }

  // Check vercel.json for statically defined headers
  report += `vercel.json Static Headers Check:\n`;
  try {
    const vercelJson = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
    let foundXRobots = false;
    if (vercelJson.headers) {
      vercelJson.headers.forEach(h => {
        h.headers.forEach(header => {
          if (header.key.toLowerCase() === 'x-robots-tag') {
             report += `Found X-Robots-Tag in vercel.json for route ${h.source}: ${header.value}\n`;
             foundXRobots = true;
          }
        });
      });
    }
    if (!foundXRobots) {
       report += `No X-Robots-Tag statically defined in vercel.json.\n`;
    }
  } catch (e) {
    report += `Could not parse vercel.json\n`;
  }

  fs.writeFileSync('reports/agent2_x_robots_tag_audit.txt', report);
  console.log('X-Robots-Tag audit complete. Written to reports/agent2_x_robots_tag_audit.txt');
}

checkHeaders();
