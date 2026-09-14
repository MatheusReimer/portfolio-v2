<script setup lang="ts">
import { projects } from '~/data/projects'
import { folder } from '~/data/sprites'
</script>

<template>
  <section id="work" class="px-section work">
    <div class="px-shell">
      <SectionHeading
        index="02"
        title="Selected Work"
        :icon="folder"
        blurb="Three pieces of work I can talk through in detail — what the constraint was, what I chose, and what it actually changed."
      />

      <div class="work__grid">
        <ProjectCard
          v-for="(project, i) in projects"
          :key="project.id"
          v-reveal="i"
          :project="project"
          :index="String(i + 1).padStart(2, '0')"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.work {
  background: var(--c-void);
  border-block: var(--px) solid var(--c-line);
}

.work__grid {
  display: grid;
  /* Deliberately two-up at desktop: these cards carry four prose blocks each,
     and a 320px track makes them unreadably narrow. */
  grid-template-columns: repeat(auto-fit, minmax(420px, 1fr));
  gap: clamp(20px, 3vw, 32px);
  /* The raised frames cast 8px of shadow below the last row. */
  padding-bottom: var(--px2);
}

@media (max-width: 520px) {
  .work__grid {
    grid-template-columns: 1fr;
  }
}
</style>
