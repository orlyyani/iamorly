<script setup lang="ts">
import { contactEmail } from '~/data/socialLinks'
</script>

<template>
  <div>
    <FullName />
    <p class="mt-5 text-xl font-semibold">
      Front-End & Game Developer
    </p>
    <p class="mt-1 text-(--ui-text-muted)">
      Vue 3 · Nuxt 3 · TypeScript · Casino games at Play'n GO · Remote from the Philippines
    </p>
    <div class="mt-6 flex flex-wrap gap-3">
      <UButton
        :to="`mailto:${contactEmail}`"
        external
        icon="i-lucide-mail"
        color="neutral"
        size="lg"
        label="Email me"
      />
      <UButton
        to="/Orly-John-Yanson-Resume.pdf"
        external
        download
        icon="i-lucide-download"
        color="neutral"
        variant="outline"
        size="lg"
        label="Download resume"
      />
    </div>
  </div>
</template>
