import { describe, expect, it } from 'vitest'
import { experience } from '@/data/experience'
import { liveSites } from '@/data/live'
import { profile } from '@/data/profile'
import { projects } from '@/data/projects'
import { skills } from '@/data/skills'
import { work } from '@/data/work'
import { workflow, workflowStack, workflowTerminal } from '@/data/workflow'

const allContent = JSON.stringify({ profile, experience, projects, skills, work, workflow, workflowStack, workflowTerminal })

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
    const empty = collectStrings({ profile, experience, projects, skills, work, workflow, workflowStack, workflowTerminal }).filter((s) => s.trim() === '')
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
    for (const list of [experience, projects, skills, work, workflow]) {
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

  it('lists every public client site and personal site as live, once', () => {
    const expected = [...work.filter((p) => p.url).map((p) => p.url), ...projects.filter((p) => p.site).map((p) => p.site)]
    expect(liveSites.map((s) => s.url)).toEqual(expected)
    expect(new Set(liveSites.map((s) => new URL(s.url).host)).size).toBe(liveSites.length)
    expect(new Set(liveSites.map((s) => s.id)).size).toBe(liveSites.length)
  })

  it('never lists an internal system or a source repo as live', () => {
    const internal = work.filter((p) => !p.url).map((p) => p.id)
    for (const s of liveSites) {
      expect(internal, s.id).not.toContain(s.id)
      expect(s.url, s.id).not.toMatch(/github\.com/)
    }
  })

  it('marks only my own tools as built in the AI workflow', () => {
    // Open-source tools I run inside the loop must never be claimed as my own.
    const adopted = ['no-mistakes', 'Treehouse', 'GNHF']
    for (const s of workflow) {
      if (s.origin === 'built') expect(adopted, s.id).not.toContain(s.tool)
    }
    expect(workflow.find((s) => s.tool === 'no-mistakes')?.origin).toBe('adopted')
  })
})
