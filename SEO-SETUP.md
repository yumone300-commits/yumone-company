# Technical SEO maintenance

Canonical origin: `https://yumone-company.vercel.app`. Keep NEXT_PUBLIC_SITE_URL aligned in production and preview builds. Netlify is a mirror; its canonical URLs point to this primary site.

## Content revision dates

`src/data/content-revisions.ts` records the significant source revision, commit and date for each public canonical URL. The initial dates are verified Git history (hero/content restoration, service photos and client/photo sections), not filesystem timestamps or build time. Update the affected entries when visible content materially changes. New pages without evidence fail the sitemap build instead of receiving an invented date. Policy drafts remain noindex and are excluded. Rerunning a build must not change lastmod.

## Crawlers and llms.txt

The original robots policy allowed all public paths and had no Disallow paths. Explicit groups retain that policy. OAI-SearchBot, Claude-SearchBot and PerplexityBot are search-related. GPTBot and ClaudeBot are training-related; Google-Extended controls uses for Gemini training/grounding. Training access is not a prerequisite for ordinary search indexing. Add future restricted paths to the shared restrictedPaths list so each explicit group contains them. robots.txt is not access control; no authentication or firewall settings were changed.

`public/llms.txt` is a supplemental public content guide for the requested audit. It does not guarantee AI citation or ranking. Update its verified links when publishing new content.

## GA4: prepared, not connected

No GA4/GTM configuration was found in source, local environment or the main Vercel project. No consent manager or analytics consent state was found; the inquiry checkbox is consent for inquiry data only and is never used as analytics consent.

1. Supply the actual GA4 Web stream measurement ID as `NEXT_PUBLIC_GA4_MEASUREMENT_ID` in the production build environment.
2. In that stream's Enhanced Measurement settings, disable automatic **Page views/history changes**, **Form interactions**, and **Site search** before setting `NEXT_PUBLIC_GA4_MANUAL_TRACKING_READY=true`. Prefer disabling Enhanced Measurement entirely for this manual page-view-only integration. Keep automatic user-provided data collection disabled. This readiness flag prevents accidental duplicate or form/query collection before settings are verified.
3. Review the site's analytics disclosure/consent requirements before enabling collection. If a consent manager is added, gate script loading and page views on its analytics consent; do not infer consent from the contact form. Both flags are absent/off in this release, so no analytics request or cookie is created.
4. Redeploy. Check the server HTML for the Google script and bootstrap, then use browser Network and GA4 DebugView/Realtime: one page_view on entry, one on each different internal path and back/forward; no new event for query/hash-only changes or React rerenders.
5. Only allowlisted public paths and static titles are sent. Query strings, hashes, form values, external referrers, names, phone numbers and email addresses are excluded. Nothing reports a consultation as submitted: the existing form does not send or persist inquiries.

Google's `send_page_view:false` does **not** disable Enhanced Measurement history tracking by itself. The property-side setup in step 2 is required. Offline tracker checks do not prove real GA collection. Until a real stream is connected and checked, report **연결 준비 완료 / 실수집 미검증**.

## Sources
- https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- https://developers.google.com/analytics/devguides/collection/ga4/views
- https://developers.openai.com/api/docs/bots
- https://docs.perplexity.ai/docs/resources/perplexity-crawlers

## Validation and deployment

Run `npm run build` (Next.js build includes TypeScript) and verify the exported sitemap/robots/llms files plus each canonical page's metadata and single BreadcrumbList. `BreadcrumbTrail` supplies both visible path and schema. Preserve the primary site's supplied OG image and client logos.

Production changes are reviewed in a GitHub PR; merging main triggers Vercel. The Netlify static mirror is separately uploaded from the verified `out` export. Keep built artifacts separate from unrelated local drafts.
