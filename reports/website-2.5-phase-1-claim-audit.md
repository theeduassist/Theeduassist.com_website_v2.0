# Website 2.5 Phase 1 Claim Audit

## Audit Findings Based on Current Codebase Strings

The following public claims and disclaimers were identified and evaluated during the Phase 1 Foundation:

### Accessibility and Compliance
- **Claim**: 'Increasing focus on WCAG compliance for public sector partnerships.'
  - **Location**: `src/data/locations/europe-expansion-cities.ts`
  - **Status**: INTERNAL ONLY / REGIONAL CONTEXT.
  - **Action**: Monitored contextually. Noted as an internal guideline or regional consideration rather than a global site guarantee.

- **Claim**: 'WCAG compliance where applicable.'
  - **Location**: `src/data/locations/east-asia-cities.ts`
  - **Status**: REGIONAL CONTEXT.
  - **Action**: Retained as internal regional sales/project guidance.

- **Claim**: 'WCAG 2.1 AA accessibility and robust UK GDPR compliance.'
  - **Location**: `src/data/locations/western-regions.ts`
  - **Status**: INTERNAL ONLY / REGIONAL CONTEXT.
  - **Action**: Found in internal planning files. No explicit site-wide legal guarantees exposed publicly.

### Legal Guarantees
- **Claim**: 'We provide educational training, not legal compliance guarantees.'
  - **Location**: `public/services-summary.md` and `public/faqs-summary.md`
  - **Status**: VERIFIED SAFE DISCLAIMER.
  - **Action**: Retain as it explicitly states a non-guarantee.

### Results and Savings Guarantees
- **Claim**: 'TheEduAssist does not guarantee specific revenue, enrollment numbers... unless stated in a signed agreement.'
  - **Location**: `src/pages/terms-and-conditions/index.astro`
  - **Status**: VERIFIED SAFE DISCLAIMER.
  - **Action**: Retain as standard terms.

- **Claim**: 'We build technically sound and instructionally effective courses, but we do not guarantee sales or revenue outcomes.'
  - **Location**: `public/ai-summary.md`
  - **Status**: VERIFIED SAFE DISCLAIMER.
  - **Action**: Retain.

### Technical Claims (Downtime/SLA)
- **Claim**: `zero-downtime-lms-migration`
  - **Location**: Blog post URL identified in `public/sitemap.xml` and `public/llms-full.txt`.
  - **Status**: VERIFIED TITLE.
  - **Action**: This is an educational/guide blog title, not a generic service SLA guarantee. Acceptable in context.

### Findings on Missing Risky Claims
- A thorough search across the codebase and public content confirmed the **absence** of hardcoded, generic public claims regarding:
  - "100% compliance"
  - "24/7 support"
  - "24-hour SLA"
  - "90-day hypercare"
  - Unverified "client counts", "team size", "industries served", or "languages supported".

These risky elements are safely omitted from the new Phase 1 foundation.