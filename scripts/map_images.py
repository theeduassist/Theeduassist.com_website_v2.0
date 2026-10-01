import zipfile
import xml.etree.ElementTree as ET

docx_path = 'Sanity Articles_2.docx'

with zipfile.ZipFile(docx_path) as z:
    # 1. Parse document relationships to map r:id -> media target
    rels_xml = z.read('word/_rels/document.xml.rels')
    rels_tree = ET.fromstring(rels_xml)
    rel_map = {}
    for r in rels_tree:
        rid = r.attrib.get('Id')
        target = r.attrib.get('Target')
        if rid and target:
            rel_map[rid] = target

    # 2. Parse document.xml to find drawings/blips inside paragraphs
    doc_xml = z.read('word/document.xml')
    doc_tree = ET.fromstring(doc_xml)
    
    w_ns = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'
    a_ns = 'http://schemas.openxmlformats.org/drawingml/2006/main'
    r_ns = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'
    
    p_elements = list(doc_tree.iter(f'{{{w_ns}}}p'))
    image_locations = []
    
    for p_idx, p in enumerate(p_elements):
        # find blip
        for blip in p.iter(f'{{{a_ns}}}blip'):
            embed_id = blip.attrib.get(f'{{{r_ns}}}embed')
            if embed_id and embed_id in rel_map:
                target_file = rel_map[embed_id]
                image_locations.append((p_idx, embed_id, target_file))

print(f"Total embedded images found in paragraphs: {len(image_locations)}")
for p_idx, rid, target in image_locations[:20]:
    print(f"  Para {p_idx}: {rid} -> {target}")
