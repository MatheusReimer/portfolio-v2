# Working on this repo

Static Next.js portfolio deployed to GitHub Pages under `/portfolio-v2/`.

## Ground rules

- **Content lives in `src/data/*.ts`.** Copy changes go there, never hardcoded
  into components. Tests enforce the shape: no empty fields, https-only links,
  newest role first, no em dashes.
- **Client work is evidence-based.** Every claim in `src/data/work.ts` must be
  backed by the author's own commits. Link public sites only: never private
  repository URLs, staging hosts, environment IDs or client data. A test fails
  on `dev.azure.com`, staging and localhost hosts.
- **Outbound links go through `ExternalLink`** so `rel="noopener noreferrer"`
  can't be forgotten. Don't hand-roll `target="_blank"`.
- **No `dangerouslySetInnerHTML`** outside the fixed boot script in
  `src/app/layout.tsx`. A test enforces this.
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
