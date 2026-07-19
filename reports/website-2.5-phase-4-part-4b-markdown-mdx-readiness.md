# Markdown and MDX Readiness

* The blog currently uses Portable Text from Sanity.
* For Phase 5, the transition to Markdown/MDX should consider:
  * Implementing a robust Markdown renderer (e.g., `markdown-it` or Astro's built-in MDX support).
  * Ensuring frontmatter supports all required metadata (title, description, author, date, featured image, categories).
  * Supporting custom components within MDX for rich content (e.g., callouts, embedded videos, interactive elements).
  * Updating the content fetching logic to read from local MDX files instead of Sanity if moving to a fully local markdown approach, or ensuring the CMS to MDX pipeline is seamless.
