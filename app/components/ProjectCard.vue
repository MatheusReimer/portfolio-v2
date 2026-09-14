<script setup lang="ts">
import type { Project } from '~/data/projects'
import { chevron, diamond } from '~/data/sprites'

defineProps<{ project: Project; index: string }>()
</script>

<template>
  <article class="card px-frame px-frame--raised px-frame--hover">
    <header class="card__head">
      <span class="card__index px-display" aria-hidden="true">{{ index }}</span>
      <div>
        <h3 class="card__title px-display">{{ project.title }}</h3>
        <p class="px-label card__subtitle">{{ project.subtitle }}</p>
      </div>
    </header>

    <p class="card__contribution">
      <span class="px-chip px-chip--accent">{{ project.contribution }}</span>
    </p>

    <div class="card__block">
      <h4 class="px-label card__h4">Context</h4>
      <p class="card__body">{{ project.context }}</p>
    </div>

    <div class="card__block">
      <h4 class="px-label card__h4">Approach</h4>
      <ul class="card__list">
        <li v-for="(step, i) in project.approach" :key="i" class="card__li">
          <PixelSprite :sprite="chevron" :scale="2" class="card__bullet" />
          <span>{{ step }}</span>
        </li>
      </ul>
    </div>

    <div class="card__block">
      <h4 class="px-label card__h4">Outcome</h4>
      <p class="card__body">{{ project.outcome }}</p>
    </div>

    <div class="card__block">
      <h4 class="px-label card__h4">Result</h4>
      <ul class="card__list">
        <li v-for="(metric, i) in project.metrics" :key="i" class="card__li card__li--metric">
          <PixelSprite :sprite="diamond" :scale="2" class="card__bullet card__bullet--ok" />
          <span>{{ metric }}</span>
        </li>
      </ul>
    </div>

    <ul class="card__tech">
      <li v-for="tech in project.tech" :key="tech">
        <TechChip :name="tech" />
      </li>
    </ul>
  </article>
</template>

<style scoped>
.card {
  padding: clamp(20px, 3vw, 32px);
  display: flex;
  flex-direction: column;
  gap: var(--px4);
}

.card__head {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--px3);
  align-items: start;
}

.card__index {
  font-size: 26px;
  color: var(--c-faint);
  line-height: 1;
}

.card__title {
  font-size: clamp(19px, 2.2vw, 23px);
  line-height: 1.25;
}

.card__subtitle {
  color: var(--c-accent);
  margin-top: var(--px);
}

.card__contribution {
  margin-top: calc(-1 * var(--px2));
}

.card__block {
  display: grid;
  gap: var(--px);
}

.card__h4 {
  color: var(--c-faint);
}

.card__body {
  font-size: 15px;
  color: var(--c-dim);
}

.card__list {
  display: grid;
  gap: var(--px2);
}

.card__li {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--px2);
  align-items: start;
  font-size: 14px;
  color: var(--c-dim);
}

.card__li--metric {
  color: var(--c-text);
}

.card__bullet {
  color: var(--c-accent);
  margin-top: 7px;
}

.card__bullet--ok {
  color: var(--c-ok);
}

.card__tech {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(124px, 1fr));
  gap: var(--px2);
  margin-top: auto;
  padding-top: var(--px2);
}
</style>
