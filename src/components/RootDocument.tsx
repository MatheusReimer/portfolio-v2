import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import type { ReactNode } from 'react'
import { getContent } from '@/i18n/content'
import { localeInfo, localePath, locales, type Locale } from '@/i18n/locales'
import { SITE_URL } from '@/site'
import '@/app/globals.css'

const sans = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' })

// GitHub Pages cannot set response headers, so the meta equivalent is the
// only CSP available. Static export inlines Next's hydration payload and
// cannot issue per-request nonces, hence 'unsafe-inline' for scripts.
const CSP = [
  "default-src 'self'",
  "img-src 'self' data:",
  "font-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "script-src 'self' 'unsafe-inline'",
  "connect-src 'self'",
  "base-uri 'self'",
  "form-action 'none'",
  "object-src 'none'",
].join('; ')

// Runs before first paint. Animation styles hang off these classes, so if
// scripting is off or the bundle fails, content renders plainly instead of
// staying hidden. Reduced-motion users never get the hidden starting state.
const BOOT_SCRIPT = `(function(){var d=document.documentElement;d.classList.add('js');try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('motion-ok')}catch(e){}})()`

/** Absolute URL of a locale's home page. */
function localeUrl(locale: Locale): string {
  return new URL(localePath(locale).slice(1), SITE_URL).href
}

export function buildMetadata(locale: Locale): Metadata {
  const { profile } = getContent(locale)
  const title = `${profile.name}, ${profile.role}`
  const url = localeUrl(locale)
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description: profile.metaDescription,
    authors: [{ name: profile.name }],
    alternates: {
      canonical: url,
      // hreflang alternates, so search engines send people to their own language.
      languages: {
        ...Object.fromEntries(locales.map((l) => [localeInfo[l].htmlLang, localeUrl(l)])),
        'x-default': localeUrl('en'),
      },
    },
    referrer: 'strict-origin-when-cross-origin',
    openGraph: {
      type: 'profile',
      title,
      description: profile.metaDescription,
      url,
      locale: localeInfo[locale].ogLocale,
      alternateLocale: locales.filter((l) => l !== locale).map((l) => localeInfo[l].ogLocale),
    },
    twitter: { card: 'summary', title, description: profile.metaDescription },
  }
}

export const viewport: Viewport = {
  themeColor: '#120508',
  colorScheme: 'dark',
}

/** The `<html>` shell shared by every locale's root layout. */
export function RootDocument({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <html lang={localeInfo[locale].htmlLang} className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      {/* eslint-disable-next-line @next/next/no-head-element -- only rendered by root layouts, where <head> is correct */}
      <head>
        <meta httpEquiv="Content-Security-Policy" content={CSP} />
        {/* The only raw HTML on the site: a fixed string, no user input. */}
        <script dangerouslySetInnerHTML={{ __html: BOOT_SCRIPT }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
