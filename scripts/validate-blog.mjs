import fs from 'fs';
import path from 'path';

const blogDir = path.join(process.cwd(), 'src/content/blog');
let hasErrors = false;

if (fs.existsSync(blogDir)) {
  const files = fs.readdirSync(blogDir);
  const slugs = new Set();

  files.forEach(file => {
    if (!file.endsWith('.md')) return;

    const content = fs.readFileSync(path.join(blogDir, file), 'utf8');
    const slug = file.replace('.md', '');
    let title = '';
    let status = '';
    let excerpt = '';
    let publishedAt = '';
    let datePublished = '';
    let category = '';

    if (content.startsWith('---')) {
      const parts = content.split('---');
      if (parts.length >= 3) {
        const fm = parts[1];
        const lines = fm.split('\n');
        for (const line of lines) {
          if (line.startsWith('title:')) title = line.substring(6).trim().replace(/^["']|["']$/g, '');
          if (line.startsWith('status:')) status = line.substring(7).trim().replace(/^["']|["']$/g, '');
          if (line.startsWith('excerpt:')) excerpt = line.substring(8).trim().replace(/^["']|["']$/g, '');
          if (line.startsWith('publishedAt:')) publishedAt = line.substring(12).trim().replace(/^["']|["']$/g, '');
          if (line.startsWith('datePublished:')) datePublished = line.substring(14).trim().replace(/^["']|["']$/g, '');
          if (line.startsWith('category:')) category = line.substring(9).trim().replace(/^["']|["']$/g, '');
        }
      }
    }

    if (slugs.has(slug)) {
      console.error(`❌ ERROR: Duplicate slug found: ${slug}`);
      hasErrors = true;
    }
    slugs.add(slug);

    if (!title || title.toLowerCase() === 'untitled') {
      console.error(`❌ ERROR: Missing or invalid title in ${file}`);
      hasErrors = true;
    }

    if (content.toLowerCase().includes('content coming soon') || content.toLowerCase().includes('content is being updated')) {
      console.error(`❌ ERROR: Placeholder body found in ${file}`);
      hasErrors = true;
    }

    if (!excerpt && status === 'published') {
      console.warn(`⚠️ WARNING: Missing excerpt in published post ${file}`);
    }

    if (!category && status === 'published') {
      console.warn(`⚠️ WARNING: Missing category in published post ${file}`);
    }

    if (!publishedAt && !datePublished && status === 'published') {
      console.error(`❌ ERROR: Missing published date in published post ${file}`);
      hasErrors = true;
    }

    const rawSlug = file.replace('.md', '');
    if (!/^[a-z0-9-]+$/.test(rawSlug)) {
        console.error(`❌ ERROR: Invalid slug format for file ${file}. Only lowercase letters, numbers, and hyphens are allowed.`);
        hasErrors = true;
    }

  });
}

if (hasErrors) {
  process.exit(1);
} else {
  console.log('🎉 Blog validation passed.');
}
