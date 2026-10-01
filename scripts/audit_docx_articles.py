import zipfile
import os
import re
import xml.etree.ElementTree as ET

# 1. Load existing blog posts
blog_dir = 'src/content/blog'
existing_files = os.listdir(blog_dir)
existing_slugs = set()
existing_titles = set()

for f in existing_files:
    if f.endswith('.md'):
        slug = f[:-3].lower()
        existing_slugs.add(slug)
        try:
            with open(os.path.join(blog_dir, f), 'r', encoding='utf-8') as fp:
                for line in fp:
                    if line.startswith('title:'):
                        t = line.replace('title:', '').strip().strip('"\'')
                        existing_titles.add(t.lower())
                        break
        except Exception:
            pass

print(f"Total existing articles in src/content/blog: {len(existing_slugs)}")

# 2. Extract paragraphs from Sanity Articles_2.docx
docx_path = 'Sanity Articles_2.docx'
with zipfile.ZipFile(docx_path) as z:
    xml_content = z.read('word/document.xml')
    tree = ET.fromstring(xml_content)
    paragraphs = []
    for p in tree.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}p'):
        texts = [t.text for t in p.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t') if t.text]
        if texts:
            combined = ''.join(texts).strip()
            if combined:
                paragraphs.append(combined)

print(f"Total paragraphs in {docx_path}: {len(paragraphs)}")

# 3. Identify article titles
# Articles typically start with a title line followed by an introductory paragraph
articles = []
for i, p in enumerate(paragraphs):
    # Pattern: "1.Title" or "1. Title" or "1Title" or "3.AI Skills Gap Analysis..."
    m = re.match(r'^(\d+)[\.\:\s]+(.*)', p)
    if m and len(p) < 140 and not p.lower().startswith('step ') and '?' not in p:
        num = int(m.group(1))
        title = m.group(2).strip()
        # Filter out false positives
        if len(title) > 10 and not title.lower().startswith(('table', 'module', 'tip', 'reason')):
            articles.append((num, title, i))

# Deduplicate article list by title
unique_articles = []
seen = set()
for num, title, idx in articles:
    norm = re.sub(r'[^a-z0-9]', '', title.lower())
    if norm not in seen:
        seen.add(norm)
        unique_articles.append((num, title, idx))

print(f"\nDiscovered {len(unique_articles)} candidate articles in the Word document:\n")

already_count = 0
missing_count = 0

for num, title, idx in unique_articles:
    norm_title = re.sub(r'[^a-z0-9]', '', title.lower())
    slug_candidate = re.sub(r'[^a-z0-9]+', '-', title.lower()).strip('-')
    
    # Check if exists in existing titles or slugs
    is_exist = False
    for et in existing_titles:
        norm_et = re.sub(r'[^a-z0-9]', '', et.lower())
        if norm_title in norm_et or norm_et in norm_title:
            is_exist = True
            break
            
    if not is_exist:
        for es in existing_slugs:
            if slug_candidate in es or es in slug_candidate:
                is_exist = True
                break
                
    if is_exist:
        already_count += 1
        print(f"  [ALREADY ADDED] #{num}: {title}")
    else:
        missing_count += 1
        print(f"  >>> [NEW TO ADD]  #{num}: {title} (slug: {slug_candidate})")

print(f"\nSummary:")
print(f"  - Already Added: {already_count}")
print(f"  - New To Add:    {missing_count}")
