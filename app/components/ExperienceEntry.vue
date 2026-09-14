<script setup lang="ts">
import type { Role } from '~/data/experience'
import { chevron } from '~/data/sprites'

defineProps<{ role: Role; isCurrent: boolean }>()
</script>

<template>
  <article class="entry">
    <div class="entry__rail" aria-hidden="true">
      <span class="entry__node" :class="{ 'entry__node--current': isCurrent }" />
      <span class="entry__line" />
    </div>

    <div class="entry__main">
      <header class="entry__head">
        <div>
          <h3 class="entry__company px-display">{{ role.company }}</h3>
          <p class="entry__role">{{ role.role }}</p>
        </div>
        <div class="entry__meta">
          <p class="px-label entry__period">{{ role.period }}</p>
          <p class="entry__loc">{{ role.location }}</p>
        </div>
      </header>

      <p class="entry__highlight px-prose">{{ role.highlight }}</p>

      <ul class="entry__stack">
        <li v-for="tech in role.stack" :key="tech">
          <span class="px-chip">{{ tech }}</span>
        </li>
      </ul>

      <ul class="entry__list">
        <li v-for="(item, i) in role.achievements" :key="i" class="entry__item">
          <PixelSprite :sprite="chevron" :scale="2" class="entry__bullet" />
          <p class="entry__text">
            {{ item.text }}
            <ExternalLink v-if="item.url" :href="item.url" class="entry__link">
              {{ item.urlLabel ?? 'View' }}
            </ExternalLink>
          </p>
        </li>
      </ul>
    </div>
  </article>
</template>

<style scoped>
.entry {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--px4);
  padding-bottom: clamp(32px, 4vw, 48px);
}

.entry__rail {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 6px;
}

.entry__node {
  width: var(--px3);
  height: var(--px3);
  background: var(--c-line-hi);
  flex: none;
}

.entry__node--current {
  background: var(--c-accent);
}

.entry__line {
  width: var(--px);
  flex: 1;
  margin-top: var(--px2);
  background-image: linear-gradient(
    to bottom,
    var(--c-line) 0 var(--px2),
    transparent var(--px2) var(--px4)
  );
  background-size: var(--px) var(--px4);
}

.entry__head {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: baseline;
  gap: var(--px2);
  margin-bottom: var(--px3);
}

.entry__company {
  font-size: clamp(21px, 2.6vw, 27px);
}

.entry__role {
  font-family: var(--font-label);
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--c-accent);
  margin-top: 2px;
}

.entry__meta {
  text-align: right;
}

.entry__period {
  color: var(--c-bright);
}

.entry__loc {
  font-size: 13px;
  color: var(--c-dim);
}

.entry__highlight {
  color: var(--c-text);
  margin-bottom: var(--px3);
}

.entry__stack {
  display: flex;
  flex-wrap: wrap;
  gap: var(--px2);
  margin-bottom: var(--px4);
}

.entry__list {
  display: grid;
  gap: var(--px3);
}

.entry__item {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--px2);
  align-items: start;
}

.entry__bullet {
  color: var(--c-accent);
  margin-top: 8px;
  flex: none;
}

.entry__text {
  font-size: 15px;
  color: var(--c-dim);
  max-width: var(--measure);
}

.entry__link {
  margin-left: var(--px);
  font-size: 13px;
}

@media (max-width: 640px) {
  .entry__meta {
    text-align: left;
  }
}
</style>
