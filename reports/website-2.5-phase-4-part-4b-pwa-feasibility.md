# PWA Feasibility Check

* Current Readiness: Good. The application is a static site built with Astro. Adding a manifest and service worker does not conflict with existing architecture.
* Conflicts: No existing PWA configuration was found.
* Runtime Risks: Very low, assuming forms and APIs are correctly excluded from caching.
* Caching Risks: Medium. We must ensure that POST requests, `/api/` routes, and third-party analytics scripts are excluded from the service worker cache to prevent breaking form submissions and tracking.
* Icon Status: Base favicon exists (`public/favicon-512x512.png`). This will be used for PWA icons.
* Offline Requirements: A simple offline fallback page is needed for users who lose connectivity.
* Rollback Approach: Disable the `PUBLIC_ENABLE_SERVICE_WORKER` feature flag and redeploy. The service worker will be unregistered.
* Recommended Implementation: Add a `manifest.webmanifest`, a simple `sw.js` for caching the app shell and offline page, and conditionally register it in `Layout.astro` based on the feature flag.
