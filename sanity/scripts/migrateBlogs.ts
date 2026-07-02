import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';
import { createClient } from '@sanity/client';
import * as cheerio from 'cheerio';

// Load environment variables from .env file in sanity folder
const envPath = path.resolve(__dirname, '../.env');
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
} else {
  dotenv.config();
}

const PROJECT_ID = process.env.SANITY_PROJECT_ID || 'jg4gi6mn';
const DATASET = process.env.SANITY_DATASET || 'production';
const WRITE_TOKEN = process.env.SANITY_WRITE_TOKEN;

const isDryRun = process.argv.includes('--dry-run');

console.log('=== WordPress to Sanity Migration Script ===');
console.log(`Project ID: ${PROJECT_ID}`);
console.log(`Dataset: ${DATASET}`);
console.log(`Mode: ${isDryRun ? 'DRY-RUN (No data will be written)' : 'LIVE-IMPORT'}`);

if (!WRITE_TOKEN && !isDryRun) {
  console.error('❌ Error: SANITY_WRITE_TOKEN is missing!');
  console.log('Please ensure you have a .env file in your sanity folder with:');
  console.log('SANITY_WRITE_TOKEN=your_token_here');
  console.log('\nYou can generate a token at: https://www.sanity.io/manage');
  process.exit(1);
} else if (WRITE_TOKEN) {
  console.log(`Token loaded: ${WRITE_TOKEN.substring(0, 5)}...${WRITE_TOKEN.substring(WRITE_TOKEN.length - 5)}`);
}

// Initialize Sanity Client
const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: '2026-07-01',
  token: WRITE_TOKEN,
  useCdn: false,
});

// Helper to generate unique keys for block arrays
function generateKey(): string {
  return Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);
}

// Convert HTML to Sanity Portable Text
function htmlToPortableText(htmlContent: string): any[] {
  const blocks: any[] = [];
  const $ = cheerio.load(htmlContent);

  // Traverse only top-level block elements inside the body
  $('body').children().each((_, elem) => {
    const $elem = $(elem);
    const tagName = elem.tagName ? elem.tagName.toLowerCase() : '';

    if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tagName)) {
      // Heading blocks
      const style = tagName === 'h1' ? 'h2' : tagName; // Map h1 to h2 per site schema styles
      const { children, markDefs } = parseInlineElements($elem, $);
      blocks.push({
        _type: 'block',
        _key: generateKey(),
        style,
        children,
        markDefs,
      });
    } else if (tagName === 'blockquote') {
      // Blockquote blocks
      const { children, markDefs } = parseInlineElements($elem, $);
      blocks.push({
        _type: 'block',
        _key: generateKey(),
        style: 'blockquote',
        children,
        markDefs,
      });
    } else if (tagName === 'ul' || tagName === 'ol') {
      // List items blocks
      const listItemType = tagName === 'ul' ? 'bullet' : 'number';
      $elem.children('li').each((_, liElem) => {
        const { children, markDefs } = parseInlineElements($(liElem), $);
        blocks.push({
          _type: 'block',
          _key: generateKey(),
          style: 'normal',
          listItem: listItemType,
          level: 1,
          children,
          markDefs,
        });
      });
    } else if (tagName === 'pre' || tagName === 'code') {
      // Code / pre blocks
      const codeText = $elem.text();
      blocks.push({
        _type: 'object',
        _key: generateKey(),
        name: 'markdownBlock',
        content: `\`\`\`\n${codeText}\n\`\`\``,
      });
    } else if (tagName === 'img' || ($elem.find('img').length > 0 && tagName !== 'p')) {
      // If there is an image block at root level (or wrapper)
      const img = tagName === 'img' ? $elem : $elem.find('img').first();
      const src = img.attr('src');
      const alt = img.attr('alt') || '';
      if (src) {
        blocks.push({
          _type: 'image',
          _key: generateKey(),
          _tempUrl: src, // Temporary holder to download during migration execution
          alt,
        });
      }
    } else {
      // Standard paragraph or div container -> map to 'normal' paragraph block
      // If it contains a single image inside a paragraph, let's extract it as an image block
      const inlineImg = $elem.find('img');
      if (inlineImg.length > 0 && $elem.text().trim() === '') {
        const src = inlineImg.attr('src');
        const alt = inlineImg.attr('alt') || '';
        if (src) {
          blocks.push({
            _type: 'image',
            _key: generateKey(),
            _tempUrl: src,
            alt,
          });
          return;
        }
      }

      // Check if the text is not completely empty
      const text = $elem.text().trim();
      if (text || $elem.find('a, strong, em, code, span').length > 0) {
        const { children, markDefs } = parseInlineElements($elem, $);
        blocks.push({
          _type: 'block',
          _key: generateKey(),
          style: 'normal',
          children,
          markDefs,
        });
      }
    }
  });

  return blocks;
}

