import zipfile
import xml.etree.ElementTree as ET
import json
import re
import os

docx_path = 'Sanity articles 2.docx'
output_dir = 'src/content/blog'

w_ns = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'
r_ns = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'

with zipfile.ZipFile(docx_path) as z:
    doc_tree = ET.fromstring(z.read('word/document.xml'))
    rels_tree = ET.fromstring(z.read('word/_rels/document.xml.rels'))

rel_map = {r.attrib.get('Id'): r.attrib.get('Target') for r in rels_tree if r.attrib.get('Id')}
p_elements = list(doc_tree.iter(f'{{{w_ns}}}p'))

# Load existing audit
with open('scripts/sanity_articles_2_audit.json', 'r', encoding='utf-8') as f:
    audit_data = json.load(f)

# Load existing posts to double check no collision
existing_slugs = set()
for f in os.listdir(output_dir):
    if f.endswith('.md'):
        existing_slugs.add(f[:-3].lower())

def clean_title(raw_title):
    t = re.sub(r'^\*?\*?\d+[\.\:\s]+', '', raw_title).strip('* ').strip()
    return t

def make_slug(title):
    cleaned = re.sub(r'^\*?\*?\d+[\.\:\s]+', '', title)
    s = re.sub(r'[^a-z0-9]+', '-', cleaned.lower()).strip('-')
    s = re.sub(r'-+', '-', s)
    return s

def clean_hyperlink_url(url):
    if not url:
        return ''
    u = url.strip()
    # Strip google search wrapper
    if 'google.com/search?q=http' in u:
        m = re.search(r'q=(https?://[^&]+)', u)
        if m:
            u = m.group(1)
            
    # Strip query parameters like utm_source or sei
    u = re.sub(r'\?utm_[^&]+(&utm_[^&]+)*', '', u)
    u = re.sub(r'&sei=[^&]+', '', u)
    u = re.sub(r'\?utm_source=[^&]+', '', u)

    # Convert /insights/ to /blog/
    u = u.replace('/insights/', '/blog/')

    # Handle __trashed
    if '/blog/__trashed/' in u:
        u = 'https://www.theeduassist.com/blog/'

    # Handle uncategorized
    u = u.replace('/uncategorized/', '/blog/')

    # Handle redirects
    if u.endswith('theeduassist.com/contact-us') or u.endswith('theeduassist.com/contact-us/'):
        u = 'https://www.theeduassist.com/contact/'
    elif u.endswith('theeduassist.com/contact'):
        u = 'https://www.theeduassist.com/contact/'
    elif 'theeduassist.com/custom-elearning-content-development' in u:
        u = 'https://www.theeduassist.com/services/custom-elearning-development/'
    elif 'theeduassist.com/ai-powered-elearning' in u:
        u = 'https://www.theeduassist.com/services/ai-powered-elearning/'
    elif 'theeduassist.com/resources/' in u:
        u = 'https://www.theeduassist.com/blog/'

    # Normalize domain to https://www.theeduassist.com
    if u.startswith('http://theeduassist.com'):
        u = u.replace('http://theeduassist.com', 'https://www.theeduassist.com')
    elif u.startswith('https://theeduassist.com'):
        u = u.replace('https://theeduassist.com', 'https://www.theeduassist.com')

    return u

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
            if b and len(t_str.strip()) > 0:
                parts.append(f"**{t_str}**")
            else:
                parts.append(t_str)
        elif tag == f'{{{w_ns}}}hyperlink':
            hid = child.attrib.get(f'{{{r_ns}}}id')
            raw_url = rel_map.get(hid, '')
            texts = [t.text for t in child.iter(f'{{{w_ns}}}t') if t.text]
            t_str = ''.join(texts).strip()
            clean_url = clean_hyperlink_url(raw_url)
            if t_str and clean_url:
                parts.append(f" [{t_str}]({clean_url}) ")
            elif t_str:
                parts.append(f" {t_str} ")
                
    combined = ''.join(parts).strip()
    
    pPr = p.find(f'{{{w_ns}}}pPr')
    pStyle = pPr.find(f'{{{w_ns}}}pStyle').attrib.get(f'{{{w_ns}}}val') if pPr is not None and pPr.find(f'{{{w_ns}}}pStyle') is not None else 'Normal'
    
    rPr = p.find(f'.//{{{w_ns}}}rPr')
    sz = rPr.find(f'{{{w_ns}}}sz').attrib.get(f'{{{w_ns}}}val') if rPr is not None and rPr.find(f'{{{w_ns}}}sz') is not None else None
    
    numPr = pPr.find(f'{{{w_ns}}}numPr') if pPr is not None else None
    is_list = numPr is not None
    
    return combined, pStyle, sz, is_list

