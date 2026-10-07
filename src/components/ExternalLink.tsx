import type { ReactNode } from 'react'

/** Every outbound link goes through here so the rel attributes can't be forgotten. */
export function ExternalLink({
  href,
  children,
  className,
  label,
}: {
  href: string
  children: ReactNode
  className?: string
  label?: string
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} aria-label={label}>
      {children}
    </a>
  )
}

/** "chatsworth.com" from "https://www.chatsworth.com". */
export function displayHost(url: string): string {
  return new URL(url).host.replace(/^www\./, '')
}
