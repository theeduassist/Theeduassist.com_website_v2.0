# Website 2.5 Phase 2 Part 1 Content Map

## Removed or Replaced Homepage Components
- `HomeHero.astro`
  - Purpose: Previous Phase 1 homepage hero.
  - Action: Replaced with `src/components/home/HomeHero.astro` which implements the new Part 1 approved content and lighter UI.
  - Replaced by: `HomeHero.astro` (new component)
  - Content Preserved: None directly reused from the old component since the prompt dictates exactly what to render.
- `TrustStrip.astro`
  - Purpose: Old homepage strip for brand logos and credentials.
  - Action: Replaced functionally by `HomeCapabilityStrip.astro` which focuses purely on capabilities rather than external logos or credentials.
  - Replaced by: `HomeCapabilityStrip.astro` (new component)
  - Content Preserved: None, as new capabilities were prescribed.
- `AudienceGrid.astro`
  - Purpose: Previous audience targeting section.
  - Action: Replaced with `AudiencePathways.astro`.
  - Replaced by: `AudiencePathways.astro`
  - Content Preserved: Old grid deleted from index, existing audience segment query (`getAudienceSegments()`) data is preserved in `src/sanity/queries.ts` but is temporarily unused on the new homepage. It can be fully cleaned up in Part 4 if never re-implemented, but for now remains available in `index.astro` unused or can be removed from `index.astro` if unneeded.

## Deferred / Preserved for Later Parts
- `CoreServicesGrid.astro`, `ElearningBuildSystem.astro`, `KajabiSpecialty.astro` (if existing), etc.
- These existing components have *not* been deleted from `src/components/sections/`. They will remain in `index.astro` temporarily after the new Part 1 sections unless they conflict heavily. To satisfy "do not delete useful case-study, service, Kajabi, process, FAQ or Blog content that will be needed in Part 2" and "It is acceptable for old later-page sections to remain temporarily below the new Part 1 sections", these will remain in `index.astro` below the new Problem Navigator.
