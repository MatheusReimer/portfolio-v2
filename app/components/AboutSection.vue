<script setup lang="ts">
import { profile } from '~/data/profile'
</script>

<template>
  <section id="about" class="px-section about">
    <div class="px-shell">
      <SectionHeading index="04" title="About" />

      <div class="about__grid">
        <div class="about__story">
          <p v-for="(para, i) in profile.about" :key="i" class="about__para px-prose">
            {{ para }}
          </p>
        </div>

        <aside class="about__side">
          <div class="about__panel px-frame">
            <h3 class="px-label about__panel-title">How I work</h3>
            <div v-for="p in profile.principles" :key="p.title" class="principle">
              <h4 class="principle__title px-display">{{ p.title }}</h4>
              <p class="principle__body">{{ p.body }}</p>
            </div>
          </div>

          <div class="about__panel px-frame">
            <h3 class="px-label about__panel-title">Languages</h3>
            <dl class="langs">
              <div v-for="lang in profile.languages" :key="lang.name" class="langs__row">
                <dt class="langs__name">{{ lang.name }}</dt>
                <dd class="langs__level px-label">{{ lang.level }}</dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  background: var(--c-void);
  border-block: var(--px) solid var(--c-line);
}

.about__grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: clamp(24px, 4vw, 48px);
  align-items: start;
}

.about__para {
  color: var(--c-text);
  margin-bottom: var(--px4);
}

.about__side {
  display: grid;
  gap: var(--px4);
}

.about__panel {
  padding: clamp(18px, 2.5vw, 26px);
}

.about__panel-title {
  color: var(--c-accent);
  margin-bottom: var(--px3);
}

.principle + .principle {
  margin-top: var(--px4);
}

.principle__title {
  font-size: 16px;
  margin-bottom: var(--px);
}

.principle__body {
  font-size: 14px;
  color: var(--c-dim);
}

.langs__row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: var(--px2);
  padding-block: var(--px);
}

.langs__row + .langs__row {
  border-top: 2px solid var(--c-line);
}

.langs__name {
  font-size: 15px;
  color: var(--c-text);
}

.langs__level {
  color: var(--c-dim);
}

@media (max-width: 800px) {
  .about__grid {
    grid-template-columns: 1fr;
  }
}
</style>
