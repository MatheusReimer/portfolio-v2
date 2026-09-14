<script setup lang="ts">
import { computed, ref } from 'vue'
import { CAPABILITY_MAX_YEARS, capabilities, yearsApplied } from '~/data/skills'
import { capabilityIcons, chevron } from '~/data/sprites'

/**
 * An RPG status screen: one row per capability, each with its icon, a
 * segmented stat bar, and its evidence expanding in place.
 *
 * The bar measures years applied in production rather than a self-assessed
 * score — see the note on Capability.since. The number sits next to the bar so
 * it reads as data, not as a rating.
 */
const rows = computed(() =>
  capabilities.map(cap => ({
    cap,
    years: yearsApplied(cap),
    icon: capabilityIcons[cap.id],
  })),
)

// Single-open accordion: the section stays compact and one thing reads at a time.
const open = ref<string>(capabilities[0]?.id ?? '')

const toggle = (id: string) => {
  open.value = open.value === id ? '' : id
}
</script>

<template>
  <div class="sheet px-frame px-frame--raised">
    <div class="sheet__bar">
      <span class="px-label sheet__bar-label">Status</span>
      <span class="px-label sheet__bar-legend">Years applied in production</span>
    </div>

    <div
      v-for="({ cap, years, icon }, i) in rows"
      :key="cap.id"
      class="row"
      :class="{ 'is-open': open === cap.id }"
    >
      <h3 class="row__heading">
        <button
          :id="`cap-tab-${cap.id}`"
          type="button"
          class="row__head"
          :aria-expanded="open === cap.id"
          :aria-controls="`cap-panel-${cap.id}`"
          @click="toggle(cap.id)"
        >
          <PixelSprite v-if="icon" :sprite="icon" :scale="3" class="row__icon" />

          <span class="row__name">{{ cap.name }}</span>

          <span class="row__stat">
            <PixelMeter
              :value="years"
              :max="CAPABILITY_MAX_YEARS"
              :label="`${cap.name}: ${years} years applied`"
            />
            <span class="row__years px-mono-num">{{ years }}<abbr title="years">y</abbr></span>
          </span>

          <PixelSprite :sprite="chevron" :scale="2" class="row__caret" />
        </button>
      </h3>

      <div
        :id="`cap-panel-${cap.id}`"
        class="row__panel"
        role="region"
        :aria-labelledby="`cap-tab-${cap.id}`"
        :hidden="open !== cap.id ? true : undefined"
      >
        <div class="row__panel-inner">
          <p class="row__summary">{{ cap.summary }}</p>
          <p class="row__desc">{{ cap.description }}</p>

          <ul class="row__evidence">
            <li v-for="(item, j) in cap.evidence" :key="j">
              <PixelSprite :sprite="chevron" :scale="2" class="row__bullet" />
              <span>{{ item }}</span>
            </li>
          </ul>

          <ul class="row__tools">
            <li v-for="tool in cap.tools" :key="tool">
              <TechChip :name="tool" />
            </li>
          </ul>
        </div>
      </div>

      <hr v-if="i < rows.length - 1" class="px-rule row__rule">
    </div>
  </div>
</template>

<style scoped>
.sheet {
  padding: clamp(16px, 2.5vw, 24px);
}

.sheet__bar {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--px2);
  padding-bottom: var(--px3);
  margin-bottom: var(--px2);
  border-bottom: var(--px) solid var(--c-line);
}

.sheet__bar-label {
  color: var(--c-accent);
}

.sheet__bar-legend {
  color: var(--c-faint);
}

/* --- Row head ------------------------------------------------------------ */

.row__heading {
  margin: 0;
  font-size: inherit;
  font-weight: inherit;
}

.row__head {
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  align-items: center;
  gap: var(--px3);
  width: 100%;
  padding: var(--px3) var(--px2);
  background: none;
  border: 0;
  cursor: pointer;
  text-align: left;
  color: inherit;
  transition: background var(--step);
}

.row__head:hover {
  background: var(--c-panel-2);
}

.row__icon {
  color: var(--c-line-hi);
  flex: none;
  transition: color var(--step);
}

.row.is-open .row__icon,
.row__head:hover .row__icon {
  color: var(--c-accent);
}

.row__name {
  font-family: var(--font-display);
  font-size: clamp(16px, 2vw, 20px);
  color: var(--c-text);
  line-height: 1.2;
}

.row.is-open .row__name {
  color: var(--c-bright);
}

.row__stat {
  display: flex;
  align-items: center;
  gap: var(--px2);
}

.row__years {
  font-size: 14px;
  color: var(--c-dim);
  min-width: 3ch;
}

.row__years abbr {
  text-decoration: none;
  font-size: 11px;
}

.row__caret {
  color: var(--c-line-hi);
  transform: rotate(90deg);
  transition: transform var(--step), color var(--step);
}

.row.is-open .row__caret {
  transform: rotate(-90deg);
  color: var(--c-accent);
}

/* --- Expanding panel -----------------------------------------------------
   Collapse is handled by the `hidden` attribute alone: it is instant, it is
   correct for assistive tech, and it cannot strand content.

   The open animation is a keyframe with no fill mode, so the element's resting
   state is simply visible. If the animation never runs — a throttled renderer,
   a backgrounded tab, an old browser — the panel is still there. An earlier
   version transitioned grid-template-rows, which meant a transition that never
   advanced left the panel at zero height with its content invisible.
   ------------------------------------------------------------------------ */

.row.is-open .row__panel-inner {
  animation: panel-in 200ms steps(4, end);
}

@keyframes panel-in {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .row.is-open .row__panel-inner {
    animation: none;
  }
}

.row__summary {
  font-family: var(--font-label);
  font-size: 11px;
  letter-spacing: 0.06em;
  color: var(--c-accent);
  line-height: 1.7;
  padding-left: var(--px2);
}

.row__desc {
  font-size: 14px;
  color: var(--c-dim);
  max-width: var(--measure);
  padding: var(--px2) var(--px2) 0;
  padding-left: var(--px2);
}

.row__evidence {
  display: grid;
  gap: var(--px2);
  padding: var(--px3) var(--px2) 0;
}

.row__evidence li {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--px2);
  align-items: start;
  font-size: 14px;
  color: var(--c-text);
}

.row__bullet {
  color: var(--c-accent);
  margin-top: 7px;
}

.row__tools {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(128px, 1fr));
  gap: var(--px4);
  padding: var(--px3) var(--px2) var(--px2);
}

.row__rule {
  margin-top: var(--px2);
}

/* The bar is the least important thing in the row on a phone. */
@media (max-width: 620px) {
  .row__head {
    grid-template-columns: auto 1fr auto;
    row-gap: var(--px2);
  }
  .row__stat {
    grid-column: 2 / -1;
  }
}
</style>
