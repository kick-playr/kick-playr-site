# kick-playr. landing page

Next.js 15 / React 19 / TypeScript prototype for grassroots football club SaaS.

## Start

```bash
npm install
npm run dev
```

Visit http://localhost:8080. For production: `npm run build && npm start`.

## Included
Responsive hero, dashboard concept, six features, workflow, pilot pricing, FAQ, pilot contact form, mobile navigation, and original brand-board image at `public/brand-concept.png`.

## Important
The pilot form currently opens an email draft using `mailto:pilot@kickplayr.app`; this address is illustrative and not verified or connected. Replace with a working backend and real contact address before launch. No server-side lead collection exists in this prototype.

The website uses illustrative club data. Pilot availability, price, domain registration, and trademark clearance are not confirmed. Add privacy/legal pages, consent, accessibility checks and localized pages before publication.

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
