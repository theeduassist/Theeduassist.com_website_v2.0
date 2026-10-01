import os
from collections import Counter

cats = Counter()
blog_dir = 'src/content/blog'
for f in os.listdir(blog_dir):
    if f.endswith('.md'):
        with open(os.path.join(blog_dir, f), 'r', encoding='utf-8') as fp:
            for line in fp:
                if line.startswith('category:'):
                    c = line.replace('category:', '').strip().strip('"\'')
                    cats[c] += 1
                    break

print("Existing categories count:")
for c, count in cats.most_common():
    print(f"  {c}: {count}")
