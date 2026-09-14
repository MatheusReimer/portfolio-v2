<script setup lang="ts">
defineProps<{
  index: string
  title: string
  blurb?: string
}>()
</script>

<template>
  <div class="head">
    <div class="px-section__head">
      <span class="px-section__index" aria-hidden="true">{{ index }}</span>
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

.head__blurb {
  margin-top: var(--px3);
  color: var(--c-dim);
}
</style>
