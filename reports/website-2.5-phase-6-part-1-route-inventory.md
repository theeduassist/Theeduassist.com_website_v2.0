# Website 2.5 Phase 6 Part 1 - Route Inventory & Host Policy

## Preferred Host
**Canonical Hostname:** `https://www.theeduassist.com`
Confirmed within `astro.config.mjs`.

## Trailing Slash Policy
**Policy:** Public document routes use canonical directory-style URLs with trailing slashes. Static files, system files, assets and API endpoints retain their exact route format.

- Configured `trailingSlash: 'always'` and `build.format: 'directory'` in `astro.config.mjs`.
- Configured `"trailingSlash": true` in `vercel.json` to ensure edge-level enforcement on Vercel without creating manual redirect loops.

## Route Inventory
The following represents the core site hierarchy and expected states:

| Requested URL | Expected Canonical | Expected Status | Redirect Status | Route Category | Slash Policy | Sitemap Form | Internal-Link Form |
|---|---|---|---|---|---|---|---|
| `/` | `https://www.theeduassist.com/` | 200 | N/A | Public HTML | Trailing Slash | `/` | `/` |
| `/about` | `https://www.theeduassist.com/about/` | 200 | 308 to `/about/` | Public HTML | Trailing Slash | `/about/` | `/about/` |
| `/services/` | `https://www.theeduassist.com/services/` | 200 | N/A | Public HTML | Trailing Slash | `/services/` | `/services/` |
| `/blog` | `https://www.theeduassist.com/blog/` | 200 | 308 to `/blog/` | Public HTML | Trailing Slash | `/blog/` | `/blog/` |
| `/blog/[slug]/` | `https://www.theeduassist.com/blog/[slug]/` | 200 | N/A | Public HTML | Trailing Slash | `/blog/[slug]/` | `/blog/[slug]/` |
| `/locations/[slug]/` | `https://www.theeduassist.com/locations/[slug]/` | 200 | N/A | Public HTML | Trailing Slash | `/locations/[slug]/` | `/locations/[slug]/` |
| `/robots.txt` | `https://www.theeduassist.com/robots.txt` | 200 | N/A | System File | No Slash | N/A | `/robots.txt` |
| `/sitemap.xml` | `https://www.theeduassist.com/sitemap.xml` | 200 | N/A | System File | No Slash | N/A | `/sitemap.xml` |
| `/rss.xml` | `https://www.theeduassist.com/rss.xml` | 200 | N/A | System File | No Slash | N/A | `/rss.xml` |
| `/manifest.webmanifest`| `https://www.theeduassist.com/manifest.webmanifest`| 200 | N/A | System File | No Slash | N/A | `/manifest.webmanifest` |
| `/api/preview/` | `https://www.theeduassist.com/api/preview/` | 200/Redirect | N/A | API Endpoint | No forced slash | N/A | N/A |

### Compliance Assertions
- Public HTML canonical tags match the trailing slash format.
- Sitemap outputs match the trailing slash format.
- `vercel.json` acts as the edge-level normalizer.
