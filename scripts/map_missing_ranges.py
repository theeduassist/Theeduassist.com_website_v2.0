import zipfile
import xml.etree.ElementTree as ET
import json
import os

w_ns = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'
r_ns = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'
a_ns = 'http://schemas.openxmlformats.org/drawingml/2006/main'

with zipfile.ZipFile('Sanity Articles_2.docx') as z:
    doc_tree = ET.fromstring(z.read('word/document.xml'))
    rels_tree = ET.fromstring(z.read('word/_rels/document.xml.rels'))

rel_map = {}
for r in rels_tree:
    rid = r.attrib.get('Id')
    target = r.attrib.get('Target')
    if rid and target:
        rel_map[rid] = target

p_elements = list(doc_tree.iter(f'{{{w_ns}}}p'))

# Load all headings
with open('scripts/article_audit_full.json', 'r', encoding='utf-8') as f:
    all_headings = json.load(f)

# Build ranges for each heading
heading_ranges = []
for i in range(len(all_headings)):
    start_p = all_headings[i]['p_idx']
    end_p = all_headings[i+1]['p_idx'] if i + 1 < len(all_headings) else len(p_elements)
    heading_ranges.append({
        'index': i,
        'num': all_headings[i]['num'],
        'title': all_headings[i]['title'],
        'candidate_slug': all_headings[i]['candidate_slug'],
        'status': all_headings[i]['status'],
        'start_p': start_p,
        'end_p': end_p
    })

# Map all images to paragraphs
img_by_p = {}
for p_idx, p in enumerate(p_elements):
    for blip in p.iter(f'{{{a_ns}}}blip'):
        embed_id = blip.attrib.get(f'{{{r_ns}}}embed')
        if embed_id and embed_id in rel_map:
            target = rel_map[embed_id]
            img_by_p.setdefault(p_idx, []).append(target)

# Check images per missing article
missing_slugs_set = set()
with open('scripts/missing_articles_to_add.json', 'r', encoding='utf-8') as f:
    missing_list = json.load(f)
    for m in missing_list:
        missing_slugs_set.add(m['candidate_slug'])

missing_ranges = [hr for hr in heading_ranges if hr['candidate_slug'] in missing_slugs_set]

print(f"Total missing articles to process: {len(missing_ranges)}")

articles_with_images = 0
total_images_in_missing = 0

for hr in missing_ranges:
    imgs = []
    for p_i in range(hr['start_p'], hr['end_p']):
        if p_i in img_by_p:
            imgs.extend(img_by_p[p_i])
    hr['images'] = imgs
    if imgs:
        articles_with_images += 1
        total_images_in_missing += len(imgs)

print(f"Missing articles with images: {articles_with_images}/{len(missing_ranges)}")
print(f"Total images in missing articles: {total_images_in_missing}")

with open('scripts/missing_ranges_with_images.json', 'w', encoding='utf-8') as f:
    json.dump(missing_ranges, f, indent=2)
