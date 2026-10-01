import zipfile
from collections import Counter
import xml.etree.ElementTree as ET

with zipfile.ZipFile('Sanity Articles_2.docx') as z:
    xml_content = z.read('word/document.xml')
    tree = ET.fromstring(xml_content)

w_ns = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'

styles = Counter()
sizes = Counter()
headings = []

for idx, p in enumerate(tree.iter(f'{{{w_ns}}}p')):
    texts = [t.text for t in p.iter(f'{{{w_ns}}}t') if t.text]
    raw_text = ''.join(texts).strip()
    if not raw_text:
        continue
        
    pPr = p.find(f'{{{w_ns}}}pPr')
    pStyle = pPr.find(f'{{{w_ns}}}pStyle') if pPr is not None else None
    style_val = pStyle.attrib.get(f'{{{w_ns}}}val') if pStyle is not None else 'Normal'
    styles[style_val] += 1
    
    rPr = p.find(f'.//{{{w_ns}}}rPr')
    sz = rPr.find(f'{{{w_ns}}}sz') if rPr is not None else None
    sz_val = sz.attrib.get(f'{{{w_ns}}}val') if sz is not None else 'default'
    sizes[sz_val] += 1
    
    # If font size >= 40 (i.e. >= 20pt) or style is Title / Heading1 / sz=50 or similar
    if sz_val in ['48', '50', '52', '56', '60'] or (sz_val != 'default' and int(sz_val) >= 40):
        headings.append((idx, sz_val, style_val, raw_text))

print("Top styles:", styles.most_common(10))
print("Top font sizes:", sizes.most_common(10))
print(f"\nTotal large-font paragraphs (>=40): {len(headings)}")
for h in headings[:30]:
    print(f"p[{h[0]}] sz={h[1]} st={h[2]}: {h[3][:80]}")
