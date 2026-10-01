import json

with open('scripts/existing_posts.json', 'r', encoding='utf-8') as f:
    existing = json.load(f)

with open('scripts/refined_audit.json', 'r', encoding='utf-8') as f:
    docx_items = json.load(f)

matched_slugs = set()
for d in docx_items:
    if d['matched']:
        # extract slug
        slug = d['matched'].split()[0]
        matched_slugs.add(slug)

not_in_docx = [e for e in existing if e['slug'] not in matched_slugs and e['file'][:-3] not in matched_slugs]

print(f"Total existing: {len(existing)}")
print(f"Matched to docx: {len(matched_slugs)}")
print(f"Existing on site but NOT in Sanity Articles_2.docx: {len(not_in_docx)}")
print("\nSample of existing posts NOT in Sanity Articles_2.docx:")
for e in not_in_docx[:15]:
    print(f" - {e['slug']}: {e['title'][:60]}")