// Parse inline HTML formatting tags into Portable Text children and mark definitions
function parseInlineElements($elem: cheerio.Cheerio<any>, $: cheerio.CheerioAPI): { children: any[], markDefs: any[] } {
  const children: any[] = [];
  const markDefs: any[] = [];

  function traverse(node: any, activeMarks: string[]) {
    if (node.type === 'text') {
      const textVal = node.data;
      if (textVal) {
        children.push({
          _type: 'span',
          _key: generateKey(),
          text: textVal,
          marks: [...activeMarks],
        });
      }
      return;
    }

    if (node.type === 'tag') {
      const $node = $(node);
      const tag = node.name.toLowerCase();
      const currentMarks = [...activeMarks];

      if (['strong', 'b'].includes(tag)) {
        currentMarks.push('strong');
      } else if (['em', 'i'].includes(tag)) {
        currentMarks.push('em');
      } else if (tag === 'code') {
        currentMarks.push('code');
      } else if (tag === 'a') {
        const href = $node.attr('href');
        if (href) {
          const markKey = `link_${generateKey()}`;
          markDefs.push({
            _key: markKey,
            _type: 'link',
            href: href,
          });
          currentMarks.push(markKey);
        }
      }

      // Traverse children nodes
      if (node.children && node.children.length > 0) {
        node.children.forEach((child: any) => {
          traverse(child, currentMarks);
        });
      }
    }
  }

  const domElements = $elem.contents().toArray();
  if (domElements.length === 0) {
    // If no children nodes, just put a simple text child
    children.push({
      _type: 'span',
      _key: generateKey(),
      text: $elem.text(),
      marks: [],
    });
  } else {
    domElements.forEach((node) => {
      traverse(node, []);
    });
  }

  // Ensure children has at least one item
  if (children.length === 0) {
    children.push({
      _type: 'span',
      _key: generateKey(),
      text: '',
      marks: [],
    });
  }

  return { children, markDefs };
}

// Download image URL and upload to Sanity asset store
async function uploadImageFromUrl(url: string, altText: string): Promise<any | null> {
  if (isDryRun) {
    console.log(`[DRY-RUN] Would upload image from URL: ${url}`);
    return { _type: 'image', asset: { _type: 'reference', _ref: 'dry_run_image_ref' }, alt: altText };
  }

  try {
    console.log(`Downloading image: ${url}`);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }
    const buffer = Buffer.from(await response.arrayBuffer());
    
    // Determine content type and filename
    const urlObj = new URL(url);
    const filename = path.basename(urlObj.pathname) || 'image.jpg';
    let contentType = 'image/jpeg';
    if (filename.endsWith('.png')) contentType = 'image/png';
    else if (filename.endsWith('.gif')) contentType = 'image/gif';
    else if (filename.endsWith('.webp')) contentType = 'image/webp';

    const asset = await client.assets.upload('image', buffer, {
      filename,
      contentType,
    });

    console.log(`Successfully uploaded image! Asset ID: ${asset._id}`);
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
      alt: altText || '',
    };
  } catch (error: any) {
    console.error(`Failed to upload image from URL ${url}:`, error.message);
    return null;
  }
}

// Resolve WordPress Author to Sanity Author
async function resolveAuthor(wpAuthorName: string): Promise<string | null> {
  if (!wpAuthorName) return null;
  
  if (isDryRun) {
    console.log(`[DRY-RUN] Resolving author: ${wpAuthorName}`);
    return 'dry_run_author_ref';
  }

  try {
    // Check if author document already exists
    const query = `*[_type == "author" && name == $name][0]._id`;
    const existingAuthorId = await client.fetch(query, { name: wpAuthorName });

    if (existingAuthorId) {
      console.log(`Found existing author: ${wpAuthorName} (ID: ${existingAuthorId})`);
      return existingAuthorId;
    }

    // Create new author document
    console.log(`Author not found. Creating new author: ${wpAuthorName}`);
    const newAuthor = await client.create({
      _type: 'author',
      name: wpAuthorName,
      bio: [],
    });
    console.log(`Created author ${wpAuthorName} with ID: ${newAuthor._id}`);
    return newAuthor._id;
  } catch (error: any) {
    console.error(`Error resolving author "${wpAuthorName}":`, error.message);
    return null;
  }
}

