# Performance Hardening

* Javascript bundle size remains minimal. No heavy frameworks (like React) are used for the main UI shell, relying on Astro's static generation and selective hydration.
* Images are optimized and lazy-loaded where appropriate.
* The addition of the service worker (when enabled) will improve repeat visit load times by caching static assets.
* Third-party scripts (like analytics) are loaded asynchronously to minimize render blocking.
* Overall Core Web Vitals are expected to remain strong, with high scores in Performance, Accessibility, Best Practices, and SEO.
