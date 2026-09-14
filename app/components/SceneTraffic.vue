<script setup lang="ts">
import { car, flameFrames, plane, rocket } from '~/data/sprites'
import { ROAD_Y, SKYLINE_CEILING } from '~/utils/scene'

/**
 * Everything that moves inside the scene: aircraft crossing the sky, cars
 * along the street, and the ship that launches on load.
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

/** Flight paths. Every y is comfortably clear of the tallest rooftop. */
const flights = [
  { y: 5, scale: 1, duration: 34, delay: 2, direction: 1 },
  { y: 14, scale: 0.75, duration: 52, delay: 14, direction: -1 },
]

/** Street traffic, near lane travelling one way and far lane the other. */
const traffic = [
  { y: ROAD_Y - 4, scale: 0.8, duration: 19, delay: 0, direction: 1 },
  { y: ROAD_Y - 4, scale: 0.8, duration: 23, delay: 9, direction: 1 },
  { y: ROAD_Y + 5, scale: 0.8, duration: 26, delay: 4, direction: -1 },
  { y: ROAD_Y + 5, scale: 0.8, duration: 31, delay: 17, direction: -1 },
]

// Fails loudly in development if a flight path is ever lowered into the skyline.
if (import.meta.dev) {
  for (const f of flights) {
    if (f.y + plane.rows.length > SKYLINE_CEILING) {
      console.error('[SceneTraffic] flight path intersects the skyline', f)
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
    >
      <g :transform="f.direction === -1 ? 'translate(16 0) scale(-1 1)' : undefined">
        <PixelSpriteGroup :sprite="plane" :x="0" :y="f.y" :scale="f.scale" />
      </g>
    </g>

    <!-- Street traffic. -->
    <g
      v-for="(c, i) in traffic"
      :key="`c${i}`"
      class="traffic__path"
      :class="c.direction === 1 ? 'traffic__path--east' : 'traffic__path--west'"
      :style="{ animationDuration: `${c.duration}s`, animationDelay: `${c.delay}s` }"
    >
      <g :transform="c.direction === -1 ? 'translate(8 0) scale(-1 1)' : undefined">
        <PixelSpriteGroup :sprite="car" :x="0" :y="c.y" :scale="c.scale" />
      </g>
    </g>

    <!-- The ship, on its pad in the clear lane at x=178. -->
    <g class="launch">
      <g class="launch__shake">
        <PixelSpriteGroup :sprite="rocket" :x="170" :y="32" :scale="0.85" />
        <g class="launch__flame">
          <PixelSpriteGroup
            v-for="(f, i) in flameFrames"
            :key="`f${i}`"
            :sprite="f"
            :x="170"
            :y="51"
            :scale="0.85"
            class="launch__frame"
            :style="{ animationDelay: `${i * 80}ms` }"
          />
        </g>
      </g>
    </g>
  </g>
</template>

<style scoped>
/* Paths run right across the frame and off both edges. Linear, because an
   aircraft at cruise does not ease. */
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
    transform: translateX(-30px);
  }
  to {
    transform: translateX(290px);
  }
}

@keyframes cross-west {
  from {
    transform: translateX(290px);
  }
  to {
    transform: translateX(-30px);
  }
}

/* --- Launch ---------------------------------------------------------------
   Holds on the pad, rumbles, then climbs out of frame. Distances are in scene
   units, so the ship leaves the top of the scene at every viewport size.
   ------------------------------------------------------------------------ */

.launch {
  animation: launch 7s steps(12, end) 1.1s forwards;
}

@keyframes launch {
  0%,
  14% {
    transform: translateY(0);
  }
  38% {
    transform: translateY(-14px);
  }
  66% {
    transform: translateY(-58px);
  }
  100% {
    transform: translateY(-190px);
  }
}

.launch__shake {
  animation: launch-rumble 110ms steps(2, end) 1.1s 9;
}

@keyframes launch-rumble {
  0% {
    transform: translateX(-0.6px);
  }
  50% {
    transform: translateX(0.6px);
  }
  100% {
    transform: translateX(0);
  }
}

.launch__flame {
  opacity: 0;
  animation: launch-ignite 7s steps(1, end) 1.1s forwards;
}

@keyframes launch-ignite {
  0%,
  4% {
    opacity: 0;
  }
  4.01%,
  100% {
    opacity: 1;
  }
}

.launch__frame {
  opacity: 0;
  animation: launch-flame 240ms steps(1, end) infinite;
}

@keyframes launch-flame {
  0%,
  33.3% {
    opacity: 1;
  }
  33.4%,
  100% {
    opacity: 0;
  }
}

/* Nothing moves for someone who asked for less motion. */
@media (prefers-reduced-motion: reduce) {
  .traffic__path,
  .launch,
  .launch__shake,
  .launch__flame,
  .launch__frame {
    animation: none;
  }

  .launch__flame {
    opacity: 0;
  }
}
</style>
