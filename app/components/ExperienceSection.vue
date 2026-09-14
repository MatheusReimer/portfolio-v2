<script setup lang="ts">
import { experience } from '~/data/experience'
import { briefcase } from '~/data/sprites'
</script>

<template>
  <section id="experience" class="px-section">
    <div class="px-shell">
      <SectionHeading
        index="01"
        title="Experience"
        :icon="briefcase"
        blurb="Five years, four roles, one direction — from keeping other people's systems alive to designing the architecture underneath them."
      />

      <div class="exp__list">
        <ExperienceEntry
          v-for="(role, i) in experience"
          :key="role.id"
          :role="role"
          :is-current="i === 0"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.exp__list {
  display: grid;
}
</style>
