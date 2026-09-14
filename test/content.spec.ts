import { describe, expect, it } from 'vitest'
import { profile } from '../app/data/profile'
import { experience } from '../app/data/experience'
import { projects } from '../app/data/projects'
import { capabilities, stack } from '../app/data/skills'

/**
 * The site is a static render of these modules, so content defects are the
 * realistic failure mode — a broken link or an empty field ships silently and
 * is seen by exactly the people you least want to show it to.
 */

const ALL_TEXT = JSON.stringify({ profile, experience, projects, capabilities })

describe('profile', () => {
  it('has the identity fields the layout and metadata depend on', () => {
    expect(profile.name).toBeTruthy()
    expect(profile.role).toBeTruthy()
    expect(profile.location).toBeTruthy()
    expect(profile.tagline).toBeTruthy()
    expect(profile.summary).toBeTruthy()
  })

  it('keeps the meta description within the ~160 char search-result limit', () => {
    expect(profile.metaDescription.length).toBeLessThanOrEqual(165)
  })

  it('exposes a valid email address', () => {
    expect(profile.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
  })

  it('fills every inventory slot with a complete item', () => {
    // Enough to fill the grid, few enough that the hero stays scannable.
    expect(profile.stats.length).toBeGreaterThanOrEqual(4)
    expect(profile.stats.length).toBeLessThanOrEqual(6)

    for (const stat of profile.stats) {
      expect(stat.value.trim()).not.toBe('')
      expect(stat.label.trim()).not.toBe('')
      expect(stat.note.trim()).not.toBe('')
      expect(stat.short.trim()).not.toBe('')
      expect(stat.detail.trim()).not.toBe('')
    }
  })

  it('keeps slot captions short enough for the slot', () => {
    for (const stat of profile.stats) {
      expect(stat.short.length).toBeLessThanOrEqual(12)
      expect(stat.value.length).toBeLessThanOrEqual(6)
    }
  })

  it('gives each slot detail real substance, not a restated note', () => {
    for (const stat of profile.stats) {
      expect(stat.detail.length).toBeGreaterThan(80)
      expect(stat.detail).not.toBe(stat.note)
    }
  })

  it('only backs a slot with an https link, and labels it', () => {
    for (const stat of profile.stats) {
      if (!stat.href) continue
      expect(stat.href).toMatch(/^https:\/\//)
      expect(stat.hrefLabel?.trim()).toBeTruthy()
    }
  })

  it('uses a distinct short caption per slot', () => {
    const shorts = profile.stats.map(s => s.short)
    expect(new Set(shorts).size).toBe(shorts.length)
  })

  it('points every social link at https', () => {
    expect(profile.socials.length).toBeGreaterThan(0)
    for (const social of profile.socials) {
      expect(social.href).toMatch(/^https:\/\//)
      expect(social.label.trim()).not.toBe('')
      expect(social.handle.trim()).not.toBe('')
    }
  })
})

describe('experience', () => {
  it('lists roles newest first', () => {
    const starts = experience.map(r => r.start)
    const sorted = [...starts].sort().reverse()
    expect(starts).toEqual(sorted)
  })

  it('gives every role the fields the timeline renders', () => {
    for (const role of experience) {
      expect(role.id).toBeTruthy()
      expect(role.company).toBeTruthy()
      expect(role.role).toBeTruthy()
      expect(role.period).toBeTruthy()
      expect(role.location).toBeTruthy()
      expect(role.highlight).toBeTruthy()
      expect(role.stack.length).toBeGreaterThan(0)
      expect(role.achievements.length).toBeGreaterThan(0)
    }
  })

  it('uses unique role ids', () => {
    const ids = experience.map(r => r.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('only links out over https, and labels each link', () => {
    for (const role of experience) {
      for (const item of role.achievements) {
        expect(item.text.trim()).not.toBe('')
        if (item.url) {
          expect(item.url).toMatch(/^https:\/\//)
          expect(item.urlLabel?.trim()).toBeTruthy()
        }
      }
    }
  })
})

describe('projects', () => {
  it('gives every project the fields the card renders', () => {
    expect(projects.length).toBeGreaterThan(0)
    for (const project of projects) {
      expect(project.id).toBeTruthy()
      expect(project.title).toBeTruthy()
      expect(project.subtitle).toBeTruthy()
      expect(project.contribution).toBeTruthy()
      expect(project.context).toBeTruthy()
      expect(project.outcome).toBeTruthy()
      expect(project.approach.length).toBeGreaterThan(0)
      expect(project.metrics.length).toBeGreaterThan(0)
      expect(project.tech.length).toBeGreaterThan(0)
    }
  })

  it('uses unique project ids', () => {
    const ids = projects.map(p => p.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})

describe('capabilities', () => {
  it('backs every claimed capability with evidence and tools', () => {
    for (const cap of capabilities) {
      expect(cap.name).toBeTruthy()
      expect(cap.summary).toBeTruthy()
      expect(cap.description).toBeTruthy()
      expect(cap.evidence.length).toBeGreaterThan(0)
      expect(cap.tools.length).toBeGreaterThan(0)
    }
  })

  it('has no empty toolkit groups', () => {
    for (const group of stack) {
      expect(group.label).toBeTruthy()
      expect(group.items.length).toBeGreaterThan(0)
    }
  })
})

describe('tone', () => {
  // The whole point of the rebuild: the duel vocabulary must not creep back in.
  const gameTerms = [
    'boss',
    'bossName',
    'grimoire',
    'duel',
    'graveyard',
    'summon',
    'mythic',
    'legendary',
    'XP',
    'life points',
  ]

  // Word-boundary matched, not substring matched: "XP" is inside "experience"
  // and "boss" is inside plenty of innocent words.
  it.each(gameTerms)('contains no game vocabulary: %s', (term) => {
    const pattern = new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i')
    expect(ALL_TEXT).not.toMatch(pattern)
  })
})
