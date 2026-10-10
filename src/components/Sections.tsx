import type { ClientProject } from '@/data/work'
import { formatPeriod, type Content } from '@/i18n/content'
import type { UiMessages } from '@/i18n/types'
import { ExternalLink, displayHost } from './ExternalLink'
import { Section } from './Section'
import { WorkflowGraph } from './WorkflowGraph'

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

function ClientMeta({ project, ui }: { project: ClientProject; ui: UiMessages }) {
  return (
    <p className="card-meta">
      <span className="accent">{project.role}</span>
      <span className="sep">/</span>
      {formatPeriod(ui, project.start, project.end)}
    </p>
  )
}

export function LiveSection({ c }: { c: Content }) {
  const { ui } = c
  return (
    <Section id="live" command="ls deployments/ --status=live" title={ui.live.title}>
      <p className="lede">{ui.live.lede}</p>
      <ul className="live-rail" aria-label={ui.live.listLabel}>
        {c.liveSites.map((s) => (
          <li key={s.id}>
            <ExternalLink href={s.url} className="live-card" label={`${s.name}, ${s.label}`}>
              <span className="live-status">
                <span className="status-dot" aria-hidden="true" />
                live<span className="sep">/</span>
                {ui.live[s.kind]}
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

export function WorkSection({ c }: { c: Content }) {
  const { ui } = c
  const featured = c.work.find((p) => p.featured)
  const rest = c.work.filter((p) => !p.featured)

  return (
    <Section id="work" command="ls clients/ --sort=impact" title={ui.work.title}>
      <p className="lede">{ui.work.lede}</p>

      {featured && (
        <article className="card featured" aria-labelledby={`${featured.id}-name`}>
          <div className="card-head">
            <div>
              <p className="card-kicker">{ui.work.featured}</p>
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
          <ClientMeta project={featured} ui={ui} />
          <dl className="metric-row">
            {c.profile.stats.slice(0, 3).map((s) => (
              <div key={s.label} className="metric">
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
          <Bullets items={featured.highlights} />
          <Chips items={featured.stack} label={ui.labels.stack(featured.client)} />
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
                <span className="visit is-private">{ui.work.internal}</span>
              )}
            </div>
            <ClientMeta project={p} ui={ui} />
            <Bullets items={p.highlights} />
            <Chips items={p.stack} label={ui.labels.stack(p.client)} />
          </article>
        ))}
      </div>
    </Section>
  )
}

export function WorkflowSection({ c }: { c: Content }) {
  const { ui } = c
  return (
    <Section id="ai" command="cat ~/.claude/workflow.md" title={ui.workflow.title}>
      <p className="lede">{ui.workflow.lede}</p>
      <WorkflowGraph
        stages={c.workflow}
        label={ui.workflow.graphLabel}
        me={ui.workflow.me}
        approves={ui.workflow.approves}
      />
      <ol className="flow" aria-label={ui.workflow.listLabel}>
        {c.workflow.map((s, i) => (
          <li key={s.id} className="card flow-step" aria-labelledby={`${s.id}-step`}>
            <p className="flow-head">
              <span className="flow-index" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="flow-tool">{s.tool}</span>
              <span className={`flow-origin is-${s.origin}`}>{ui.workflow[s.origin]}</span>
            </p>
            <h3 id={`${s.id}-step`} className="card-title">
              {s.title}
            </h3>
            <p className="flow-body">{s.body}</p>
          </li>
        ))}
      </ol>
      <p className="flow-loop">
        <span aria-hidden="true">↺ </span>
        {ui.workflow.loop}
      </p>
      <div className="grid flow-notes">
        {c.workflowNotes.map((n) => (
          <article key={n.id} className="card flow-note" aria-labelledby={`${n.id}-note`}>
            <p className="card-kicker">{n.kicker}</p>
            <h3 id={`${n.id}-note`} className="card-title">
              {n.title}
            </h3>
            {n.body.map((p) => (
              <p key={p.slice(0, 24)} className="flow-body">
                {p}
              </p>
            ))}
          </article>
        ))}
      </div>
      <Chips items={c.workflowStack} label={ui.labels.stack(ui.workflow.title)} />
    </Section>
  )
}

export function ProjectsSection({ c }: { c: Content }) {
  const { ui } = c
  return (
    <Section id="projects" command="ls side-projects/" title={ui.projects.title}>
      <p className="lede">{ui.projects.lede}</p>
      <div className="grid">
        {c.projects.map((p) => (
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
                    <ExternalLink href={p.site} className="visit" label={ui.labels.liveSite(p.name)}>
                      {p.siteLabel ?? displayHost(p.site)} ↗
                    </ExternalLink>
                  )}
                  {p.repo && (
                    <ExternalLink href={p.repo} className="visit" label={ui.labels.sourceCode(p.name)}>
                      {ui.projects.source} ↗
                    </ExternalLink>
                  )}
                </div>
              )}
              {!p.repo && !p.site && <span className="visit is-private">{ui.projects.privateRepo}</span>}
            </div>
            <Bullets items={p.highlights} />
            <Chips items={p.stack} label={ui.labels.stack(p.name)} />
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

export function ExperienceSection({ c }: { c: Content }) {
  const { ui } = c
  return (
    <Section id="experience" command="git log --career" title={ui.experience.title}>
      <ol className="log">
        {c.experience.map((r, i) => (
          <li key={r.id} className="log-entry">
            <p className="log-hash" aria-hidden="true">
              commit {shortHash(r.id)}
              {i === 0 && <span className="log-head"> (HEAD → main)</span>}
            </p>
            <h3 className="log-title">
              {r.role} <span className="muted">{ui.experience.at}</span> {r.company}
            </h3>
            <p className="card-meta">
              {formatPeriod(ui, r.start, r.end)}
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

export function StackSection({ c }: { c: Content }) {
  return (
    <Section id="stack" command="cat stack.toml" title={c.ui.stack.title}>
      <div className="toml">
        {c.skills.map((g) => (
          <div key={g.id} className="toml-row">
            <p className="toml-key">[{g.label}]</p>
            <Chips items={g.items} label={g.label} />
          </div>
        ))}
      </div>
    </Section>
  )
}

export function AboutSection({ c }: { c: Content }) {
  const { ui, profile } = c
  return (
    <Section id="about" command="cat about.md" title={ui.about.title}>
      <div className="about">
        <div className="prose">
          {profile.about.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
        <aside className="about-side">
          <p className="toml-key"># {ui.about.languages}</p>
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

export function ContactSection({ c }: { c: Content }) {
  const { profile } = c
  return (
    <Section id="contact" command="./contact --open" title={c.ui.contact.title}>
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
