<script setup lang="ts">
import { projects } from '~/data/projects'
import { folder } from '~/data/sprites'

const slideLabels = projects.map(p => p.title)
</script>

<template>
  <section id="work" class="px-section work">
    <div class="px-shell work__content">
      <SectionHeading
        index="02"
        title="Selected Work"
        :icon="folder"
        blurb="Three pieces of work I can talk through in detail — what the constraint was, what I chose, and what it actually changed."
      />

      <PixelCarousel
        :count="projects.length"
        label="selected work"
        :slide-labels="slideLabels"
      >
        <template #default="{ index }">
          <div class="work__slide">
            <ProjectCard
              :project="projects[index]!"
              :index="String(index + 1).padStart(2, '0')"
            />
          </div>
        </template>
      </PixelCarousel>
    </div>
  </section>
</template>

<style scoped>
.work {
  position: relative;
  isolation: isolate;
  background: var(--c-void);
  border-block: var(--px) solid var(--c-line);
}

/* Not the city again — this section is a workbench, so it gets drafting paper.
   A hard-edged pixel grid with a heavier rule every fourth line, drawn in
   gradients so it costs nothing in the DOM. */
.work::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    repeating-linear-gradient(
      to right,
      color-mix(in srgb, var(--c-line) 62%, transparent) 0 1px,
      transparent 1px 64px
    ),
    repeating-linear-gradient(
      to bottom,
      color-mix(in srgb, var(--c-line) 62%, transparent) 0 1px,
      transparent 1px 64px
    ),
    repeating-linear-gradient(
      to right,
      color-mix(in srgb, var(--c-line) 30%, transparent) 0 1px,
      transparent 1px 16px
    ),
    repeating-linear-gradient(
      to bottom,
      color-mix(in srgb, var(--c-line) 30%, transparent) 0 1px,
      transparent 1px 16px
    );
  /* Fades out at the edges so the grid never fights the frame. */
  -webkit-mask-image: radial-gradient(ellipse at 50% 40%, #000 30%, transparent 78%);
  mask-image: radial-gradient(ellipse at 50% 40%, #000 30%, transparent 78%);
  opacity: 0.55;
}

.work__content {
  position: relative;
  z-index: 1;
}

/* The raised card frame casts 8px of shadow and the carousel stage clips
   overflow, so the slide carries its own inset to keep the shadow inside. */
.work__slide {
  padding: var(--px) var(--px3) var(--px3) var(--px);
}
</style>
