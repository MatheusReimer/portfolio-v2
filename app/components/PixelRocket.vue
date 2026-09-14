<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { flameFrames, rocket } from '~/data/sprites'
import { isThrusting, rocketOffset } from '~/utils/flight'

/**
 * A booster that flies on scroll.
 *
 * Scrolling down launches it: the ship climbs and the engine lights. Scrolling
 * back up flies it home tail-first, engine still burning — a retro-propulsive
 * landing, which is why the flame points down in both directions.
 *
 * Purely decorative and aria-hidden. If scripting never runs it simply sits on
 * its pad, so nothing here can strand or hide anything.
 */
const props = withDefaults(
  defineProps<{
    /** How far the ship travels over the scroll range, in CSS pixels. */
    distance?: number
  }>(),
  { distance: 620 },
)

const y = ref(0)
const burning = ref(false)
const enabled = ref(false)

let frame = 0
let lastScroll = 0
let settle: ReturnType<typeof setTimeout> | null = null

const update = () => {
  frame = 0
  const scrolled = window.scrollY
  y.value = rocketOffset(scrolled, window.innerHeight, props.distance)

  // The engine lights whenever the ship is actually moving, in either
  // direction, and cuts out shortly after the scroll stops.
  if (isThrusting(scrolled, lastScroll)) {
    burning.value = true
    if (settle) clearTimeout(settle)
    settle = setTimeout(() => {
      burning.value = false
    }, 220)
  }
  lastScroll = scrolled
}

const onScroll = () => {
  if (frame) return
  frame = requestAnimationFrame(update)
}

onMounted(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
  enabled.value = true
  lastScroll = window.scrollY
  update()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  if (frame) cancelAnimationFrame(frame)
  if (settle) clearTimeout(settle)
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <div
    class="rocket"
    :class="{ 'is-burning': burning, 'is-live': enabled }"
    :style="{ transform: `translateY(${y}px)` }"
    aria-hidden="true"
  >
    <div class="rocket__bob">
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
</template>

<style scoped>
.rocket {
  position: absolute;
  left: 56%;
  bottom: 14%;
  z-index: 0;
  pointer-events: none;
  /* Smooths the gap between scroll frames without un-stepping the motion. */
  transition: transform 90ms steps(3, end);
}

/* Idle hover: the ship bobs a whole pixel, the way a sprite waits. */
.rocket__bob {
  animation: rocket-bob 2.6s steps(1, end) infinite;
}

@keyframes rocket-bob {
  0%,
  49% {
    transform: translateY(0);
  }
  50%,
  100% {
    transform: translateY(4px);
  }
}

.rocket__flame {
  position: relative;
  height: 32px;
  /* Tuck the exhaust up into the engine bell. */
  margin-top: -8px;
}

.rocket__frame {
  position: absolute;
  inset: 0;
  opacity: 0;
}

/* Frames cycle in hard steps only while the engine is lit. */
.rocket.is-burning .rocket__frame {
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

@media (prefers-reduced-motion: reduce) {
  .rocket__bob {
    animation: none;
  }
  .rocket__flame {
    display: none;
  }
}

/* Decorative, and the hero gets crowded once it stacks. */
@media (max-width: 900px) {
  .rocket {
    display: none;
  }
}
</style>
