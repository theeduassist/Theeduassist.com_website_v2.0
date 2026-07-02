import { defineMigration } from 'sanity/migrate'
import { JSDOM } from 'jsdom'
import { htmlToBlocks } from '@sanity/block-tools'
import { Schema } from '@sanity/schema'
import { createClient } from '@sanity/client'
import { env } from 'process'

// Placeholder variables for credentials
const projectId = process.env.SANITY_PROJECT_ID || 'PASTE_YOUR_PROJECT_ID_HERE'
const token = process.env.SANITY_WRITE_TOKEN || 'PASTE_YOUR_WRITE_TOKEN_HERE'

const migration = defineMigration({
  title: 'Import EduAssist Posts from WordPress',
  async *migrate(nodes, context) {
    const { client: migrationClient } = context

    // Use custom client if credentials are provided, otherwise use the migration context client
    const client = (projectId !== 'PASTE_YOUR_PROJECT_ID_HERE' && token !== 'PASTE_YOUR_WRITE_TOKEN_HERE')
      ? createClient({ projectId, token, dataset: 'production', useCdn: false, apiVersion: '2023-05-03' })
      : (migrationClient as any)

    console.log('Fetching posts from WordPress...')
    // Fetching 10 posts as per latest request
    const response = await fetch('https://theeduassist.com/wp-json/wp/v2/posts?_embed&per_page=10&page=1')
    if (!response.ok) throw new Error(`Failed to fetch posts: ${response.statusText}`)
    const posts = (await response.json()) as any[]
    console.log(`Found ${posts.length} posts.`)

    // Prepare schema for block-tools
    const schema = Schema.compile({
      name: 'migration-schema',
      types: [
        {
          name: 'post',
          type: 'document',
          fields: [
            {
              name: 'body',
              type: 'array',
              of: [{ type: 'block' }]
            }
          ]
        }
      ]
    })
    const blockContentType = schema.get('post').fields.find((f: any) => f.name === 'body').type

    for (const post of posts) {
      console.log(`Processing post: ${post.title.rendered} (ID: ${post.id})`)

      let mainImageReference = null
      const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0]

      if (featuredMedia?.source_url) {
        try {
          console.log(`Downloading featured image: ${featuredMedia.source_url}`)
          const imgRes = await fetch(featuredMedia.source_url)
          const arrayBuffer = await imgRes.arrayBuffer()
          const asset = await client.assets.upload('image', Buffer.from(arrayBuffer), {
            filename: featuredMedia.slug || `post-${post.id}-image`
          })
          mainImageReference = {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: asset._id
            }
          }
        } catch (err) {
          console.error(`Failed to upload image for post ${post.id}:`, err)
        }
      }

      // Parse HTML to Portable Text
      const blocks = htmlToBlocks(post.content.rendered, blockContentType, {
        parseHtml: (html) => new JSDOM(html).window.document
      })

      // Extract categories and tags
      const terms = post._embedded?.['wp:term'] || []
      const categories = terms
        .flat()
        .filter((term: any) => term.taxonomy === 'category')
        .map((term: any) => term.name)
      const tags = terms
        .flat()
        .filter((term: any) => term.taxonomy === 'post_tag')
        .map((term: any) => term.name)

      const authorName = post._embedded?.['author']?.[0]?.name

      const doc = {
        _type: 'post',
        _id: `eduassist-post-${post.id}`,
        externalId: post.id,
        title: post.title.rendered,
        slug: {
          _type: 'slug',
          current: post.slug
        },
        publishedAt: post.date,
        modifiedAt: post.modified,
        sticky: post.sticky,
        authorName: authorName,
        categories: categories,
        tags: tags,
        excerpt: post.excerpt.rendered.replace(/<[^>]*>?/gm, '').trim(),
        mainImage: mainImageReference,
        body: blocks,
      }

      yield {
        type: 'createOrReplace',
        document: doc
      }
    }
  }
})

export default migration
