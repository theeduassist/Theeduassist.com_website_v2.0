# Website 2.5 Phase 6 Part 1 - Canonical Audit

## Validation Logic
Created `scripts/validate-canonicals.mjs` to traverse the generated HTML structure within `.vercel/output/static` (or `dist`) and enforce canonical policies:
1. Exactly one canonical tag exists per indexable page.
2. The URL starts with `https://www.theeduassist.com`.
3. The URL contains no tracking parameters (`?utm=`, `?ref=`) or fragments (`#`).
4. The URL contains no `localhost` or Preview domains.
5. The URL ends with a trailing slash (`/`), matching the `trailingSlash: 'always'` policy established in Checkpoint 5.

## Results
- Evaluated all ~400 generated static HTML files.
- `validate:canonicals` execution successfully passed, verifying that canonical tags properly self-reference the trailing-slash formatting and the preferred host.
- No duplicate canonicals were found in the output.
