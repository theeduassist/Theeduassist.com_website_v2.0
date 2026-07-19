# PWA and Mobile Standard

## Mobile Responsiveness
* All layouts must use responsive design principles (e.g., fluid grids, flexible images, media queries).
* Avoid fixed widths that could cause horizontal overflow on smaller screens. Use `min-width: 0`, `max-width: 100%`, and `overflow-wrap: anywhere` where appropriate.
* Interactive elements (buttons, links) must have adequate touch targets (minimum 44x44 pixels).

## PWA Foundation
* **Manifest**: A `manifest.webmanifest` must be provided and linked in the document head, defining the app's name, display mode, theme color, and icons.
* **Service Worker**: A service worker should be implemented to cache the app shell and static assets for improved performance and offline capabilities.
* **Feature Flag**: The service worker registration must be gated behind a feature flag (e.g., `PUBLIC_ENABLE_SERVICE_WORKER`) to allow safe rollout and rollback.
* **Caching Strategy**:
  * Static assets (CSS, JS, Fonts): Cache-first.
  * HTML Pages: Network-first.
  * Images: Stale-while-revalidate.
  * APIs and Forms: Never cache (Network-only).
