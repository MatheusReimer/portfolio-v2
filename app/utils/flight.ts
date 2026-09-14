/**
 * Flight maths for the scroll-driven booster.
 *
 * Kept as pure functions rather than inline in the component so the behaviour
 * is provable in tests. Scroll-driven motion is otherwise unverifiable outside
 * a foreground browser: a hidden or throttled tab dispatches no scroll events
 * and runs no animation frames, so "it moved" cannot be asserted there.
 */

/** Pixel unit. The ship hops in whole pixels; it never lands on a half one. */
const STEP = 4

/**
 * Vertical offset for a given scroll position, in CSS pixels.
 *
 * Negative is upward: scrolling down launches the ship. The result is clamped
 * to the travel distance and snapped to the pixel grid.
 */
export function rocketOffset(
  scrollY: number,
  viewportHeight: number,
  distance: number,
  step = STEP,
): number {
  const range = Math.max(1, viewportHeight)
  const progress = Math.min(1, Math.max(0, scrollY / range))
  const travel = Math.round((progress * distance) / step) * step
  // Negating zero yields -0, which reads as "translateY(-0px)". Harmless, but
  // there is no reason to emit it.
  return travel === 0 ? 0 : -travel
}

/**
 * Whether the engine should be lit.
 *
 * True whenever the ship is actually moving, in either direction — climbing on
 * the way down the page, and burning retrograde on the way back up, which is
 * how a booster lands tail-first.
 */
export function isThrusting(scrollY: number, previousScrollY: number, threshold = 1): boolean {
  return Math.abs(scrollY - previousScrollY) > threshold
}
