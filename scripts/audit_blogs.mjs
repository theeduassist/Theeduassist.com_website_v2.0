import { createClient } from '@sanity/client';
import fs from 'fs';

// Simple sanity client using environment variables if available or fallback
const client = createClient({
  projectId: process.env.PUBLIC_SANITY_PROJECT_ID || 'jg4gi6mn',
  dataset: process.env.PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-05-03',
  useCdn: false, // Don't use CDN for audit
});

async function runAudit() {
  console.log("Starting Blog Content Audit...");

  const query = `*[_type == "post"]{
    _id,
    title,
    slug,
    status,
    publishedAt,
    category,
    author->{name},
    excerpt,
    aiSummary,
    body,
    "mainImageAlt": mainImage.alt,
    seo
  }`;

  const posts = await client.fetch(query);
  console.log(`Fetched ${posts.length} total posts from Sanity.`);

  let report = "TheEduAssist Blog Audit Report\n=================================\n\n";
  let flags = {
    missingSummary: 0,
    missingImageAlt: 0,
    missingCategory: 0,
    missingAuthor: 0,
    privateUrls: 0,
    duplicateH1: 0,
    thinContent: 0,
    missingDate: 0
  };

  posts.forEach(post => {
    let postIssues = [];
    const slug = post.slug?.current || 'NO_SLUG';
    const isPublished = post.status === 'published' || post.status === 'approved' || !!post.publishedAt;

    if (!isPublished) return; // Only audit active public posts

    // Check summaries
    if (!post.aiSummary && !post.excerpt) {
      postIssues.push("- Missing both aiSummary and excerpt");
      flags.missingSummary++;
    } else if (!post.aiSummary) {
      postIssues.push("- Missing aiSummary");
      flags.missingSummary++;
    }

    if (post.excerpt && post.excerpt.length > 300) {
      postIssues.push(`- Excerpt too long (${post.excerpt.length} chars)`);
    }

    // Check metadata
    if (!post.category && !post.categories) {
      postIssues.push("- Missing category");
      flags.missingCategory++;
    }
    if (!post.author) {
      postIssues.push("- Missing author");
      flags.missingAuthor++;
    }
    if (!post.publishedAt) {
      postIssues.push("- Missing publishedAt date");
      flags.missingDate++;
    }
    if (!post.mainImageAlt) {
       postIssues.push("- Missing main image alt text");
       flags.missingImageAlt++;
    }

    // Deep check body
    if (post.body && Array.isArray(post.body)) {
      let h1Count = 0;
      let wordCount = 0;
      let hasPrivateUrl = false;
      let textChunks = [];

      post.body.forEach(block => {
         if (block._type === 'block') {
           if (block.style === 'h1') h1Count++;

           if (block.children) {
             block.children.forEach(child => {
                if (child.text) {
                  wordCount += child.text.split(' ').length;
                  textChunks.push(child.text);
                }
             });
           }

           if (block.markDefs) {
             block.markDefs.forEach(def => {
                if (def._type === 'link' && def.href) {
                   if (def.href.includes('sanity.io') || def.href.includes('admin') || def.href.includes('drafts')) {
                      hasPrivateUrl = true;
                   }
                }
             });
           }
         }
      });

      if (h1Count > 0) {
        postIssues.push(`- Contains H1 tags in body (should only use H2/H3)`);
        flags.duplicateH1++;
      }

      if (wordCount < 300) {
        postIssues.push(`- Thin content (${wordCount} words)`);
        flags.thinContent++;
      }

      if (hasPrivateUrl) {
        postIssues.push(`- Contains private admin/sanity URLs`);
        flags.privateUrls++;
      }

      // Basic check for repeated blocks (exact string match of long paragraphs)
      const longChunks = textChunks.filter(t => t.length > 100);
      const uniqueChunks = new Set(longChunks);
      if (uniqueChunks.size < longChunks.length) {
         postIssues.push(`- Potentially duplicated paragraphs detected`);
      }
    } else {
       postIssues.push(`- No portable text body found`);
    }

    if (postIssues.length > 0) {
      report += `Post: ${post.title || 'Untitled'} (/blog/${slug}/)\n`;
      postIssues.forEach(i => report += `${i}\n`);
      report += '\n';
    }
  });

  report += `\nSummary of Issues across Published Posts:\n`;
  report += `- Missing AI Summary: ${flags.missingSummary}\n`;
  report += `- Missing Main Image Alt: ${flags.missingImageAlt}\n`;
  report += `- Missing Category: ${flags.missingCategory}\n`;
  report += `- Missing Author: ${flags.missingAuthor}\n`;
  report += `- Contains Private URLs: ${flags.privateUrls}\n`;
  report += `- Duplicate H1s in Body: ${flags.duplicateH1}\n`;
  report += `- Thin Content (<300 words): ${flags.thinContent}\n`;

  fs.writeFileSync('audit_report.txt', report);
  console.log("Audit complete. Report saved to audit_report.txt");
}

runAudit().catch(console.error);