import re
import os

def clean_title(raw_title):
    t = re.sub(r'^\*?\*?\d+[\.\:\s]+', '', raw_title).strip('* ').strip()
    return t

def make_slug(title):
    slug = re.sub(r'[^a-z0-9]+', '-', title.lower()).strip('-')
    return slug

def escape_yaml_string(s):
    if not s:
        return '""'
    # Clean quotes
    cleaned = s.replace('"', '\\"').replace('\n', ' ').strip()
    return f'"{cleaned}"'

def format_yaml_frontmatter(fm):
    lines = ["---"]
    lines.append(f"title: {escape_yaml_string(fm['title'])}")
    lines.append(f"slug: {fm['slug']}")
    lines.append(f"featured: {str(fm.get('featured', False)).lower()}")
    lines.append(f"excerpt: {escape_yaml_string(fm['excerpt'])}")
    lines.append(f"aiSummary: {escape_yaml_string(fm['aiSummary'])}")
    lines.append(f"author: {fm.get('author', 'editorial-team')}")
    lines.append(f"category: {fm['category']}")
    
    if fm.get('tags'):
        lines.append("tags:")
        for tag in fm['tags']:
            lines.append(f"  - {escape_yaml_string(tag)}")
            
    lines.append("draft: false")
    lines.append(f"publishedAt: {fm.get('publishedAt', '2026-09-20')}")
    lines.append(f"updatedAt: {fm.get('updatedAt', '2026-09-20')}")
    lines.append(f"heroImage: {fm['heroImage']}")
    lines.append(f"heroImageAlt: {escape_yaml_string(fm['heroImageAlt'])}")
    lines.append(f"heroImageCaption: {escape_yaml_string(fm['heroImageCaption'])}")
    lines.append(f"seoTitle: {escape_yaml_string(fm['seoTitle'])}")
    lines.append(f"seoDescription: {escape_yaml_string(fm['seoDescription'])}")
    lines.append(f"focusKeyword: {escape_yaml_string(fm['focusKeyword'])}")
    
    if fm.get('secondaryKeywords'):
        lines.append("secondaryKeywords:")
        for sk in fm['secondaryKeywords']:
            lines.append(f"  - {escape_yaml_string(sk)}")
            
    if fm.get('keyTakeaways'):
        lines.append("keyTakeaways:")
        for kt in fm['keyTakeaways']:
            lines.append(f"  - {escape_yaml_string(kt)}")
            
    lines.append("advancedSeo:")
    lines.append("  noindex: false")
    
    if fm.get('faqs'):
        lines.append("faqs:")
        for faq in fm['faqs']:
            lines.append(f"  - question: {escape_yaml_string(faq['question'])}")
            lines.append(f"    answer: >+")
            lines.append(f"      {faq['answer'].strip()}")
            
    lines.append("---\n")
    return '\n'.join(lines)

