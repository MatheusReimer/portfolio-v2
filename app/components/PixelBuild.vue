<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

/**
 * Builds a section out of pixels every time it scrolls into view.
 *
 * A curtain of blocks covers the section while it is off screen, then clears
 * in Bayer dither order as the section arrives — the way a progressive image
 * used to resolve. Leave the section and it covers again, so scrolling back up
 * rebuilds it rather than revealing something that already happened.
 *
 * The safety property matters more than the effect, and drives the design:
 *
 *  - Nothing is covered unless an IntersectionObserver has reported the
 *    section off screen. If observers never run — a hidden tab, a throttled
 *    renderer, no scripting — no curtain is created and every section renders
 *    plainly.
 *  - A section on screen is never covered, so content is never hidden out from
 *    under a reader.
 *  - A watchdog clears the curtain if a covered section ends up visible
 *    anyway, which is the only route by which this could strand content.
 *
 * Curtains are created only near the viewport and destroyed once the section is
 * far away, so at most a couple of them carry nodes at a time.
 */
withDefaults(
  defineProps<{
    columns?: number
    rows?: number
    /** How long the full sweep takes, in ms. */
    duration?: number
  }>(),
  // Coarse on purpose: big cells read as pixels resolving, where a fine grid
  // just reads as a fade.
  { columns: 10, rows: 6, duration: 900 },
)

const WATCHDOG_MS = 1600

const root = ref<HTMLElement | null>(null)
/** The curtain only exists while the section is near the viewport. */
const mounted = ref(false)
const covered = ref(false)

let nearObserver: IntersectionObserver | null = null
let visibleObserver: IntersectionObserver | null = null
let watchdog: ReturnType<typeof setInterval> | null = null

const isOnScreen = () => {
  const el = root.value
  if (!el) return false
  const r = el.getBoundingClientRect()
  return r.top < window.innerHeight && r.bottom > 0
}

const stopWatchdog = () => {
  if (watchdog) clearInterval(watchdog)
  watchdog = null
}

/**
 * The only way this component could hide content is a curtain that stays up
 * while its section is visible. A blanket timer would clear off-screen
 * curtains too and kill the effect, so this checks for exactly that condition
 * instead.
 */
const startWatchdog = () => {
  stopWatchdog()
  watchdog = setInterval(() => {
    if (covered.value && isOnScreen()) {
      covered.value = false
      stopWatchdog()
    }
  }, WATCHDOG_MS)
}

const cover = () => {
  if (isOnScreen()) return
  mounted.value = true
  covered.value = true
  startWatchdog()
}

const build = () => {
  covered.value = false
  stopWatchdog()
}

onMounted(() => {
  const el = root.value
  if (!el) return
  if (typeof IntersectionObserver === 'undefined') return
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return

  // Near: owns whether the curtain exists at all.
  nearObserver = new IntersectionObserver(
    (entries) => {
      const near = entries.some(e => e.isIntersecting)
      if (near) {
        if (!mounted.value) cover()
      }
      else {
        mounted.value = false
        covered.value = false
        stopWatchdog()
      }
    },
    { rootMargin: '420px 0px 420px 0px' },
  )

  // Visible: owns whether it is drawn or cleared, in both directions.
  visibleObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) build()
        else cover()
      }
    },
    { threshold: 0.04 },
  )

  nearObserver.observe(el)
  visibleObserver.observe(el)
})

onBeforeUnmount(() => {
  nearObserver?.disconnect()
  visibleObserver?.disconnect()
  stopWatchdog()
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