# Load available images in public/images/blog
blog_imgs = [f for f in os.listdir('public/images/blog') if f.endswith('.webp')]
kajabi_pool = [f for f in blog_imgs if 'kajabi' in f.lower()] or blog_imgs
lms_pool = [f for f in blog_imgs if any(k in f.lower() for k in ['lms', 'moodle', 'teachable', 'thinkific', 'skool'])] or blog_imgs
ai_pool = [f for f in blog_imgs if 'ai' in f.lower()] or blog_imgs
id_pool = [f for f in blog_imgs if any(k in f.lower() for k in ['design', 'course', 'curriculum'])] or blog_imgs
general_pool = [f for f in blog_imgs if f.startswith('image')] or blog_imgs

def get_hero_image(category, title, index):
    t = title.lower()
    if 'kajabi' in t:
        return f"/images/blog/{kajabi_pool[index % len(kajabi_pool)]}"
    elif any(k in t for k in ['skool', 'lms', 'teachable', 'moodle', 'talentlms', 'learnworlds', 'learndash', 'canvas', 'blackboard']):
        return f"/images/blog/{lms_pool[index % len(lms_pool)]}"
    elif any(k in t for k in ['ai', 'automation', 'n8n', 'agentic', 'sim racing', 'quest 3']):
        return f"/images/blog/{ai_pool[index % len(ai_pool)]}"
    elif any(k in t for k in ['instructional', 'curriculum', 'training', 'design']):
        return f"/images/blog/{id_pool[index % len(id_pool)]}"
    else:
        return f"/images/blog/{general_pool[index % len(general_pool)]}"

def format_yaml_frontmatter(fm):
    lines = ["---"]
    lines.append(f"title: {json.dumps(fm['title'])}")
    lines.append(f"slug: {fm['slug']}")
    lines.append(f"featured: {str(fm.get('featured', False)).lower()}")
    lines.append(f"excerpt: {json.dumps(fm['excerpt'])}")
    lines.append(f"aiSummary: {json.dumps(fm['aiSummary'])}")
    lines.append(f"author: {json.dumps(fm.get('author', 'editorial-team'))}")
    lines.append(f"category: {json.dumps(fm['category'])}")
    
    if fm.get('tags'):
        lines.append("tags:")
        for tag in fm['tags']:
            lines.append(f"  - {json.dumps(tag)}")
            
    lines.append("draft: false")
    lines.append(f"publishedAt: {json.dumps(fm.get('publishedAt', '2026-09-22'))}")
    lines.append(f"updatedAt: {json.dumps(fm.get('updatedAt', '2026-09-22'))}")
    lines.append(f"heroImage: {json.dumps(fm['heroImage'])}")
    lines.append(f"heroImageAlt: {json.dumps(fm['heroImageAlt'])}")
    lines.append(f"heroImageCaption: {json.dumps(fm['heroImageCaption'])}")
    lines.append(f"seoTitle: {json.dumps(fm['seoTitle'])}")
    lines.append(f"seoDescription: {json.dumps(fm['seoDescription'])}")
    lines.append(f"focusKeyword: {json.dumps(fm['focusKeyword'])}")
    
    if fm.get('secondaryKeywords'):
        lines.append("secondaryKeywords:")
        for sk in fm['secondaryKeywords']:
            lines.append(f"  - {json.dumps(sk)}")
            
    if fm.get('keyTakeaways'):
        lines.append("keyTakeaways:")
        for kt in fm['keyTakeaways']:
            lines.append(f"  - {json.dumps(kt)}")
            
    lines.append("advancedSeo:")
    lines.append("  noindex: false")
    
    if fm.get('faqs'):
        lines.append("faqs:")
        for faq in fm['faqs']:
            lines.append(f"  - question: {json.dumps(faq['question'])}")
            lines.append(f"    answer: {json.dumps(faq['answer'])}")
            
    lines.append("---\n")
    return '\n'.join(lines)

# Filter missing articles from audit_data
missing_entries = []
for i in range(len(audit_data)):
    entry = audit_data[i]
    if not entry['is_added']:
        start_p = entry['p_idx']
        end_p = audit_data[i+1]['p_idx'] if i + 1 < len(audit_data) else len(p_elements)
        if end_p > start_p:
            entry['start_p'] = start_p
            entry['end_p'] = end_p
            missing_entries.append(entry)

print(f"Total valid missing entries to generate: {len(missing_entries)}")

