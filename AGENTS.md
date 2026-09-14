# Working on this repo

Static Nuxt 4 portfolio deployed to GitHub Pages under `/portfolio-v2/`.

## Ground rules

- **Content lives in `app/data/*.ts`.** Copy changes go there, never hardcoded
  into components. The tests enforce shape (no empty fields, https-only links,
  reverse-chronological roles).
- **No game vocabulary.** This site replaced a card-game-themed portfolio. A
  test fails the build if terms like "duel", "boss", or "grimoire" reappear in
  the content.
- **Pixel type for headings and labels only.** Running prose is Inter. Pixel
  faces below ~16px stop being legible.
- **Everything is a multiple of `--px` (4px).** No `border-radius`, no blurred
  shadows, no smooth easing — use `steps()`.
- **Outbound links go through `ExternalLink.vue`** so `rel="noopener noreferrer"`
  can't be forgotten. Don't hand-roll `target="_blank"`.
- **No `v-html`.** A test enforces this.

## Before pushing

`npm run lint && npm run typecheck && npm test && npm run generate`

CI runs the same three gates before it will deploy.

## Nuxt 4 notes

- `app/` is the source directory; `~` and `@` resolve to it.
- Do not add `vue` or `vue-router` to package.json — Nuxt pins compatible
  versions itself, and overriding them breaks `vue-tsc`.
- The root `tsconfig.json` only holds project references to `.nuxt/tsconfig.*`.
  Run `nuxt prepare` if those go missing.
