# Baseline Report: Phase 3 Part 3 Rebuild

Command: `npm ci --legacy-peer-deps && npx astro check && npm run validate:redirects && npm run build`
Result: Passed
Duration: 4m 2s
Warnings: uuid@8.3.2 and uuid@10.0.0 deprecated, Astro telemetry prompt.
Existing known issues: Some uuid warnings. ERESOLVE on basic `npm ci` without `--legacy-peer-deps`.

Starting route count: 572 page(s) built
Starting hydrated-island count: Unchanged from baseline (needs audit)
