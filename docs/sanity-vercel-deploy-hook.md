# Sanity and Vercel Deploy Hook Setup

Since the website now statically generates pages and fetches Sanity data at build-time (preventing costly runtime client fetches), we need a way for the live site to update when Sanity content changes.

This setup ensures that whenever content is published or updated in Sanity, Vercel rebuilds the site.

## Step 1: Create a Deploy Hook in Vercel

1. Log into your Vercel Dashboard.
2. Select your project: `theeduassist`.
3. Go to **Settings** > **Git**.
4. Scroll down to the **Deploy Hooks** section.
5. Create a new hook:
   - **Name:** `Sanity Content Update`
   - **Branch:** `main` (or your production branch)
6. Copy the generated URL (e.g., `https://api.vercel.com/v1/integrations/deploy/prj_xxxx/xxxx`). Keep this secret. Do not expose it in public code.

## Step 2: Create a Webhook in Sanity

1. Log into your Sanity project at [manage.sanity.io](https://manage.sanity.io).
2. Go to the **API** tab.
3. Scroll to **Webhooks** and click **Add Webhook**.
4. Configure the webhook:
   - **Name:** `Vercel Production Deploy`
   - **URL:** Paste the Deploy Hook URL from Vercel.
   - **Trigger on:** Select `Create`, `Update`, and `Delete`.
   - **Filter:** You can optionally leave it blank to trigger on *any* document, or scope it to specific types like:
     `*[_type in ["post", "service", "caseStudy", "location", "siteSettings"]]`
   - **Projections:** Leave as default.
5. Save the webhook.

## Step 3: Test the flow

1. Go to your Sanity Studio and publish a new post or edit an existing one.
2. Check the Vercel Dashboard. You should see a new deployment triggered by "Deploy Hook".
3. Once the build finishes, verify the changes on the live production site.

## Important Notes
- **Do NOT** expose the Vercel Deploy Hook URL in any client-side code, `public/` files, or non-ignored environment files.
- The build will fetch fresh content since we've set `useCdn: false` in our Sanity Astro/server clients.