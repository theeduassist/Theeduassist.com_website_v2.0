# Website 2.5 Phase 1 Foundation

## Architecture Overview

**Static-first Astro Islands Architecture with Sanity build-time content, Vercel edge caching, selective hydration and protected serverless endpoints.**

- **Astro**: Responsible for the static generation of pages, layouts, routing, structural metadata, and rendering the core component tree without client-side JS bloat.
- **Sanity**: Acts as the build-time headless CMS. Content is fetched only during the build step (`useCdn: false` in `astro.config.mjs` for build-time queries, with dedicated CDN logic applied as needed for non-blocking read calls) to prevent exposing the Sanity API via browser-side fetches.
- **Vercel**: Handles edge caching, routing, deployments, and security header injection.
- **Tailwind**: Drives the brand design system, UI layout, utility classes, and responsivity.
- **Motion/Interactivity**: Vanilla JavaScript web components (e.g., `<mobile-menu>`) are utilized for essential interactivity such as header dropdowns and accordion expansions, keeping hydration minimal. React Islands are only used for heavily stateful utilities (not present on core layouts).
- **Lucide**: Used as the sole standard vector icon library for navigation indicators.

## Navigation Architecture

Centralized typed navigation is stored in `src/data/siteNavigation.ts` containing:
- `NavigationLink`
- `NavigationGroup`
- `TopLevelNavigationItem`

This singular source of truth supplies data to both the Desktop `Header.astro` mega-menus and the Mobile `MobileMenu.astro` accordions, as well as the `Footer.astro` link groupings. This structure prevents duplication, guarantees that ARIA relationships scale systematically, and ensures only explicitly verified paths are mapped.

## Bot and Form Protection Findings

The core public forms are evaluated in `src/components/forms/` (e.g., `ContactForm.astro`, `ProjectInquiryForm.astro`).
- **Turnstile Implementation**: `TurnstileWidget.astro` is present and injected into public forms to generate tokens.
- **Submission Processing**: Current frontend logic relies on client-side vanilla JavaScript intercepting the submit event to redirect to a `/thank-you/` page, with `action="/api/submit-lead"` marked as a placeholder/endpoint structure.
- **Security Check**: The Cloudflare Turnstile token exists on the frontend, but actual backend security depends on the implementation of the `/api/submit-lead` serverless function verifying the token against the Secret Key. Phase 1 confirms the widget is included on the frontend templates; deeper serverless logic enhancements belong to later phases.

## Scope Addressed in Phase 1
- **Cleaned Navigation**: Created centralized `siteNavigation.ts`.
- **Accessible Headers & Menus**: Updated `Header.astro` and `MobileMenu.astro` with proper semantic HTML, `aria-expanded`/`aria-controls`, and `Esc` key handlers.
- **Footer Refactoring**: Standardized link mapping, removed redundant lists, placeholder root links, and obsolete content.
- **CTA Standardization**: Forced `FinalCTA.astro` to render an approved safe fallback instead of exposing internal CMS strings.
- **AR/VR/MR Removal**: Scrubbed from `src/data/services.ts`.
- **Audit Reports**: Completed Route, Claim, and Architecture reporting.

## Final Validation Results
- **Preview tested:** Local Astro preview
- **Viewports tested:** 360px, 390px, 768px, 1024px, 1280px, 1366px, 1440px, 1536px, 1920px (via Playwright)
- **Browsers tested:** Chromium
- **Keyboard tests completed:** Escape to close, focus order verified manually and via test scripts.
- **Accessibility findings:** ARIA relationships (`aria-controls`, `aria-expanded`) correctly update upon interaction on Desktop/Mobile menus. No hover-only functionality left without keyboard fallback logic.
- **Fixes applied:** Header layout constraint `max-w-[1500px]` applied to prevent overlap, responsive layout breaks resolved, Final CTA strings made static.
- **Commands run:** `npm ci`, `npm install --legacy-peer-deps`, `npx astro check`, `npm run build`, `python3 test_nav.py`.
- **Exact command results:** All builds successful. No missing peer deps after fix. Astro Check emitted known minor JSX typings warnings.

## Known Risks & Deferred Work
- Full Enterprise Solutions navigation and ROI calculator are deferred.
- API Route implementations for form submission (`/api/submit-lead`) require full server-side Turnstile validation in later backend integration steps.
- The Insights/Blog dynamic architecture caching and hydration strategy remains out of scope for Phase 1.