// Main Migration Runner
async function runMigration() {
  console.log(`Fetching all posts from WordPress API...`);

  let allPosts: any[] = [];
  let page = 1;
  let hasMore = true;

  try {
    while (hasMore) {
      const wpApiUrl = `https://theeduassist.com/wp-json/wp/v2/posts?_embed&per_page=100&page=${page}`;
      console.log(`Fetching page ${page}...`);
      const response = await fetch(wpApiUrl);

      if (!response.ok) {
        if (response.status === 400) {
          hasMore = false;
          break;
        }
        throw new Error(`Failed to fetch posts: ${response.statusText}`);
      }

      const posts = (await response.json()) as any[];
      allPosts = [...allPosts, ...posts];
      console.log(`Retrieved ${posts.length} posts. Total: ${allPosts.length}`);

      if (posts.length < 100) {
        hasMore = false;
      } else {
        page++;
      }
    }

    console.log(`Successfully fetched ${allPosts.length} posts in total.`);

    for (let i = 0; i < allPosts.length; i++) {
      const wpPost = allPosts[i];
      console.log('\n----------------------------------------');
      console.log(`Processing post [${i + 1}/${posts.length}]: "${wpPost.title.rendered}"`);

      const wpTitle = cheerio.load(wpPost.title.rendered).text().trim();
      const wpSlug = wpPost.slug;
      const wpDate = wpPost.date_gmt ? `${wpPost.date_gmt}Z` : wpPost.date; // Use GMT date with Z format
      const wpModified = wpPost.modified_gmt ? `${wpPost.modified_gmt}Z` : wpPost.modified;
      const wpExcerpt = cheerio.load(wpPost.excerpt.rendered).text().trim(); // Strip HTML tags for plain excerpt
      
      // Get author details
      const embeddedAuthor = wpPost._embedded?.author?.[0];
      const authorName = embeddedAuthor?.name || 'Anonymous';
      const authorRef = await resolveAuthor(authorName);

      // Get featured image details
      const embeddedMedia = wpPost._embedded?.['wp:featuredmedia']?.[0];
      const featuredImageUrl = embeddedMedia?.source_url;
      const featuredImageAlt = embeddedMedia?.alt_text || wpTitle;

      let mainImageObj = null;
      if (featuredImageUrl) {
        mainImageObj = await uploadImageFromUrl(featuredImageUrl, featuredImageAlt);
      }

      // Convert body HTML to Portable Text Blocks
      console.log('Converting HTML content to Portable Text...');
      const bodyBlocks = htmlToPortableText(wpPost.content.rendered);

      // Process any inline images found in the bodyBlocks
      for (const block of bodyBlocks) {
        if (block._type === 'image' && block._tempUrl) {
          console.log(`Found inline image block in body content.`);
          const uploadedInlineImg = await uploadImageFromUrl(block._tempUrl, block.alt || '');
          if (uploadedInlineImg) {
            block.asset = uploadedInlineImg.asset;
            block.alt = uploadedInlineImg.alt;
          }
          delete block._tempUrl; // Clean up temp URL holder
        }
      }

      // Calculate statistics (word count and reading time)
      const plainTextBody = bodyBlocks
        .filter(b => b._type === 'block')
        .map(b => b.children.map((c: any) => c.text).join(''))
        .join('\n');
      const wordCount = plainTextBody.split(/\s+/).filter(Boolean).length;
      const readingTime = Math.max(1, Math.round(wordCount / 200)); // Standard 200 words per minute

      // Extract Categories and Tags
      const terms = wpPost._embedded?.['wp:term'] || [];
      const categories = terms
        .flat()
        .filter((term: any) => term.taxonomy === 'category')
        .map((term: any) => term.name);
      const tags = terms
        .flat()
        .filter((term: any) => term.taxonomy === 'post_tag')
        .map((term: any) => term.name);

      // Construct Sanity document
      const postId = `imported-wp-${wpPost.id}`;
      const postDoc: any = {
        _type: 'post',
        title: wpTitle,
        slug: {
          _type: 'slug',
          current: wpSlug,
        },
        publishedAt: wpDate,
        modifiedAt: wpModified,
        excerpt: wpExcerpt,
        body: bodyBlocks,
        sticky: wpPost.sticky || false,
        categories: categories,
        tags: tags,
        externalId: wpPost.id,
        authorName: authorName,
        stats: {
          _type: 'object',
          wordCount,
          readingTime,
        },
      };

      if (authorRef) {
        postDoc.author = {
          _type: 'reference',
          _ref: authorRef,
        };
      }

      if (mainImageObj) {
        postDoc.mainImage = mainImageObj;
      }

      // Live import or Dry-run logging
      if (isDryRun) {
        console.log(`[DRY-RUN] Prepared document structure:`);
        console.log(JSON.stringify({
          _id: postId,
          title: postDoc.title,
          slug: postDoc.slug.current,
          publishedAt: postDoc.publishedAt,
          excerpt: postDoc.excerpt,
          authorRef: postDoc.author?._ref,
          mainImageRef: postDoc.mainImage?.asset?._ref,
          stats: postDoc.stats,
          bodyBlocksCount: postDoc.body.length,
        }, null, 2));
      } else {
        console.log(`Uploading post to Sanity dataset (ID: ${postId})...`);
        const result = await client.createOrReplace({
          _id: postId,
          ...postDoc,
        });
        console.log(`Successfully migrated post! Document ID: ${result._id}`);
      }
    }

    console.log('\n========================================');
    console.log(`Migration completed successfully!`);
    console.log(`Processed ${allPosts.length} posts.`);
  } catch (error: any) {
    console.error('\nMigration failed with error:', error.message);
    process.exit(1);
  }
}

// Execute the migration
runMigration();
