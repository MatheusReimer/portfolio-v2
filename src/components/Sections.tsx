import { experience } from '@/data/experience'
import { liveSites } from '@/data/live'
import { profile } from '@/data/profile'
import { projects } from '@/data/projects'
import { skills } from '@/data/skills'
import { work, type ClientProject } from '@/data/work'
import { ExternalLink, displayHost } from './ExternalLink'
import { Section } from './Section'

function Chips({ items, label }: { items: string[]; label: string }) {
  return (
    <ul className="chips" aria-label={label}>
      {items.map((item) => (
        <li key={item} className="chip">
          {item}
        </li>
      ))}
    </ul>
  )
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="bullets">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

function ClientMeta({ project }: { project: ClientProject }) {
  return (
    <p className="card-meta">
      <span className="accent">{project.role}</span>
      <span className="sep">/</span>
      {project.period}
    </p>
  )
}

export function LiveSection() {
  return (
    <Section id="live" command="ls deployments/ --status=live" title="Live in production">
      <p className="lede">Sites I built or helped build that are running today. Open any of them.</p>
      <ul className="live-rail" aria-label="Live sites">
        {liveSites.map((s) => (
          <li key={s.id}>
            <ExternalLink href={s.url} className="live-card" label={`${s.name}, ${s.label}`}>
              <span className="live-status">
                <span className="status-dot" aria-hidden="true" />
                live<span className="sep">/</span>
                {s.kind}
              </span>
              <span className="live-name">{s.name}</span>
              <span className="live-blurb">{s.blurb}</span>
              <span className="live-host">{s.label} ↗</span>
            </ExternalLink>
          </li>
        ))}
      </ul>
    </Section>
  )
}

export function WorkSection() {
  const featured = work.find((p) => p.featured)
  const rest = work.filter((p) => !p.featured)

  return (
    <Section id="work" command="ls clients/ --sort=impact" title="Client work">
      <p className="lede">
        Platforms I built and shipped at Thinklogic. Every line below is backed by my own commits in the client
        repository.
      </p>

      {featured && (
        <article className="card featured" aria-labelledby={`${featured.id}-name`}>
          <div className="card-head">
            <div>
              <p className="card-kicker">featured case study</p>
              <h3 id={`${featured.id}-name`} className="card-title">
                {featured.client}
              </h3>
              <p className="card-sub">{featured.product}</p>
            </div>
            {featured.url && (
              <ExternalLink href={featured.url} className="visit">
                {displayHost(featured.url)} ↗
              </ExternalLink>
            )}
          </div>
          <ClientMeta project={featured} />
          <dl className="metric-row">
            {profile.stats.slice(0, 3).map((s) => (
              <div key={s.label} className="metric">
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
          <Bullets items={featured.highlights} />
          <Chips items={featured.stack} label={`${featured.client} stack`} />
        </article>
      )}

      <div className="grid">
        {rest.map((p) => (
          <article key={p.id} className="card" aria-labelledby={`${p.id}-name`}>
            <div className="card-head">
              <div>
                <h3 id={`${p.id}-name`} className="card-title">
                  {p.client}
                </h3>
                <p className="card-sub">{p.product}</p>
              </div>
              {p.url ? (
                <ExternalLink href={p.url} className="visit">
                  {displayHost(p.url)} ↗
                </ExternalLink>
              ) : (
                <span className="visit is-private">internal system</span>
              )}
            </div>
            <ClientMeta project={p} />
            <Bullets items={p.highlights} />
            <Chips items={p.stack} label={`${p.client} stack`} />
          </article>
        ))}
      </div>
    </Section>
  )
}

export function ProjectsSection() {
  return (
    <Section id="projects" command="ls side-projects/" title="Personal projects">
      <p className="lede">Things I build on my own time, mostly to try a stack properly rather than read about it.</p>
      <div className="grid">
        {projects.map((p) => (
          <article key={p.id} className="card" aria-labelledby={`${p.id}-name`}>
            <div className="card-head">
              <div>
                <h3 id={`${p.id}-name`} className="card-title">
                  {p.name}
                </h3>
                <p className="card-sub">{p.summary}</p>
              </div>
              {(p.repo || p.site) && (
                <div className="visit-links">
                  {p.site && (
                    <ExternalLink href={p.site} className="visit" label={`${p.name} live site`}>
                      {p.siteLabel ?? displayHost(p.site)} ↗
                    </ExternalLink>
                  )}
                  {p.repo && (
                    <ExternalLink href={p.repo} className="visit" label={`${p.name} source code on GitHub`}>
                      source ↗
                    </ExternalLink>
                  )}
                </div>
              )}
              {!p.repo && !p.site && <span className="visit is-private">private repo</span>}
            </div>
            <Bullets items={p.highlights} />
            <Chips items={p.stack} label={`${p.name} stack`} />
          </article>
        ))}
      </div>
    </Section>
  )
}

/** Stable 7-character "commit hash" for a role, purely decorative. */
function shortHash(seed: string): string {
  let h = 2166136261
  for (const ch of seed) h = Math.imul(h ^ ch.charCodeAt(0), 16777619)
  return (h >>> 0).toString(16).padStart(8, '0').slice(0, 7)
}

export function ExperienceSection() {
  return (
    <Section id="experience" command="git log --career" title="Experience">
      <ol className="log">
        {experience.map((r, i) => (
          <li key={r.id} className="log-entry">
            <p className="log-hash" aria-hidden="true">
              commit {shortHash(r.id)}
              {i === 0 && <span className="log-head"> (HEAD → main)</span>}
            </p>
            <h3 className="log-title">
              {r.role} <span className="muted">at</span> {r.company}
            </h3>
            <p className="card-meta">
              {r.period}
              <span className="sep">/</span>
              {r.location}
            </p>
            <p className="log-summary">{r.summary}</p>
            <Bullets items={r.points} />
          </li>
        ))}
      </ol>
    </Section>
  )
}

export function StackSection() {
  return (
    <Section id="stack" command="cat stack.toml" title="Stack">
      <div className="toml">
        {skills.map((g) => (
          <div key={g.id} className="toml-row">
            <p className="toml-key">[{g.label}]</p>
            <Chips items={g.items} label={g.label} />
          </div>
        ))}
      </div>
    </Section>
  )
}

export function AboutSection() {
  return (
    <Section id="about" command="cat about.md" title="About">
      <div className="about">
        <div className="prose">
          {profile.about.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
        <aside className="about-side">
          <p className="toml-key"># languages</p>
          <dl className="langs">
            {profile.languages.map((l) => (
              <div key={l.name}>
                <dt>{l.name}</dt>
                <dd>{l.level}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
      <ul className="principles">
        {profile.principles.map((p) => (
          <li key={p.title} className="card">
            <h3 className="card-title">{p.title}</h3>
            <p>{p.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}

export function ContactSection() {
  return (
    <Section id="contact" command="./contact --open" title="Contact">
      <p className="status">
        <span className="status-dot" aria-hidden="true" />
        {profile.availability}
      </p>
      <p className="contact-mail">
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
      </p>
      <ul className="contact-links">
        {profile.socials.map((s) => (
          <li key={s.id}>
            <ExternalLink href={s.href}>
              <span className="muted">{s.label.toLowerCase()}</span> {s.handle} ↗
            </ExternalLink>
          </li>
        ))}
      </ul>
    </Section>
  )
}
