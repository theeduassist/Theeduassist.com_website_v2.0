import zipfile
import xml.etree.ElementTree as ET

def inspect_xlsx(fname):
    print(f"\n=== {fname} ===")
    with zipfile.ZipFile(fname) as z:
        # Get sheet names
        wb_xml = z.read('xl/workbook.xml')
        wb_tree = ET.fromstring(wb_xml)
        ns = {'main': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
        sheets = wb_tree.findall('.//main:sheet', ns)
        sheet_names = [s.attrib.get('name') for s in sheets]
        print(f"Sheets: {sheet_names}")
        
        # Get shared strings
        shared_strings = []
        if 'xl/sharedStrings.xml' in z.namelist():
            ss_xml = z.read('xl/sharedStrings.xml')
            ss_tree = ET.fromstring(ss_xml)
            for si in ss_tree.findall('.//main:si', ns):
                texts = [t.text for t in si.findall('.//main:t', ns) if t.text]
                shared_strings.append(''.join(texts))
        print(f"Total shared strings: {len(shared_strings)}")
        
        # Print first 20 shared strings or sample
        print("Sample shared strings:")
        for s in shared_strings[:15]:
            print(f"  - {s[:80]}")

inspect_xlsx('TheEduAssist_Content_Management_System.xlsx')
inspect_xlsx('TheEduAssist_SEO_Operations_Tracker.xlsx')
