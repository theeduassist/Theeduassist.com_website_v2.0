import rss from '@astrojs/rss';
import { fetchFromSanity } from '../sanity/client';
import { rssPostsQuery } from '../lib/blog/queries';
import { normalizeBlogPost } from '../lib/blog/normalizeBlogPost';

export async function GET(context: any) {
  const postsRaw = await fetchFromSanity(rssPostsQuery);
  const posts = Array.isArray(postsRaw) ? postsRaw.map(normalizeBlogPost) : [];

  return rss({
    title: 'TheEduAssist Blog',
    description: 'Practical guidance for building and improving learning experiences.',
    site: context.site || 'https://www.theeduassist.com',
    items: posts.map((post) => ({
      title: post.title,
      pubDate: new Date(post.datePublished),
      description: post.excerpt,
      link: post.canonical,
    })),
    customData: `<language>en-us</language>`,
  });
}
