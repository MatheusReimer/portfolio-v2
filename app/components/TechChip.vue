<script setup lang="ts">
import { computed } from 'vue'
import { spriteToDataUri } from '~/data/sprites'
import { techIcon } from '~/data/techSprites'

/**
 * A tech tag. Shows a 16x16 item sprite when one exists for that technology,
 * and degrades to a plain text chip when it does not — so adding a tech to the
 * content files never requires drawing a sprite first.
 */
const props = defineProps<{ name: string }>()

const icon = computed(() => techIcon(props.name))

/* Rendered as a background image rather than inline rects: a 16x16 icon is
   ~30 nodes, and these chips repeat dozens of times across the page. */
const iconUri = computed(() => (icon.value ? spriteToDataUri(icon.value) : null))
</script>

<template>
  <span class="tech">
    <!-- The icon cell is always present, even when empty, so the labels in a
         column line up whether or not a sprite exists for that technology. -->
    <span
      class="tech__icon"
      :style="iconUri ? { backgroundImage: `url(&quot;${iconUri}&quot;)` } : undefined"
    />
    <span class="tech__name">{{ name }}</span>
  </span>
</template>

<style scoped>
.tech {
  display: flex;
  align-items: center;
  gap: var(--px2);
  /* Fixed height and a fixed icon column: chips are a grid cell, not a blob
     that changes size depending on whether it happens to have a sprite. */
  min-height: 28px;
  padding: var(--px) var(--px2);
  background: var(--c-panel-2);
  color: var(--c-dim);
  font-family: var(--font-label);
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  box-shadow:
    0 calc(-1 * var(--px)) 0 0 var(--c-panel-2),
    0 var(--px) 0 0 var(--c-panel-2),
    calc(-1 * var(--px)) 0 0 0 var(--c-panel-2),
    var(--px) 0 0 0 var(--c-panel-2);
  transition: color var(--step), background var(--step);
}

.tech:hover {
  color: var(--c-bright);
  background: var(--c-line);
}

.tech__icon {
  flex: none;
  display: block;
  width: 16px;
  height: 16px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  image-rendering: pixelated;
}

.tech__name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
