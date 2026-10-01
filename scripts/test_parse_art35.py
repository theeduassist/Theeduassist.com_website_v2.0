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

rel_map = {r.attrib.get('Id'): r.attrib.get('Target') for r in rels_tree if r.attrib.get('Id')}
p_elements = list(doc_tree.iter(f'{{{w_ns}}}p'))

def parse_paragraph(p):
    parts = []
    # Check children in order
    for child in p:
        tag = child.tag
        if tag == f'{{{w_ns}}}r':
            # Run
            texts = [t.text for t in child.findall(f'{{{w_ns}}}t') if t.text]
            t_str = ''.join(texts)
            if not t_str:
                continue
            rPr = child.find(f'{{{w_ns}}}rPr')
            b = rPr.find(f'{{{w_ns}}}b') is not None if rPr is not None else False
            i = rPr.find(f'{{{w_ns}}}i') is not None if rPr is not None else False
            # Check if this run contains an image
            blip = child.find(f'.//{{{a_ns}}}blip')
            if blip is not None:
                eid = blip.attrib.get(f'{{{r_ns}}}embed')
                if eid in rel_map:
                    parts.append(f"![Illustration](/images/blog/{rel_map[eid].replace('media/', '')})")
            if b and len(t_str.strip()) > 0:
                parts.append(f"**{t_str}**")
            else:
                parts.append(t_str)
        elif tag == f'{{{w_ns}}}hyperlink':
            hid = child.attrib.get(f'{{{r_ns}}}id')
            url = rel_map.get(hid, '')
            texts = [t.text for t in child.iter(f'{{{w_ns}}}t') if t.text]
            t_str = ''.join(texts)
            if t_str and url:
                parts.append(f"[{t_str}]({url})")
            elif t_str:
                parts.append(t_str)
        elif tag == f'{{{w_ns}}}drawing':
            blip = child.find(f'.//{{{a_ns}}}blip')
            if blip is not None:
                eid = blip.attrib.get(f'{{{r_ns}}}embed')
                if eid in rel_map:
                    parts.append(f"![Illustration](/images/blog/{rel_map[eid].replace('media/', '')})")
                    
    combined = ''.join(parts).strip()
    
    # Check style
    pPr = p.find(f'{{{w_ns}}}pPr')
    pStyle = pPr.find(f'{{{w_ns}}}pStyle').attrib.get(f'{{{w_ns}}}val') if pPr is not None and pPr.find(f'{{{w_ns}}}pStyle') is not None else 'Normal'
    
    rPr = p.find(f'.//{{{w_ns}}}rPr')
    sz = rPr.find(f'{{{w_ns}}}sz').attrib.get(f'{{{w_ns}}}val') if rPr is not None and rPr.find(f'{{{w_ns}}}sz') is not None else None
    
    return combined, pStyle, sz

# Test parsing Article #35: from 3499 to 3642
art35_paras = []
for p_idx in range(3499, 3642):
    text, style, sz = parse_paragraph(p_elements[p_idx])
    if text:
        art35_paras.append((p_idx, style, sz, text))

print(f"Article 35 has {len(art35_paras)} non-empty paragraphs.")
with open('scripts/sample_art35.txt', 'w', encoding='utf-8') as f:
    for idx, st, sz, txt in art35_paras:
        f.write(f"[{idx}] (style={st}, sz={sz}): {txt}\n\n")

print("Wrote scripts/sample_art35.txt successfully.")
