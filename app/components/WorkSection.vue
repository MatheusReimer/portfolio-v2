<script setup lang="ts">
import { projects } from '~/data/projects'
import { folder } from '~/data/sprites'

const slideLabels = projects.map(p => p.title)
</script>

<template>
  <section id="work" class="px-section work">
    <PixelScene variant="quiet" :intensity="0.5" />

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
