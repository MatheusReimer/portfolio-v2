import { describe, expect, it } from 'vitest'
import { experience } from '@/data/experience'
import { profile } from '@/data/profile'
import { projects } from '@/data/projects'
import { work } from '@/data/work'
import { formatPeriod, getContent, translations } from '@/i18n/content'
import { locales } from '@/i18n/locales'

const translated = locales.filter((l) => translations[l].content)

function strings(value: unknown, out: string[] = []): string[] {
  if (typeof value === 'string') out.push(value)
  else if (Array.isArray(value)) value.forEach((v) => strings(v, out))
  else if (value && typeof value === 'object') Object.values(value).forEach((v) => strings(v, out))
  return out
}

describe('translations', () => {
  it('covers every locale except the English source', () => {
    expect(translated).toEqual(['pt', 'de'])
  })

  describe.each(translated)('%s', (locale) => {
    const t = translations[locale].content!

    it('translates every client project, side project and role, and nothing else', () => {
      expect(Object.keys(t.work).sort()).toEqual(work.map((p) => p.id).sort())
      expect(Object.keys(t.projects).sort()).toEqual(projects.map((p) => p.id).sort())
      expect(Object.keys(t.experience).sort()).toEqual(experience.map((r) => r.id).sort())
    })

    it('keeps every list the same length as the English', () => {
      for (const p of work) expect(t.work[p.id].highlights, p.id).toHaveLength(p.highlights.length)
      for (const p of projects) expect(t.projects[p.id].highlights, p.id).toHaveLength(p.highlights.length)
      for (const r of experience) expect(t.experience[r.id].points, r.id).toHaveLength(r.points.length)
      expect(t.profile.statLabels).toHaveLength(profile.stats.length)
      expect(t.profile.about).toHaveLength(profile.about.length)
      expect(t.profile.principles).toHaveLength(profile.principles.length)
      expect(t.profile.languages).toHaveLength(profile.languages.length)
    })

    it('has no empty strings and no em dashes', () => {
      const all = strings({ content: t, ui: translations[locale].ui })
      expect(all.filter((s) => s.trim() === '')).toEqual([])
      expect(all.filter((s) => s.includes('—'))).toEqual([])
    })

    it('actually translates the prose instead of copying the English', () => {
      const c = getContent(locale)
      expect(c.profile.tagline).not.toBe(profile.tagline)
      for (const p of c.work) expect(p.product, p.id).not.toBe(work.find((w) => w.id === p.id)!.product)
    })

    it('never changes links, ids or stacks', () => {
      const c = getContent(locale)
      expect(c.work.map((p) => [p.id, p.url, p.stack])).toEqual(work.map((p) => [p.id, p.url, p.stack]))
      expect(c.projects.map((p) => [p.id, p.repo, p.site])).toEqual(projects.map((p) => [p.id, p.repo, p.site]))
      expect(c.liveSites.map((s) => s.url)).toEqual(getContent('en').liveSites.map((s) => s.url))
    })
  })
})

describe('formatPeriod', () => {
  it('formats ongoing, finished and single-month periods per locale', () => {
    expect(formatPeriod(translations.en.ui, '2024-09')).toBe('Sep 2024 → present')
    expect(formatPeriod(translations.pt.ui, '2024-09', '2026-05')).toBe('set 2024 → mai 2026')
    expect(formatPeriod(translations.de.ui, '2025-03')).toBe('Mär 2025 → heute')
    expect(formatPeriod(translations.de.ui, '2025-08', '2025-08')).toBe('Aug 2025')
  })

  it('has twelve months in every locale', () => {
    for (const l of locales) expect(translations[l].ui.months, l).toHaveLength(12)
  })
})
