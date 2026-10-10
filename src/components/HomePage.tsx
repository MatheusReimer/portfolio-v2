import { ExternalLink } from '@/components/ExternalLink'
import { RevealController } from '@/components/RevealController'
import {
  AboutSection,
  ContactSection,
  ExperienceSection,
  LiveSection,
  ProjectsSection,
  StackSection,
  WorkflowSection,
  WorkSection,
} from '@/components/Sections'
import { TerminalHero } from '@/components/TerminalHero'
import { WaveBackdrop } from '@/components/WaveBackdrop'
import { getContent } from '@/i18n/content'
import { localeInfo, localeHref, locales, type Locale } from '@/i18n/locales'

const NAV = ['live', 'work', 'ai', 'projects', 'experience', 'stack', 'about', 'contact']

/** Plain links to each language's page, so switching works without JavaScript. */
function LanguageSwitcher({ current, label }: { current: Locale; label: string }) {
  return (
    <nav aria-label={label}>
      <ul className="lang-switch">
        {locales.map((l) => {
          const info = localeInfo[l]
          return (
            <li key={l}>
              <a
                href={localeHref(l)}
                hrefLang={info.htmlLang}
                lang={info.htmlLang}
                aria-label={info.name}
                aria-current={l === current ? 'page' : undefined}
              >
                {info.short}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export function HomePage({ locale }: { locale: Locale }) {
  const c = getContent(locale)
  const { ui, profile } = c

  return (
    <>
      <div className="backdrop" aria-hidden="true">
        <div className="backdrop-glow one" />
        <div className="backdrop-glow two" />
        <WaveBackdrop />
      </div>
      <a href="#main" className="skip-link">
        {ui.skipToContent}
      </a>
      <header className="site-header">
        <div className="wrap header-inner">
          <a href="#top" className="brand">
            <span className="accent">{profile.handle}</span>
            <span className="muted">@reimer:~$</span>
          </a>
          <nav aria-label={ui.sectionsNav}>
            <ul className="nav">
              {NAV.map((id) => (
                <li key={id}>
                  <a href={`#${id}`}>
                    <span className="nav-prefix" aria-hidden="true">
                      ./
                    </span>
                    {id}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <LanguageSwitcher current={locale} label={ui.languageNav} />
        </div>
      </header>

      <main id="main" className="wrap">
        <div id="top" className="hero">
          <TerminalHero
            copy={{
              name: profile.name,
              handle: profile.handle,
              role: profile.role,
              location: profile.location,
              tagline: profile.tagline,
              stats: profile.stats.map(({ value, label }) => ({ value, label })),
              skip: ui.hero.skip,
            }}
          />
          <div className="hero-actions">
            <a href="#work" className="btn btn-primary">
              {ui.hero.viewWork}
            </a>
            <a href={`mailto:${profile.email}`} className="btn">
              {ui.hero.emailMe}
            </a>
            <ExternalLink href={profile.socials[0].href} className="btn">
              GitHub ↗
            </ExternalLink>
          </div>
          <p className="hero-summary">{profile.summary}</p>
        </div>

        <LiveSection c={c} />
        <WorkSection c={c} />
        <WorkflowSection c={c} />
        <ProjectsSection c={c} />
        <ExperienceSection c={c} />
        <StackSection c={c} />
        <AboutSection c={c} />
        <ContactSection c={c} />
      </main>

      <footer className="site-footer">
        <div className="wrap footer-inner">
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <p>
            {ui.footer.builtWith} <ExternalLink href={profile.sourceUrl}>{ui.footer.source} ↗</ExternalLink>
          </p>
        </div>
      </footer>

      <RevealController />
    </>
  )
}
