<script setup lang="ts">
import { flameFrames, rocket } from '~/data/sprites'

/**
 * The ship standing in the light, which launches on its own.
 *
 * It holds on the pad, lights its engines, rumbles, then climbs out of frame —
 * all on page load, with no scrolling required.
 *
 * Driven entirely by CSS animation rather than JavaScript. That is deliberate:
 * no scroll listener to throttle, no animation frame to miss, nothing to
 * initialise. It is decorative and aria-hidden, so if the animation never runs
 * the only consequence is a ship parked on its pad.
 */
withDefaults(
  defineProps<{
    /** Seconds before ignition, so the page settles before anything moves. */
    delay?: number
  }>(),
  { delay: 1.1 },
)
</script>

<template>
  <div class="rocket" :style="{ '--delay': `${delay}s` }" aria-hidden="true">
    <div class="rocket__ascent">
      <div class="rocket__shake">
        <PixelSprite :sprite="rocket" :scale="4" class="rocket__ship" />

        <div class="rocket__flame">
          <PixelSprite
            v-for="(f, i) in flameFrames"
            :key="i"
            :sprite="f"
            :scale="4"
            class="rocket__frame"
            :style="{ animationDelay: `${i * 80}ms` }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.rocket {
  position: absolute;
  /* Sits where the scene's light falls. */
  left: 68%;
  bottom: 26%;
  z-index: 0;
  pointer-events: none;
}

/* --- Ascent ---------------------------------------------------------------
   Held on the pad, then accelerating: each keyframe interval covers more
   ground than the last. steps() applies per interval, so the climb reads as a
   sequence of discrete hops rather than a glide.
   ------------------------------------------------------------------------ */

.rocket__ascent {
  animation: ascent 7s steps(14, end) var(--delay) forwards;
}

@keyframes ascent {
  0%,
  14% {
    transform: translateY(0);
  }
  38% {
    transform: translateY(-90px);
  }
  66% {
    transform: translateY(-420px);
  }
  100% {
    transform: translateY(-1500px);
  }
}

/* Engine rumble in the second before it clears the pad. */
.rocket__shake {
  animation: rumble 110ms steps(2, end) var(--delay) 9;
}

@keyframes rumble {
  0% {
    transform: translateX(-2px);
  }
  50% {
    transform: translateX(2px);
  }
  100% {
    transform: translateX(0);
  }
}

/* --- Exhaust -------------------------------------------------------------- */

.rocket__flame {
  position: relative;
  height: 32px;
  /* Tuck the exhaust up into the engine bell. */
  margin-top: -8px;
  opacity: 0;
  /* Lights just before the hold ends, and stays lit all the way out. */
  animation: ignite 7s steps(1, end) var(--delay) forwards;
}

@keyframes ignite {
  0%,
  4% {
    opacity: 0;
  }
  4.01%,
  100% {
    opacity: 1;
  }
}

.rocket__frame {
  position: absolute;
  inset: 0;
  opacity: 0;
  animation: rocket-flame 240ms steps(1, end) infinite;
}

@keyframes rocket-flame {
  0%,
  33.3% {
    opacity: 1;
  }
  33.4%,
  100% {
    opacity: 0;
  }
}

/* Nothing launches unannounced for someone who asked for less motion. */
@media (prefers-reduced-motion: reduce) {
  .rocket__ascent,
  .rocket__shake,
  .rocket__flame,
  .rocket__frame {
    animation: none;
  }

  .rocket__flame {
    opacity: 0;
  }
}

/* Decorative, and the hero gets crowded once it stacks. */
@media (max-width: 900px) {
  .rocket {
    display: none;
  }
}
</style>
