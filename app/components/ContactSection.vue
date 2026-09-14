<script setup lang="ts">
import { profile } from '~/data/profile'
import { mail, socialIcons, terminal } from '~/data/sprites'
</script>

<template>
  <section id="contact" class="px-section">
    <div class="px-shell">
      <SectionHeading index="05" title="Get In Touch" :icon="terminal" />

      <div v-reveal class="contact px-frame px-frame--accent px-frame--raised">
        <p class="contact__lead px-display">
          Open to new opportunities.
        </p>
        <p class="contact__body px-prose">
          Front end, full stack, or something that fits neither label — I have
          worked across enough of the stack to be useful in most of it. If you
          have an interesting problem, or you just want to argue about prefetch
          strategies, the fastest way to reach me is email.
        </p>

        <div class="contact__actions">
          <a class="px-btn px-btn--primary" :href="`mailto:${profile.email}`">
            <PixelSprite :sprite="mail" :scale="2" />
            {{ profile.email }}
          </a>
        </div>

        <ul class="contact__socials">
          <li v-for="s in profile.socials" :key="s.id">
            <span class="px-label contact__social-label">
              <PixelSprite v-if="socialIcons[s.id]" :sprite="socialIcons[s.id]!" :scale="2" class="contact__social-icon" />
              {{ s.label }}
            </span>
            <ExternalLink :href="s.href">{{ s.handle }}</ExternalLink>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact {
  padding: clamp(24px, 4vw, 44px);
  background: var(--c-panel);
}

.contact__lead {
  font-size: clamp(22px, 3.4vw, 32px);
  margin-bottom: var(--px3);
}

.contact__body {
  color: var(--c-dim);
  margin-bottom: var(--px4);
}

.contact__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--px3);
  margin-bottom: var(--px4);
}

.contact__socials {
  display: flex;
  flex-wrap: wrap;
  gap: clamp(20px, 4vw, 48px);
  padding-top: var(--px4);
  border-top: var(--px) solid var(--c-line);
}

.contact__social-label {
  display: flex;
  align-items: center;
  gap: var(--px);
  color: var(--c-faint);
}

.contact__social-icon {
  flex: none;
}
</style>
