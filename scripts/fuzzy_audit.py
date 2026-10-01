import json
import re
from difflib import SequenceMatcher

with open('scripts/article_audit_full.json', 'r', encoding='utf-8') as f:
    docx_articles = json.load(f)

with open('scripts/existing_posts.json', 'r', encoding='utf-8') as f:
    existing_posts = json.load(f)

def clean_str(s):
    return re.sub(r'[^a-z0-9 ]', '', s.lower()).strip()

def similarity(a, b):
    return SequenceMatcher(None, clean_str(a), clean_str(b)).ratio()

refined = []

for item in docx_articles:
    current_status = item['status']
    title = item['title']
    matched_slug = item['matched_file']
    
    # If currently missing, let's check fuzzy similarity against all existing titles and slugs
    if current_status == 'MISSING':
        best_ratio = 0.0
        best_post = None
        for ep in existing_posts:
            r1 = similarity(title, ep['title'])
            r2 = similarity(title, ep['slug'])
            r = max(r1, r2)
            if r > best_ratio:
                best_ratio = r
                best_post = ep
                
        # If similarity >= 0.70, it's likely already published under a slightly varied title
        if best_ratio >= 0.70:
            current_status = f'SIMILAR_MATCH_{int(best_ratio*100)}%'
            matched_slug = f"{best_post['slug']} (Title: '{best_post['title']}')"
            
    refined.append({
        'p_idx': item['p_idx'],
        'num': item['num'],
        'title': title,
        'candidate_slug': item['candidate_slug'],
        'status': current_status,
        'matched': matched_slug
    })

with open('scripts/refined_audit.json', 'w', encoding='utf-8') as f:
    json.dump(refined, f, indent=2)

with open('scripts/refined_audit_readable.txt', 'w', encoding='utf-8') as f:
    f.write("=== REFINED AUDIT SUMMARY ===\n\n")
    for r in refined:
        num_str = f"#{r['num']:3d}" if r['num'] is not None else " #None"
        f.write(f"{num_str} [{r['status']:20s}] {r['title']}\n")
        if r['matched']:
            f.write(f"      Matched: {r['matched']}\n")

already = [r for r in refined if not r['status'].startswith('MISSING')]
missing = [r for r in refined if r['status'].startswith('MISSING')]

print(f"Refined Total: {len(refined)}")
print(f"Already Published or Matched: {len(already)}")
print(f"Truly Missing (To Add): {len(missing)}")
