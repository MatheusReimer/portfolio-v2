<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

/**
 * Builds a section out of pixels as it scrolls into view.
 *
 * A curtain of blocks covers the section while it is still below the fold,
 * then clears one block at a time in a scattered order as the section arrives —
 * so the content appears to assemble itself rather than fade in.
 *
 * The safety property matters more than the effect, and drives the design:
 *
 *  - Nothing is ever covered unless an IntersectionObserver has already fired.
 *    If observers do not run at all — a hidden tab, a throttled renderer, no
 *    scripting — no curtain is ever created and every section renders plainly.
 *  - A section already on screen at mount is never covered. The user does not
 *    watch content they can already read get hidden and then rebuilt.
 *  - A failsafe clears the curtain regardless after a few seconds.
 *
 * The curtain is also created lazily and destroyed once it has cleared, so at
 * most a section or two carries the extra nodes at any moment.
 */
const props = withDefaults(
  defineProps<{
    columns?: number
    rows?: number
    /** How long the full sweep takes, in ms. */
    duration?: number
  }>(),
  { columns: 11, rows: 7, duration: 620 },
)

/** Nothing stays covered longer than this, whatever happens. */
const FAILSAFE_MS = 6000

const root = ref<HTMLElement | null>(null)
/** The curtain only exists between arming and clearing. */
const mounted = ref(false)
const covered = ref(false)

let armObserver: IntersectionObserver | null = null
let buildObserver: IntersectionObserver | null = null
let failsafe: ReturnType<typeof setTimeout> | null = null
let clearTimer: ReturnType<typeof setTimeout> | null = null

const finish = () => {
  covered.value = false
  if (clearTimer) clearTimeout(clearTimer)
  clearTimer = setTimeout(() => {
    mounted.value = false
  }, props.duration + 120)
}

const build = () => {
  if (!mounted.value) return
  buildObserver?.disconnect()
  finish()
}

onMounted(() => {
  const el = root.value
  if (!el) return
  if (typeof IntersectionObserver === 'undefined') return
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return

  // Already on screen: leave it alone.
  const rect = el.getBoundingClientRect()
  if (rect.top < window.innerHeight && rect.bottom > 0) return

  armObserver = new IntersectionObserver(
    (entries) => {
      if (!entries.some(e => e.isIntersecting)) return
      armObserver?.disconnect()

      // Cover while still below the fold, so the curtain is never seen
      // appearing over content the reader was already looking at.
      mounted.value = true
      covered.value = true
      failsafe = setTimeout(finish, FAILSAFE_MS)

      buildObserver = new IntersectionObserver(
        (inner) => {
          if (inner.some(e => e.isIntersecting)) build()
        },
        { threshold: 0.06 },
      )
      buildObserver.observe(el)
    },
    // Fires while the section is still a screenful below.
    { rootMargin: '0px 0px 380px 0px' },
  )

  armObserver.observe(el)
})

onBeforeUnmount(() => {
  armObserver?.disconnect()
  buildObserver?.disconnect()
  if (failsafe) clearTimeout(failsafe)
  if (clearTimer) clearTimeout(clearTimer)
})
</script>

<template>
  <div ref="root" class="build">
    <slot />
    <PixelDissolve
      v-if="mounted"
      :active="covered"
      :columns="columns"
      :rows="rows"
      :duration="duration"
      class="build__curtain"
    />
  </div>
</template>

<style scoped>
.build {
  position: relative;
}

/* Sits above the section but never takes a click. */
.build__curtain {
  --dissolve-fill: var(--c-bg);
  z-index: 3;
}
</style>
