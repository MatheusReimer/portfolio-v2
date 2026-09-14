<script setup lang="ts">
import { car, plane, van } from '~/data/sprites'
import { ROAD_Y, SKYLINE_CEILING } from '~/utils/scene'

/**
 * Everything that moves inside the scene: aircraft crossing the sky and
 * traffic along the street.
 *
 * All of it lives in the scene's own SVG coordinate space rather than as DOM
 * elements layered on top. That is what makes it part of the world — a sprite
 * at scene coordinate (40, 14) is at that exact spot relative to the skyline
 * at every viewport size, and the scene's atmospheric scrim falls over it too,
 * so it is lit like the buildings instead of sitting in front of them.
 *
 * Aircraft altitudes are all above SKYLINE_CEILING, which no building reaches.
 * Planes cross open sky and never pass in front of, or into, a building.
 */

interface Flight {
  y: number
  scale: number
  duration: number
  delay: number
  direction: 1 | -1
  /** Dimmer and smaller reads as further away. */
  opacity: number
}

const flights: Flight[] = [
  { y: 4, scale: 1, duration: 38, delay: 3, direction: 1, opacity: 1 },
  { y: 12, scale: 0.75, duration: 58, delay: 17, direction: -1, opacity: 0.72 },
  { y: 17, scale: 0.55, duration: 86, delay: 41, direction: 1, opacity: 0.45 },
]

interface Vehicle {
  sprite: typeof car
  y: number
  scale: number
  duration: number
  delay: number
  direction: 1 | -1
}

/** Near lane runs east, far lane west. Mixed vehicles so the lane has rhythm. */
const traffic: Vehicle[] = [
  { sprite: car, y: ROAD_Y - 3, scale: 0.85, duration: 15, delay: 0, direction: 1 },
  { sprite: van, y: ROAD_Y - 4, scale: 0.85, duration: 21, delay: 6, direction: 1 },
  { sprite: car, y: ROAD_Y - 3, scale: 0.85, duration: 13, delay: 13, direction: 1 },
  { sprite: car, y: ROAD_Y + 6, scale: 0.8, duration: 18, delay: 3, direction: -1 },
  { sprite: van, y: ROAD_Y + 5, scale: 0.8, duration: 25, delay: 11, direction: -1 },
  { sprite: car, y: ROAD_Y + 6, scale: 0.8, duration: 16, delay: 20, direction: -1 },
]

/** Fails loudly in development if a flight path is lowered into the skyline. */
if (import.meta.dev) {
  for (const f of flights) {
    const belly = f.y + plane.rows.length * f.scale
    if (belly > SKYLINE_CEILING) {
      console.error('[SceneTraffic] flight path intersects the skyline', f, belly)
    }
  }
}
</script>

<template>
  <g class="traffic">
    <!-- Aircraft, above everything built. -->
    <g
      v-for="(f, i) in flights"
      :key="`p${i}`"
      class="traffic__path"
      :class="f.direction === 1 ? 'traffic__path--east' : 'traffic__path--west'"
      :style="{ animationDuration: `${f.duration}s`, animationDelay: `${f.delay}s` }"
      :opacity="f.opacity"
    >
      <g :transform="f.direction === -1 ? 'translate(16 0) scale(-1 1)' : undefined">
        <!-- Contrail: three fading marks streaming off the tail. -->
        <rect :x="-4" :y="f.y + 3 * f.scale" width="3" height="1" fill="#8a92c8" opacity="0.28" />
        <rect :x="-9" :y="f.y + 3 * f.scale" width="4" height="1" fill="#8a92c8" opacity="0.16" />
        <rect :x="-16" :y="f.y + 3 * f.scale" width="5" height="1" fill="#8a92c8" opacity="0.08" />

        <PixelSpriteGroup :sprite="plane" :x="0" :y="f.y" :scale="f.scale" />

        <!-- Nav light at the nose, blinking on its own beat. -->
        <rect
          class="traffic__nav"
          :x="14 * f.scale"
          :y="f.y + 3 * f.scale"
          width="1"
          height="1"
          fill="#ff7d6e"
          :style="{ animationDelay: `${i * 370}ms` }"
        />
      </g>
    </g>

    <!-- Street traffic. -->
    <g
      v-for="(v, i) in traffic"
      :key="`c${i}`"
      class="traffic__path"
      :class="v.direction === 1 ? 'traffic__path--east' : 'traffic__path--west'"
      :style="{ animationDuration: `${v.duration}s`, animationDelay: `${v.delay}s` }"
    >
      <g :transform="v.direction === -1 ? 'translate(10 0) scale(-1 1)' : undefined">
        <PixelSpriteGroup :sprite="v.sprite" :x="0" :y="v.y" :scale="v.scale" />
        <!-- Headlight spill on the asphalt ahead of the car. -->
        <rect
          :x="10 * v.scale"
          :y="v.y + (v.sprite.rows.length - 2) * v.scale"
          width="4"
          height="1"
          fill="#fff3c4"
          opacity="0.14"
        />
      </g>
    </g>
  </g>
</template>

<style scoped>
/* Paths run right across the frame and off both edges. Linear, because neither
   an aircraft at cruise nor a car at speed eases. */
.traffic__path {
  animation-name: cross-east;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

.traffic__path--west {
  animation-name: cross-west;
}

@keyframes cross-east {
  from {
    transform: translateX(-32px);
  }
  to {
    transform: translateX(292px);
  }
}

@keyframes cross-west {
  from {
    transform: translateX(292px);
  }
  to {
    transform: translateX(-32px);
  }
}

/* Aircraft nav light: on for a beat, off for three. */
.traffic__nav {
  animation: nav-blink 1.8s steps(1, end) infinite;
}

@keyframes nav-blink {
  0%,
  16% {
    opacity: 1;
  }
  16.01%,
  100% {
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .traffic__path,
  .traffic__nav {
    animation: none;
  }
}
</style>
