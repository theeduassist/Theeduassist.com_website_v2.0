# Website 2.5 Phase 6 Part 1 - Vercel CDN Cache Architecture

## Caching Strategy Confirmed
1. **Static HTML**: Blog posts, location pages, service pages, and case studies are compiled strictly to static HTML. This ensures the Vercel Edge network automatically caches them upon deployment and returns `HIT` or `MISS` appropriately based on edge population without querying the underlying application layer.
2. **Asset Fingerprinting**: Assets in `/_astro/*` and `/assets/*` utilize long-lived immutable caching directives (`Cache-Control: public, max-age=31536000, immutable`) configured directly in `vercel.json` headers.
3. **Data APIs**: Internal static JSON data endpoints (e.g. `/data/blog/*.json`) use bounded caching (`max-age=3600`) to remain relatively fresh if referenced directly while avoiding quota hits.

## SSR/Function Isolation
- Endpoints requiring active server interactions (like `/api/forms/enterprise-brief.ts`) explicitly disable prerendering (`export const prerender = false;`) and do not have cache headers injected, ensuring user interactions evaluate cleanly against the deployed serverless functions.
