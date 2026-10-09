# Working on this repo

Static Next.js portfolio deployed to GitHub Pages under `/portfolio-v2/`.

## Ground rules

- **Content lives in `src/data/*.ts`.** Copy changes go there, never hardcoded
  into components. Tests enforce the shape: no empty fields, https-only links,
  newest role first, no em dashes.
- **Three languages: English, Portuguese (pt-BR), German.** English is the
  source in `src/data`; translations live in `src/i18n/pt.ts` and `de.ts`,
  one file per language. Adding or changing English copy means updating both;
  a test fails on any missing or extra entry. Shell commands, nav paths and
  tech names stay English on purpose. English is served at the root, the
  others at `/pt/` and `/de/`, each through its own root layout in
  `src/app/(en)` and `src/app/(intl)/[locale]`, sharing `RootDocument`.
- **Language links are plain `<a>` via `localeHref`, not `next/link`.**
  Switching root layouts is a full page load anyway, and Link's prefetch
  requests files the static export doesn't produce.
- **Client work is evidence-based.** Every claim in `src/data/work.ts` must be
  backed by the author's own commits. Link public sites only: never private
  repository URLs, staging hosts, environment IDs or client data. A test fails
  on `dev.azure.com`, staging and localhost hosts.
- **Outbound links go through `ExternalLink`** so `rel="noopener noreferrer"`
  can't be forgotten. Don't hand-roll `target="_blank"`.
- **No `dangerouslySetInnerHTML`** outside the fixed boot script in
  `src/components/RootDocument.tsx`. A test enforces this.
- **Animation is progressive enhancement.** The server-rendered page must be
  complete and readable without JavaScript and with reduced motion. The e2e
  suite checks both.

## Before pushing

`npm run lint && npm run typecheck && npm test && npm run build && npm run test:e2e`

CI runs the same gates before it deploys.

## Next.js notes

- Static export: no API routes, no server actions, no `next/image` optimisation.
- `basePath` is `/portfolio-v2`; in-page links use `#id` and need no prefix.
- Next 16 removed `next lint`; ESLint runs directly with `eslint-config-next`.
