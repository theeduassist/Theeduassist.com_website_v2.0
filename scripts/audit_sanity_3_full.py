import json
import re
from difflib import SequenceMatcher

# Load existing blog posts
with open('scripts/existing_posts.json', 'r', encoding='utf-8') as f:
    existing = json.load(f)

# Also include newly generated files
import os
blog_dir = 'src/content/blog'
all_current_posts = []
for f in os.listdir(blog_dir):
    if f.endswith('.md'):
        slug = f[:-3].lower()
        title = ''
        with open(os.path.join(blog_dir, f), 'r', encoding='utf-8') as fp:
            for line in fp:
                if line.startswith('title:'):
                    title = line.replace('title:', '').strip().strip('"\'')
                    break
        all_current_posts.append({'file': f, 'slug': slug, 'title': title})

print(f"Total current posts in src/content/blog: {len(all_current_posts)}")

# Load sanity 3 headings
with open('scripts/sanity3_sample.json', 'r', encoding='utf-8') as f:
    s3_data = json.load(f)

headings = s3_data['large_paras']

def clean_str(s):
    return re.sub(r'[^a-z0-9 ]', '', s.lower()).strip()

def similarity(a, b):
    return SequenceMatcher(None, clean_str(a), clean_str(b)).ratio()

results = []
for h in headings:
    raw = h['text']
    m = re.match(r'^(\d+)[\.\:\s]+(.*)', raw)
    num = int(m.group(1)) if m else None
    title = m.group(2).strip() if m else raw
    
    slug_candidate = re.sub(r'[^a-z0-9]+', '-', title.lower()).strip('-')
    
    best_ratio = 0.0
    best_match = None
    for p in all_current_posts:
        r1 = similarity(title, p['title'])
        r2 = similarity(slug_candidate, p['slug'])
        r = max(r1, r2)
        if r > best_ratio:
            best_ratio = r
            best_match = p
            
    is_added = best_ratio >= 0.75
    results.append({
        'num': num,
        'title': title,
        'slug_candidate': slug_candidate,
        'is_added': is_added,
        'similarity': round(best_ratio, 2),
        'matched_post': best_match['slug'] if best_match else None,
        'matched_title': best_match['title'] if best_match else None
    })

print(f"\nAudit of sanity article 3.docx ({len(results)} articles found):")
added_count = sum(1 for r in results if r['is_added'])
missing_count = sum(1 for r in results if not r['is_added'])

print(f"  Already Added: {added_count}")
print(f"  Not Added (Missing): {missing_count}\n")

for r in results:
    status = "ALREADY ADDED" if r['is_added'] else "NOT ADDED (MISSING)"
    match_info = f"-> matched with '{r['matched_post']}' ({int(r['similarity']*100)}%)" if r['is_added'] else ""
    print(f"  #{r['num']} [{status:19s}] {r['title'][:60]} {match_info}")

with open('scripts/sanity3_audit_results.json', 'w', encoding='utf-8') as f:
    json.dump(results, f, indent=2)
