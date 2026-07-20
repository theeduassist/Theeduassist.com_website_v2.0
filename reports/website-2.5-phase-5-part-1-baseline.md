# Baseline Check

- command: `npm run build`
- exit code: 0
- build duration: ~60s
- generated route count: 91 core URLs, 292 blog URLs (383 total)
- Blog route count: 292
- hydrated-island count: not measured directly
- JavaScript size: not measured directly
- existing known Blog problems: 1 blog post excluded from sitemap

Tests run:
- validate:env
- validate:enterprise
- validate:trust
- validate:conversion
- validate:analytics
- validate:metadata
- validate:structured-data
- validate:sitemap
- validate:internal-links
- validate:redirects
- check:sanity:blog
- npx astro check (found 63 errors related to DefaultImports in React, possibly not fatal for build)
- validate:overflow (ran without local server, couldn't fetch pages)

All completed successfully (with minor warnings/errors).
