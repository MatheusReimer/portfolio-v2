import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import PixelDissolve from '../app/components/PixelDissolve.vue'
import PixelMeter from '../app/components/PixelMeter.vue'
import PixelCarousel from '../app/components/PixelCarousel.vue'
import StatInventory from '../app/components/StatInventory.vue'
import PixelRocket from '../app/components/PixelRocket.vue'
import { rocket as rocketSprite, flameFrames } from '../app/data/sprites'
import { profile } from '../app/data/profile'
import { techSprites, techIcon, toMono } from '../app/data/techSprites'
import type { Sprite } from '../app/data/sprites'

describe('tech sprites', () => {
  it.each(Object.entries(techSprites))('%s is a 16x16 rectangle', (_name, sprite: Sprite) => {
    expect(sprite.rows).toHaveLength(16)
    for (const row of sprite.rows) expect(row).toHaveLength(16)
  })

  it.each(Object.entries(techSprites))('%s palette has valid hex colours', (_name, sprite: Sprite) => {
    for (const colour of Object.values(sprite.palette)) {
      expect(colour).toMatch(/^#[0-9a-f]{6}$/i)
    }
  })

  it.each(Object.entries(techSprites))('%s only uses characters its palette defines', (_name, sprite: Sprite) => {
    const known = new Set([...Object.keys(sprite.palette), '.'])
    for (const row of sprite.rows) {
      for (const ch of row) expect(known).toContain(ch)
    }
  })

  it('resolves tech names case- and whitespace-insensitively', () => {
    expect(techIcon('Vue.js')).toBe(techSprites.vue)
    expect(techIcon('  TYPESCRIPT ')).toBe(techSprites.typescript)
    expect(techIcon('C#')).toBe(techSprites.csharp)
  })

  it('returns undefined for unmapped tech, so chips degrade to text', () => {
    expect(techIcon('COBOL')).toBeUndefined()
    expect(techIcon('')).toBeUndefined()
  })
})

describe('PixelDissolve', () => {
  it('renders one block per grid cell', () => {
    const wrapper = mount(PixelDissolve, { props: { active: false, columns: 8, rows: 4 } })
    expect(wrapper.findAll('.dissolve__blk')).toHaveLength(32)
  })

  it('is decorative, never announced', () => {
    const wrapper = mount(PixelDissolve, { props: { active: false } })
    expect(wrapper.attributes('aria-hidden')).toBe('true')
  })

  it('toggles the active class so the curtain fills', async () => {
    const wrapper = mount(PixelDissolve, { props: { active: false, columns: 4, rows: 2 } })
    expect(wrapper.classes()).not.toContain('is-active')
    await wrapper.setProps({ active: true })
    expect(wrapper.classes()).toContain('is-active')
  })

  it('gives every block a distinct scatter delay', () => {
    const wrapper = mount(PixelDissolve, { props: { active: true, columns: 4, rows: 4 } })
    const delays = wrapper.findAll('.dissolve__blk').map(b => b.attributes('style'))
    expect(new Set(delays).size).toBe(16)
  })

  it('scatters deterministically, so SSR and client agree', () => {
    const opts = { props: { active: true, columns: 6, rows: 4 } }
    const a = mount(PixelDissolve, opts).html()
    const b = mount(PixelDissolve, opts).html()
    expect(a).toBe(b)
  })
})

describe('PixelMeter', () => {
  it('fills the requested number of segments', () => {
    const wrapper = mount(PixelMeter, { props: { value: 4, label: 'English' } })
    expect(wrapper.findAll('.meter__seg')).toHaveLength(5)
    expect(wrapper.findAll('.meter__seg.is-on')).toHaveLength(4)
  })

  it('exposes meter semantics to assistive tech', () => {
    const wrapper = mount(PixelMeter, { props: { value: 5, max: 5, label: 'Portuguese' } })
    expect(wrapper.attributes('role')).toBe('meter')
    expect(wrapper.attributes('aria-valuenow')).toBe('5')
    expect(wrapper.attributes('aria-valuemax')).toBe('5')
    expect(wrapper.attributes('aria-label')).toBe('Portuguese')
  })
})

describe('PixelCarousel', () => {
  const mountCarousel = () =>
    mount(PixelCarousel, {
      props: { count: 3, label: 'selected work', slideLabels: ['One', 'Two', 'Three'] },
      slots: { default: '<p>slide</p>' },
      global: { stubs: { PixelDissolve: true, PixelSprite: true } },
    })

  it('renders every slide, so nothing is hidden from search or no-JS readers', () => {
    expect(mountCarousel().findAll('.carousel__slide')).toHaveLength(3)
  })

  it('marks only the active slide as visible and interactive', () => {
    const slides = mountCarousel().findAll('.carousel__slide')
    expect(slides[0]!.attributes('aria-hidden')).toBeUndefined()
    expect(slides[1]!.attributes('aria-hidden')).toBe('true')
    expect(slides[2]!.attributes('aria-hidden')).toBe('true')
  })

  it('advances and wraps around', async () => {
    vi.useFakeTimers()
    const wrapper = mountCarousel()

    wrapper.vm.next()
    await vi.advanceTimersByTimeAsync(400)
    expect(wrapper.findAll('.carousel__dot')[1]!.classes()).toContain('is-on')

    wrapper.vm.prev()
    await vi.advanceTimersByTimeAsync(400)
    wrapper.vm.prev()
    await vi.advanceTimersByTimeAsync(400)
    // Wrapped backwards from the first slide to the last.
    expect(wrapper.findAll('.carousel__dot')[2]!.classes()).toContain('is-on')

    vi.useRealTimers()
  })

  it('ignores a jump to the slide already showing', async () => {
    vi.useFakeTimers()
    const wrapper = mountCarousel()
    wrapper.vm.goTo(0)
    await vi.advanceTimersByTimeAsync(400)
    expect(wrapper.findAll('.carousel__dot')[0]!.classes()).toContain('is-on')
    vi.useRealTimers()
  })

  it('labels its controls', () => {
    const wrapper = mountCarousel()
    const labels = wrapper.findAll('button').map(b => b.attributes('aria-label'))
    expect(labels).toContain('Previous selected work')
    expect(labels).toContain('Next selected work')
    expect(labels).toContain('One')
  })

  it('announces position politely', () => {
    const live = mountCarousel().find('[aria-live="polite"]')
    expect(live.exists()).toBe(true)
    expect(live.text()).toBe('1 of 3')
  })
})

describe('toMono', () => {
  it('spreads a two-colour sprite across the legible grey ramp', () => {
    const mono = toMono(techSprites.typescript)
    const greys = Object.values(mono.palette)
    expect(greys).toHaveLength(2)
    for (const g of greys) expect(g).toMatch(/^#([0-9a-f]{2})\1\1$/i)
    expect(new Set(greys).size).toBe(2)
  })

  it('lands a single-colour sprite bright enough to read on a dark panel', () => {
    // Angular's red is dark; a naive luminance map would bury it.
    const mono = toMono(techSprites.angular)
    const value = parseInt(Object.values(mono.palette)[0]!.slice(1, 3), 16)
    expect(value).toBeGreaterThan(140)
  })

  it('leaves the sprite geometry untouched', () => {
    expect(toMono(techSprites.vue).rows).toEqual(techSprites.vue.rows)
  })
})

describe('StatInventory', () => {
  const mountInventory = () =>
    mount(StatInventory, {
      global: {
        stubs: {
          PixelSprite: true,
          PixelWindow: { template: '<div><slot /></div>' },
        },
      },
    })

  it('renders one slot per stat', () => {
    expect(mountInventory().findAll('.slot')).toHaveLength(profile.stats.length)
  })

  it('shows every figure in its slot, so the numbers need no interaction', () => {
    const counts = mountInventory().findAll('.slot__count').map(n => n.text())
    expect(counts).toEqual(profile.stats.map(s => s.value))
  })

  it('selects the first slot by default', () => {
    const slots = mountInventory().findAll('.slot')
    expect(slots[0]!.classes()).toContain('is-active')
    expect(slots[0]!.attributes('aria-selected')).toBe('true')
    expect(slots[1]!.attributes('aria-selected')).toBe('false')
  })

  it('uses tab semantics and a roving tabindex', () => {
    const wrapper = mountInventory()
    expect(wrapper.find('[role="tablist"]').exists()).toBe(true)
    const slots = wrapper.findAll('.slot')
    expect(slots[0]!.attributes('tabindex')).toBe('0')
    expect(slots[1]!.attributes('tabindex')).toBe('-1')
    expect(slots[0]!.attributes('aria-controls')).toBe('stat-panel-0')
  })

  it('keeps every readout in the DOM, hiding all but the active one', () => {
    const wrapper = mountInventory()
    const panels = wrapper.findAll('[role="tabpanel"]')
    expect(panels).toHaveLength(profile.stats.length)
    expect(panels[0]!.attributes('hidden')).toBeUndefined()
    expect(panels[1]!.attributes('hidden')).toBeDefined()
  })

  it('selecting a slot swaps the readout', async () => {
    const wrapper = mountInventory()
    await wrapper.findAll('.slot')[2]!.trigger('click')
    expect(wrapper.findAll('.slot')[2]!.classes()).toContain('is-active')
    expect(wrapper.findAll('[role="tabpanel"]')[2]!.attributes('hidden')).toBeUndefined()
    expect(wrapper.findAll('[role="tabpanel"]')[0]!.attributes('hidden')).toBeDefined()
  })

  it('arrow keys move selection and wrap at both ends', async () => {
    const wrapper = mountInventory()
    const slots = wrapper.findAll('.slot')
    await slots[0]!.trigger('keydown.left')
    expect(wrapper.findAll('.slot').at(-1)!.classes()).toContain('is-active')
    await wrapper.findAll('.slot').at(-1)!.trigger('keydown.right')
    expect(wrapper.findAll('.slot')[0]!.classes()).toContain('is-active')
  })
})

describe('rocket sprites', () => {
  it('is a 16x24 grid', () => {
    expect(rocketSprite.rows).toHaveLength(24)
    for (const row of rocketSprite.rows) expect(row).toHaveLength(16)
  })

  it('has three flame frames, all the same size', () => {
    expect(flameFrames).toHaveLength(3)
    for (const f of flameFrames) {
      expect(f.rows).toHaveLength(8)
      for (const row of f.rows) expect(row).toHaveLength(16)
    }
  })

  it('draws flames of differing length, so the cycle actually flickers', () => {
    const lit = flameFrames.map(f => f.rows.filter(r => r.trim().replace(/\./g, '')).length)
    expect(new Set(lit).size).toBeGreaterThan(1)
  })

  it('only uses characters its palette defines', () => {
    for (const sprite of [rocketSprite, ...flameFrames]) {
      const known = new Set([...Object.keys(sprite.palette), '.'])
      for (const row of sprite.rows) {
        for (const ch of row) expect(known).toContain(ch)
      }
    }
  })
})

describe('PixelRocket', () => {
  const mountRocket = () =>
    mount(PixelRocket, { global: { stubs: { PixelSprite: true } } })

  it('is decorative and never announced', () => {
    expect(mountRocket().attributes('aria-hidden')).toBe('true')
  })

  it('renders every flame frame, staggered', () => {
    const frames = mountRocket().findAll('.rocket__frame')
    expect(frames).toHaveLength(3)
    const delays = frames.map(f => f.attributes('style'))
    expect(new Set(delays).size).toBe(3)
  })

  it('starts unlit and grounded', () => {
    const wrapper = mountRocket()
    expect(wrapper.classes()).not.toContain('is-burning')
    expect(wrapper.attributes('style')).toContain('translateY(0px)')
  })
})
