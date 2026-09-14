<script setup lang="ts">
import { ref } from 'vue'
import { profile } from '~/data/profile'
import { bars, bolt, calendar, chevron, diamond } from '~/data/sprites'

/**
 * The headline numbers as an RPG inventory.
 *
 * Each stat is an item in a slot: sprite in the middle, the figure as the
 * stack count in the corner, short name underneath. Selecting a slot reads the
 * item out in the panel below.
 *
 * Built on the tabs pattern rather than a listbox, because that is exactly
 * what it is — a row of selectors, one detail panel. Every panel stays in the
 * DOM, so nothing is hidden from search engines or from a reader with
 * scripting off; the numbers themselves are visible in the slots regardless.
 */
const icons = [bars, bolt, diamond, calendar]

const active = ref(0)

const tabs = ref<HTMLButtonElement[]>([])

const focusTab = (index: number) => {
  const next = (index + profile.stats.length) % profile.stats.length
  active.value = next
  tabs.value[next]?.focus()
}
</script>

<template>
  <PixelWindow title="Inventory" :icon="diamond" class="inv">
    <div class="inv__grid" role="tablist" aria-label="Career statistics">
      <button
        v-for="(stat, i) in profile.stats"
        :id="`stat-tab-${i}`"
        :key="stat.label"
        ref="tabs"
        type="button"
        role="tab"
        class="slot"
        :class="{ 'is-active': active === i }"
        :aria-selected="active === i"
        :aria-controls="`stat-panel-${i}`"
        :tabindex="active === i ? 0 : -1"
        @click="active = i"
        @keydown.left.prevent="focusTab(i - 1)"
        @keydown.right.prevent="focusTab(i + 1)"
        @keydown.home.prevent="focusTab(0)"
        @keydown.end.prevent="focusTab(profile.stats.length - 1)"
      >
        <span class="slot__cell">
          <PixelSprite :sprite="icons[i] ?? diamond" :scale="3" class="slot__icon" />
          <span class="slot__count px-mono-num">{{ stat.value }}</span>
        </span>
        <span class="px-label slot__name">{{ stat.short }}</span>
      </button>
    </div>

    <div class="inv__readout">
      <div
        v-for="(stat, i) in profile.stats"
        :id="`stat-panel-${i}`"
        :key="stat.label"
        role="tabpanel"
        :aria-labelledby="`stat-tab-${i}`"
        :hidden="active !== i ? true : undefined"
      >
        <p class="readout__name">
          <PixelSprite :sprite="chevron" :scale="2" class="readout__caret" />
          {{ stat.label }}
        </p>
        <p class="readout__note">{{ stat.value }} — {{ stat.note }}</p>
        <p class="readout__detail">{{ stat.detail }}</p>
      </div>
    </div>
  </PixelWindow>
</template>

<style scoped>
.inv__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--px2);
}

/* --- Slot ---------------------------------------------------------------- */

.slot {
  display: grid;
  gap: var(--px);
  padding: 0;
  background: none;
  border: 0;
  cursor: pointer;
  text-align: center;
  color: inherit;
}

/* The cell is the item well: recessed, with the stack count in the corner. */
.slot__cell {
  position: relative;
  display: grid;
  place-items: center;
  aspect-ratio: 1;
  background: var(--c-panel);
  box-shadow:
    0 calc(-1 * var(--px)) 0 0 var(--c-line),
    0 var(--px) 0 0 var(--c-line),
    calc(-1 * var(--px)) 0 0 0 var(--c-line),
    var(--px) 0 0 0 var(--c-line);
  transition: background var(--step), box-shadow var(--step);
}

.slot:hover .slot__cell {
  background: var(--c-panel-2);
}

.slot.is-active .slot__cell {
  background: var(--c-panel-2);
  box-shadow:
    0 calc(-1 * var(--px)) 0 0 var(--c-accent),
    0 var(--px) 0 0 var(--c-accent),
    calc(-1 * var(--px)) 0 0 0 var(--c-accent),
    var(--px) 0 0 0 var(--c-accent);
}

.slot__icon {
  color: var(--c-line-hi);
  transition: color var(--step);
}

.slot:hover .slot__icon,
.slot.is-active .slot__icon {
  color: var(--c-accent);
}

/* Stack count, bottom-right — where an inventory always puts it. */
.slot__count {
  position: absolute;
  right: var(--px);
  bottom: 0;
  font-size: clamp(13px, 1.5vw, 16px);
  line-height: 1.2;
  color: var(--c-bright);
  text-shadow:
    1px 1px 0 var(--c-void),
    -1px 1px 0 var(--c-void),
    1px -1px 0 var(--c-void),
    -1px -1px 0 var(--c-void);
}

.slot.is-active .slot__count {
  color: var(--c-accent);
}

.slot__name {
  font-size: 9px;
  letter-spacing: 0.08em;
  color: var(--c-faint);
}

.slot.is-active .slot__name {
  color: var(--c-bright);
}

/* --- Readout ------------------------------------------------------------- */

.inv__readout {
  margin-top: var(--px3);
  padding-top: var(--px3);
  border-top: var(--px) solid var(--c-line);
  /* Reserve room for the longest readout so selecting a slot does not jog the
     rest of the hero up and down. */
  min-height: 150px;
}

.readout__name {
  display: flex;
  align-items: center;
  gap: var(--px);
  font-family: var(--font-display);
  font-size: 16px;
  color: var(--c-bright);
}

.readout__caret {
  color: var(--c-accent);
  flex: none;
}

.readout__note {
  font-size: 13px;
  color: var(--c-accent);
  line-height: 1.5;
  margin-top: 2px;
}

.readout__detail {
  font-size: 13px;
  color: var(--c-dim);
  line-height: 1.6;
  margin-top: var(--px2);
}

@media (max-width: 560px) {
  .inv__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
