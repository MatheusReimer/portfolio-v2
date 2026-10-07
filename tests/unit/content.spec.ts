import { describe, expect, it } from 'vitest'
import { experience } from '@/data/experience'
import { profile } from '@/data/profile'
import { projects } from '@/data/projects'
import { skills } from '@/data/skills'
import { work } from '@/data/work'

const allContent = JSON.stringify({ profile, experience, projects, skills, work })

function collectUrls(value: unknown, out: string[] = []): string[] {
  if (typeof value === 'string' && /^[a-z]+:/i.test(value) && !value.startsWith('mailto:')) out.push(value)
  else if (Array.isArray(value)) value.forEach((v) => collectUrls(v, out))
  else if (value && typeof value === 'object') Object.values(value).forEach((v) => collectUrls(v, out))
  return out
}

function collectStrings(value: unknown, out: string[] = []): string[] {
  if (typeof value === 'string') out.push(value)
  else if (Array.isArray(value)) value.forEach((v) => collectStrings(v, out))
  else if (value && typeof value === 'object') Object.values(value).forEach((v) => collectStrings(v, out))
  return out
}

describe('content', () => {
  it('has no empty strings anywhere', () => {
    const empty = collectStrings({ profile, experience, projects, skills, work }).filter((s) => s.trim() === '')
    expect(empty).toEqual([])
  })

  it('links only over https', () => {
    const urls = collectUrls({ profile, experience, projects, skills, work })
    expect(urls.length).toBeGreaterThan(0)
    for (const url of urls) expect(new URL(url).protocol, url).toBe('https:')
  })

  it('never leaks private client infrastructure', () => {
    // Client repos live in private Azure DevOps orgs; only public sites may appear.
    for (const pattern of [/dev\.azure\.com/i, /visualstudio\.com/i, /-stg\./i, /\buat\./i, /localhost/i]) {
      expect(allContent, pattern.source).not.toMatch(pattern)
    }
  })

  it('uses no em dashes', () => {
    expect(allContent).not.toContain('—')
  })

  it('lists roles newest first', () => {
    const starts = experience.map((r) => r.start)
    expect(starts).toEqual([...starts].sort().reverse())
  })

  it('has unique ids', () => {
    for (const list of [experience, projects, skills, work]) {
      const ids = list.map((x) => x.id)
      expect(new Set(ids).size).toBe(ids.length)
    }
  })

  it('features exactly one client project', () => {
    expect(work.filter((p) => p.featured)).toHaveLength(1)
  })

  it('links personal projects only to public GitHub repos or their own site', () => {
    for (const p of projects) {
      if (p.repo) expect(p.repo, p.id).toMatch(/^https:\/\/github\.com\/MatheusReimer\//)
    }
  })
})
