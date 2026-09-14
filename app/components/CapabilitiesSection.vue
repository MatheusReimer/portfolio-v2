<script setup lang="ts">
import { capabilities, stack } from '~/data/skills'
import { capabilityIcons, chevron, gear } from '~/data/sprites'
</script>

<template>
  <section id="capabilities" class="px-section">
    <div class="px-shell">
      <SectionHeading
        index="03"
        title="What I'm Good At"
        :icon="gear"
        blurb="Five areas I would happily be interviewed on, each with the work that backs it."
      />

      <div class="cap__grid">
        <article
          v-for="(cap, i) in capabilities"
          :key="cap.id"
          v-reveal="i"
          class="cap px-frame px-frame--hover"
        >
          <header class="cap__head">
            <PixelSprite
              v-if="capabilityIcons[cap.id]"
              :sprite="capabilityIcons[cap.id]!"
              :scale="3"
              class="cap__icon"
            />
            <h3 class="cap__name px-display">{{ cap.name }}</h3>
          </header>
          <p class="cap__summary">{{ cap.summary }}</p>
          <p class="cap__desc">{{ cap.description }}</p>

          <ul class="cap__evidence">
            <li v-for="(item, j) in cap.evidence" :key="j">
              <PixelSprite :sprite="chevron" :scale="2" class="cap__bullet" />
              <span>{{ item }}</span>
            </li>
          </ul>

          <ul class="cap__tools">
            <li v-for="tool in cap.tools" :key="tool">
              <span class="px-chip">{{ tool }}</span>
            </li>
          </ul>
        </article>
      </div>

      <div class="stack">
        <h3 class="px-label stack__title">Toolkit</h3>
        <dl class="stack__grid">
          <div v-for="group in stack" :key="group.id" class="stack__group">
            <dt class="px-label stack__label">{{ group.label }}</dt>
            <dd class="stack__items">
              <span v-for="item in group.items" :key="item" class="px-chip">{{ item }}</span>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cap__grid {
  display: grid;
  /* Four cards: a 360px floor keeps this a balanced 2x2 rather than 3+1. */
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  gap: clamp(20px, 3vw, 28px);
}

@media (max-width: 520px) {
  .cap__grid {
    grid-template-columns: 1fr;
  }
}

.cap {
  padding: clamp(20px, 3vw, 28px);
  display: flex;
  flex-direction: column;
  gap: var(--px2);
}

.cap__head {
  display: flex;
  align-items: center;
  gap: var(--px2);
}

.cap__icon {
  color: var(--c-accent);
  flex: none;
}

.cap__name {
  font-size: 20px;
}

.cap__summary {
  font-family: var(--font-label);
  font-size: 11px;
  letter-spacing: 0.06em;
  color: var(--c-accent);
  line-height: 1.7;
}

.cap__desc {
  font-size: 14px;
  color: var(--c-dim);
}

.cap__evidence {
  display: grid;
  gap: var(--px2);
  margin-top: var(--px);
}

.cap__evidence li {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--px2);
  align-items: start;
  font-size: 14px;
  color: var(--c-text);
}

.cap__bullet {
  color: var(--c-line-hi);
  margin-top: 7px;
}

.cap__tools {
  display: flex;
  flex-wrap: wrap;
  gap: var(--px2);
  margin-top: auto;
  padding-top: var(--px2);
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
  display: flex;
  flex-wrap: wrap;
  gap: var(--px2);
}
</style>
