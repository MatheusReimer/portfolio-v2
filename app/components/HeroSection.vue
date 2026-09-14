<script setup lang="ts">
import { profile } from '~/data/profile'
import {
  avatar,
  avatarBlink,
  bars,
  bolt,
  calendar,
  diamond,
  mail,
  pin,
  socialIcons,
  terminal,
} from '~/data/sprites'

// One icon per stat, in the order the stats are declared.
const statIcons = [bars, bolt, diamond, calendar]
</script>

<template>
  <section id="top" class="hero">
    <PixelScene />

    <div class="px-shell hero__content">
      <div class="hero__grid">
        <div class="hero__sprite px-frame px-frame--raised">
          <!-- Two frames stacked; CSS cross-fades them in hard steps so the
               sprite blinks the way a game character idles. -->
          <div class="sprite-stack">
            <PixelSprite
              :sprite="avatar"
              :scale="9"
              :label="`Pixel portrait of ${profile.name}`"
              class="sprite-stack__frame sprite-stack__frame--open"
            />
            <PixelSprite
              :sprite="avatarBlink"
              :scale="9"
              class="sprite-stack__frame sprite-stack__frame--blink"
            />
          </div>
        </div>

        <div class="hero__body">
          <p class="px-label hero__status">
            <span class="hero__dot" aria-hidden="true" />
            {{ profile.availability }}
          </p>

          <h1 class="hero__name px-display">{{ profile.name }}</h1>

          <p class="hero__role">
            <PixelSprite :sprite="terminal" :scale="2" class="hero__role-icon" />
            {{ profile.role }}
            <span class="hero__sep" aria-hidden="true">//</span>
            <PixelSprite :sprite="pin" :scale="2" class="hero__role-icon" />
            <span class="hero__loc">{{ profile.location }}</span>
          </p>

          <p class="hero__tagline px-display">
            {{ profile.tagline }}<span class="px-caret" aria-hidden="true" />
          </p>

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
              <PixelSprite v-if="socialIcons[s.id]" :sprite="socialIcons[s.id]!" :scale="2" />
              {{ s.label }}
            </a>
          </div>
        </div>
      </div>

      <ul class="hero__stats">
        <li v-for="(stat, i) in profile.stats" :key="stat.label" v-reveal="i">
          <PixelWindow
            :title="stat.label"
            :icon="statIcons[i] ?? diamond"
            :emphasis="i === 0"
          >
            <p class="stat__value px-mono-num">{{ stat.value }}</p>
            <p class="stat__note">{{ stat.note }}</p>
          </PixelWindow>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  isolation: isolate;
  padding-block: clamp(64px, 10vw, 128px) clamp(40px, 6vw, 72px);
  /* The scene needs vertical room to read as a space rather than a strip. */
  min-height: clamp(560px, 82vh, 860px);
  display: flex;
  align-items: center;
  border-bottom: var(--px) solid var(--c-line);
}

.hero__content {
  position: relative;
  z-index: 1;
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
  z-index: 1;
}

/* --- Blinking sprite ----------------------------------------------------- */

.sprite-stack {
  position: relative;
}

.sprite-stack__frame--blink {
  position: absolute;
  inset: 0;
}

/* Closed frame shows for a single 140ms beat every 5.2s. steps(1) means the
   swap is instant — a sprite blinks, it does not fade. */
.sprite-stack__frame--blink {
  opacity: 0;
  animation: sprite-blink 5.2s steps(1, end) infinite;
}

@keyframes sprite-blink {
  0%,
  96% {
    opacity: 0;
  }
  96.01%,
  98.5% {
    opacity: 1;
  }
  98.51%,
  100% {
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .sprite-stack__frame--blink {
    display: none;
  }
}

/* --- Copy ---------------------------------------------------------------- */

.hero__status {
  display: flex;
  align-items: center;
  gap: var(--px2);
  color: var(--c-accent);
  margin-bottom: var(--px3);
}

.hero__dot {
  width: var(--px2);
  height: var(--px2);
  background: var(--c-accent);
  flex: none;
  animation: px-pulse 2.4s steps(1, end) infinite;
}

@keyframes px-pulse {
  0%,
  60% {
    opacity: 1;
  }
  60.01%,
  100% {
    opacity: 0.25;
  }
}

.hero__name {
  font-size: clamp(40px, 9vw, 92px);
  letter-spacing: 0.04em;
  margin-bottom: var(--px2);
  /* A hard pixel drop shadow, so the name sits on top of the scene. */
  text-shadow:
    var(--px) var(--px) 0 var(--c-void),
    calc(-1 * var(--px)) var(--px) 0 var(--c-void),
    var(--px) calc(-1 * var(--px)) 0 var(--c-void),
    calc(-1 * var(--px)) calc(-1 * var(--px)) 0 var(--c-void);
}

.hero__role {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--px);
  font-family: var(--font-label);
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--c-accent);
  margin-bottom: var(--px4);
}

.hero__role-icon {
  flex: none;
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

/* --- Stats --------------------------------------------------------------- */

.hero__stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
  gap: var(--px4);
  margin-top: clamp(40px, 6vw, 72px);
  padding-right: var(--px2);
  padding-bottom: var(--px2);
}

.stat__value {
  font-size: clamp(28px, 3.6vw, 38px);
  color: var(--c-accent);
  line-height: 1.05;
}

.stat__note {
  font-size: 13px;
  color: var(--c-dim);
  line-height: 1.5;
  margin-top: var(--px);
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
