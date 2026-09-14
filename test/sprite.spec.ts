import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import PixelSprite from '../app/components/PixelSprite.vue'
import { avatar, sprites } from '../app/data/sprites'
import type { Sprite } from '../app/data/sprites'

describe('sprite data', () => {
  it.each(Object.entries(sprites))('%s is a strict rectangle', (_name, sprite: Sprite) => {
    const width = sprite.rows[0]?.length ?? 0
    expect(width).toBeGreaterThan(0)
    for (const row of sprite.rows) {
      expect(row).toHaveLength(width)
    }
  })

  it.each(Object.entries(sprites))('%s only uses characters its palette defines', (_name, sprite: Sprite) => {
    const known = new Set([...Object.keys(sprite.palette), '.'])
    for (const row of sprite.rows) {
      for (const ch of row) {
        expect(known).toContain(ch)
      }
    }
  })
})

describe('PixelSprite', () => {
  it('renders a viewBox matching the source grid', () => {
    const wrapper = mount(PixelSprite, { props: { sprite: avatar } })
    expect(wrapper.attributes('viewBox')).toBe('0 0 16 16')
  })

  it('scales integer pixels, so edges stay crisp', () => {
    const wrapper = mount(PixelSprite, { props: { sprite: avatar, scale: 9 } })
    expect(wrapper.attributes('width')).toBe('144')
    expect(wrapper.attributes('height')).toBe('144')
    expect(wrapper.attributes('shape-rendering')).toBe('crispEdges')
  })

  it('merges horizontal runs instead of emitting one rect per pixel', () => {
    const wrapper = mount(PixelSprite, { props: { sprite: avatar } })
    const rects = wrapper.findAll('rect')
    // A naive renderer would emit up to 256 nodes for a 16x16 sprite.
    expect(rects.length).toBeLessThan(80)
    expect(rects.length).toBeGreaterThan(0)
  })

  it('emits no rect for transparent pixels', () => {
    const blank: Sprite = { rows: ['....', '....'], palette: { O: '#fff' } }
    const wrapper = mount(PixelSprite, { props: { sprite: blank } })
    expect(wrapper.findAll('rect')).toHaveLength(0)
  })

  it('merges a solid row into a single rect of full width', () => {
    const solid: Sprite = { rows: ['OOOO'], palette: { O: '#fff' } }
    const wrapper = mount(PixelSprite, { props: { sprite: solid } })
    const rects = wrapper.findAll('rect')
    expect(rects).toHaveLength(1)
    expect(rects[0]!.attributes('width')).toBe('4')
    expect(rects[0]!.attributes('x')).toBe('0')
  })

  it('splits a row into one rect per colour run', () => {
    const striped: Sprite = { rows: ['AABB'], palette: { A: '#a00', B: '#0a0' } }
    const wrapper = mount(PixelSprite, { props: { sprite: striped } })
    const rects = wrapper.findAll('rect')
    expect(rects).toHaveLength(2)
    expect(rects[0]!.attributes('fill')).toBe('#a00')
    expect(rects[1]!.attributes('fill')).toBe('#0a0')
    expect(rects[1]!.attributes('x')).toBe('2')
  })

  it('is hidden from assistive tech unless given a label', () => {
    const wrapper = mount(PixelSprite, { props: { sprite: avatar } })
    expect(wrapper.attributes('aria-hidden')).toBe('true')
    expect(wrapper.attributes('role')).toBeUndefined()
  })

  it('becomes an labelled image when given a label', () => {
    const wrapper = mount(PixelSprite, { props: { sprite: avatar, label: 'Portrait' } })
    expect(wrapper.attributes('role')).toBe('img')
    expect(wrapper.attributes('aria-label')).toBe('Portrait')
    expect(wrapper.attributes('aria-hidden')).toBeUndefined()
  })
})
