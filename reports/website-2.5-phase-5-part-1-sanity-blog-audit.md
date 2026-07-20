# Sanity Blog Audit

- `post` is the currently queried schema in `src/sanity/queries.ts`.
- `blogPost` also exists in legacy schemas or `studio/schemas`.
- We will resolve this by making `blogPost` the canonical type, migrating code to query `blogPost` and updating the Sanity schema to only use `blogPost`.
- Fallback queries will handle both during migration.
