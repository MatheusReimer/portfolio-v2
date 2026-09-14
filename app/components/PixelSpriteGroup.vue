<script setup lang="ts">
import { computed } from 'vue'
import { spriteRuns } from '~/data/sprites'
import type { Sprite } from '~/data/sprites'

/**
 * A sprite placed inside an existing SVG, in that SVG's coordinate space.
 *
 * This is how anything animated joins the scene rather than floating over it:
 * sharing the scene's viewBox means a sprite sits at an exact scene coordinate
 * at every viewport size, so it can be positioned relative to the skyline and
 * stay there. A DOM element layered on top could only ever approximate that.
 */
const props = withDefaults(
  defineProps<{
    sprite: Sprite
    x: number
    y: number
    scale?: number
  }>(),
  { scale: 1 },
)

const runs = computed(() => spriteRuns(props.sprite))
</script>

<template>
  <g :transform="`translate(${x} ${y}) scale(${scale})`">
    <rect
      v-for="(run, i) in runs"
      :key="i"
      :x="run.x"
      :y="run.y"
      :width="run.w"
      height="1"
      :fill="run.fill"
    />
  </g>
</template>
