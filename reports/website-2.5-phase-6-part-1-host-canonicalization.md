# Website 2.5 Phase 6 Part 1 - Host Canonicalization

## Production Hostname Confirmation
The site enforces a strictly defined canonical hostname:
`https://www.theeduassist.com`

## Validation Points
1.  **Astro Config**: The `site` URL is hardcoded correctly to `https://www.theeduassist.com` avoiding any relative or non-www issues.
2.  **Trailing Slash Policy**: Astro is configured with `trailingSlash: "always"` and `build.format: "directory"` to explicitly force internal links and canonicals to align with `/path/` formatting for content pages.
3.  **Vercel Redirects**: Vercel handles the non-www to `www` enforcement and trailing slash redirects (`"trailingSlash": true` at project level edge).
4.  **Exceptions**: Assets (`/_astro/*`, `/images/*`, `.txt`, `.xml`) correctly preserve file extensions without forcing directory slashes.
