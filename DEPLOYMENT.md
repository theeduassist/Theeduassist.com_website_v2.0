# TheEduAssist Astro Website Deployment Guide

**Project name:** TheEduAssist Astro Website
**Production domain:** https://theeduassist.com
**Build command:** `npm run build`
**Output directory:** `dist`
**Node version note:** Ensure Node v22.12.0 or higher
**Local development command:** `npm run dev`
**Local preview command:** `npm run preview`

---

## Deployment Preview Flow
1. Open a Pull Request for new changes.
2. Ensure CI build checks and `npm run validate:redirects` pass.
3. Deploy the specific branch to a Vercel preview environment.
4. Run QA checklists (`docs/FINAL_LAUNCH_QA_CHECKLIST.md`) against the preview URL.
5. After approval, merge PR into the main branch.

## Production Deployment Flow
1. Ensure the merged main branch produces a passing build.
2. Check environment variables are fully configured in the production hosting dashboard (do NOT commit secrets to the repository).
3. The selected main host (Vercel) triggers a production deployment.
4. Verify production URL using Post-Launch checklist.

---

## A. Local verification

Run these locally before opening any PR or doing a manual deployment:

```bash
npm install
npm run build
npm run preview
```

Ensure everything looks correct at `http://localhost:4321`.

---

## B. Vercel setup

1. Connect GitHub repo to Vercel.
2. Select Astro framework preset if available.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Root directory: `/`
6. Add environment variables if needed.
7. **Deploy a preview branch first.**
8. **Do not attach production domain** (theeduassist.com) until QA is complete.

---

## D. Key Deployment Guidelines

* **Production hosting is Vercel.**
* **Vercel GitHub integration handles preview and production deployments.**
* **GitHub Actions are for validation only.**
* **Do not add Firebase deployment workflows.**
* **Do not add Vercel CLI deployment workflows unless the Vercel GitHub integration is intentionally disconnected.**

## E. What not to do

* **Do not switch nameservers in this step.**
* **Do not change email records.**
* **Do not cancel GoDaddy.**
* **Do not delete WordPress.**
* **Do not hardcode secrets** (use Vercel variables config instead).
* **No live DNS changes from repo.**
* **No email migration from repo.**
