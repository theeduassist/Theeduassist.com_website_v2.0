import fs from 'fs';
import path from 'path';

const blogDir = path.join(process.cwd(), 'src/content/blog');
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));

let fixed = 0;
for (const file of files) {
  const filePath = path.join(blogDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const parts = content.split('---');
  if (parts.length >= 3) {
    const frontmatter = parts[1];
    let body = parts.slice(2).join('---');
    if (/^#\s+/m.test(body)) {
      body = body.replace(/^#\s+(.*)$/gm, '## $1');
      fs.writeFileSync(filePath, '---' + frontmatter + '---' + body, 'utf8');
      console.log(`Fixed H1 in: ${file}`);
      fixed++;
    }
  }
}
console.log(`Total fixed: ${fixed}`);
