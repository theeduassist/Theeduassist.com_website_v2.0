import json

with open('scripts/sanity_articles_2_audit.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

missing = [d for d in data if not d['is_added']]
print(f"Total missing entries: {len(missing)}")

for i, m in enumerate(missing):
    num_str = f"#{m['num']}" if m['num'] is not None else "#None"
    print(f"{i+1:2d}. {num_str} [p={m['p_idx']}] {m['title'][:70]}")
