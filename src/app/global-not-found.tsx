import type { Metadata } from 'next'
import { RootDocument } from '@/components/RootDocument'
import { localeInfo, localeHref, locales } from '@/i18n/locales'

export const metadata: Metadata = {
  title: '404, page not found',
  robots: { index: false },
}

export default function GlobalNotFound() {
  return (
    <RootDocument locale="en">
      <main id="main" className="wrap not-found">
        <div className="terminal">
          <div className="terminal-body">
            <p className="t-cmd">
              <span className="prompt-sign">$</span> cd ./this-page
            </p>
            <h1 className="hero-tagline">404: no such file or directory</h1>
            <ul className="not-found-links">
              {locales.map((l) => (
                <li key={l}>
                  <a href={localeHref(l)} hrefLang={localeInfo[l].htmlLang} lang={localeInfo[l].htmlLang}>
                    {localeInfo[l].name} ↩
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </RootDocument>
  )
}
