import zipfile
import xml.etree.ElementTree as ET
import os
import re
import json
from difflib import SequenceMatcher

docx_path = 'Sanity articles 2.docx'

if not os.path.exists(docx_path):
    print(f"Error: {docx_path} does not exist.")
    exit(1)

with zipfile.ZipFile(docx_path) as z:
    media_files = [f for f in z.namelist() if f.startswith('word/media/')]
    doc_xml = z.read('word/document.xml')

print(f"=== {docx_path} ===")
print(f"Total media files in docx: {len(media_files)}")

w_ns = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'
doc_tree = ET.fromstring(doc_xml)
p_elements = list(doc_tree.iter(f'{{{w_ns}}}p'))
print(f"Total paragraphs in docx: {len(p_elements)}")

# 1. Load all current blog posts from src/content/blog
blog_dir = 'src/content/blog'
existing_posts = []

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
        existing_posts.append({'file': f, 'slug': slug, 'title': title})

print(f"Total current articles in src/content/blog: {len(existing_posts)}")

# 2. Extract paragraphs and find candidate article headings
# Check font sizes and numbered patterns
paras_info = []
for idx, p in enumerate(p_elements):
    texts = [t.text for t in p.iter(f'{{{w_ns}}}t') if t.text]
    raw_text = ''.join(texts).strip()
    if not raw_text or raw_text == '.':
        continue
        
    pPr = p.find(f'{{{w_ns}}}pPr')
    pStyle = pPr.find(f'{{{w_ns}}}pStyle').attrib.get(f'{{{w_ns}}}val') if pPr is not None and pPr.find(f'{{{w_ns}}}pStyle') is not None else 'Normal'
    
    rPr = p.find(f'.//{{{w_ns}}}rPr')
    sz = rPr.find(f'{{{w_ns}}}sz').attrib.get(f'{{{w_ns}}}val') if rPr is not None and rPr.find(f'{{{w_ns}}}sz') is not None else 'default'
    
    paras_info.append({
        'p_idx': idx,
        'style': pStyle,
        'sz': sz,
        'text': raw_text
    })

print(f"Total non-empty paragraphs: {len(paras_info)}")

# Find large font headings or numbered article headings
headings = []
for p in paras_info:
    sz = p['sz']
    st = p['style']
    t = p['text']
    
    is_heading = False
    if sz in ['48', '50', '52', '56', '60'] or (sz != 'default' and int(sz) >= 40):
        is_heading = True
    elif st == 'Heading1':
        is_heading = True
        
    if is_heading:
        headings.append(p)

print(f"Found {len(headings)} candidate headings based on font size (sz >= 40):")
for h in headings[:25]:
    print(f"  P[{h['p_idx']}] (sz={h['sz']}): {h['text'][:75]}")

with open('scripts/sanity_articles_2_headings.json', 'w', encoding='utf-8') as f:
    json.dump(headings, f, indent=2)
