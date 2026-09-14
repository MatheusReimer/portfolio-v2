<script setup lang="ts">
import type { Sprite } from '~/data/sprites'

withDefaults(
  defineProps<{
    index: string
    title: string
    blurb?: string
    icon?: Sprite
  }>(),
  { blurb: undefined, icon: undefined },
)
</script>

<template>
  <div v-reveal class="head">
    <div class="px-section__head">
      <span class="px-section__index" aria-hidden="true">{{ index }}</span>
      <PixelSprite v-if="icon" :sprite="icon" :scale="3" class="head__icon" />
      <h2 class="px-section__title">{{ title }}</h2>
    </div>
    <hr class="px-rule">
    <p v-if="blurb" class="head__blurb px-prose">{{ blurb }}</p>
  </div>
</template>

<style scoped>
.head {
  margin-bottom: clamp(28px, 4vw, 44px);
}

.head__icon {
  color: var(--c-accent);
  flex: none;
}

.head__blurb {
  margin-top: var(--px3);
  color: var(--c-dim);
}
</style>