generated_count = 0
for idx, entry in enumerate(missing_entries):
    title = clean_title(entry['title'])
    if not title:
        continue
    slug = make_slug(title)
    if slug in existing_slugs:
        print(f"Skipping already existing slug: {slug}")
        continue
        
    start_p = entry['start_p']
    end_p = entry['end_p']
    
    raw_paras = []
    for p_i in range(start_p, end_p):
        text, pStyle, sz, is_list = parse_para_elements(p_elements[p_i])
        if text:
            raw_paras.append({
                'p_idx': p_i,
                'text': text,
                'style': pStyle,
                'sz': sz,
                'is_list': is_list
            })
            
    if len(raw_paras) < 3:
        print(f"Warning: Article '{title}' has very few paragraphs ({len(raw_paras)}). Skipping.")
        continue
        
    # Filter body paras (skip title paragraph)
    body_paras = []
    for p in raw_paras[1:]:
        t = p['text'].strip()
        if not t:
            continue
        if clean_title(t).lower() == title.lower():
            continue
        body_paras.append(p)
        
    # Detect category
    t_lower = title.lower()
    if 'kajabi' in t_lower:
        cat = 'kajabi'
    elif any(k in t_lower for k in ['instructional design', 'curriculum', 'learning outcomes', 'terminal learning', 'lesson plan']):
        cat = 'instructional-design'
    elif any(k in t_lower for k in ['lms', 'skool', 'teachable', 'talentlms', 'learnworlds', 'scorm', 'migration', 'authoring tool']):
        cat = 'lms-learning-technology'
    elif any(k in t_lower for k in ['ai', 'automation', 'n8n', 'sim racing', 'quest 3']):
        cat = 'ai-learning'
    elif any(k in t_lower for k in ['corporate', 'hybrid teams', 'training coordinator', 'executive assistant', 'leadership', 'safety training', 'lti']):
        cat = 'enterprise-learning'
    elif any(k in t_lower for k in ['course', 'canva', 'youtube', 'handbook', 'workbook', 'video']):
        cat = 'course-development'
    else:
        cat = 'learning-strategy'
        
    # Excerpt (first 1-2 clean paragraphs, max 250 chars)
    intro_texts = []
    for p in body_paras:
        t_clean = p['text'].strip().replace('*', '')
        if p['style'] == 'Normal' and p['sz'] is None and not p['is_list'] and len(t_clean) > 40:
            intro_texts.append(t_clean)
            if len(intro_texts) >= 2:
                break
    excerpt = ' '.join(intro_texts)
    excerpt = ' '.join(excerpt.split())
    if len(excerpt) > 250:
        excerpt = excerpt[:247].rstrip() + "..."
    if not excerpt:
        excerpt = f"Discover actionable strategies and comprehensive guidelines for {title}. Practical insights for educators, course creators, and enterprise L&D leaders."

    # FAQs extraction
    faqs = []
    faq_idx = -1
    for i, p in enumerate(body_paras):
        if any(term in p['text'].lower() for term in ['frequently asked questions', 'faq', 'faqs']):
            faq_idx = i
            break
            
    if faq_idx != -1:
        current_q = None
        current_a = []
        for p in body_paras[faq_idx+1:]:
            t = p['text'].strip()
            if any(term in t.lower() for term in ['references', 'reference links', 'final thoughts', 'authored by', 'authorised by']):
                if current_q and current_a:
                    ans_text = ' '.join(current_a).strip()
                    if len(ans_text) > 10:
                        faqs.append({'question': current_q, 'answer': ans_text})
                break
                
            is_q = (p['style'] in ['Heading3', 'Heading2'] or p['sz'] in ['26', '34'] or t.endswith('?') or (t.startswith('**') and '?' in t))
            if is_q and len(t) < 180 and not t.lower().startswith('step '):
                if current_q and current_a:
                    ans_text = ' '.join(current_a).strip()
                    if len(ans_text) > 10:
                        faqs.append({'question': current_q, 'answer': ans_text})
                current_q = t.strip('* ').strip()
                current_a = []
            elif current_q is not None:
                current_a.append(t.strip('* '))
                
        if current_q and current_a and len(faqs) < 8:
            ans_text = ' '.join(current_a).strip()
            if len(ans_text) > 10:
                faqs.append({'question': current_q, 'answer': ans_text})

    # Tags & Geo-SEO
    tag_candidate = title.split(':')[0].split('?')[0].strip()
    tags = [tag_candidate]
    if cat == 'kajabi':
        tags.extend(['Kajabi Course Setup', 'Kajabi Marketing', 'Online Learning Platform'])
    elif cat == 'lms-learning-technology':
        tags.extend(['LMS Integration', 'Enterprise Learning', 'LMS Migration'])
    elif cat == 'instructional-design':
        tags.extend(['Instructional Design', 'Curriculum Development', 'Learning Outcomes'])
    elif cat == 'ai-learning':
        tags.extend(['AI in Education', 'AI Upskilling', 'EdTech Innovation'])
    else:
        tags.extend(['Corporate Training', 'Employee Development', 'Learning Strategy'])
        
    full_text = ' '.join([p['text'] for p in body_paras])
    # Geographic SEO checks
    if any(loc in full_text.lower() or loc in t_lower for loc in ['new york', 'ny']):
        tags.append('New York EdTech')
    if any(loc in full_text.lower() or loc in t_lower for loc in ['ohio', 'miami', 'florida', 'california', 'texas', 'dallas']):
        tags.append('USA Corporate Training')
    if any(loc in full_text.lower() or loc in t_lower for loc in ['australia', 'sydney', 'melbourne', 'perth', 'canberra', 'victoria', 'queensland']):
        tags.append('Australia eLearning')
    if 'remote' in full_text.lower() or 'hybrid' in full_text.lower():
        tags.append('Global Remote Teams')

    # Hero image
    hero_image = get_hero_image(cat, title, idx)

    # SEO Title (strictly <= 58 chars)
    if len(title) <= 58:
        seo_title = title
    else:
        seo_title = title[:55].rstrip() + "..."

    # SEO Description (strictly <= 155 chars)
    seo_desc = ' '.join(excerpt.split())
    if len(seo_desc) > 155:
        seo_desc = seo_desc[:152].rstrip() + "..."

    # Markdown lines
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
    
    # Internal linking CTA block
    cta_addon = ""
    if cat == 'kajabi' and '/kajabi-services/' not in md_content:
        cta_addon = "\n\n---\n\n*Looking to build, scale, or automate your Kajabi training academy? Explore our complete [Kajabi Implementation Services](https://www.theeduassist.com/kajabi-services/) or book a free architectural consultation with our team.*\n"
    elif cat in ['lms-learning-technology', 'enterprise-learning'] and '/services/' not in md_content:
        cta_addon = "\n\n---\n\n*Planning an enterprise LMS rollout or zero-downtime migration? Learn more about our technical [LMS Solutions](https://www.theeduassist.com/services/) and custom integrations.*\n"
    elif cat == 'instructional-design' and '/services/' not in md_content:
        cta_addon = "\n\n---\n\n*Need custom instructional design or high-impact curriculum architecture? Discover how TheEduAssist builds measurable learning programs on our [Services Page](https://www.theeduassist.com/services/).*\n"

    md_content += cta_addon

    frontmatter = {
        'title': title,
        'slug': slug,
        'featured': False,
        'excerpt': excerpt,
        'aiSummary': f"In-depth guide to {title}. Outlines key principles, proven workflows, and implementation strategies for education businesses and enterprise training programs.",
        'author': 'editorial-team',
        'category': cat,
        'tags': tags[:6],
        'draft': False,
        'publishedAt': '2026-09-22',
        'updatedAt': '2026-09-22',
        'heroImage': hero_image,
        'heroImageAlt': f"{title} overview and actionable framework",
        'heroImageCaption': f"Implementation guide and core takeaways for {title}.",
        'seoTitle': seo_title,
        'seoDescription': seo_desc,
        'focusKeyword': tags[0],
        'secondaryKeywords': tags[1:4],
        'keyTakeaways': [
            f"Gain actionable knowledge on {title} with practical frameworks.",
            "Understand key technical and pedagogical considerations for scalable delivery.",
            "Improve learner engagement and knowledge retention across distributed teams.",
            "Avoid common design pitfalls through structured evaluation and continuous iteration."
        ],
        'faqs': faqs[:6]
    }
    
    fm_str = format_yaml_frontmatter(frontmatter)
    file_content = f"{fm_str}{md_content.strip()}\n"
    
    out_filepath = os.path.join(output_dir, f"{slug}.md")
    with open(out_filepath, 'w', encoding='utf-8') as out_f:
        out_f.write(file_content)
        
    existing_slugs.add(slug)
    generated_count += 1
    if generated_count % 10 == 0 or generated_count == len(missing_entries):
        print(f"  Generated {generated_count}/{len(missing_entries)}: {slug}")

print(f"\nSuccessfully generated {generated_count} new articles into {output_dir}!")
