# Website 2.5 Phase 1 Route Audit

## Current Public Routes
Based on the `src/pages/` directory, the following main routes currently exist:
- `/` (index)
- `/about-us/`
- `/accessibility-statement/`
- `/ai-use-policy/`
- `/blog/`
- `/book-free-audit/`
- `/book-free-kajabi-audit/`
- `/brand-assets/`
- `/careers/`
- `/case-studies/`
- `/contact/`
- `/cookie-policy/`
- `/disclaimer/`
- `/editorial-policy/`
- `/kajabi-services/`
- `/locations/`
- `/media-kit/`
- `/news/`
- `/newsroom/`
- `/platforms/`
- `/press-releases/`
- `/pricing/`
- `/privacy-policy/`
- `/services/`
- `/services/ai-ethics-corporate-training/`
- `/services/ai-powered-elearning/`
- `/services/content-conversion/`
- `/services/custom-elearning-development/`
- `/services/funnels-automation/`
- `/services/lms-implementation-migration/`
- `/services/ongoing-support-maintenance/`
- `/sitemap/`
- `/terms-and-conditions/`
- `/thank-you/`

## Indexable Routes
Most of the main pages are intended to be indexable unless blocked by `robots.txt` or a `noindex` tag. Public routes in navigation files (e.g., Header and Footer) match these working paths.

## Missing or Broken Destinations
- A review of `src/data/siteNavigation.ts` matched against `src/pages/` confirmed that all linked destinations in the new centralized navigation point to existing valid routes. No missing routes are exposed in the navigation.
- Prior to the update, `src/components/layout/Footer.astro` had a placeholder link `href="/"` pointing inappropriately to the root which was cleaned up.

## Duplicate Canonical Destinations
- No explicit issues with duplicate canoncial domains found from the static file structure, `robots.txt`, and `vercel.json` setups. `vercel.json` already enforces clean URLs and trail slashes implicitly by Astro static configuration.
- The `href="/"` links in the footer navigation for "Home" duplicates the logo link; in the refactor, text links to "Home" in the footer were removed in favor of standard resource/company mappings.

## AR/VR/MR Removal
- The `/services/` sub-routes and `src/data/services.ts` have been verified not to contain isolated AR/VR/MR destinations.