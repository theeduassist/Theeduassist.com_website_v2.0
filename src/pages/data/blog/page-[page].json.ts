import { getBlogPostSummaries } from '../../../lib/content/getAllBlogPosts';

export const prerender = true;

export async function getStaticPaths({ paginate }) {
  let posts = [];
  try {
    posts = await getBlogPostSummaries();
  } catch (e) {
    console.log("Error fetching blog posts for JSON pagination");
  }
  return paginate(posts, { pageSize: 12 });
}

export async function GET({ props }) {
  const { page } = props;

  // Return only summary fields necessary for rendering the card
  const cleanData = page.data.map(post => ({
    title: post.title,
    slug: post.slug?.current || post.slug,
    excerpt: post.excerpt,
    aiSummary: post.aiSummary,
    category: post.category,
    readingTime: post.readingTime,
    publishedAt: post.publishedAt,
    heroImage: post.heroImage || post.mainImage?.asset?.url,
    heroImageAlt: post.heroImageAlt || post.mainImage?.alt,
    tags: post.tags || []
  }));

  return new Response(JSON.stringify(cleanData), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
