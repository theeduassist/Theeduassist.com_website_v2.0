# Phase 4 Part 4 Recovery Audit

- **src/data/conversionArchitecture.ts**: RECOVER AS-IS
- **scripts/validate-conversion-architecture.mjs**: RECOVER AS-IS
- **scripts/validate-analytics-events.mjs**: RECOVER AS-IS
- **src/components/forms/EnterpriseBriefForm.astro**: RECOVER WITH CHANGES (ensure no hardcoded values)
- **src/pages/enterprise-solutions/project-brief/index.astro**: RECOVER WITH CHANGES
- **src/pages/enterprise-solutions/project-brief/thank-you/index.astro**: RECOVER AS-IS
- **src/components/enterprise/EnterpriseTrustOverview.astro**: RECOVER AS-IS
- **src/components/enterprise/EnterpriseFinalCTA.astro**: RECOVER AS-IS
- **src/components/enterprise/EnterpriseProcurementOverview.astro**: RECOVER AS-IS
- **src/data/trustArchitecture.ts**: NO LONGER NEEDED (Already present)
- **src/pages/trust-centre/*.astro**: NO LONGER NEEDED (Already present)
- **api/forms/enterprise-brief.ts**: REJECT (Needs to be Astro-native `src/pages/api/forms/enterprise-brief.ts`)
