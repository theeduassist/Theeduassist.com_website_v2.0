import json
import re
from difflib import SequenceMatcher

with open('scripts/sanity_articles_2_headings.json', 'r', encoding='utf-8') as f:
    headings = json.load(f)

# Load current 237 blog posts
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

print(f"Loaded {len(all_current_posts)} current blog posts.")
print(f"Loaded {len(headings)} candidate headings from 'Sanity articles 2.docx'.")

def clean_str(s):
    return re.sub(r'[^a-z0-9 ]', '', s.lower()).strip()

def similarity(a, b):
    return SequenceMatcher(None, clean_str(a), clean_str(b)).ratio()

def make_slug(title):
    cleaned = re.sub(r'^\d+[\.\:\s]+', '', title)
    return re.sub(r'[^a-z0-9]+', '-', cleaned.lower()).strip('-')

audit_results = []

for h in headings:
    raw = h['text'].strip()
    m = re.match(r'^(\d+)[\.\:\s]+(.*)', raw)
    num = int(m.group(1)) if m else None
    title = m.group(2).strip() if m else raw
    
    slug_candidate = make_slug(title)
    
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
    
    audit_results.append({
        'p_idx': h['p_idx'],
        'num': num,
        'title': title,
        'raw_text': raw,
        'slug_candidate': slug_candidate,
        'is_added': is_added,
        'similarity': round(best_ratio, 2),
        'matched_post': best_match['slug'] if best_match else None,
        'matched_title': best_match['title'] if best_match else None
    })

added_list = [r for r in audit_results if r['is_added']]
missing_list = [r for r in audit_results if not r['is_added']]

print(f"\nAUDIT SUMMARY FOR 'Sanity articles 2.docx':")
print(f"  Total Headings Identified: {len(audit_results)}")
print(f"  Already Added on Website:  {len(added_list)}")
print(f"  NOT Added / Missing:       {len(missing_list)}\n")

with open('scripts/sanity_articles_2_audit.json', 'w', encoding='utf-8') as f:
    json.dump(audit_results, f, indent=2)

with open('scripts/sanity_articles_2_readable.txt', 'w', encoding='utf-8') as f:
    f.write(f"=== AUDIT OF Sanity articles 2.docx ({len(audit_results)} Articles) ===\n")
    f.write(f"Already Added: {len(added_list)} | Missing / To Add: {len(missing_list)}\n\n")
    for r in audit_results:
        num_str = f"#{r['num']:3d}" if r['num'] is not None else " #None"
        status = "ALREADY ADDED" if r['is_added'] else ">>> MISSING / NOT ADDED <<<"
        f.write(f"{num_str} [{status:27s}] {r['title']}\n")
        f.write(f"    Candidate Slug: {r['slug_candidate']}\n")
        if r['is_added']:
            f.write(f"    Matched: {r['matched_post']} ({int(r['similarity']*100)}% match)\n")
        f.write("\n")

print("Saved audit to scripts/sanity_articles_2_readable.txt successfully.")
