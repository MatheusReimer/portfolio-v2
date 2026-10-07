import type { CSSProperties, ReactNode } from 'react'

/**
 * A page section headed by a shell prompt. The command "types" itself when
 * the section scrolls into view (see RevealController and globals.css); the
 * plain-language title is the real heading for screen readers and search.
 */
export function Section({
  id,
  command,
  title,
  children,
}: {
  id: string
  command: string
  title: string
  children: ReactNode
}) {
  return (
    <section
      id={id}
      className="section reveal"
      aria-labelledby={`${id}-title`}
      style={{ '--chars': command.length } as CSSProperties}
    >
      <header className="section-head">
        <p className="prompt-line" aria-hidden="true">
          <span className="prompt-path">~/{id}</span> <span className="prompt-sign">$</span>{' '}
          <span className="typed">{command}</span>
        </p>
        <h2 id={`${id}-title`} className="section-title">
          {title}
        </h2>
      </header>
      <div className="section-body">{children}</div>
    </section>
  )
}
