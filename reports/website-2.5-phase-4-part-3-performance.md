# Performance Report

The following trust centre pages are entirely statically generated:
- `/trust-centre/`
- `/trust-centre/delivery-methodology/`
- `/trust-centre/responsible-ai/`
- `/trust-centre/accessibility/`
- `/trust-centre/security-privacy/`
- `/trust-centre/procurement/`

Observations:
- No browser-time Sanity requests exist for these pages.
- There are no React islands or unnecessary client-side JS included on the Trust pages directly.
- The build time has increased slightly due to the addition of these 6 pages, remaining well under Vercel limits.
