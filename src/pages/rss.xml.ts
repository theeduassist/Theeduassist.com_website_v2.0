import rss from '@astrojs/rss';
import { getBlogPostSummaries, isPublicBlogPost } from '../lib/content/getAllBlogPosts';

export async function GET(context: any) {
  const allPosts = await getBlogPostSummaries();
  const posts = allPosts.filter(post => isPublicBlogPost(post));

  return rss({
    title: 'TheEduAssist Blog',
    description: 'Practical guidance for building and improving learning experiences.',
    site: context.site || 'https://www.theeduassist.com',
    items: posts.map((post) => ({
      title: post.title,
      pubDate: post.publishedAt ? new Date(post.publishedAt) : new Date(),
      description: post.excerpt,
      link: post.canonicalUrl || `/blog/${post.slug}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}
