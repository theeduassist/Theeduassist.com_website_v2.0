import sys
with open('src/pages/blog/[slug].astro', 'r') as f:
    print(f.read()[:500])
