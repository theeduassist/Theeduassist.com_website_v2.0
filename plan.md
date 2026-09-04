1. **Analyze redirect mapping**:
   - The user requested to redirect an obsolete blog URL `/blog/internal-academy-software-15-must-have-features-in-2026/` to the current one if it exists.
   - We verified that the existing blog article is in `src/content/blog/internal-academy-software-15-must-have-features-in-2026.md` which has `slug: internal-academy-software-features-2026`. This means its URL is `/blog/internal-academy-software-features-2026/`.
   - The user requested: "Create explicit mappings where a genuine replacement exists. Do not redirect it to the homepage."
   - The new route should be mapped in `vercel.json` since `src/data/redirects.ts` is mostly for internal metadata though we might add to both. `vercel.json` dictates the actual server redirects. I will add the redirect there.
   - Wait, `vercel.json` `redirects` takes priority on Vercel.
2. **Phase 27: Known Obsolete Blog URL**
   - We will add a 301/308 redirect in `vercel.json`:
     `"source": "/blog/internal-academy-software-15-must-have-features-in-2026/"` -> `"destination": "/blog/internal-academy-software-features-2026/"`
     `permanent: true`
   - We will also add it to `src/data/redirects.ts` for documentation/metadata purposes.
3. **Pre-commit checks**
   - Run `npm run validate:redirects`
   - Run `npm run build`
   - Test locally with the script.
4. **Submit**
