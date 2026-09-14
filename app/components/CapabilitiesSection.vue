<script setup lang="ts">
import { stack } from '~/data/skills'
import { gear } from '~/data/sprites'
</script>

<template>
  <section id="capabilities" class="px-section">
    <div class="px-shell">
      <SectionHeading
        index="03"
        title="What I'm Good At"
        :icon="gear"
        blurb="Five areas I would happily be interviewed on. Open one for the work that backs it."
      />

      <div v-reveal class="cap__sheet">
        <CapabilitySheet />
      </div>

      <div class="stack">
        <h3 class="px-label stack__title">Toolkit</h3>
        <dl class="stack__grid">
          <div v-for="group in stack" :key="group.id" class="stack__group">
            <dt class="px-label stack__label">{{ group.label }}</dt>
            <dd class="stack__items">
              <TechChip v-for="item in group.items" :key="item" :name="item" />
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* The raised frame casts 8px of shadow; leave room for it. */
.cap__sheet {
  padding-right: var(--px2);
  padding-bottom: var(--px2);
}

.stack {
  margin-top: clamp(36px, 5vw, 56px);
}

.stack__title {
  color: var(--c-bright);
  margin-bottom: var(--px3);
}

.stack__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: var(--px4);
}

.stack__label {
  color: var(--c-accent);
  margin-bottom: var(--px2);
}

.stack__items {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(128px, 1fr));
  gap: var(--px4);
}
</style>
