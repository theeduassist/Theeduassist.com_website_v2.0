import zipfile
import xml.etree.ElementTree as ET
import json
import re
import os

w_ns = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'
r_ns = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'
a_ns = 'http://schemas.openxmlformats.org/drawingml/2006/main'

# Open docx
docx_path = 'Sanity Articles_2.docx'
with zipfile.ZipFile(docx_path) as z:
    doc_tree = ET.fromstring(z.read('word/document.xml'))
    rels_tree = ET.fromstring(z.read('word/_rels/document.xml.rels'))

rel_map = {r.attrib.get('Id'): r.attrib.get('Target') for r in rels_tree if r.attrib.get('Id')}
p_elements = list(doc_tree.iter(f'{{{w_ns}}}p'))

def parse_para_elements(p):
    parts = []
    for child in p:
        tag = child.tag
        if tag == f'{{{w_ns}}}r':
            texts = [t.text for t in child.findall(f'{{{w_ns}}}t') if t.text]
            t_str = ''.join(texts)
            if not t_str:
                continue
            rPr = child.find(f'{{{w_ns}}}rPr')
            b = rPr.find(f'{{{w_ns}}}b') is not None if rPr is not None else False
            i = rPr.find(f'{{{w_ns}}}i') is not None if rPr is not None else False
            
            blip = child.find(f'.//{{{a_ns}}}blip')
            if blip is not None:
                eid = blip.attrib.get(f'{{{r_ns}}}embed')
                if eid in rel_map:
                    target = rel_map[eid].replace('media/', '')
                    target_webp = os.path.splitext(target)[0] + '.webp'
                    parts.append(f"\n\n![Illustration](/images/blog/{target_webp})\n\n")
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
                # Sanitize url
                clean_url = url.replace('/insights/', '/blog/')
                parts.append(f"[{t_str}]({clean_url})")
            elif t_str:
                parts.append(t_str)
        elif tag == f'{{{w_ns}}}drawing':
            blip = child.find(f'.//{{{a_ns}}}blip')
            if blip is not None:
                eid = blip.attrib.get(f'{{{r_ns}}}embed')
                if eid in rel_map:
                    target = rel_map[eid].replace('media/', '')
                    target_webp = os.path.splitext(target)[0] + '.webp'
                    parts.append(f"\n\n![Illustration](/images/blog/{target_webp})\n\n")
                    
    combined = ''.join(parts).strip()
    
    pPr = p.find(f'{{{w_ns}}}pPr')
    pStyle = pPr.find(f'{{{w_ns}}}pStyle').attrib.get(f'{{{w_ns}}}val') if pPr is not None and pPr.find(f'{{{w_ns}}}pStyle') is not None else 'Normal'
    
    rPr = p.find(f'.//{{{w_ns}}}rPr')
    sz = rPr.find(f'{{{w_ns}}}sz').attrib.get(f'{{{w_ns}}}val') if rPr is not None and rPr.find(f'{{{w_ns}}}sz') is not None else None
    
    # Check numPr
    numPr = pPr.find(f'{{{w_ns}}}numPr') if pPr is not None else None
    is_list = numPr is not None
    
    return combined, pStyle, sz, is_list

# Test on Article #35
start_p = 3499
end_p = 3642

raw_paras = []
for p_idx in range(start_p, end_p):
    text, pStyle, sz, is_list = parse_para_elements(p_elements[p_idx])
    if text:
        raw_paras.append({
            'p_idx': p_idx,
            'text': text,
            'style': pStyle,
            'sz': sz,
            'is_list': is_list
        })

print(f"Loaded {len(raw_paras)} paragraphs for Article 35.")
print("First paragraph:", raw_paras[0]['text'])
