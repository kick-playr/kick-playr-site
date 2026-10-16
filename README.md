# kick-playr. landing page

Next.js 15 / React 19 / TypeScript marketing website for the proposed kick-playr
club operations service, informed by the existing FC RWW application.

The original service was designed and built for **FC Rot-Weiss Winikon (FCRWW) in
Uster**, the first pilot club for the kick-playr SaaS service. Its app is available
at [app.fcrww.ch](https://app.fcrww.ch). This origin and pilot-club relationship is
presented on the website in all four languages.

## Product reference

[Product functionality and website content brief](docs/PRODUCT-FUNCTIONALITY.md)
records the German application's functionality reviewed on 16 October 2026,
including a walkthrough of all 15 admin menu items and their read-only disclosures,
source-supported workflows, integration limits and guidance for accurate marketing
copy. It also compares the admin, trainer and both member profiles, and documents
an admin walkthrough of the B team chat, message menus, image preview and plus
menu. Expanded settings cover voucher visibility, trial-training lead times,
themes and club-wide chat mappings; archived email failures include diagnostic
and delivery-report details. Business actions and message sending were not tested.

The operational FC RWW application runs separately at `http://localhost:3001`.
This repository serves the marketing website on port **8080**. Its dashboard is
illustrative; club administration happens in the separate app and API.

The product reference centres on **bexio-backed member administration**: trial
registration, onboarding, contributions, clothing vouchers, season transitions,
member self-service and configured team chat. General match scheduling,
self-service club provisioning and multi-tenant SaaS readiness are not established
by the functionality review.

## Start

```bash
npm install
npm run dev
```

Visit http://localhost:8080. For production: `npm run build && npm start`.

## Included
Responsive hero, illustrative trainer and member previews, eight feature pillars,
admin/coach/member role comparison, bexio integration explanation, workflow, pilot
pricing, eight-question FAQ, email-based pilot contact form, mobile navigation and language
selector. The supplied logo is `public/kick-playr-logo.png`; `public/favicon.ico`
contains multiple icon sizes. The original concept board remains in
`public/brand-concept.png`.

Public copy is adapted from the functionality brief in all four languages. It
covers teams/contacts, trials/onboarding, training/seasons, bexio contributions,
clothing vouchers, configured team chat, seasonal operations/reporting and member
self-service. The FAQ distinguishes the existing German reference app from the
proposed kick-playr offer and the website's four-language support. No real member
data or club metrics appear in the workflow preview. The header logo is 88px on
desktop, 72px on tablets and 64px on phones, with its wordmark retained.

On phones and tablets up to 900px wide, body copy is 17px, controls are 16px and
supporting text is at least 14px. The dashboard reflows for narrow screens.

## Important
The pilot form currently opens an email draft using `mailto:pilot@kickplayr.app`; this address is illustrative and not verified or connected. Replace with a working backend and real contact address before launch. No server-side lead collection exists in this prototype.

The website uses illustrative club data. Pilot availability, price, domain
registration and trademark clearance are not confirmed. The public kick-playr
offer is separate from the existing FC RWW deployment. Before publication, review
privacy/legal requirements, accessibility, translation quality and product claims
against the functionality brief. Website translation support does not establish
multilingual support in the German FC RWW application.

## Translations

All website copy lives in `intl/messages/{en,de,fr,it}.json`. The server reads the
saved language choice first, then the request's `Accept-Language` header, honors quality weights, and maps regional
variants such as `de-CH` to their supported base language. Missing or unsupported
language preferences use English. Missing or blank message entries also fall back
to English individually. Keep the English catalog complete when adding new text.

Catalogs are imported dynamically on the server; only English and the selected
language are loaded. The resolved messages are passed to the interactive page,
and the same request locale controls metadata and the document's `lang` attribute.
Header selection makes the page dynamically rendered per request.

The header language selector offers English, German, French, and Italian with
native language names. A selection is saved in an HTTP-only cookie for
one year and refreshes the page translations, metadata, and document language.

Run translation checks with `node --test tests/intl.test.cjs`.

## News content

News uses Hugo-style Markdown with YAML front matter in the root /news directory, rendered by Next.js (no separate Hugo installation). The homepage shows the latest three stories; /news lists all published stories and /news/[slug] renders each article in the site theme.

Use filenames like my-story.en.md, my-story.de.md, my-story.fr.md and my-story.it.md. The filename without its locale is the URL slug. English is the fallback when a translation is missing. Required front matter: title, description, date (quoted YYYY-MM-DD), language (en/de/fr/it), and optional draft: true. Drafts and future-dated stories are hidden. Published stories sort newest first. Markdown supports headings, links, lists and emphasis; raw HTML is sanitized.

See news/fcrww-joins-kick-playr-pilot.en.md for the example. Its date is an example publication date; update it to the intended publication date before publishing. Add or edit Markdown files and redeploy for production changes. In development, refresh the page to see edits.

News can optionally specify image: "/news/filename.jpg" and a translated imageAlt in front matter. Place the image in public/news; it appears on cards and article pages. The FCRWW club logo was sourced from https://www.fcrww.ch/wp-content/uploads/2025/03/fcrww-lolo-400x400-1.jpg (the official website header logo).
