import json
import zipfile
import xml.etree.ElementTree as ET
import re

w_ns = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'

with zipfile.ZipFile('Sanity Articles_2.docx') as z:
    doc_tree = ET.fromstring(z.read('word/document.xml'))

p_elements = list(doc_tree.iter(f'{{{w_ns}}}p'))

with open('scripts/missing_ranges_with_images.json', 'r', encoding='utf-8') as f:
    missing_ranges = json.load(f)

print(f"Loaded {len(missing_ranges)} missing articles.")

categories = []
for m in missing_ranges:
    t = m['title'].lower()
    
    # Category detection
    if 'kajabi' in t:
        cat = 'kajabi'
    elif any(k in t for k in ['instructional design', 'curriculum', 'course design', 'learning outcomes', 'instructional designer']):
        cat = 'instructional-design'
    elif any(k in t for k in ['moodle', 'learndash', 'lifterlms', 'absorb', 'scorm', 'migration', 'lms', 'lxp', 'teachable', 'podia', 'platform']):
        cat = 'lms-learning-technology'
    elif any(k in t for k in ['ai', 'synthesia', 'upskilling', 'ar and vr', 'vr', 'future']):
        cat = 'ai-learning'
    elif any(k in t for k in ['employee', 'corporate', 'roi', 'training portal', 'workshops', 'retention']):
        cat = 'enterprise-learning'
    elif any(k in t for k in ['course', 'funnel', 'products', 'digital products']):
        cat = 'course-development'
    else:
        cat = 'learning-strategy'
        
    m['category'] = cat
    categories.append((m['num'], m['title'], cat))

print("Category breakdown for 77 missing articles:")
from collections import Counter
cat_counts = Counter([c[2] for c in categories])
for c, count in cat_counts.most_common():
    print(f"  {c}: {count}")

with open('scripts/missing_articles_categorized.json', 'w', encoding='utf-8') as f:
    json.dump(missing_ranges, f, indent=2)
