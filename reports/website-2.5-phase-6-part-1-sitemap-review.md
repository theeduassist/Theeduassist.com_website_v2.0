# Website 2.5 Phase 6 Part 1 - Sitemap Review & Internal Crawl Paths

## Sitemap Architecture
- The sitemap uses a unified structure (`sitemap.xml`) including core static pages, services, enterprise routes, trust centre routes, indexed location pages, and eligible blog posts.
- Validated via `scripts/validate-sitemap.mjs` against the generated output.

## Trailing Slash and Host Policies
- Confirmed that sitemap URLs properly use `https://www.theeduassist.com` with trailing slashes.
- Excluded paths correctly handle their extensions (e.g. `rss.xml` without a slash).

## Eligibility Rules Enforced
- Non-indexed locations (those without `indexStatus: 'index'`) do not generate static HTML and are therefore naturally omitted from the sitemap.
- Blog articles omit drafts and apply `publicBlogEligibility` checks.
- Parameterized URLs (e.g. `?success=`) and private endpoints (`/api/`) are explicitly excluded and flagged if present.

## Lastmod Policy
- A deterministic `lastmod` policy is applied using actual content modification dates provided by the CMS or static definitions, preventing future date anomalies.

## Internal Crawl Paths
- Important links inside the `Header.astro` and standard navigations use proper `<a href=".../">` tags with trailing slashes, ensuring crawler paths are intact without forcing JavaScript interaction for core discovery.
- Crawl depth testing on the local instance revealed no significant issues since mega-menus adequately expose lower-level hierarchy pages on direct hover/focus interactions.
