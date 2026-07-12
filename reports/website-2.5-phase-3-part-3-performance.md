# Performance & Architecture

- **Static Generation:** All 6 core pages are fully statically generated at build time.
- **Hydration:** No interactive React islands (`client:load`, etc) were introduced for the core sections. FAQs utilize native HTML `<details>`/`<summary>` or lightweight Astro vanilla logic if any. The island count on the new service sections is 0.
- **Data Fetching:** Zero browser-time Sanity requests occur. Service metadata and structure is handled securely at build time via `src/data/serviceArchitecture.ts`.
- **UI & DOM Size:** Use of shared `ServiceHero.astro`, `ServiceDeliverables.astro`, etc., prevents massive DOM bloating compared to bespoke bespoke pages. CSS footprint remains minimal via Tailwind utilities.
