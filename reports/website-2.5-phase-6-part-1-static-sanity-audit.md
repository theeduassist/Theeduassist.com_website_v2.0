# Website 2.5 Phase 6 Part 1 - Static Sanity Content Flow

## Sanity Build-Time Querying
- Verified `src/lib/sanity/client.ts` implements a dedicated `sanityBuildClient` using `useCdn: false` for fresh build-time CMS data collection.
- All Blog queries (`src/pages/blog/[slug].astro`, `/blog/index.astro`, `/authors/[slug].astro`) use `fetchFromSanity` explicitly configured with `useCdn: false` and are successfully fetched at build time.

## Static-First Validation
- Astro's global config (`astro.config.mjs`) is set to `output: 'static'`, ensuring by default all routes are built into plain HTML unless explicitly opted out.
- The `export const prerender = true;` flag is confirmed on dynamic endpoints like `/blog/[slug].astro` and `/locations/[slug].astro` to ensure they hook into the static generation build step instead of falling back to SSR execution paths (which the static adapter warns about if configured differently, but is safe here).
- **Zero Vercel Function Invocations**: Because the content is pre-built as HTML pages in `dist`/`.vercel/output/static/`, visiting a content page on Vercel does not invoke a Serverless Function to query Sanity on demand.

## PWA Safety
- PWA manifests and Service Worker assets (`sw.js`) explicitly exclude `sitemap.xml`, `robots.txt`, `/api/` endpoints, and dynamic form success paths to avoid dangerous offline caching that would blind crawlers to content updates.
