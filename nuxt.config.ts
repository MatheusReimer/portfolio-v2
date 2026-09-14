import { profile } from './app/data/profile'

// GitHub Pages serves this project site from /portfolio-v2/.
const BASE = '/portfolio-v2/'
const SITE_URL = `https://matheusreimer.github.io${BASE}`

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  modules: ['@nuxt/eslint', '@nuxt/fonts'],

  css: ['~/assets/css/main.css'],

  app: {
    baseURL: BASE,
    // GitHub Pages historically chokes on directories beginning with "_",
    // so assets are emitted to /assets instead of the default /_nuxt.
    buildAssetsDir: 'assets',
    head: {
      htmlAttrs: { lang: 'en' },
      title: `${profile.name} — ${profile.role}`,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: profile.metaDescription },
        { name: 'author', content: profile.name },
        { name: 'theme-color', content: '#07090f' },
        { name: 'color-scheme', content: 'dark' },
        // Defence-in-depth. GitHub Pages cannot set real response headers, so
        // these meta equivalents are the only control available here.
        // frame-ancestors is intentionally omitted: it is ignored in meta CSP.
        {
          'http-equiv': 'Content-Security-Policy',
          content: [
            "default-src 'self'",
            "img-src 'self' data:",
            "font-src 'self' data:",
            // Nuxt inlines its hydration payload, and static hosting cannot
            // issue per-request nonces, so inline styles/scripts are required.
            "style-src 'self' 'unsafe-inline'",
            "script-src 'self' 'unsafe-inline'",
            "connect-src 'self'",
            "base-uri 'self'",
            "form-action 'none'",
            "object-src 'none'",
          ].join('; '),
        },
        { name: 'referrer', content: 'strict-origin-when-cross-origin' },
        // Open Graph
        { property: 'og:type', content: 'profile' },
        { property: 'og:title', content: `${profile.name} — ${profile.role}` },
        { property: 'og:description', content: profile.metaDescription },
        { property: 'og:url', content: SITE_URL },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: `${profile.name} — ${profile.role}` },
        { name: 'twitter:description', content: profile.metaDescription },
      ],
      link: [{ rel: 'canonical', href: SITE_URL }],
    },
  },

  // Fully static output for GitHub Pages.
  ssr: true,
  nitro: {
    preset: 'static',
    prerender: {
      crawlLinks: true,
      routes: ['/'],
      failOnError: true,
    },
  },

  fonts: {
    families: [
      { name: 'Pixelify Sans', provider: 'google' },
      { name: 'Silkscreen', provider: 'google' },
      { name: 'Inter', provider: 'google' },
    ],
  },

  typescript: {
    strict: true,
  },

  devtools: { enabled: false },
})
