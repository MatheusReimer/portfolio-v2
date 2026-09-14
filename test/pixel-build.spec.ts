import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import PixelBuild from '../app/components/PixelBuild.vue'

/**
 * A controllable IntersectionObserver. The real one never fires in a hidden or
 * throttled tab, and this component's whole safety argument rests on what
 * happens when it does not — so the tests drive it explicitly.
 */
class FakeObserver {
  static instances: FakeObserver[] = []
  callback: IntersectionObserverCallback
  options?: IntersectionObserverInit
  disconnected = false

  constructor(cb: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    this.callback = cb
    this.options = options
    FakeObserver.instances.push(this)
  }

  observe() {}
  unobserve() {}
  disconnect() {
    this.disconnected = true
  }

  fire(isIntersecting = true) {
    this.callback([{ isIntersecting } as IntersectionObserverEntry], this as unknown as IntersectionObserver)
  }
}

/** Places the component below the fold unless told otherwise. */
function stubRect(top: number, bottom: number) {
  Element.prototype.getBoundingClientRect = vi.fn(
    () => ({ top, bottom, left: 0, right: 0, width: 800, height: bottom - top, x: 0, y: top, toJSON: () => ({}) }) as DOMRect,
  )
}

const mountBuild = () =>
  mount(PixelBuild, {
    slots: { default: '<p class="content">section</p>' },
    global: {
      stubs: {
        PixelDissolve: {
          name: 'PixelDissolve',
          props: ['active', 'columns', 'rows', 'duration'],
          template: '<div class="curtain" :data-active="String(active)" />',
        },
      },
    },
  })

let realRect: typeof Element.prototype.getBoundingClientRect

beforeEach(() => {
  realRect = Element.prototype.getBoundingClientRect
  FakeObserver.instances = []
  vi.stubGlobal('IntersectionObserver', FakeObserver)
  vi.stubGlobal('matchMedia', () => ({ matches: false }))
  window.innerHeight = 800
  stubRect(1600, 2400)
})

afterEach(() => {
  Element.prototype.getBoundingClientRect = realRect
  vi.unstubAllGlobals()
  vi.useRealTimers()
})

describe('PixelBuild', () => {
  it('always renders its content, curtain or not', () => {
    expect(mountBuild().find('.content').exists()).toBe(true)
  })

  it('renders no curtain until an observer has actually fired', () => {
    // The critical property: if observers never run, nothing is ever covered.
    const wrapper = mountBuild()
    expect(wrapper.find('.curtain').exists()).toBe(false)
  })

  it('never covers a section that is already on screen', async () => {
    stubRect(100, 700)
    const wrapper = mountBuild()
    expect(FakeObserver.instances).toHaveLength(0)
    expect(wrapper.find('.curtain').exists()).toBe(false)
  })

  it('covers once armed, while the section is still below the fold', async () => {
    const wrapper = mountBuild()
    FakeObserver.instances[0]!.fire()
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.curtain').exists()).toBe(true)
    expect(wrapper.find('.curtain').attributes('data-active')).toBe('true')
  })

  it('arms from below the fold, not once the section is already showing', () => {
    mountBuild()
    expect(FakeObserver.instances[0]!.options?.rootMargin).toContain('380px')
  })

  it('clears the curtain when the section arrives', async () => {
    vi.useFakeTimers()
    const wrapper = mountBuild()
    FakeObserver.instances[0]!.fire()
    await wrapper.vm.$nextTick()

    FakeObserver.instances[1]!.fire()
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.curtain').attributes('data-active')).toBe('false')

    await vi.advanceTimersByTimeAsync(1200)
    expect(wrapper.find('.curtain').exists()).toBe(false)
  })

  it('clears anyway if the build trigger never fires', async () => {
    vi.useFakeTimers()
    const wrapper = mountBuild()
    FakeObserver.instances[0]!.fire()
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.curtain').exists()).toBe(true)

    // Failsafe: content is never left behind a curtain that stopped animating.
    await vi.advanceTimersByTimeAsync(8000)
    expect(wrapper.find('.curtain').exists()).toBe(false)
  })

  it('does nothing at all under reduced motion', () => {
    vi.stubGlobal('matchMedia', () => ({ matches: true }))
    const wrapper = mountBuild()
    expect(FakeObserver.instances).toHaveLength(0)
    expect(wrapper.find('.curtain').exists()).toBe(false)
    expect(wrapper.find('.content').exists()).toBe(true)
  })

  it('tears its observers down on unmount', () => {
    const wrapper = mountBuild()
    FakeObserver.instances[0]!.fire()
    wrapper.unmount()
    expect(FakeObserver.instances.every(o => o.disconnected)).toBe(true)
  })
})
