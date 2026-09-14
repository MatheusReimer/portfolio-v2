<script setup lang="ts">
import { arrow } from '~/data/sprites'

/**
 * Every outbound link goes through here so noopener/noreferrer can never be
 * forgotten on one of them — reverse tabnabbing is trivial to introduce and
 * easy to miss in review.
 */
withDefaults(
  defineProps<{
    href: string
    showArrow?: boolean
  }>(),
  { showArrow: true },
)
</script>

<template>
  <a :href="href" target="_blank" rel="noopener noreferrer" class="ext">
    <span><slot /></span>
    <PixelSprite v-if="showArrow" :sprite="arrow" :scale="2" class="ext__arrow" />
  </a>
</template>

<style scoped>
.ext {
  display: inline-flex;
  align-items: center;
  gap: var(--px);
  color: var(--c-accent);
  text-decoration: none;
  border-bottom: 2px solid transparent;
  transition: border-color var(--step), color var(--step);
}

.ext:hover {
  border-bottom-color: var(--c-accent);
}

.ext__arrow {
  flex: none;
  transition: transform var(--step);
}

.ext:hover .ext__arrow {
  transform: translate(2px, -2px);
}
</style>
