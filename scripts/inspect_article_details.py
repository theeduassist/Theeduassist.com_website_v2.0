import zipfile
import xml.etree.ElementTree as ET
import json
import re

w_ns = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'
r_ns = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'
a_ns = 'http://schemas.openxmlformats.org/drawingml/2006/main'

with zipfile.ZipFile('Sanity Articles_2.docx') as z:
    doc_tree = ET.fromstring(z.read('word/document.xml'))
    rels_tree = ET.fromstring(z.read('word/_rels/document.xml.rels'))
    
# Build relationship target map
rel_map = {}
for r in rels_tree:
    rid = r.attrib.get('Id')
    target = r.attrib.get('Target')
    if rid and target:
        rel_map[rid] = target

# Inspect paragraphs and identify article boundaries
p_elements = list(doc_tree.iter(f'{{{w_ns}}}p'))
print(f"Total paragraphs in doc: {len(p_elements)}")

with open('scripts/article_audit_full.json', 'r', encoding='utf-8') as f:
    all_headings = json.load(f)

with open('scripts/missing_articles_to_add.json', 'r', encoding='utf-8') as f:
    missing_articles = json.load(f)

print(f"Missing articles to add: {len(missing_articles)}")

# Map each heading in all_headings to its p_idx
heading_indices = [h['p_idx'] for h in all_headings]
print("First 10 heading paragraph indices:", heading_indices[:10])

# Check a sample missing article: e.g. #35 Kajabi Google Analytics Integration Guide: GA4 Setup & Tracking
# Let's find its start p_idx and end p_idx
for i, h in enumerate(all_headings):
    if h['num'] == 35:
        start_idx = h['p_idx']
        next_idx = all_headings[i+1]['p_idx'] if i+1 < len(all_headings) else len(p_elements)
        print(f"\nArticle #35: start_p={start_idx}, end_p={next_idx}, total paras in article={next_idx - start_idx}")
        # Print first 15 paragraphs of Article #35
        for p_i in range(start_idx, min(start_idx + 15, next_idx)):
            p = p_elements[p_i]
            texts = [t.text for t in p.iter(f'{{{w_ns}}}t') if t.text]
            combined = ''.join(texts).strip()
            
            # Check for images
            imgs = []
            for blip in p.iter(f'{{{a_ns}}}blip'):
                embed_id = blip.attrib.get(f'{{{r_ns}}}embed')
                if embed_id and embed_id in rel_map:
                    imgs.append(rel_map[embed_id])
                    
            # Check for hyperlinks
            links = []
            for hl in p.iter(f'{{{w_ns}}}hyperlink'):
                hl_id = hl.attrib.get(f'{{{r_ns}}}id')
                hl_url = rel_map.get(hl_id, '')
                hl_texts = [t.text for t in hl.iter(f'{{{w_ns}}}t') if t.text]
                if hl_texts:
                    links.append((''.join(hl_texts), hl_url))
                    
            pPr = p.find(f'{{{w_ns}}}pPr')
            pStyle = pPr.find(f'{{{w_ns}}}pStyle').attrib.get(f'{{{w_ns}}}val') if pPr is not None and pPr.find(f'{{{w_ns}}}pStyle') is not None else 'Normal'
            
            print(f"  P[{p_i}] ({pStyle}): {combined[:70]} | Imgs: {imgs} | Links: {links}")
        break
