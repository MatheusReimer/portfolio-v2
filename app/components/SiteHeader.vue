<script setup lang="ts">
import { terminal } from '~/data/sprites'

const sections = [
  { id: 'experience', index: '01', label: 'Experience' },
  { id: 'work', index: '02', label: 'Work' },
  { id: 'capabilities', index: '03', label: 'Skills' },
  { id: 'about', index: '04', label: 'About' },
  { id: 'contact', index: '05', label: 'Contact' },
]
</script>

<template>
  <header class="hdr">
    <div class="hdr__inner px-shell">
      <a href="#top" class="hdr__mark">
        <span class="hdr__mark-box">
          <PixelSprite :sprite="terminal" :scale="2" />
        </span>
        <span class="hdr__mark-name">Matheus Reimer</span>
      </a>

      <nav aria-label="Sections">
        <ul class="hdr__nav">
          <li v-for="s in sections" :key="s.id">
            <a :href="`#${s.id}`" class="hdr__link">
              <span class="hdr__link-index">{{ s.index }}</span>
              {{ s.label }}
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.hdr {
  position: sticky;
  top: 0;
  z-index: 50;
  background: color-mix(in srgb, var(--c-void) 92%, transparent);
  border-bottom: var(--px) solid var(--c-line);
}

.hdr__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--px4);
  min-height: 56px;
  padding-block: var(--px2);
}

.hdr__mark {
  display: inline-flex;
  align-items: center;
  gap: var(--px2);
  text-decoration: none;
  flex: none;
}

.hdr__mark-box {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  background: var(--c-accent);
  color: var(--c-void);
  box-shadow:
    0 calc(-1 * var(--px)) 0 0 var(--c-accent),
    0 var(--px) 0 0 var(--c-accent),
    calc(-1 * var(--px)) 0 0 0 var(--c-accent),
    var(--px) 0 0 0 var(--c-accent);
}

.hdr__mark-name {
  font-family: var(--font-display);
  font-size: 15px;
  color: var(--c-bright);
}

.hdr__nav {
  display: flex;
  flex-wrap: wrap;
  gap: var(--px3);
}

.hdr__link {
  display: inline-flex;
  align-items: baseline;
  gap: var(--px);
  font-family: var(--font-label);
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--c-dim);
  text-decoration: none;
  padding: var(--px);
  transition: color var(--step);
}

.hdr__link:hover {
  color: var(--c-bright);
}

.hdr__link-index {
  color: var(--c-accent);
  font-size: 9px;
}

/* On narrow screens the wordmark alone carries identity; the numbered nav
   collapses to just the labels so it still fits on one line. */
@media (max-width: 860px) {
  .hdr__mark-name {
    display: none;
  }
  .hdr__link-index {
    display: none;
  }
}

@media (max-width: 560px) {
  .hdr__inner {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--px2);
  }
}
</style>
