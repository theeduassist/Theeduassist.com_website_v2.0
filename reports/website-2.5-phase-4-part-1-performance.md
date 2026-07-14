# Performance

- generated HTML size: acceptable, within bounds for typical Astro SSG output.
- JavaScript size: very small as there are no interactive components added that require JS.
- hydrated-island count: 0 introduced on the Enterprise hub pages (all Astro components are static HTML).
- largest asset: existing SVG hero visual and layout images.
- total page image weight: optimized via Vercel edge/Astro.
- build-time Sanity query count: 0 additional queries introduced (all data flows from the code structure and static arrays).
- third-party requests: no new requests added.
- build-duration impact: ~+2s (build time increased from 4m 2s to 4m 4s overall compared to baseline due to 1 extra hub page).
