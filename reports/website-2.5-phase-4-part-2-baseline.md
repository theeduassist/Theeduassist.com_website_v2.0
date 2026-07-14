# Phase 4 Part 2 Baseline

- Starting commit: a4b7270ab25311970ba240c64cf379fe7c594617
- Command results:
  - `git status --short`: clean
  - `git diff --check`: clean
  - `npm ci --legacy-peer-deps`: success
  - `npx astro check`: 105 errors related to `JSX.IntrinsicElements` in `PortableTextRenderer.tsx`, which were pre-existing.
  - `npm run validate:redirects`: success
  - `npm run build`: success
- Warnings: 105 TS errors in PortableTextRenderer (JSX.IntrinsicElements), some deprecated npm packages warnings.
- Existing route count: 576 pages built
- Build duration: 3m 60s
- Hydrated-island count: unknown exact, but zero new ones will be added.
- Known issues: JSX element implicitly has type 'any' errors in astro check.
