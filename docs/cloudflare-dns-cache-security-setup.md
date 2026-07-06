# Cloudflare DNS, Cache, and Security Setup Guide

This guide outlines the safe procedure for migrating `theeduassist.com`'s DNS from GoDaddy to Cloudflare to utilize its CDN, WAF, and caching, while ensuring GoDaddy/cPanel emails and the Vercel-hosted Astro static site continue to function perfectly.

## A. DNS Safety Before Moving Nameservers

**Crucial: Cloudflare proxying can break email if misconfigured.**

1. **Backup GoDaddy DNS:** Take screenshots and export all existing DNS records from your GoDaddy/cPanel dashboard.
2. **Pre-populate Cloudflare:** *Before* changing nameservers at GoDaddy, add the site to Cloudflare and ensure *every single DNS record* is copied over perfectly.

## B. Proxy Status Rules (The "Orange Cloud")

### Proxy These Records (Orange Cloud ON):
* Apex/root `A` or `CNAME` pointing to Vercel.
* `www` `CNAME` pointing to Vercel.
* Any static website subdomains.

### DNS Only These Records (Orange Cloud OFF / Grey Cloud):
* `mail` (A/CNAME)
* MX Records (e.g., `mail.theeduassist.com`)
* SPF TXT Records
* DKIM TXT/CNAME Records
* DMARC TXT Records
* `webmail`
* `cpanel`
* `ftp`, `autodiscover`, `autoconfig`
* Any verification TXT records (unless otherwise specified).

## C. Cloudflare SSL/TLS Settings

1. Set SSL/TLS to **Full (strict)** (assuming Vercel provisions a valid cert).
2. Enable **Always Use HTTPS**.
3. Enable **Automatic HTTPS Rewrites**.
4. *Do not* enable HSTS until HTTPS is confirmed perfectly stable across all subdomains.

## D. Cloudflare Cache Rules

The goal is to cache public traffic to minimize origin hits, while bypassing dynamic or sensitive paths.

**Rule 1: Bypass private/dynamic paths**
Create a cache rule to bypass cache for these paths:
* `/api/*`
* `/admin/*`
* `/studio/*`
* `/preview/*`
* `/contact/*` (to ensure form CSRF/Turnstile works)
* `/book-free-audit/*`
* Any path with preview tokens or authenticated routes.

**Rule 2: Cache static assets**
Create a cache rule for high edge TTL (e.g., 1 month) for:
* `/_astro/*`
* `/assets/*`
* `/images/*`, `/fonts/*`
* `*.css`, `*.js`, `*.png`, `*.jpg`, `*.webp`, `*.svg`, `*.woff2`

**Rule 3: Cache public HTML carefully**
Create a rule for public pages (GET requests only):
* Set an initial Edge Cache TTL of 1-4 hours. Increase this to 24 hours once the Vercel deploy hook + manual Cloudflare purge workflow is confirmed stable.

## E. Purge Strategy

Because Cloudflare sits in front of Vercel, when Vercel rebuilds (triggered by the Sanity Webhook), Cloudflare's edge cache may still serve old HTML.
* **Manual:** You will need to click "Purge Cache" in the Cloudflare dashboard after a major content update.
* **Automated (Advanced):** Set up a GitHub Action or Vercel Serverless Function to call the Cloudflare API to purge the cache upon successful deployment.

## F. Cloudflare Security (WAF)

1. Enable WAF managed rules.
2. Enable **Bot Protection** (Bot Fight Mode).
3. Set up WAF Custom Rules to challenge/block common malicious scanner paths:
   - Challenge requests to `/wp-admin`, `/xmlrpc.php`, `/wp-login.php`, `.env`, `.git`.
4. **Important:** Ensure normal crawlers (Googlebot) are bypassed and not challenged.
5. Do not cache or challenge legitimate POST requests to form endpoints.