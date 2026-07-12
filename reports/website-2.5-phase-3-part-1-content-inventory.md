# Service Content Inventory

| Source file | Service associated | Current public status | Duplicate sources | Claim risks | Recommended destination | Planned phase | Classify |
|---|---|---|---|---|---|---|---|
| `src/pages/services/index.astro` | Services Hub | Live | `src/components/home/HomeServices.astro` | Low | Keep, update to new design | Phase 3 Part 1 | UPDATE |
| `src/pages/kajabi-services.astro` | Kajabi Services | Live | None | Low | Keep, no rewrite | N/A | KEEP |
| `src/pages/services/custom-elearning-development.astro` | Custom eLearning | Live | `services.ts`, Sanity | Low | Keep | Phase 3 Part 2 | KEEP |
| `src/pages/services/lms-implementation-migration.astro` | LMS | Live | `services.ts`, Sanity | Low | Keep | Phase 3 Part 3 | KEEP |
| `src/pages/services/ai-powered-elearning.astro` | AI | Live | `services.ts`, Sanity | Low | Keep | Phase 3 Part 3 | KEEP |
| `src/pages/services/content-conversion.astro` | Content Conversion | Live | `services.ts`, Sanity | Low | Keep | Phase 3 Part 2 | KEEP |
| `src/pages/services/funnels-automation.astro` | Funnels | Live | `services.ts`, Sanity | Low | Remove route, redirect to Kajabi | Phase 3 Part 1 | CONSOLIDATE |
| `src/pages/services/ongoing-support-maintenance.astro` | Ongoing Support | Live | `services.ts`, Sanity | Low | Keep | Phase 3 Part 3 | KEEP |
| `src/data/services.ts` | All | Mixed | `siteNavigation.ts`, Sanity | Low | Migrate to `serviceArchitecture.ts` | Phase 3 Part 1 | CONSOLIDATE |
