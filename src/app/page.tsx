import { ExternalLink } from '@/components/ExternalLink'
import { RevealController } from '@/components/RevealController'
import {
  AboutSection,
  ContactSection,
  ExperienceSection,
  ProjectsSection,
  StackSection,
  WorkSection,
} from '@/components/Sections'
import { TerminalHero } from '@/components/TerminalHero'
import { WaveBackdrop } from '@/components/WaveBackdrop'
import { profile } from '@/data/profile'

const NAV = ['work', 'projects', 'experience', 'stack', 'about', 'contact']

export default function Home() {
  return (
    <>
      <div className="backdrop" aria-hidden="true">
        <div className="backdrop-glow one" />
        <div className="backdrop-glow two" />
        <WaveBackdrop />
      </div>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header className="site-header">
        <div className="wrap header-inner">
          <a href="#top" className="brand">
            <span className="accent">{profile.handle}</span>
            <span className="muted">@reimer:~$</span>
          </a>
          <nav aria-label="Sections">
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
        </div>
      </header>

      <main id="main" className="wrap">
        <div id="top" className="hero">
          <TerminalHero />
          <div className="hero-actions">
            <a href="#work" className="btn btn-primary">
              View work
            </a>
            <a href={`mailto:${profile.email}`} className="btn">
              Email me
            </a>
            <ExternalLink href={profile.socials[0].href} className="btn">
              GitHub ↗
            </ExternalLink>
          </div>
          <p className="hero-summary">{profile.summary}</p>
        </div>

        <WorkSection />
        <ProjectsSection />
        <ExperienceSection />
        <StackSection />
        <AboutSection />
        <ContactSection />
      </main>

      <footer className="site-footer">
        <div className="wrap footer-inner">
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <p>
            Built with Next.js, React and TypeScript.{' '}
            <ExternalLink href={profile.sourceUrl}>Source ↗</ExternalLink>
          </p>
        </div>
      </footer>

      <RevealController />
    </>
  )
}
