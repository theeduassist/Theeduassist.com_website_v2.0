import json

with open('scripts/article_audit_full.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

with open('scripts/audit_readable.txt', 'w', encoding='utf-8') as out:
    out.write(f"TOTAL HEADINGS IN DOCX: {len(data)}\n\n")
    for i, d in enumerate(data):
        num_str = f"#{d['num']:3d}" if d['num'] is not None else " #None"
        status_str = f"[{d['status']:18s}]"
        match = f"-> {d['matched_file']}" if d['matched_file'] else ""
        out.write(f"{i+1:3d}. {num_str} {status_str} {d['title']} {match}\n")

print("Wrote scripts/audit_readable.txt successfully")
