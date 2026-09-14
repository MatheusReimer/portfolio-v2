<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import { chevron } from '~/data/sprites'

/**
 * A carousel that changes slides behind a pixel-dissolve curtain: the blocks
 * fill in, the slide swaps while hidden, then the blocks clear. The swap is
 * never visible, so it reads as a scene transition rather than a crossfade.
 *
 * All slides stay in the DOM. Only the active one is exposed to assistive tech
 * and the tab order, but the text is always present for search engines and for
 * anyone reading with scripting off.
 */
const props = withDefaults(
  defineProps<{
    count: number
    label: string
    /** Labels for the indicator buttons, one per slide. */
    slideLabels?: string[]
  }>(),
  { slideLabels: () => [] },
)

const active = ref(0)
const covered = ref(false)
let timer: ReturnType<typeof setTimeout> | null = null

const COVER_MS = 260

const reduced = () =>
  import.meta.client && matchMedia('(prefers-reduced-motion: reduce)').matches

const goTo = (index: number) => {
  const next = (index + props.count) % props.count
  if (next === active.value || covered.value) return

  if (reduced()) {
    active.value = next
    return
  }

  covered.value = true
  timer = setTimeout(() => {
    active.value = next
    // Hold one frame at full cover so the swap cannot be glimpsed.
    timer = setTimeout(() => {
      covered.value = false
    }, 60)
  }, COVER_MS)
}

const next = () => goTo(active.value + 1)
const prev = () => goTo(active.value - 1)

onBeforeUnmount(() => {
  if (timer) clearTimeout(timer)
})

const labelFor = (i: number) => props.slideLabels[i] ?? `Slide ${i + 1}`

const position = computed(() => `${active.value + 1} of ${props.count}`)

/* --- Touch ---------------------------------------------------------------- */

let touchX: number | null = null

const onTouchStart = (e: TouchEvent) => {
  touchX = e.changedTouches[0]?.clientX ?? null
}

const onTouchEnd = (e: TouchEvent) => {
  if (touchX === null) return
  const delta = (e.changedTouches[0]?.clientX ?? touchX) - touchX
  if (Math.abs(delta) > 48) {
    if (delta < 0) next()
    else prev()
  }
  touchX = null
}

defineExpose({ goTo, next, prev })
</script>

<template>
  <section
    class="carousel"
    :aria-roledescription="'carousel'"
    :aria-label="label"
    @keydown.left.prevent="prev"
    @keydown.right.prevent="next"
  >
    <div
      class="carousel__stage"
      @touchstart.passive="onTouchStart"
      @touchend.passive="onTouchEnd"
    >
      <div
        v-for="i in count"
        :key="i - 1"
        class="carousel__slide"
        :class="{ 'is-active': active === i - 1 }"
        :aria-hidden="active === i - 1 ? undefined : 'true'"
        :inert="active === i - 1 ? undefined : true"
        role="group"
        :aria-roledescription="'slide'"
        :aria-label="`${i} of ${count}`"
      >
        <slot :index="i - 1" :is-active="active === i - 1" />
      </div>

      <!-- 12x8 is as fine as the curtain needs to be: finer grids read the
           same at this size and cost a node each. -->
      <PixelDissolve :active="covered" :columns="12" :rows="8" :duration="COVER_MS" />
    </div>

    <div class="carousel__controls">
      <button type="button" class="carousel__arrow px-btn" :aria-label="`Previous ${label}`" @click="prev">
        <PixelSprite :sprite="chevron" :scale="3" class="carousel__arrow-icon" />
      </button>

      <ul class="carousel__dots">
        <li v-for="i in count" :key="i - 1">
          <button
            type="button"
            class="carousel__dot"
            :class="{ 'is-on': active === i - 1 }"
            :aria-current="active === i - 1 ? 'true' : undefined"
            :aria-label="labelFor(i - 1)"
            @click="goTo(i - 1)"
          />
        </li>
      </ul>

      <button type="button" class="carousel__arrow px-btn" :aria-label="`Next ${label}`" @click="next">
        <PixelSprite :sprite="chevron" :scale="3" class="carousel__arrow-icon carousel__arrow-icon--next" />
      </button>
    </div>

    <p class="px-sr" aria-live="polite">{{ position }}</p>
  </section>
</template>

<style scoped>
.carousel__stage {
  position: relative;
  /* Slides are stacked, so the stage is as tall as the tallest one. */
  display: grid;
  overflow: hidden;
}

.carousel__slide {
  grid-area: 1 / 1;
  visibility: hidden;
}

.carousel__slide.is-active {
  visibility: visible;
}

.carousel__controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--px4);
  margin-top: clamp(20px, 3vw, 32px);
}

.carousel__arrow {
  padding: var(--px2) var(--px3);
}

.carousel__arrow-icon {
  transform: rotate(180deg);
}

.carousel__arrow-icon--next {
  transform: none;
}

.carousel__dots {
  display: flex;
  align-items: center;
  gap: var(--px2);
}

/* Indicators are square, because everything here is square. */
.carousel__dot {
  display: block;
  width: var(--px3);
  height: var(--px3);
  padding: 0;
  border: 0;
  cursor: pointer;
  background: var(--c-line);
  box-shadow:
    0 calc(-1 * var(--px)) 0 0 var(--c-line),
    0 var(--px) 0 0 var(--c-line),
    calc(-1 * var(--px)) 0 0 0 var(--c-line),
    var(--px) 0 0 0 var(--c-line);
  transition: background var(--step), box-shadow var(--step);
}

.carousel__dot:hover {
  background: var(--c-line-hi);
}

.carousel__dot.is-on {
  background: var(--c-accent);
  box-shadow:
    0 calc(-1 * var(--px)) 0 0 var(--c-accent),
    0 var(--px) 0 0 var(--c-accent),
    calc(-1 * var(--px)) 0 0 0 var(--c-accent),
    var(--px) 0 0 0 var(--c-accent);
}
</style>
