<script setup lang="ts">
import { profile } from '~/data/profile'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="ftr">
    <div class="px-shell ftr__inner">
      <p class="px-label">© {{ year }} {{ profile.name }}</p>
      <p class="px-label ftr__built">
        Built with Nuxt · Pixels hand-placed · Deployed on GitHub Pages
      </p>
    </div>
  </footer>
</template>

<style scoped>
.ftr {
  border-top: var(--px) solid var(--c-line);
  background: var(--c-void);
  padding-block: var(--px4);
}

.ftr__inner {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: var(--px2);
}

.ftr__built {
  color: var(--c-line-hi);
}
</style>
