import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import CapabilitySheet from '../app/components/CapabilitySheet.vue'
import { capabilities, yearsApplied, CAPABILITY_MAX_YEARS } from '../app/data/skills'

const mountSheet = () =>
  mount(CapabilitySheet, {
    global: { stubs: { PixelSprite: true, PixelMeter: true, TechChip: true } },
  })

describe('yearsApplied', () => {
  it('counts whole years from the since date', () => {
    const cap = capabilities[0]!
    expect(yearsApplied({ ...cap, since: 2020 }, 2026)).toBe(6)
    expect(yearsApplied({ ...cap, since: 2024 }, 2026)).toBe(2)
  })

  it('never reports less than one year, so a fresh entry still shows a bar', () => {
    const cap = capabilities[0]!
    expect(yearsApplied({ ...cap, since: 2026 }, 2026)).toBe(1)
    expect(yearsApplied({ ...cap, since: 2027 }, 2026)).toBe(1)
  })

  it('keeps every capability within the bar it is drawn in', () => {
    for (const cap of capabilities) {
      expect(yearsApplied(cap)).toBeLessThanOrEqual(CAPABILITY_MAX_YEARS)
    }
  })

  it('gives every capability a plausible start year', () => {
    for (const cap of capabilities) {
      expect(cap.since).toBeGreaterThanOrEqual(2019)
      expect(cap.since).toBeLessThanOrEqual(new Date().getFullYear())
    }
  })
})

describe('CapabilitySheet', () => {
  it('renders one row per capability', () => {
    expect(mountSheet().findAll('.row')).toHaveLength(capabilities.length)
  })

  it('opens the first capability by default, so the section is never empty', () => {
    const rows = mountSheet().findAll('.row')
    expect(rows[0]!.classes()).toContain('is-open')
    expect(rows[1]!.classes()).not.toContain('is-open')
  })

  it('wires aria-expanded and aria-controls to the panel', () => {
    const wrapper = mountSheet()
    const button = wrapper.findAll('.row__head')[0]!
    const id = capabilities[0]!.id
    expect(button.attributes('aria-expanded')).toBe('true')
    expect(button.attributes('aria-controls')).toBe(`cap-panel-${id}`)
    expect(wrapper.find(`#cap-panel-${id}`).attributes('aria-labelledby')).toBe(`cap-tab-${id}`)
  })

  it('hides closed panels from assistive tech', () => {
    const wrapper = mountSheet()
    const closed = wrapper.find(`#cap-panel-${capabilities[1]!.id}`)
    expect(closed.attributes('hidden')).toBeDefined()
  })

  it('opening one row closes the previous', async () => {
    const wrapper = mountSheet()
    await wrapper.findAll('.row__head')[2]!.trigger('click')
    const rows = wrapper.findAll('.row')
    expect(rows[2]!.classes()).toContain('is-open')
    expect(rows[0]!.classes()).not.toContain('is-open')
  })

  it('clicking the open row collapses it', async () => {
    const wrapper = mountSheet()
    await wrapper.findAll('.row__head')[0]!.trigger('click')
    expect(wrapper.findAll('.row')[0]!.classes()).not.toContain('is-open')
    expect(wrapper.findAll('.row__head')[0]!.attributes('aria-expanded')).toBe('false')
  })

  it('shows the year count beside every bar', () => {
    const wrapper = mountSheet()
    const years = wrapper.findAll('.row__years').map(n => n.text())
    expect(years).toHaveLength(capabilities.length)
    for (const text of years) expect(text).toMatch(/^\d+y$/)
  })
})
