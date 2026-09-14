<script setup lang="ts">
import { profile } from '~/data/profile'
import { experience } from '~/data/experience'

// Structured data helps recruiters' tooling and search engines read the page
// correctly. Built from the same source of truth as the rendered content.
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  jobTitle: profile.role,
  description: profile.metaDescription,
  email: `mailto:${profile.email}`,
  url: 'https://matheusreimer.github.io/portfolio-v2/',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Blumenau',
    addressRegion: 'Santa Catarina',
    addressCountry: 'BR',
  },
  sameAs: profile.socials.map(s => s.href),
  worksFor: {
    '@type': 'Organization',
    name: experience[0]?.company,
  },
  knowsLanguage: profile.languages.map(l => l.name),
}

useHead({
  script: [
    {
      type: 'application/ld+json',
      // Serialised, not interpolated into markup — no user input reaches this.
      innerHTML: JSON.stringify(personSchema),
    },
  ],
})
</script>

<template>
  <div>
    <HeroSection />

    <!-- Each section assembles itself out of pixel blocks as it arrives. The
         hero is excluded: it is on screen at load, and nothing the reader can
         already see should be covered up in order to be revealed. -->
    <PixelBuild><ExperienceSection /></PixelBuild>
    <PixelBuild><WorkSection /></PixelBuild>
    <PixelBuild><CapabilitiesSection /></PixelBuild>
    <PixelBuild><AboutSection /></PixelBuild>
    <PixelBuild><ContactSection /></PixelBuild>
  </div>
</template>
