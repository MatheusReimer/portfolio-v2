import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { profile } from '@/data/profile'
import './globals.css'

const SITE_URL = 'https://matheusreimer.github.io/portfolio-v2/'
const TITLE = `${profile.name}, ${profile.role}`

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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: profile.metaDescription,
  authors: [{ name: profile.name }],
  alternates: { canonical: SITE_URL },
  referrer: 'strict-origin-when-cross-origin',
  openGraph: { type: 'profile', title: TITLE, description: profile.metaDescription, url: SITE_URL },
  twitter: { card: 'summary', title: TITLE, description: profile.metaDescription },
}

export const viewport: Viewport = {
  themeColor: '#120508',
  colorScheme: 'dark',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <meta httpEquiv="Content-Security-Policy" content={CSP} />
        {/* The only raw HTML on the site: a fixed string, no user input. */}
        <script dangerouslySetInnerHTML={{ __html: BOOT_SCRIPT }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
