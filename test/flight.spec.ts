import { describe, expect, it } from 'vitest'
import { isThrusting, rocketOffset } from '../app/utils/flight'

const VIEWPORT = 900
const DISTANCE = 620

describe('rocketOffset', () => {
  it('sits on the pad at the top of the page', () => {
    expect(rocketOffset(0, VIEWPORT, DISTANCE)).toBe(0)
  })

  it('climbs as the page scrolls down', () => {
    const quarter = rocketOffset(VIEWPORT * 0.25, VIEWPORT, DISTANCE)
    const half = rocketOffset(VIEWPORT * 0.5, VIEWPORT, DISTANCE)
    expect(quarter).toBeLessThan(0)
    expect(half).toBeLessThan(quarter)
  })

  it('reaches full travel by one viewport of scroll', () => {
    expect(rocketOffset(VIEWPORT, VIEWPORT, DISTANCE)).toBe(-DISTANCE)
  })

  it('clamps, so it never flies off past its range', () => {
    expect(rocketOffset(VIEWPORT * 9, VIEWPORT, DISTANCE)).toBe(-DISTANCE)
  })

  it('ignores negative scroll from overscroll bounce', () => {
    expect(rocketOffset(-500, VIEWPORT, DISTANCE)).toBe(0)
  })

  it('always lands on the 4px pixel grid', () => {
    for (let s = 0; s <= VIEWPORT; s += 7) {
      // Math.abs because a negative multiple of 4 modulo 4 is -0 in JS.
      expect(Math.abs(rocketOffset(s, VIEWPORT, DISTANCE) % 4)).toBe(0)
    }
  })

  it('is monotonic — scrolling down never drops the ship', () => {
    let previous = 0
    for (let s = 0; s <= VIEWPORT; s += 25) {
      const current = rocketOffset(s, VIEWPORT, DISTANCE)
      expect(current).toBeLessThanOrEqual(previous)
      previous = current
    }
  })

  it('retraces exactly on the way back up', () => {
    const outbound = rocketOffset(430, VIEWPORT, DISTANCE)
    const inbound = rocketOffset(430, VIEWPORT, DISTANCE)
    expect(inbound).toBe(outbound)
  })

  it('survives a zero-height viewport without dividing by zero', () => {
    expect(Number.isFinite(rocketOffset(100, 0, DISTANCE))).toBe(true)
  })
})

describe('isThrusting', () => {
  it('lights the engine when climbing', () => {
    expect(isThrusting(300, 100)).toBe(true)
  })

  it('lights the engine when descending — the landing burn', () => {
    expect(isThrusting(100, 300)).toBe(true)
  })

  it('stays cold when the page is still', () => {
    expect(isThrusting(250, 250)).toBe(false)
  })

  it('ignores sub-pixel jitter', () => {
    expect(isThrusting(250.4, 250)).toBe(false)
  })
})
