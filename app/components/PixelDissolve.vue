<script setup lang="ts">
import { computed } from 'vue'

/**
 * A pixel-dissolve curtain.
 *
 * A grid of opaque blocks that pop in and out one at a time, in a scattered
 * order — the scene-transition wipe from a 16-bit game. Nothing fades: each
 * block is either there or not, switched with `steps(1)`.
 *
 * Drive it by toggling `active`: true fills the curtain, false clears it.
 */
const props = withDefaults(
  defineProps<{
    active: boolean
    columns?: number
    rows?: number
    /** How long the full sweep takes, in ms. */
    duration?: number
  }>(),
  { columns: 16, rows: 10, duration: 260 },
)

/**
 * Ordered dither, not random scatter.
 *
 * A Bayer matrix is what a machine reaches for when it has to approximate a
 * continuous image with a handful of discrete cells, and it is what a
 * progressively-loading image looked like when that was still a thing you
 * watched happen. Clearing in this order reads as a picture resolving itself —
 * a process — where a random shuffle just reads as noise.
 *
 * It is also inherently deterministic, so server and client agree for free.
 */
const BAYER_8 = [
  [0, 32, 8, 40, 2, 34, 10, 42],
  [48, 16, 56, 24, 50, 18, 58, 26],
  [12, 44, 4, 36, 14, 46, 6, 38],
  [60, 28, 52, 20, 62, 30, 54, 22],
  [3, 35, 11, 43, 1, 33, 9, 41],
  [51, 19, 59, 27, 49, 17, 57, 25],
  [15, 47, 7, 39, 13, 45, 5, 37],
  [63, 31, 55, 23, 61, 29, 53, 21],
]

/** Each cell's place in the dither order, 0 to 1. */
const ranks = computed(() => {
  const out: number[] = []
  for (let y = 0; y < props.rows; y++) {
    for (let x = 0; x < props.columns; x++) {
      out.push((BAYER_8[y % 8]![x % 8]! + 0.5) / 64)
    }
  }
  return out
})

const blocks = computed(() =>
  ranks.value.map((rank, i) => ({
    key: i,
    // Covering runs the dither one way and clearing unwinds it the other, so
    // the curtain never looks like it is simply replaying itself.
    enter: `${(rank * props.duration).toFixed(1)}ms`,
    exit: `${((1 - rank) * props.duration).toFixed(1)}ms`,
  })),
)
</script>

<template>
  <div
    class="dissolve"
    :class="{ 'is-active': active }"
    :style="{ '--cols': columns, '--rows': rows }"
    aria-hidden="true"
  >
    <span
      v-for="block in blocks"
      :key="block.key"
      class="dissolve__blk"
      :style="{ '--enter': block.enter, '--exit': block.exit }"
    />
  </div>
</template>

<style scoped>
.dissolve {
  position: absolute;
  inset: 0;
  z-index: 5;
  display: grid;
  grid-template-columns: repeat(var(--cols), 1fr);
  grid-template-rows: repeat(var(--rows), 1fr);
  pointer-events: none;
}

.dissolve__blk {
  background: var(--dissolve-fill, var(--c-panel-2));
  opacity: 0;
  /* 1ms + steps(1) means the block snaps; the delay is what animates. */
  transition: opacity 1ms steps(1, end);
  transition-delay: var(--exit);
}

.dissolve.is-active .dissolve__blk {
  opacity: 1;
  transition-delay: var(--enter);
}

/* The curtain is decoration; with reduced motion the swap is just instant. */
@media (prefers-reduced-motion: reduce) {
  .dissolve {
    display: none;
  }
}
</style>
