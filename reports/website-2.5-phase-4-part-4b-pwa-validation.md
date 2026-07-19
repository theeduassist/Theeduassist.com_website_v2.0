# PWA Validation Report

* PWA manifest (`public/manifest.webmanifest`) was created and linked in `Layout.astro`.
* PWA icons are correctly configured and present.
* Service worker (`public/sw.js`) is implemented with a clear caching strategy:
  * Network-first for HTML pages.
  * Cache-first for static assets.
  * Stale-while-revalidate for images.
  * Never cache API routes, forms, or POST requests.
* Offline fallback page (`src/pages/offline.astro`) is implemented.
* Feature flag `PUBLIC_ENABLE_SERVICE_WORKER` controls service worker registration.
* Validation script (`scripts/validate-pwa.mjs`) checks for manifest presence, icon configuration, service worker implementation, and caching rules.
