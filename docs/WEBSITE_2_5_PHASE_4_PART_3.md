# Website 2.5 Phase 4 Part 3

## Overview
This phase successfully integrated the Trust Centre, encompassing Delivery Methodology, Responsible AI, Accessibility, Security and Privacy, and Procurement readiness pages.

## Trust Architecture
A centralized typed file `src/data/trustArchitecture.ts` was implemented and validated using a custom Node script. This enforces data integrity for all trust-related pages, including canonicals, internal hrefs, titles, and public visibility states.

## Pages Created
- `/trust-centre/`
- `/trust-centre/delivery-methodology/`
- `/trust-centre/responsible-ai/`
- `/trust-centre/accessibility/`
- `/trust-centre/security-privacy/`
- `/trust-centre/procurement/`

## Structural Changes
- **Footer Navigation**: Replaced explicit Legal links array with a structured integration of Trust Centre routes, keeping core policies (Privacy, Terms) distinct and intact.
- **Enterprise Links**: The Enterprise Solutions page was updated to link effectively to relevant Trust Centre content (e.g. Procurement Overview).
- **Sitemap**: Trust URLs have been integrated into the static LLMs output and XML Sitemap generation, maintaining an accurate crawler boundary.
- **Performance**: All Trust Centre pages are completely static. No client-side React hydration or Sanity dynamic fetching was added.

## Security & Claim Boundaries
All content stringently adheres to factual representations:
- Explicit disclaimer on ISO/SOC 2 certifications.
- Qualified statements on WCAG accessibility limits and third-party restrictions.
- Clarification that NDAs and contracts are evaluated contextually, not through an automated process.

## Validation Results
- Baseline checks complete.
- Trust Architecture validation passing.
- Astro Typecheck passing.
- Redirects validated.
- Production build successful.
