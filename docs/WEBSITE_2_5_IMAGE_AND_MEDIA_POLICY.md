# Image and Media Policy

* All images must have descriptive filenames.
* Explicit width and height attributes must be provided to prevent layout shift.
* Use responsive image sources (e.g., `srcset`) where applicable.
* Optimize formats (prefer WebP or AVIF).
* Implement lazy loading for images below the fold (`loading="lazy"`).
* Use eager loading (`loading="eager"`) only for the main LCP (Largest Contentful Paint) image above the fold.
* Meaningful `alt` text must be provided for all informative images.
* Decorative images must have empty `alt` text (`alt=""`).
* Avoid placing essential text within images; use HTML/CSS instead.
* Avoid oversized images that exceed their container width.
* Videos should not autoplay unless necessary and should respect user preferences for reduced motion.
* Provide transcripts or captions for video content.
