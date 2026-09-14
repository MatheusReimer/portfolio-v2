<script setup lang="ts">
import { computed } from 'vue'
import { techIcon } from '~/data/techSprites'

/**
 * A tech tag. Shows a 16x16 item sprite when one exists for that technology,
 * and degrades to a plain text chip when it does not — so adding a tech to the
 * content files never requires drawing a sprite first.
 */
const props = defineProps<{ name: string }>()

const icon = computed(() => techIcon(props.name))
</script>

<template>
  <span class="tech" :class="{ 'tech--iconed': icon }">
    <PixelSprite v-if="icon" :sprite="icon" :scale="1" class="tech__icon" />
    {{ name }}
  </span>
</template>

<style scoped>
.tech {
  display: inline-flex;
  align-items: center;
  gap: var(--px);
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
  width: 16px;
  height: 16px;
  /* Sprites are authored at 16x16; render them 1:1 and let the box size it. */
  image-rendering: pixelated;
}
</style>
