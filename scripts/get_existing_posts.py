import os
import re
import json

blog_dir = 'src/content/blog'
posts = []

for f in os.listdir(blog_dir):
    if not f.endswith('.md'):
        continue
    filepath = os.path.join(blog_dir, f)
    with open(filepath, 'r', encoding='utf-8') as fp:
        content = fp.read()
        
    title = ''
    slug = ''
    publishedAt = ''
    
    m_title = re.search(r'^title:\s*(.*)$', content, re.MULTILINE)
    if m_title:
        title = m_title.group(1).strip().strip('"\'')
        
    m_slug = re.search(r'^slug:\s*(.*)$', content, re.MULTILINE)
    if m_slug:
        slug = m_slug.group(1).strip().strip('"\'')
    else:
        slug = f[:-3]
        
    m_date = re.search(r'^publishedAt:\s*(.*)$', content, re.MULTILINE)
    if m_date:
        publishedAt = m_date.group(1).strip().strip('"\'')
        
    posts.append({
        'file': f,
        'slug': slug,
        'title': title,
        'publishedAt': publishedAt
    })

with open('scripts/existing_posts.json', 'w', encoding='utf-8') as f:
    json.dump(posts, f, indent=2)

print(f"Loaded {len(posts)} existing posts.")
