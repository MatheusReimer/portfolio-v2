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

  fire(isIntersecting: boolean) {
    this.callback(
      [{ isIntersecting } as IntersectionObserverEntry],
      this as unknown as IntersectionObserver,
    )
  }
}

/** Places the component where we want it relative to the fold. */
function stubRect(top: number, bottom: number) {
  Element.prototype.getBoundingClientRect = vi.fn(
    () =>
      ({
        top, bottom, left: 0, right: 0, width: 800, height: bottom - top, x: 0, y: top,
        toJSON: () => ({}),
      }) as DOMRect,
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

const near = () => FakeObserver.instances[0]!
const visible = () => FakeObserver.instances[1]!

let realRect: typeof Element.prototype.getBoundingClientRect

beforeEach(() => {
  realRect = Element.prototype.getBoundingClientRect
  FakeObserver.instances = []
  vi.stubGlobal('IntersectionObserver', FakeObserver)
  vi.stubGlobal('matchMedia', () => ({ matches: false }))
  window.innerHeight = 800
  stubRect(1600, 2400) // below the fold
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
    expect(mountBuild().find('.curtain').exists()).toBe(false)
  })

  it('never covers a section that is on screen', async () => {
    stubRect(100, 700)
    const wrapper = mountBuild()
    near().fire(true)
    visible().fire(true)
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.curtain').exists()).toBe(false)
  })

  it('covers once near, while still off screen', async () => {
    const wrapper = mountBuild()
    near().fire(true)
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.curtain').attributes('data-active')).toBe('true')
  })

  it('arms from beyond the fold in both directions', () => {
    mountBuild()
    expect(near().options?.rootMargin).toBe('420px 0px 420px 0px')
  })

  it('clears as the section arrives', async () => {
    const wrapper = mountBuild()
    near().fire(true)
    await wrapper.vm.$nextTick()

    stubRect(200, 900)
    visible().fire(true)
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.curtain').attributes('data-active')).toBe('false')
  })

  it('covers again when the section leaves, so scrolling back rebuilds it', async () => {
    const wrapper = mountBuild()
    near().fire(true)
    stubRect(200, 900)
    visible().fire(true)
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.curtain').attributes('data-active')).toBe('false')

    // Scrolled past: off screen again.
    stubRect(-1600, -900)
    visible().fire(false)
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.curtain').attributes('data-active')).toBe('true')

    // And back into view: builds a second time.
    stubRect(200, 900)
    visible().fire(true)
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.curtain').attributes('data-active')).toBe('false')
  })

  it('destroys the curtain once the section is far away', async () => {
    const wrapper = mountBuild()
    near().fire(true)
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.curtain').exists()).toBe(true)

    near().fire(false)
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.curtain').exists()).toBe(false)
  })

  it('watchdog uncovers a section that ends up visible while covered', async () => {
    vi.useFakeTimers()
    const wrapper = mountBuild()
    near().fire(true)
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.curtain').attributes('data-active')).toBe('true')

    // The section becomes visible without the observer reporting it — the only
    // way this component could strand content behind a curtain.
    stubRect(100, 700)
    await vi.advanceTimersByTimeAsync(2000)
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.curtain').attributes('data-active')).toBe('false')
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
    wrapper.unmount()
    expect(FakeObserver.instances.every(o => o.disconnected)).toBe(true)
  })
})
