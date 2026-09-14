<script setup lang="ts">
import { profile } from '~/data/profile'
import { avatar, mail } from '~/data/sprites'
</script>

<template>
  <section id="top" class="hero">
    <div class="px-shell">
      <div class="hero__grid">
        <div class="hero__sprite px-frame px-frame--raised">
          <PixelSprite :sprite="avatar" :scale="9" :label="`Pixel portrait of ${profile.name}`" />
        </div>

        <div class="hero__body">
          <p class="px-label hero__status">
            <span class="hero__dot" aria-hidden="true" />
            {{ profile.availability }}
          </p>

          <h1 class="hero__name px-display">{{ profile.name }}</h1>

          <p class="hero__role">
            {{ profile.role }}
            <span class="hero__sep" aria-hidden="true">//</span>
            <span class="hero__loc">{{ profile.location }}</span>
          </p>

          <p class="hero__tagline px-display">{{ profile.tagline }}</p>

          <p class="hero__summary px-prose">{{ profile.summary }}</p>

          <div class="hero__actions">
            <a class="px-btn px-btn--primary" :href="`mailto:${profile.email}`">
              <PixelSprite :sprite="mail" :scale="2" />
              Get in touch
            </a>
            <a
              v-for="s in profile.socials"
              :key="s.id"
              class="px-btn"
              :href="s.href"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ s.label }}
            </a>
          </div>
        </div>
      </div>

      <ul class="hero__stats">
        <li v-for="stat in profile.stats" :key="stat.label" class="stat px-frame">
          <p class="stat__value px-mono-num">{{ stat.value }}</p>
          <p class="px-label stat__label">{{ stat.label }}</p>
          <p class="stat__note">{{ stat.note }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding-block: clamp(48px, 8vw, 96px) clamp(40px, 6vw, 72px);
}

.hero__grid {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: clamp(20px, 4vw, 48px);
  align-items: start;
}

.hero__sprite {
  flex: none;
  padding: var(--px3);
  background: var(--c-panel-2);
}

.hero__status {
  display: flex;
  align-items: center;
  gap: var(--px2);
  color: var(--c-ok);
  margin-bottom: var(--px3);
}

.hero__dot {
  width: var(--px2);
  height: var(--px2);
  background: var(--c-ok);
  flex: none;
}

.hero__name {
  font-size: clamp(34px, 7vw, 68px);
  margin-bottom: var(--px2);
}

.hero__role {
  font-family: var(--font-label);
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--c-accent);
  margin-bottom: var(--px4);
}

.hero__sep {
  color: var(--c-line-hi);
  margin-inline: var(--px);
}

.hero__loc {
  color: var(--c-dim);
}

.hero__tagline {
  font-size: clamp(19px, 2.6vw, 27px);
  color: var(--c-bright);
  line-height: 1.35;
  max-width: 30ch;
  margin-bottom: var(--px3);
}

.hero__summary {
  color: var(--c-dim);
  margin-bottom: var(--px4);
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--px3);
}

.hero__stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
  gap: var(--px4);
  margin-top: clamp(40px, 6vw, 72px);
}

.stat {
  padding: var(--px3) var(--px4);
}

.stat__value {
  font-size: clamp(26px, 3.4vw, 34px);
  color: var(--c-accent);
  line-height: 1.1;
}

.stat__label {
  color: var(--c-bright);
  margin-block: var(--px) 2px;
}

.stat__note {
  font-size: 13px;
  color: var(--c-dim);
  line-height: 1.5;
}

@media (max-width: 720px) {
  .hero__grid {
    grid-template-columns: 1fr;
  }
  .hero__sprite {
    justify-self: start;
  }
}
</style>
