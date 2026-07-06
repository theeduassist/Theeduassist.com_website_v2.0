# Security Headers Plan

This document outlines the security headers added to `vercel.json` to harden the application while maintaining functionality for Sanity CMS images, Astro static assets, and external scripts.

## Headers Implemented

We have added conservative, safe security headers that enhance security without breaking the site:

1. **`X-Content-Type-Options: nosniff`**
   - Prevents the browser from MIME-sniffing a response away from the declared content-type.

2. **`Referrer-Policy: strict-origin-when-cross-origin`**
   - Sends full URL on same-origin requests, but only the origin on cross-origin requests, protecting sensitive path data.

3. **`X-Frame-Options: SAMEORIGIN`**
   - Prevents the site from being framed by external domains, mitigating Clickjacking attacks.

4. **`Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`**
   - Enforces HTTPS for a year. (Assuming Vercel handles HTTPS automatically).

5. **`Content-Security-Policy-Report-Only`**
   - We are deploying a CSP in *Report-Only* mode first. This ensures we don't accidentally block required Sanity image domains, analytics, or Google Fonts.
   - **Current draft allows:** `'self'`, standard Sanity CDN domains, and common data URIs.
   - **Next Steps:** Monitor the console for CSP violation warnings. Once we confirm all necessary external scripts/images are accounted for, this can be transitioned to an enforcing `Content-Security-Policy`.

## Future Improvements

* After a testing period, convert the CSP from `Report-Only` to an enforcing `Content-Security-Policy`.
* Refine the CSP to include specific domains for Turnstile (Cloudflare) or Google Analytics if they are integrated.
* Implement a `Permissions-Policy` to explicitly deny access to unused browser features (e.g., microphone, camera, geolocation).