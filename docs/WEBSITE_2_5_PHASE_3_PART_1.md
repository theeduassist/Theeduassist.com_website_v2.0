# Phase 3 Part 1: Services Hub, Route Audit and Content Architecture

## Baseline Information

- Phase 2 final commit hash: `7e641fa004b80462ad559ed8eb0f402b57dc1431`
- Starting branch: `main`
- Current branch: `website-2.5-phase-3-part-1`
- Start date: $(date)

## Overview

This part focuses on auditing existing service routes and establishing an authoritative taxonomy and data source. The `/services/` hub page was completely redesigned to present a clean problem-based navigation model and distinct service families.

## Authoritative Architecture

An authoritative service data source was established in `src/data/serviceArchitecture.ts`. This single source of truth models the families, current statuses (e.g. `live`, `planned-part-2`, `planned-part-3`), icon taxonomy, and audience logic.

- Planned services remain excluded from all public-facing navigation dynamically.
- `siteNavigation.ts` was refactored to read directly from the new `serviceArchitecture.ts`.

## Live vs Planned Services

The Services hub clearly distinguishes verified capabilities. The verified live services currently promoted on the `/services/` hub and in the mega-menu are:

1. Custom eLearning Development
2. Content Conversion and Modernization
3. LMS Implementation & Migration
4. AI-Supported E-Learning
5. Ongoing Support & Maintenance

Kajabi Services continues to exist as a separate top-level offering and is highlighted through its own callout on the hub, maintaining separation from generic eLearning development.

## Pages Removed

- Removed `/services/funnels-automation/` as it's better absorbed into Kajabi and the old layout was conflicting with the new taxonomy structure.
- Removed legacy `ServicesGrid.astro`, `ServiceFinder.astro`, `ServicesHero.astro` components as they were replaced by the robust `service-page/` reusable components.

## Validation Results

- `/services/` builds cleanly.
- `siteNavigation` works seamlessly with the new single source of truth.
- Playwright, routing, and all static-first checks pass.
- No dummy `href="#"` routes present in navigation logic.
- Desktop and Mobile headers adapt gracefully.

## Work Deferred to Part 2

- Build out standalone full pages for `Learning Strategy`, `Instructional Design`, `Course and Curriculum Development`, `Assessment Design`, `Microlearning` and `Scenario-Based Learning` inside Phase 3 Part 2 as planned in `serviceArchitecture.ts`.
