#!/bin/bash

# setup-migration-5.sh
# This script sets up a Sanity migration to import ALL posts from WordPress.
# Optimized for high-fidelity import with full pagination.

set -e

# 1. Install Required Dependencies
echo "Step 1: Installing Required Dependencies..."
cd sanity
npm install jsdom @sanity/block-tools @sanity/client @sanity/schema --legacy-peer-deps
npm install --save-dev @types/jsdom --legacy-peer-deps

# 2. Directory Creation
echo "Step 2: Creating Directory Structure..."
mkdir -p migrations/import-eduassist

# 3. File Generation
echo "Step 3: Writing Migration File..."
cat << 'EOF' > migrations/import-eduassist/index.ts
import { defineMigration } from 'sanity/migrate'
import { JSDOM } from 'jsdom'
import { htmlToBlocks } from '@sanity/block-tools'
import { Schema } from '@sanity/schema'
import { createClient } from '@sanity/client'

// Placeholder variables for credentials (if using custom client)
const projectId = 'PASTE_YOUR_PROJECT_ID_HERE'
const token = 'PASTE_YOUR_WRITE_TOKEN_HERE'

const migration = defineMigration({
  title: 'Import EduAssist Posts from WordPress',
  async *migrate(nodes, context) {
    const { client: migrationClient } = context

    // Use custom client if credentials are provided, otherwise use the migration context client
    const client = (projectId !== 'PASTE_YOUR_PROJECT_ID_HERE' && token !== 'PASTE_YOUR_WRITE_TOKEN_HERE')
      ? createClient({ projectId, token, dataset: 'production', useCdn: false, apiVersion: '2023-05-03' })
      : (migrationClient as any)

    console.log('Fetching posts from WordPress...')

    let allPosts: any[] = []
    let page = 1
    let hasMore = true

    while (hasMore) {
      console.log(`Fetching page ${page}...`)
      const response = await fetch(`https://theeduassist.com/wp-json/wp/v2/posts?_embed&per_page=100&page=${page}`)
      if (!response.ok) {
        if (response.status === 400) {
          hasMore = false
          break
        }
        throw new Error(`Failed to fetch posts: ${response.statusText}`)
      }
      const posts = (await response.json()) as any[]
      allPosts = [...allPosts, ...posts]
      console.log(`Retrieved ${posts.length} posts. Total: ${allPosts.length}`)

      if (posts.length < 100) {
        hasMore = false
      } else {
        page++
      }
    }

    console.log(`Migration starting for ${allPosts.length} posts.`)

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

    for (const post of allPosts) {
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
EOF

echo "Migration setup complete!"
echo "-------------------------------------------------------"
echo "HOW TO RUN THE MIGRATION:"
echo "-------------------------------------------------------"
echo "1. Navigate to the sanity folder: cd sanity"
echo "2. Log in to Sanity: npx sanity login"
echo "3. Run a dry run: npx sanity migration run import-eduassist"
echo "4. Run live: npx sanity migration run import-eduassist --no-dry-run"
echo "-------------------------------------------------------"
echo "If you use scripts/migrateBlogs.ts, ensure you have SANITY_WRITE_TOKEN in sanity/.env"
