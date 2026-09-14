# portfolio-v2

Personal portfolio for Matheus Reimer — a static Nuxt 4 site with a hand-built
pixel-art design system, deployed to GitHub Pages at
<https://matheusreimer.github.io/portfolio-v2/>.

## Stack

| | |
|---|---|
| Framework | Nuxt 4 (static generation, nitro preset `static`) |
| Language | TypeScript, Vue 3 SFCs |
| Styling | Plain CSS with custom properties — no framework |
| Fonts | Self-hosted via `@nuxt/fonts` (no third-party requests at runtime) |
| Tests | Vitest + Vue Test Utils |
| Deploy | GitHub Actions → GitHub Pages |

## Commands

```bash
npm install         # install
npm run dev         # dev server
npm run generate    # static build into .output/public
npm test            # unit tests
npm run lint        # eslint
npm run typecheck   # vue-tsc
```

## Structure

```
app/
  app.vue                 shell: skip link, header, page, footer, scanlines
  pages/index.vue         the single page + JSON-LD Person schema
  components/             section components + pixel primitives
  data/                   all content lives here, typed
  assets/css/main.css     the pixel design system
test/                     content, sprite, and security specs
```

**Content is data.** Every word on the site comes from `app/data/*.ts`. To update
the site, edit those files — no component changes required. The tests assert the
data stays well-formed: no empty fields, https-only links, roles in reverse
chronological order.

## The pixel design system

Everything snaps to a 4px unit (`--px`). Three rules keep it coherent:

1. **No soft edges.** No `border-radius`, no blurred shadows. Frames are drawn
   with four offset `box-shadow` copies, which produces the classic 8-bit
   cut-corner box without a single image.
2. **Stepped motion.** Transitions use `steps()` easing, so things move the way
   a sprite moves rather than gliding.
3. **Pixel type for headings only.** Pixel faces lose their grid below ~16px, so
   running prose is set in Inter. Legibility is not negotiable on a CV.

### Sprites

Pixel art is authored as data in `app/data/sprites.ts` — a grid of characters
plus a palette. `PixelSprite.vue` renders it as SVG, merging horizontal runs of
the same colour into single `<rect>` elements, so a 16x16 sprite costs a few
dozen nodes instead of 256. Sprites stay crisp at any zoom and weigh a few
hundred bytes each.

To swap the hero portrait for a real pixelated photo, replace the `avatar`
sprite's rows and palette — nothing else needs to change.

## Deployment

Pushing to `master` runs lint, typecheck, and tests; only if all three pass does
it build and deploy. The site is served from the `/portfolio-v2/` sub-path, set
via `app.baseURL`. Build assets are emitted to `/assets` rather than the default
`/_nuxt`, and a `.nojekyll` file is published — both to avoid GitHub Pages'
historic handling of underscore-prefixed directories.

## Security notes

The site is fully static: no forms, no user input, no third-party scripts.
Beyond that:

- A `Content-Security-Policy` is declared via `<meta>` — the only mechanism
  available on GitHub Pages, which cannot set response headers. `script-src`
  and `style-src` need `'unsafe-inline'` because Nuxt inlines its hydration
  payload and static hosting cannot issue per-request nonces. `frame-ancestors`
  is omitted deliberately: it is ignored in meta CSP and requires a real header.
- All outbound links go through `ExternalLink.vue`, which always sets
  `rel="noopener noreferrer"`. A test asserts no component opens `_blank`
  without it.
- A test asserts no component uses `v-html`.
- `npm audit` is clean; an `overrides` entry pins a patched `esbuild`.
