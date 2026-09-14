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
 * Deterministic shuffle. A seeded LCG rather than Math.random so the server
 * and client render identical markup and hydration stays quiet.
 */
const order = computed(() => {
  const count = props.columns * props.rows
  const indices = Array.from({ length: count }, (_, i) => i)

  let seed = 1337
  for (let i = count - 1; i > 0; i--) {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff
    const j = seed % (i + 1)
    const a = indices[i]!
    indices[i] = indices[j]!
    indices[j] = a
  }

  // position -> its slot in the scatter order
  const slot = new Array<number>(count)
  indices.forEach((cell, position) => {
    slot[cell] = position
  })
  return slot
})

const blocks = computed(() =>
  order.value.map((slot, i) => {
    const step = props.duration / (props.columns * props.rows)
    return {
      key: i,
      // Entering scatters one way, leaving unwinds the other, so the curtain
      // never looks like it is simply replaying itself.
      enter: `${(slot * step).toFixed(1)}ms`,
      exit: `${((props.columns * props.rows - slot) * step).toFixed(1)}ms`,
    }
  }),
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
