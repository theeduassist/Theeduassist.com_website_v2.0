import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env vars
dotenv.config({ path: path.resolve(__dirname, '../.env') });
if (process.env.PUBLIC_SANITY_PROJECT_ID === 'demo' || !process.env.PUBLIC_SANITY_PROJECT_ID) {
    console.warn("Using demo project ID.");
}

const client = createClient({
  projectId: process.env.PUBLIC_SANITY_PROJECT_ID || 'jg4gi6mn',
  dataset: process.env.PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.PUBLIC_SANITY_API_VERSION || '2026-06-19',
  useCdn: true,
});

export function getBlogPostPublicFilterReason(post) {
  if (!post) return 'Post is null or undefined';

  if (post._id?.startsWith('drafts.')) return 'Draft document';
  if (post.seo?.noindex === true) return 'noindex true';

  const title = (post.title || '').toLowerCase();
  const contentStr = (post.content || '').toLowerCase();

  if (title.includes('content coming soon') || contentStr.includes('content coming soon')) return 'placeholder content';

  const cleanSlug = (post.slug?.current || '').toLowerCase();
  if (cleanSlug.includes('test') || cleanSlug.includes('do-not-publish') || cleanSlug.includes('review-pending')) return 'test slug';

  if (!title || title.includes('test') || title.includes('testing') || title.includes('do not publish') || title.includes('review pending')) {
      return 'test title';
  }

  if (post.hidden === true) return 'hidden true';
  if (post.reviewPending === true) return 'reviewPending true';
  if (!post.publishedAt) return 'missing publishedAt';

  const status = post.status;
  if (status && ['draft', 'review', 'pending', 'archived'].includes(status.toLowerCase())) return 'blocked status';

  const migrationStatus = post.migrationStatus;
  if (migrationStatus && ['draft', 'review', 'pending', 'archived'].includes(migrationStatus.toLowerCase())) return 'blocked migrationStatus';

  return null;
}

async function run() {
    console.log(`Checking Sanity Blog Public Query & Specific Slugs`);

    try {
        // Find specific posts regardless of filter
        const querySpecific = `*[_type == "post" && slug.current in ["kajabi-website-speed-optimization-strong-tips-by-the-eduassist", "gamification-corporate-training"]] {
            title,
            "slug": slug.current,
            publishedAt,
            status,
            migrationStatus,
            "noindex": seo.noindex,
            hidden,
            reviewPending,
            content,
            _id
        }`;

        const specificPosts = await client.fetch(querySpecific);
        console.log(`\n--- Specific Slug Validation ---`);
        specificPosts.forEach((post) => {
            console.log(`\nSlug: ${post.slug}`);
            console.log(`  Title: ${post.title}`);
            console.log(`  PublishedAt: ${post.publishedAt || 'MISSING'}`);
            console.log(`  Status: ${post.status || 'MISSING'}`);
            console.log(`  MigrationStatus: ${post.migrationStatus || 'MISSING'}`);
            console.log(`  NoIndex: ${post.noindex || false}`);
            console.log(`  Hidden: ${post.hidden || false}`);
            console.log(`  ReviewPending: ${post.reviewPending || false}`);

            const reason = getBlogPostPublicFilterReason(post);
            if (reason === null) {
               console.log(`  -> ✅ Included in sitemap (Passes isPublicBlogPost)`);
            } else {
               console.log(`  -> ❌ Excluded from sitemap. Reason: ${reason}`);
            }
        });

    } catch (e) {
        console.error("Failed to query Sanity:", e.message);
    }
}

run();
