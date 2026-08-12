// Validation for blog content - checking for correct tags etc
import fs from 'fs';
import path from 'path';

const contentDir = path.join(process.cwd(), 'src/content/blog');

let hasErrors = false;

if (fs.existsSync(contentDir)) {
  const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.md'));

  for (const file of files) {
    const filePath = path.join(contentDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');

    // 1. Check for H1 in body
    const bodyMatch = content.split('---');
    if (bodyMatch.length >= 3) {
      const body = bodyMatch.slice(2).join('---');
      if (/^#\s+/m.test(body)) {
        console.error(`❌ [${file}] Error: Found H1 in markdown body. Use H2 (##) or H3 (###) instead.`);
        hasErrors = true;
      }

      // We no longer fail on "++" artifact formatting because it is handled dynamically by a remark plugin,
      // allowing writers to use Pages CMS underline functionality seamlessly.

      // 2. Check for empty body or placeholder text
      const cleanBody = body.replace(/\s+/g, '').toLowerCase();
      if (cleanBody.length < 50 || cleanBody.includes('contentcomingsoon') || cleanBody.includes('contentisbeingupdated')) {
        console.error(`❌ [${file}] Error: Body is empty or contains placeholder content.`);
        hasErrors = true;
      }
    } else {
      console.error(`❌ [${file}] Error: Invalid markdown structure (missing frontmatter).`);
      hasErrors = true;
    }

    // 3. Frontmatter checks (simple regex parsing)
    const frontmatter = bodyMatch[1] || '';

    // Slug
    const slugMatch = frontmatter.match(/^slug:\s*(.+)$/m);
    if (!slugMatch || !slugMatch[1].trim()) {
      console.error(`❌ [${file}] Error: Missing slug in frontmatter.`);
      hasErrors = true;
    } else {
      const slug = slugMatch[1].trim().replace(/^["']|["']$/g, "");
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
        console.error(`❌ [${file}] Error: Invalid slug format "${slug}". Must be lowercase letters, numbers, and hyphens only.`);
        hasErrors = true;
      }
    }

    // Title
    const titleMatch = frontmatter.match(/^title:\s*(.+)$/m);
    if (!titleMatch || !titleMatch[1].trim() || titleMatch[1].toLowerCase().includes('untitled')) {
      console.error(`❌ [${file}] Error: Missing or invalid title in frontmatter.`);
      hasErrors = true;
    }

    // Category
    const categoryMatch = frontmatter.match(/^category:\s*(.+)$/m);
    if (!categoryMatch || !categoryMatch[1].trim()) {
      console.error(`❌ [${file}] Error: Missing category in frontmatter.`);
      hasErrors = true;
    }

    // Excerpt
    const excerptMatch = frontmatter.match(/^excerpt:\s*(.+)$/m);
    if (!excerptMatch || !excerptMatch[1].trim()) {
      console.error(`❌ [${file}] Error: Missing excerpt in frontmatter.`);
      hasErrors = true;
    }
  }
}

if (hasErrors) {
  console.error("❌ Blog content validation failed.");
  process.exit(1);
} else {
  console.log("✅ Blog content validation passed.");
}
