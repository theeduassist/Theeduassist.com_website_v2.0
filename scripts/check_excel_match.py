import zipfile
import xml.etree.ElementTree as ET
import json
import re

# Load missing articles
with open('scripts/missing_articles_to_add.json', 'r', encoding='utf-8') as f:
    missing = json.load(f)

# Load shared strings from TheEduAssist_Content_Management_System.xlsx
def get_shared_strings(xlsx_path):
    strings = []
    with zipfile.ZipFile(xlsx_path) as z:
        if 'xl/sharedStrings.xml' in z.namelist():
            tree = ET.fromstring(z.read('xl/sharedStrings.xml'))
            ns = {'main': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
            for si in tree.findall('.//main:si', ns):
                texts = [t.text for t in si.findall('.//main:t', ns) if t.text]
                strings.append(''.join(texts))
    return strings

cms_strings = get_shared_strings('TheEduAssist_Content_Management_System.xlsx')
seo_strings = get_shared_strings('TheEduAssist_SEO_Operations_Tracker.xlsx')

print(f"Loaded {len(cms_strings)} CMS strings, {len(seo_strings)} SEO strings.")

matches_cms = 0
matches_seo = 0

for m in missing[:10]:
    t = m['title'].lower()
    in_cms = any(t in s.lower() or s.lower() in t for s in cms_strings if len(s) > 15)
    in_seo = any(t in s.lower() or s.lower() in t for s in seo_strings if len(s) > 15)
    print(f"Article #{m['num']} '{m['title'][:40]}...': in_CMS={in_cms}, in_SEO={in_seo}")
