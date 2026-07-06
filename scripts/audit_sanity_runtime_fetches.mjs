import fs from 'fs';
import path from 'path';

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ?
      walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

let patterns = [
  'createClient',
  'client\\.fetch',
  'groq',
  'fetch\\(',
  'apicdn\\.sanity\\.io',
  'api\\.sanity\\.io',
  'sanity\\.io',
  'useEffect',
  'client:load',
  'client:visible',
  'client:idle',
  'window\\.fetch',
  'import\\.meta\\.env',
  'sk_',
  'Bearer '
];
let regex = new RegExp(`(${patterns.join('|')})`, 'i');

let output = '';

walkDir('src', (filePath) => {
  if (filePath.endsWith('.ts') || filePath.endsWith('.tsx') || filePath.endsWith('.astro') || filePath.endsWith('.js') || filePath.endsWith('.jsx')) {
    let content = fs.readFileSync(filePath, 'utf-8');
    let lines = content.split('\n');
    lines.forEach((line, i) => {
      if (regex.test(line)) {
        output += `${filePath}:${i + 1}: ${line.trim()}\n`;
      }
    });
  }
});

fs.writeFileSync('reports/sanity_runtime_fetch_audit.txt', output);
