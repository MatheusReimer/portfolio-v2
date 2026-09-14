<script setup lang="ts">
// Imported explicitly rather than relying on Nuxt's auto-import, so this
// component can be unit-tested outside the Nuxt runtime.
import { computed } from 'vue'
import { isMonochrome, spriteToMaskUri } from '~/data/sprites'
import type { Sprite } from '~/data/sprites'

interface Props {
  sprite: Sprite
  /** Rendered size of one source pixel, in CSS pixels. Keep it an integer. */
  scale?: number
  /** Provide for meaningful sprites; omit to mark the sprite decorative. */
  label?: string
}

const props = withDefaults(defineProps<Props>(), { scale: 4, label: undefined })

const width = computed(() => props.sprite.rows[0]?.length ?? 0)
const height = computed(() => props.sprite.rows.length)

/**
 * Single-colour icons render as one masked element rather than a pile of
 * rects. There are well over a hundred icon instances on the page; at ~30
 * nodes each that is most of the document. The mask preserves currentColor
 * tinting, which a background image could not.
 */
const mask = computed(() =>
  isMonochrome(props.sprite) ? spriteToMaskUri(props.sprite) : null,
)

interface Run {
  x: number
  y: number
  w: number
  fill: string
}

/**
 * Merge horizontal runs of identical colour into single rects. A flat 1x1-per
 * pixel render is correct but wasteful; this typically cuts node count by 4-6x.
 */
const runs = computed<Run[]>(() => {
  if (mask.value) return []

  const out: Run[] = []

  props.sprite.rows.forEach((row, y) => {
    let start = 0
    let current = ''

    const flush = (end: number) => {
      if (!current) return
      const fill = props.sprite.palette[current]
      if (fill) out.push({ x: start, y, w: end - start, fill })
    }

    for (let x = 0; x < row.length; x++) {
      const ch = row[x] ?? '.'
      if (ch !== current) {
        flush(x)
        current = ch === '.' ? '' : ch
        start = x
      }
    }
    flush(row.length)
  })

  return out
})
</script>

<template>
  <span
    v-if="mask"
    class="sprite-mask"
    :style="{
      width: `${width * scale}px`,
      height: `${height * scale}px`,
      maskImage: `url(&quot;${mask}&quot;)`,
      WebkitMaskImage: `url(&quot;${mask}&quot;)`,
    }"
    :role="label ? 'img' : undefined"
    :aria-label="label"
    :aria-hidden="label ? undefined : 'true'"
  />

  <svg
    v-else
    :width="width * scale"
    :height="height * scale"
    :viewBox="`0 0 ${width} ${height}`"
    shape-rendering="crispEdges"
    :role="label ? 'img' : undefined"
    :aria-label="label"
    :aria-hidden="label ? undefined : 'true'"
    focusable="false"
  >
    <rect
      v-for="(run, i) in runs"
      :key="i"
      :x="run.x"
      :y="run.y"
      :width="run.w"
      height="1"
      :fill="run.fill"
    />
  </svg>
</template>

<style scoped>
.sprite-mask {
  display: block;
  background-color: currentColor;
  mask-size: 100% 100%;
  mask-repeat: no-repeat;
  -webkit-mask-size: 100% 100%;
  -webkit-mask-repeat: no-repeat;
}
</style>
