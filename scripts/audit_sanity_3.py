import zipfile
import xml.etree.ElementTree as ET
import os
import re
import json

docx_path = 'sanity article 3.docx'

if not os.path.exists(docx_path):
    print(f"Error: {docx_path} does not exist.")
    exit(1)

with zipfile.ZipFile(docx_path) as z:
    media_files = [f for f in z.namelist() if f.startswith('word/media/')]
    doc_xml = z.read('word/document.xml')
    rels_xml = z.read('word/_rels/document.xml.rels')

print(f"=== {docx_path} ===")
print(f"Total media files in docx: {len(media_files)}")

w_ns = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'
r_ns = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'
a_ns = 'http://schemas.openxmlformats.org/drawingml/2006/main'

doc_tree = ET.fromstring(doc_xml)
p_elements = list(doc_tree.iter(f'{{{w_ns}}}p'))
print(f"Total paragraphs in docx: {len(p_elements)}")

# 1. Load existing blog posts from src/content/blog
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
                if line.startswith('slug:'):
                    s = line.replace('slug:', '').strip().strip('"\'')
                    if s:
                        slug = s.lower()
        existing_slugs[slug] = f
        existing_titles[title.lower()] = slug

print(f"Total existing articles in src/content/blog: {len(existing_slugs)}")

# 2. Inspect font sizes and styles to detect headings in sanity article 3.docx
from collections import Counter
styles = Counter()
sizes = Counter()
large_paras = []

for idx, p in enumerate(p_elements):
    texts = [t.text for t in p.iter(f'{{{w_ns}}}t') if t.text]
    raw_text = ''.join(texts).strip()
    if not raw_text or raw_text == '.':
        continue
        
    pPr = p.find(f'{{{w_ns}}}pPr')
    pStyle = pPr.find(f'{{{w_ns}}}pStyle').attrib.get(f'{{{w_ns}}}val') if pPr is not None and pPr.find(f'{{{w_ns}}}pStyle') is not None else 'Normal'
    styles[pStyle] += 1
    
    rPr = p.find(f'.//{{{w_ns}}}rPr')
    sz = rPr.find(f'{{{w_ns}}}sz').attrib.get(f'{{{w_ns}}}val') if rPr is not None and rPr.find(f'{{{w_ns}}}sz') is not None else 'default'
    sizes[sz] += 1
    
    if sz in ['48', '50', '52', '56', '60'] or (sz != 'default' and int(sz) >= 40) or pStyle == 'Heading1':
        large_paras.append((idx, sz, pStyle, raw_text))

print("Top styles in docx:", styles.most_common(5))
print("Top font sizes in docx:", sizes.most_common(5))
print(f"Found {len(large_paras)} candidate headings with large font (sz >= 40)")

# If large_paras is small or empty, let's also inspect numbered paragraphs
numbered_paras = []
for idx, p in enumerate(p_elements):
    texts = [t.text for t in p.iter(f'{{{w_ns}}}t') if t.text]
    raw_text = ''.join(texts).strip()
    m = re.match(r'^(\d+)[\.\:\s]+(.*)', raw_text)
    if m:
        num = int(m.group(1))
        t = m.group(2).strip()
        pPr = p.find(f'{{{w_ns}}}pPr')
        pStyle = pPr.find(f'{{{w_ns}}}pStyle').attrib.get(f'{{{w_ns}}}val') if pPr is not None and pPr.find(f'{{{w_ns}}}pStyle') is not None else 'Normal'
        rPr = p.find(f'.//{{{w_ns}}}rPr')
        sz = rPr.find(f'{{{w_ns}}}sz').attrib.get(f'{{{w_ns}}}val') if rPr is not None and rPr.find(f'{{{w_ns}}}sz') is not None else 'default'
        numbered_paras.append((idx, num, sz, pStyle, t, raw_text))

print(f"Found {len(numbered_paras)} numbered paragraphs in docx.")

with open('scripts/sanity3_sample.json', 'w', encoding='utf-8') as f:
    json.dump({
        'large_paras': [{'p_idx': x[0], 'sz': x[1], 'style': x[2], 'text': x[3]} for x in large_paras[:30]],
        'numbered_paras': [{'p_idx': x[0], 'num': x[1], 'sz': x[2], 'style': x[3], 'title': x[4], 'raw': x[5]} for x in numbered_paras[:50]]
    }, f, indent=2)

print("Saved scripts/sanity3_sample.json successfully.")