def build_article_markdown(meta, paragraphs):
    raw_title = paragraphs[0]['text']
    title = clean_title(raw_title)
    slug = meta.get('candidate_slug') or make_slug(title)
    category = meta.get('category', 'kajabi')
    
    body_paras = []
    for p in paragraphs[1:]:
        t = p['text'].strip()
        if not t:
            continue
        if clean_title(t).lower() == title.lower():
            continue
        body_paras.append(p)
        
    intro_texts = []
    for p in body_paras:
        if p['style'] == 'Normal' and p['sz'] is None and not p['is_list'] and not p['text'].startswith('**'):
            intro_texts.append(p['text'])
            if len(intro_texts) >= 2:
                break
    excerpt = ' '.join(intro_texts)[:260].strip()
    if not excerpt:
        excerpt = f"Explore our comprehensive guide on {title}, covering practical strategies, actionable steps, and expert recommendations."

    faqs = []
    faq_idx = -1
    for i, p in enumerate(body_paras):
        if 'frequently asked questions' in p['text'].lower() or 'faqs' in p['text'].lower():
            faq_idx = i
            break
            
    if faq_idx != -1:
        current_q = None
        current_a = []
        for p in body_paras[faq_idx+1:]:
            t = p['text'].strip()
            if any(term in t.lower() for term in ['references', 'reference links', 'final thoughts', 'authored by', 'authorised by']):
                if current_q and current_a:
                    faqs.append({'question': current_q, 'answer': ' '.join(current_a)})
                break
                
            is_q = (p['style'] in ['Heading3', 'Heading2'] or p['sz'] in ['26', '34'] or t.endswith('?') or (t.startswith('**') and '?' in t))
            if is_q and len(t) < 180 and not t.lower().startswith('step '):
                if current_q and current_a:
                    faqs.append({'question': current_q, 'answer': ' '.join(current_a)})
                current_q = t.strip('* ').strip()
                current_a = []
            elif current_q is not None:
                current_a.append(t.strip('* '))
                
        if current_q and current_a and len(faqs) < 10:
            faqs.append({'question': current_q, 'answer': ' '.join(current_a)})

    tags = [title.split(':')[0].strip()]
    if 'kajabi' in title.lower():
        tags.extend(['Kajabi Course Setup', 'Kajabi Marketing', 'Online Learning Platform'])
    elif 'lms' in title.lower() or 'scorm' in title.lower():
        tags.extend(['LMS Integration', 'Enterprise Learning', 'SCORM Compliance'])
    elif 'ai' in title.lower():
        tags.extend(['AI in Education', 'AI Upskilling', 'EdTech Innovation'])
        
    full_text = ' '.join([p['text'] for p in body_paras])
    if 'usa' in full_text.lower() or 'united states' in full_text.lower() or 'us' in full_text.lower():
        tags.append('USA Corporate Training')
    if 'australia' in full_text.lower():
        tags.append('Australia eLearning')
    if 'remote' in full_text.lower() or 'distributed' in full_text.lower():
        tags.append('Global Remote Teams')

    hero_image = meta.get('hero_image', '/images/blog/image12.webp')

    md_lines = []
    for p in body_paras:
        txt = p['text'].strip()
        st = p['style']
        sz = p['sz']
        is_list = p['is_list']
        
        if st == 'Heading2' or sz in ['34', '48', '50']:
            clean_h = txt.strip('* ')
            md_lines.append(f"\n## **{clean_h}**\n")
        elif st == 'Heading3' or sz in ['26', '28']:
            clean_h = txt.strip('* ')
            md_lines.append(f"\n### **{clean_h}**\n")
        elif is_list:
            md_lines.append(f"* {txt}")
        else:
            md_lines.append(f"{txt}\n")

    md_content = '\n'.join(md_lines)
    
    frontmatter = {
        'title': title,
        'slug': slug,
        'featured': False,
        'excerpt': excerpt,
        'aiSummary': f"Comprehensive guide to {title}. This article details practical frameworks, key best practices, and actionable execution strategies for modern online learning organizations and course creators.",
        'author': 'editorial-team',
        'category': category,
        'tags': tags[:6],
        'draft': False,
        'publishedAt': '2026-09-20',
        'updatedAt': '2026-09-20',
        'heroImage': hero_image,
        'heroImageAlt': f"{title} illustration and implementation overview",
        'heroImageCaption': f"Key insights and actionable framework for {title}.",
        'seoTitle': f"{title} | TheEduAssist",
        'seoDescription': excerpt[:155],
        'focusKeyword': tags[0],
        'secondaryKeywords': tags[1:4],
        'keyTakeaways': [
            f"Gain an end-to-end understanding of {title} with structured workflows.",
            "Implement proven industry best practices to avoid common operational bottlenecks.",
            "Improve learner engagement and retention through tailored, data-driven strategies.",
            "Leverage seamless platform integrations for scalable training delivery."
        ],
        'faqs': faqs[:6]
    }
    
    fm_str = format_yaml_frontmatter(frontmatter)
    return f"{fm_str}{md_content.strip()}\n"

import zipfile
import xml.etree.ElementTree as ET

w_ns = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'
r_ns = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'
a_ns = 'http://schemas.openxmlformats.org/drawingml/2006/main'

