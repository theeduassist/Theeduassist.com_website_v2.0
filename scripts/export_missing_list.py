import json

with open('scripts/refined_audit.json', 'r', encoding='utf-8') as f:
    items = json.load(f)

missing = [x for x in items if x['status'] == 'MISSING']
already = [x for x in items if x['status'] != 'MISSING']

print(f"Total in docx: {len(items)}")
print(f"Already on site: {len(already)}")
print(f"Missing to add: {len(missing)}")

with open('scripts/missing_articles_to_add.json', 'w', encoding='utf-8') as f:
    json.dump(missing, f, indent=2)

with open('scripts/missing_articles_to_add.txt', 'w', encoding='utf-8') as f:
    f.write(f"=== MISSING ARTICLES TO ADD ({len(missing)} Total) ===\n\n")
    for idx, m in enumerate(missing, 1):
        num_str = f"#{m['num']}" if m['num'] else "#?"
        f.write(f"{idx:2d}. [{num_str}] {m['title']}\n")
        f.write(f"    Candidate Slug: {m['candidate_slug']}\n\n")

print("Wrote scripts/missing_articles_to_add.txt successfully")
