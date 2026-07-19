# Metadata Standard

## Global Rules
* Every public, indexable page MUST have the following robots directive:
  `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">`
* Do NOT use bot-specific tags (like `googlebot` or `bingbot`) unless explicitly required for a specific exception.
* Internal links MUST NOT use the `nofollow` attribute.

## Page-Specific Requirements
* **Title**: Unique, descriptive, and ideally under 60 characters. Must append the brand name (e.g., `| TheEduAssist`).
* **Description**: Unique, summarizing the page content, avoiding keyword stuffing and unsupported claims.
* **Canonical URL**: Every indexable page must have a self-referencing absolute canonical URL pointing to the production domain.
* **Open Graph / Twitter**: Essential tags (`og:title`, `og:description`, `og:image`, `twitter:card`) must be present.

## Private / System Routes
* Routes like `/thank-you`, `/offline`, or API endpoints must either be excluded from the static build, protected by authentication, or explicitly marked with `noindex, nofollow`. They must not appear in the `sitemap.xml`.
