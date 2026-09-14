<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import {
  buildQuietScene,
  buildScene,
  layerToDataUri,
  staticLayers,
  twinklingStars,
} from '~/utils/scene'

/**
 * The illustrated pixel background: a server hall receding to a lit core.
 *
 * The three parallax layers are flattened into SVG data-URI backgrounds rather
 * than rendered as live rects. They never change and nothing interacts with
 * them, so hundreds of DOM nodes would buy nothing — and a page that argues its
 * author cares about performance should not ship an excessive DOM.
 *
 * Only the twinkling stars stay as real nodes, because CSS has to animate them.
 * Parallax offsets are quantised to whole scene pixels so the drift steps
 * rather than glides.
 */
const props = withDefaults(
  defineProps<{
    variant?: 'full' | 'quiet'
    /** Dims the whole illustration so text stays readable over it. */
    intensity?: number
  }>(),
  { variant: 'full', intensity: 1 },
)

const scene = computed(() =>
  props.variant === 'quiet' ? buildQuietScene() : buildScene(),
)

const layers = computed(() => {
  const s = staticLayers(scene.value)
  return {
    far: layerToDataUri(s.far),
    mid: layerToDataUri(s.mid),
    near: layerToDataUri(s.near),
  }
})

const stars = computed(() => twinklingStars(scene.value))

const root = ref<HTMLElement | null>(null)
const shift = ref(0)

let frame = 0
let observer: IntersectionObserver | null = null
let listening = false

const onScroll = () => {
  if (frame) return
  frame = requestAnimationFrame(() => {
    frame = 0
    const el = root.value
    if (!el) return
    const rect = el.getBoundingClientRect()
    // -1 above the viewport, +1 below it.
    const progress
      = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight
    // Quantise: parallax should step, not slide.
    shift.value = Math.round(progress * 10)
  })
}

onMounted(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
  if (typeof IntersectionObserver === 'undefined') return

  observer = new IntersectionObserver((entries) => {
    const visible = entries.some(e => e.isIntersecting)
    if (visible && !listening) {
      window.addEventListener('scroll', onScroll, { passive: true })
      listening = true
      onScroll()
    }
    else if (!visible && listening) {
      window.removeEventListener('scroll', onScroll)
      listening = false
    }
  })

  if (root.value) observer.observe(root.value)
})

onBeforeUnmount(() => {
  if (frame) cancelAnimationFrame(frame)
  if (listening) window.removeEventListener('scroll', onScroll)
  observer?.disconnect()
})
</script>

<template>
  <div ref="root" class="scene" :style="{ '--intensity': intensity }" aria-hidden="true">
    <div
      class="scene__layer"
      :style="{ backgroundImage: `url(&quot;${layers.far}&quot;)`, transform: `translateY(${shift * 0.25}px)` }"
    />
    <div
      class="scene__layer"
      :style="{ backgroundImage: `url(&quot;${layers.mid}&quot;)`, transform: `translateY(${shift * 0.6}px)` }"
    />
    <div
      class="scene__layer"
      :style="{ backgroundImage: `url(&quot;${layers.near}&quot;)`, transform: `translateY(${shift * 1.4}px)` }"
    />

    <!-- Stars stay as nodes: CSS animates each one on its own offset. -->
    <svg
      class="scene__stars"
      :viewBox="`0 0 ${scene.width} ${scene.height}`"
      preserveAspectRatio="xMidYMid slice"
      shape-rendering="crispEdges"
      focusable="false"
      :style="{ transform: `translateY(${shift * 0.25}px)` }"
    >
      <rect
        v-for="(r, i) in stars"
        :key="i"
        class="twinkle"
        :x="r.x"
        :y="r.y"
        :width="r.w"
        :height="r.h"
        :fill="r.f"
        :style="{ animationDelay: `${r.t}ms` }"
      />
    </svg>

    <div class="scene__scrim" />
  </div>
</template>

<style scoped>
.scene {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  opacity: var(--intensity);
}

.scene__layer,
.scene__stars {
  position: absolute;
  /* Overscan, so parallax never drags an edge into view. */
  inset: -24px 0;
  width: 100%;
  height: calc(100% + 48px);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  image-rendering: pixelated;
  will-change: transform;
}

/* Two scrims: one settles the whole image down, one darkens the left where
   the copy sits so the text never fights the illustration. */
.scene__scrim {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(
      to right,
      var(--c-bg) 0%,
      color-mix(in srgb, var(--c-bg) 82%, transparent) 34%,
      color-mix(in srgb, var(--c-bg) 30%, transparent) 62%,
      color-mix(in srgb, var(--c-bg) 45%, transparent) 100%
    ),
    linear-gradient(
      to bottom,
      color-mix(in srgb, var(--c-bg) 60%, transparent) 0%,
      color-mix(in srgb, var(--c-bg) 25%, transparent) 45%,
      var(--c-bg) 100%
    );
}

/* Stars pop between two brightnesses — no fading. */
.twinkle {
  animation: scene-twinkle 3.4s steps(1, end) infinite;
}

@keyframes scene-twinkle {
  0%,
  72% {
    opacity: 0.9;
  }
  72.01%,
  100% {
    opacity: 0.25;
  }
}

@media (prefers-reduced-motion: reduce) {
  .twinkle {
    animation: none;
  }
}
</style>
