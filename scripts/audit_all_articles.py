import zipfile
import re
import os
import json
import xml.etree.ElementTree as ET

# Load existing blog posts
blog_dir = 'src/content/blog'
existing_slugs = {}
existing_titles = {}

for f in os.listdir(blog_dir):
    if f.endswith('.md'):
        slug = f[:-3].lower()
        title = ''
        with open(os.path.join(blog_dir, f), 'r', encoding='utf-8') as fp:
            for line in fp:
                if line.startswith('title:'):
                    title = line.replace('title:', '').strip().strip('"\'')
                    break
        existing_slugs[slug] = f
        existing_titles[title.lower()] = slug

print(f"Total existing articles in src/content/blog: {len(existing_slugs)}")

# Inspect Word document for all large-font paragraphs (sz >= 40)
with zipfile.ZipFile('Sanity Articles_2.docx') as z:
    xml_content = z.read('word/document.xml')
    tree = ET.fromstring(xml_content)

w_ns = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'

raw_articles = []
all_p = list(tree.iter(f'{{{w_ns}}}p'))

for idx, p in enumerate(all_p):
    texts = [t.text for t in p.iter(f'{{{w_ns}}}t') if t.text]
    raw_text = ''.join(texts).strip()
    if not raw_text or raw_text == '.':
        continue
        
    rPr = p.find(f'.//{{{w_ns}}}rPr')
    sz = rPr.find(f'{{{w_ns}}}sz') if rPr is not None else None
    sz_val = sz.attrib.get(f'{{{w_ns}}}val') if sz is not None else None
    
    if sz_val and int(sz_val) >= 40:
        raw_articles.append((idx, int(sz_val), raw_text))

print(f"Found {len(raw_articles)} candidate headings with sz >= 40")

def normalize(s):
    return re.sub(r'[^a-z0-9]', '', s.lower())

def make_slug(s):
    # remove leading numbers like "1. ", "23. "
    cleaned = re.sub(r'^\d+[\.\:\s]+', '', s)
    slug = re.sub(r'[^a-z0-9]+', '-', cleaned.lower()).strip('-')
    return slug

results = []
for p_idx, sz_val, text in raw_articles:
    # Extract number if present
    m = re.match(r'^(\d+)[\.\:\s]*(.*)', text)
    if m:
        num = int(m.group(1))
        title = m.group(2).strip()
    else:
        num = None
        title = text.strip()
        
    if not title:
        continue
        
    slug = make_slug(text)
    norm_title = normalize(title)
    
    # Check if already in existing_slugs or existing_titles
    match_status = "MISSING"
    matched_slug = None
    
    if slug in existing_slugs:
        match_status = "EXACT_SLUG_MATCH"
        matched_slug = slug
    else:
        # Check partial/close match in slugs
        for es in existing_slugs:
            norm_es = normalize(es)
            if norm_title and (norm_title in norm_es or norm_es in norm_title):
                match_status = "CLOSE_SLUG_MATCH"
                matched_slug = es
                break
        if match_status == "MISSING":
            # Check title matches
            for et, es in existing_titles.items():
                norm_et = normalize(et)
                if norm_title and (norm_title == norm_et or norm_title in norm_et or norm_et in norm_title):
                    match_status = "TITLE_MATCH"
                    matched_slug = es
                    break
                    
    results.append({
        'p_idx': p_idx,
        'num': num,
        'title': title,
        'raw_text': text,
        'candidate_slug': slug,
        'status': match_status,
        'matched_file': matched_slug
    })

# Write detailed breakdown to json and summary txt
with open('scripts/article_audit_full.json', 'w', encoding='utf-8') as f:
    json.dump(results, f, indent=2)

already_count = sum(1 for r in results if r['status'] != 'MISSING')
missing_count = sum(1 for r in results if r['status'] == 'MISSING')

print(f"\nAudit Summary:")
print(f"  Total detected articles in docx: {len(results)}")
print(f"  Already published on website:   {already_count}")
print(f"  Missing / New to add:           {missing_count}")
