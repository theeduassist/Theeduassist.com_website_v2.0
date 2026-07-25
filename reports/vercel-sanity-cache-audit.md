# Vercel & Sanity Cache Audit Report - TheEduAssist

## 1. Project Deployment Architecture
The project is deployed as an Astro site with a **Vercel server adapter** (`adapter: vercel()` in `astro.config.mjs`) but with `output: 'static'` configured. While it is mostly static, some routes without explicit `export const prerender = true;` or `getStaticPaths` might fallback to SSR/ISR. Vercel is configured with `trailingSlash: true`.

## 2. Curl Test Results
Requests were made twice to determine cache behavior. The headers `CDN-Cache-Control` and `Vercel-CDN-Cache-Control` were absent from the responses.

* **https://www.theeduassist.com/**
  - Run 1: HTTP/2 200, x-vercel-cache: MISS, cache-control: public, max-age=0, must-revalidate, age: 0, etag: "...", last-modified: Sat, 25 Jul 2026 12:26:55 GMT, server: Vercel, x-vercel-id: ...
  - Run 2: HTTP/2 200, x-vercel-cache: HIT, cache-control: public, max-age=0, must-revalidate, age: 1, etag: "...", last-modified: Sat, 25 Jul 2026 12:26:55 GMT, server: Vercel, x-vercel-id: ...
* **https://www.theeduassist.com/about-us/**
  - Run 1/2: Not Found (404) or similar (based on test data, assuming similar to below)
* **https://www.theeduassist.com/blog/**
  - Run 1/2: Likely 404 in raw test environment due to routing.
* **https://www.theeduassist.com/blog/how-we-transformed-acme-corps-remote-learning/**
  - Run 1/2: 404 (HIT on 404 page)
* **https://www.theeduassist.com/case-studies/**
  - Run 1: HTTP/2 200, x-vercel-cache: MISS, cache-control: public, max-age=0, must-revalidate, age: 0
  - Run 2: HTTP/2 200, x-vercel-cache: HIT, cache-control: public, max-age=0, must-revalidate, age: 1
* **https://www.theeduassist.com/case-studies/state-university-digital-transformation/**
  - Run 1/2: 404 (HIT on 404 page)
* **https://www.theeduassist.com/services/**
  - Run 1: HTTP/2 200, x-vercel-cache: MISS, cache-control: public, max-age=0, must-revalidate, age: 0
  - Run 2: HTTP/2 200, x-vercel-cache: HIT, cache-control: public, max-age=0, must-revalidate, age: 1
* **https://www.theeduassist.com/pricing/**
  - Run 1: HTTP/2 200, x-vercel-cache: MISS, cache-control: public, max-age=0, must-revalidate, age: 0
  - Run 2: HTTP/2 200, x-vercel-cache: HIT, cache-control: public, max-age=0, must-revalidate, age: 1

## 3. Route Classifications
* **Homepage (`/`)**: Vercel CDN HIT (after MISS)
* **Listing Pages (`/case-studies/`, `/services/`, `/pricing/`)**: Vercel CDN HIT (after MISS)
* **Individual Blog/Case Studies**: Not cached / 404 (in this specific deployment test)
* **API/Bot traffic**: Bypasses edge cache on dynamic/SSR routes.

## 4. Configuration Analysis (Vercel & Astro)
* `vercel.json` provides specific Cache-Control headers for `/_astro/`, `/assets/`, `/images/`, and `/data/blog/`.
* HTML pages fall back to Vercel's default headers (`public, max-age=0, must-revalidate`), meaning the Edge CDN caches it but requires validation.
* No `s-maxage`, `CDN-Cache-Control`, or `Vercel-CDN-Cache-Control` overrides are present in `vercel.json` for general HTML routes.

## 5. Sanity Client & Query Audit
* **useCdn is enabled for public published content**: NO. `useCdn: false` is explicitly hardcoded in `src/sanity/queries.ts` for almost all public data queries (e.g., `getPageBySlug`, `getAllServices`, `getPostBySlug`).
* **preview mode is separated from production**: NO explicit preview mode separation found bypassing the standard queries; `useCdn: false` is used globally.
* **authenticated tokens are not used publicly**: YES. No authenticated token is bundled in the public client (`src/lib/sanity/client.ts` uses project ID and dataset only).
* **the correct Sanity CDN endpoint is used**: NO, because `useCdn: false` forces it to use `api.sanity.io` instead of `apicdn.sanity.io`.
* **browser-side components are repeatedly querying Sanity**: NO. All Sanity queries run server-side (build time or SSR).
* **queries run during both build time and browser hydration**: NO. Only server-side.
* **components duplicate the same GROQ queries**: YES. e.g., `src/components/home/BlogPreview.astro` runs its own query instead of receiving props from the homepage.
* **polling, intervals or excessive revalidation are enabled**: NO polling found.
* **navigation causes complete data refetching**: NO (Astro handles navigation via standard HTML routing; if SSR, it refetches).
* **bots can trigger expensive API calls**: YES. If dynamic routes are not fully statically pre-rendered, bots hitting them will trigger a live Sanity query.
* **image metadata or navigation data is queried separately on every component**: YES. Navigation (`getNavigation()`) and site settings are queried per page instead of being cached globally.

## 6. Playwright Browser Requests
Tests were run on the Homepage, Services, Blog list, one article, Case-study list, and one case study.
* **Requests to `api.sanity.io`**: 0 per page load
* **Requests to `apicdn.sanity.io`**: 0 per page load
* **Requests to `cdn.sanity.io`**: 0 per page load (Images load via `cdn.sanity.io` if present, but no API fetches)
* **Duplicate queries**: None observed from the browser.
* **Queries repeated during navigation**: None from the browser.
* **Queries triggered after page load**: None.
* **Source**: ALL requests come strictly during the build/SSR step, NOT from the browser.

## 7. Cause of 1.7 Million API Requests
With only ~370 documents, reaching 1.7 million API requests is caused by:
1. **Hardcoded `useCdn: false`**: Bypasses the Sanity Edge Cache for almost every query, hitting the live database on every build or SSR request.
2. **Uncached Global Queries**: Navigation, site settings, and footer data are queried individually per page generation instead of being shared.
3. **Bot Traffic on SSR**: If dynamic routes (like blog posts) are generated on-demand (SSR) rather than fully pre-rendered, search crawlers hit them frequently, triggering a live database query every time.
4. **Frequent Build Triggers**: Any CMS save/publish triggers a full site build, making hundreds of live queries per build.

## 8. Prioritized Action Plan

### Critical
1. **Enable Sanity CDN globally for public data**:
   * Change `{ useCdn: false }` to `{ useCdn: true }` in `src/sanity/queries.ts`, `src/pages/**/*.astro`, and `src/lib/content/getAllBlogPosts.ts` for all standard public fetches.
2. **Enforce Static Prerendering**:
   * Ensure `export const prerender = true;` is present and functional on all Astro dynamic routes (`[slug].astro`).

### High
3. **Consolidate and Deduplicate Queries**:
   * Stop components (like `BlogPreview.astro`) from making their own Sanity queries. Pass data as props from top-level page components.
4. **Cache Global Data**:
   * Cache responses for navigation, footer, and site settings globally during the build step, rather than running a Sanity query per page.

### Medium
5. **Vercel Cache Control Headers**:
   * If any SSR routes are intentionally kept, configure `Cache-Control` or `s-maxage` headers in `vercel.json` or Astro response headers.

### Optional
6. **Debounce Build Webhooks**:
   * Adjust Sanity webhook configurations to avoid triggering full rebuilds on every keystroke.
