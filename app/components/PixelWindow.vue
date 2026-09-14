<script setup lang="ts">
import type { Sprite } from '~/data/sprites'

/**
 * A retro OS window: title bar with an icon and control blocks, and an inset
 * well beneath it. The controls are decorative — they are marked aria-hidden
 * and are not buttons, because a control that looks clickable and does nothing
 * is worse than no control at all.
 */
withDefaults(
  defineProps<{
    title: string
    icon?: Sprite
    /** Inverts the title bar to the accent, for the one window that leads. */
    emphasis?: boolean
  }>(),
  { icon: undefined, emphasis: false },
)
</script>

<template>
  <div class="win px-frame px-frame--raised" :class="{ 'win--emphasis': emphasis }">
    <div class="win__bar">
      <PixelSprite v-if="icon" :sprite="icon" :scale="2" class="win__icon" />
      <span class="win__title">{{ title }}</span>
      <span class="win__controls" aria-hidden="true">
        <span class="win__ctrl" />
        <span class="win__ctrl" />
      </span>
    </div>

    <div class="win__well">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.win {
  background: var(--c-panel);
}

.win__bar {
  display: flex;
  align-items: center;
  gap: var(--px2);
  padding: var(--px) var(--px2);
  background: var(--c-line);
  color: var(--c-bright);
}

.win--emphasis .win__bar {
  background: var(--c-accent);
  color: var(--c-void);
}

.win__icon {
  flex: none;
}

.win__title {
  flex: 1;
  min-width: 0;
  font-family: var(--font-label);
  font-size: 9px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  line-height: 1.8;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.win__controls {
  display: flex;
  gap: 3px;
  flex: none;
}

.win__ctrl {
  width: 6px;
  height: 6px;
  background: var(--c-panel);
  opacity: 0.85;
}

.win--emphasis .win__ctrl {
  background: var(--c-void);
  opacity: 0.55;
}

/* The well is recessed: darker than the frame, with a hard inner top edge. */
.win__well {
  padding: var(--px3) var(--px3) var(--px3);
  background: var(--c-void);
  box-shadow: inset 0 var(--px) 0 0 #000;
}
</style>
