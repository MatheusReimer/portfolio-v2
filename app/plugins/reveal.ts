/**
 * `v-reveal` — steps an element into place when it first scrolls into view.
 *
 * Registered universally, not client-only: Vue's SSR renderer looks the
 * directive up while rendering, so a client-only registration crashes the
 * server render with "Cannot read properties of undefined (reading
 * 'getSSRProps')". The browser-only work is guarded instead.
 *
 * Deliberately conservative: the hidden state lives behind a `.js` class that
 * an inline bootstrap script adds before first paint, so with JS disabled or
 * broken every section renders normally. Nothing here gates content behind an
 * animation finishing.
 */
/** Nothing stays hidden longer than this, whatever happens. */
const FAILSAFE_MS = 4000

export default defineNuxtPlugin((nuxtApp) => {
  let observer: IntersectionObserver | null = null

  // Every element still waiting to be revealed.
  const pending = new Set<HTMLElement>()
  let failsafe: ReturnType<typeof setTimeout> | null = null

  const reveal = (el: Element) => {
    el.classList.add('is-in')
    pending.delete(el as HTMLElement)
    observer?.unobserve(el)
  }

  /**
   * Reveal everything, unconditionally, and stop observing.
   *
   * IntersectionObserver callbacks are only delivered while the document is
   * actually rendering. A backgrounded tab, a throttled renderer, or a headless
   * environment can therefore leave observed elements at opacity 0 forever.
   * Losing the animation is acceptable; losing the content is not.
   */
  const revealAll = () => {
    for (const el of [...pending]) reveal(el)
    observer?.disconnect()
    observer = null
  }

  if (import.meta.client) {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!reduced && typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue
            // One-shot: nothing re-hides on scroll back up.
            reveal(entry.target)
          }
        },
        { rootMargin: '0px 0px -12% 0px', threshold: 0.05 },
      )
    }
  }

  nuxtApp.vueApp.directive('reveal', {
    // No getSSRProps: the server emits no extra attributes for this directive.
    getSSRProps: () => ({}),

    mounted(el: HTMLElement, binding) {
      if (!observer) {
        el.classList.add('is-in')
        return
      }

      el.classList.add('px-reveal')

      // Stagger siblings by passing an index: v-reveal="i"
      const index = Number(binding.value)
      if (Number.isFinite(index) && index > 0) {
        el.style.transitionDelay = `${Math.min(index, 6) * 70}ms`
      }

      pending.add(el)
      observer.observe(el)

      // Armed once, on the first revealed element, for the whole page.
      failsafe ??= setTimeout(revealAll, FAILSAFE_MS)
    },

    unmounted(el: HTMLElement) {
      pending.delete(el)
      observer?.unobserve(el)
    },
  })
})
