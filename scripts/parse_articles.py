import zipfile
import re
import os
import json
import xml.etree.ElementTree as ET

# 1. Existing blog posts
blog_dir = 'src/content/blog'
existing_slugs = set()
existing_titles = {}
for f in os.listdir(blog_dir):
    if f.endswith('.md'):
        slug = f[:-3].lower()
        existing_slugs.add(slug)
        title = ''
        with open(os.path.join(blog_dir, f), 'r', encoding='utf-8') as fp:
            for line in fp:
                if line.startswith('title:'):
                    title = line.replace('title:', '').strip().strip('"\'')
                    break
        existing_titles[slug] = title

print(f"Total existing articles in src/content/blog: {len(existing_slugs)}")

# 2. Extract paragraphs from docx
with zipfile.ZipFile('Sanity Articles_2.docx') as z:
    xml_content = z.read('word/document.xml')
    tree = ET.fromstring(xml_content)
    paras = []
    for p in tree.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}p'):
        texts = [t.text for t in p.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t') if t.text]
        if texts:
            combined = ''.join(texts).strip()
            if combined:
                paras.append(combined)

print(f"Total paragraphs in docx: {len(paras)}")

# 3. Find article boundaries
# We know articles start with something like "1. Title", "2.Title", "3.AI Skills Gap..."
# Let's inspect all lines matching ^\d+[\.\s]
candidates = []
for i, p in enumerate(paras):
    m = re.match(r'^(\d+)[\.\:\s]+(.*)', p)
    if m:
        num = int(m.group(1))
        t = m.group(2).strip()
        candidates.append((num, t, i, p))

# Let's find sequential or primary article headers
# Usually articles have 1, 2, 3, 4, 5... up to N
# Let's inspect candidate numbers and titles
print(f"Total numbered paragraphs: {len(candidates)}")

# Write candidates to file for inspection
with open('scripts/all_numbered_paras.json', 'w', encoding='utf-8') as f:
    json.dump([{'num': c[0], 'title': c[1], 'idx': c[2], 'raw': c[3]} for c in candidates], f, indent=2)

# Filter real articles:
# An article has length > 15 chars, does not look like a list item (e.g. "1. Audit Existing Website Pages"),
# and either follows an end-of-article marker or is a main title.
# Let's analyze how many top-level articles there are.
articles = []
for idx, (num, title, para_idx, raw) in enumerate(candidates):
    # Check if this is an article title
    # Indicators:
    # 1. para_idx == 0
    # 2. Preceded closely by Authorised By / Hifza Naeem / Reference Links / FAQs / .
    # 3. Or followed by an exact repetition of the title or an intro paragraph
    is_start = False
    if para_idx == 0:
        is_start = True
    else:
        prev_10 = ' '.join(paras[max(0, para_idx-10):para_idx]).lower()
        if 'authorised by' in prev_10 or 'hifza naeem' in prev_10:
            is_start = True
        elif 'reference links' in prev_10 and ('theeduassist' in prev_10 or 'faq' in prev_10 or 'questions' in prev_10):
            is_start = True
    
    if is_start:
        articles.append((num, title, para_idx, raw))

print(f"Identified {len(articles)} primary articles based on boundary markers.")

# If boundary markers missed any, let's also check if numbers increment or if any article didn't have 'Authorised By'
with open('scripts/boundary_articles.json', 'w', encoding='utf-8') as f:
    json.dump([{'num': a[0], 'title': a[1], 'para_idx': a[2], 'raw': a[3]} for a in articles], f, indent=2)