docx_path = 'Sanity Articles_2.docx'
with zipfile.ZipFile(docx_path) as z:
    doc_tree = ET.fromstring(z.read('word/document.xml'))
    rels_tree = ET.fromstring(z.read('word/_rels/document.xml.rels'))

rel_map = {r.attrib.get('Id'): r.attrib.get('Target') for r in rels_tree if r.attrib.get('Id')}
p_elements = list(doc_tree.iter(f'{{{w_ns}}}p'))

def parse_para_elements(p):
    parts = []
    for child in p:
        tag = child.tag
        if tag == f'{{{w_ns}}}r':
            texts = [t.text for t in child.findall(f'{{{w_ns}}}t') if t.text]
            t_str = ''.join(texts)
            if not t_str:
                continue
            rPr = child.find(f'{{{w_ns}}}rPr')
            b = rPr.find(f'{{{w_ns}}}b') is not None if rPr is not None else False
            i = rPr.find(f'{{{w_ns}}}i') is not None if rPr is not None else False
            
            blip = child.find(f'.//{{{a_ns}}}blip')
            if blip is not None:
                eid = blip.attrib.get(f'{{{r_ns}}}embed')
                if eid in rel_map:
                    target = rel_map[eid].replace('media/', '')
                    target_webp = os.path.splitext(target)[0] + '.webp'
                    parts.append(f"\n\n![Illustration](/images/blog/{target_webp})\n\n")
            if b and len(t_str.strip()) > 0:
                parts.append(f"**{t_str}**")
            else:
                parts.append(t_str)
        elif tag == f'{{{w_ns}}}hyperlink':
            hid = child.attrib.get(f'{{{r_ns}}}id')
            url = rel_map.get(hid, '')
            texts = [t.text for t in child.iter(f'{{{w_ns}}}t') if t.text]
            t_str = ''.join(texts)
            if t_str and url:
                clean_url = url.replace('/insights/', '/blog/')
                parts.append(f"[{t_str}]({clean_url})")
            elif t_str:
                parts.append(t_str)
        elif tag == f'{{{w_ns}}}drawing':
            blip = child.find(f'.//{{{a_ns}}}blip')
            if blip is not None:
                eid = blip.attrib.get(f'{{{r_ns}}}embed')
                if eid in rel_map:
                    target = rel_map[eid].replace('media/', '')
                    target_webp = os.path.splitext(target)[0] + '.webp'
                    parts.append(f"\n\n![Illustration](/images/blog/{target_webp})\n\n")
                    
    combined = ''.join(parts).strip()
    
    pPr = p.find(f'{{{w_ns}}}pPr')
    pStyle = pPr.find(f'{{{w_ns}}}pStyle').attrib.get(f'{{{w_ns}}}val') if pPr is not None and pPr.find(f'{{{w_ns}}}pStyle') is not None else 'Normal'
    
    rPr = p.find(f'.//{{{w_ns}}}rPr')
    sz = rPr.find(f'{{{w_ns}}}sz').attrib.get(f'{{{w_ns}}}val') if rPr is not None and rPr.find(f'{{{w_ns}}}sz') is not None else None
    
    numPr = pPr.find(f'{{{w_ns}}}numPr') if pPr is not None else None
    is_list = numPr is not None
    
    return combined, pStyle, sz, is_list

raw_paras = []
for p_idx in range(3499, 3642):
    text, pStyle, sz, is_list = parse_para_elements(p_elements[p_idx])
    if text:
        raw_paras.append({
            'p_idx': p_idx,
            'text': text,
            'style': pStyle,
            'sz': sz,
            'is_list': is_list
        })

output_md = build_article_markdown({'candidate_slug': 'kajabi-google-analytics-integration-guide-ga4-setup-tracking', 'category': 'kajabi', 'hero_image': '/images/blog/image12.webp'}, raw_paras)

with open('scripts/test_art35_output.md', 'w', encoding='utf-8') as f:
    f.write(output_md)

print("Generated scripts/test_art35_output.md successfully!")
