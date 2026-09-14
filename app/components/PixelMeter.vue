<script setup lang="ts">
import { computed } from 'vue'

/**
 * A segmented bar. Discrete blocks rather than a continuous fill, because a
 * smooth gradient has no place in a pixel interface — and because discrete
 * segments are honest about being an approximation.
 */
const props = withDefaults(
  defineProps<{
    /** Filled segments. */
    value: number
    /** Total segments. */
    max?: number
    label: string
  }>(),
  { max: 5 },
)

/**
 * Drawn as a single element: the fill is a hard-stopped gradient and the gaps
 * between segments are cut out with a repeating mask. One node instead of one
 * per segment, which adds up across every capability row and language.
 */
const fill = computed(() => {
  const ratio = Math.min(1, Math.max(0, props.value / props.max))
  // Trailing zeros trimmed: the value ends up in an inline style, and
  // "80%" is easier to read there than "80.0000%".
  return `${Number((ratio * 100).toFixed(4))}%`
})
</script>

<template>
  <div
    class="meter"
    role="meter"
    :aria-valuenow="value"
    :aria-valuemin="0"
    :aria-valuemax="max"
    :aria-label="label"
    :style="{ '--meter-fill': fill, '--meter-count': max }"
  />
</template>

<style scoped>
/* One element. The fill is a hard two-stop gradient — no blend between the
   filled and empty halves — and a repeating mask punches the gaps between
   segments out of it, so the bar still reads as discrete blocks. */
.meter {
  --seg: 10px;
  --gap: 3px;
  width: calc(var(--meter-count) * (var(--seg) + var(--gap)) - var(--gap));
  height: 14px;
  background-image: linear-gradient(
    to right,
    var(--c-accent) 0 var(--meter-fill),
    var(--c-line) var(--meter-fill) 100%
  );
  -webkit-mask-image: repeating-linear-gradient(
    to right,
    #000 0 var(--seg),
    transparent var(--seg) calc(var(--seg) + var(--gap))
  );
  mask-image: repeating-linear-gradient(
    to right,
    #000 0 var(--seg),
    transparent var(--seg) calc(var(--seg) + var(--gap))
  );
}
</style>
