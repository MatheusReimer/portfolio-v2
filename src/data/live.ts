import { displayHost } from '@/components/ExternalLink'
import { projects } from './projects'
import { work } from './work'

/**
 * Everything I worked on that a visitor can open right now.
 *
 * Derived from `work` and `projects` so a link lives in exactly one place:
 * give a client project a `url` or a side project a `site` and it shows up
 * here. Internal systems and repo-only projects are left out on purpose.
 */
export interface LiveSite {
  id: string
  name: string
  url: string
  /** Link text: the host, or a project's `siteLabel`. */
  label: string
  blurb: string
  kind: 'client' | 'personal'
}

export const liveSites: LiveSite[] = [
  ...work.flatMap((p): LiveSite[] =>
    p.url ? [{ id: p.id, name: p.client, url: p.url, label: displayHost(p.url), blurb: p.product, kind: 'client' }] : [],
  ),
  ...projects.flatMap((p): LiveSite[] =>
    p.site
      ? [{ id: p.id, name: p.name, url: p.site, label: p.siteLabel ?? displayHost(p.site), blurb: p.summary, kind: 'personal' }]
      : [],
  ),
]
