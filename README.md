# portfolio-v2

Personal portfolio for Matheus Reimer: a static Next.js site with a terminal-style
design, in English, Portuguese and German, deployed to GitHub Pages at <https://matheusreimer.github.io/portfolio-v2/>.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, `output: 'export'`) |
| Language | TypeScript, React 19 |
| Styling | Plain CSS with custom properties, no framework |
| Fonts | Inter and JetBrains Mono via `next/font`, self-hosted at build time |
| Tests | Vitest (content and source guards), Playwright (end to end) |
| Deploy | GitHub Actions to GitHub Pages |

## Commands

```bash
npm install
npm run dev          # dev server at http://localhost:3000/portfolio-v2/
npm run build        # static export into ./out
npm run serve        # serve ./out the way GitHub Pages does, on :4173
npm test             # unit tests
npm run test:e2e     # end-to-end tests against ./out (build first)
npm run lint
npm run typecheck
```

## Structure

```
src/
  app/           (en) and (intl)/[locale] root layouts, global 404, styles, icon
  components/    RootDocument (metadata, CSP, boot script), HomePage, TerminalHero,
                 Section, Sections, RevealController, ExternalLink
  data/          English copy: profile, work, projects, experience, skills
  i18n/          locales, Portuguese and German translations, content resolver
tests/
  unit/          content shape, no leaked client infrastructure, source guards
  e2e/           real-browser checks on desktop and mobile
scripts/
  serve-static.mjs   serves ./out under /portfolio-v2/ for local checks and e2e
```

## Animation

The hero types its commands once on load and each section types its prompt as it
scrolls into view. The server renders the finished page, so content is always
there without JavaScript. A boot script in `<head>` adds `js` and `motion-ok`
classes before first paint; animation styles depend on those, and users with
reduced motion never see a hidden state.
