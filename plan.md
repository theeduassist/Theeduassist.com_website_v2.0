1. **Rewrite `src/pages/sitemap/index.astro` to meet the specific redesign requirements:**
    * **Update SEO:** Title: `Website Sitemap | TheEduAssist`, Meta description: `Browse TheEduAssist website pages, services, blog guides, platform support pages, location pages, case studies, and contact options from one organized sitemap.`, Canonical path: `/sitemap/`.
    * **Add Hero Section:** Add a clean hero section with the H1 `TheEduAssist Website Sitemap`, the intro text, the helper line, and the 3 quick action buttons (`Explore Services`, `Get 24–48 Hour Review`, `Read Blog Guides`).
    * **Update Categorization & Data Logic:**
        * Instead of relying entirely on `getAllPublicRoutes` for a generic dump, we will structure the categories explicitly to match the required sections (MAIN PAGES, CORE SERVICES, BLOG GUIDES, PLATFORM SUPPORT, LOCATIONS, CASE STUDIES, LEGAL AND UTILITY).
        * We can fetch all routes, but we will filter and organize them more deliberately.
        * `Main Pages`: Hardcode the specified routes to ensure order and presence (checking against existing routes if needed, or just link them as they are core pages).
        * `Core Services`: Same, explicitly list the recommended links, falling back to any others found dynamically.
        * `Blog Guides`: Only pull the latest 12-18 public blog summaries, add a "View All Blog Articles" link.
        * `Platform Support`: Hardcode the platform groupings and link the whole section to `/platforms/` if individual routes don't exist. Add the disclaimer.
        * `Locations`: Only link `/locations/` and explicitly list grouped regions (North America, Europe, Middle East, Asia Pacific, South Asia) with links only if routes exist. To do this, we can check `routes` to see if those specific slugs are active, otherwise omit. Alternatively, we can just group a few top locations and a 'View all' link, avoiding the clutter of hundreds of cities.
        * `Case Studies`: Show case study cards if individual ones exist, else link to `/case-studies/`.
        * `Legal and Utility`: List Privacy Policy, Terms, etc., and add `/llms.txt`, `/ai-summary.md`, and `/services-summary.md`.
    * **Improve UI Design:** Implement a clean, responsive layout using Tailwind CSS consistent with TheEduAssist colors (e.g., `text-brand-navy`, `bg-brand-primary`). Use grid cards, subtle borders, and a final CTA section at the bottom.
2. **Update the `reports/human_sitemap_redesign_report.txt` file:**
    * Document the current page structure, issues found (generic dumping, weak organization), and the planned/implemented redesign structure, listing files edited, sections added, data sources, link logic, and SEO metadata.
3. **Pre-commit checks & testing:**
    * Run `pre_commit_instructions` tool to perform required checks.
    * Run `npm run build` to verify the build passes.
4. **Submit:**
    * Submit the branch with a descriptive commit message.
