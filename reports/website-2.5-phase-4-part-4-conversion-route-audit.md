# Conversion Route Audit

## /contact/
- Target: General inquiries
- Destination: Google Forms (via iframe)
- Current form method: Iframe to Google Forms
- Recommended Action: Create a custom form in the future to improve conversion analytics and styling.

## /book-free-audit/
- Target: General review requests
- Destination: Google Forms (via iframe)
- Recommended Action: Future optimization.

## /book-free-kajabi-audit/
- Target: Kajabi specific requests
- Destination: Google Forms (via iframe)
- Recommended Action: Future optimization.

## /enterprise-solutions/project-brief/
- Target: Enterprise project intake
- Destination: /api/forms/enterprise-brief
- Server handler: Astro API route (/api/forms/enterprise-brief)
- Spam protection: Honeypot, Cloudflare Turnstile
- Success behavior: Redirects to /enterprise-solutions/project-brief/thank-you/
- Analytics: `generate_lead` tracked successfully on submit.
- Privacy Notice: Acknowledgment block present.
- Canonical: /enterprise-solutions/project-brief/
- Indexing: Indexable. Thank-you route is noindex.
