# PWA Regression Review

- Blog content generation relies on static HTML through Astro's `getStaticPaths`.
- Sanity CMS fetches only occur at build time. No browser-time network requests are made to Sanity for article body content.
- PWA remains network-first for new HTML routes.
