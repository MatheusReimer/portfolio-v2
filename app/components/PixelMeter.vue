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

const segments = computed(() =>
  Array.from({ length: props.max }, (_, i) => i < props.value),
)
</script>

<template>
  <div
    class="meter"
    role="meter"
    :aria-valuenow="value"
    :aria-valuemin="0"
    :aria-valuemax="max"
    :aria-label="label"
  >
    <span
      v-for="(on, i) in segments"
      :key="i"
      class="meter__seg"
      :class="{ 'is-on': on }"
    />
  </div>
</template>

<style scoped>
.meter {
  display: flex;
  gap: 3px;
}

.meter__seg {
  width: 10px;
  height: 14px;
  background: var(--c-line);
}

.meter__seg.is-on {
  background: var(--c-accent);
}
</style>
