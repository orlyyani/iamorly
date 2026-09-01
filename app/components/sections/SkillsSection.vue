<script setup lang="ts">
import { skillCategories } from '~/data/skills'
</script>

<template>
  <div class="flex flex-col items-end text-right">
    <GlitchHeading
      text="SKILLS"
      border="right"
      tag="h2"
      class="mb-2.5"
    />
    <p class="mt-5">
      I work across the full stack but specialize in the Vue ecosystem — Vue 3, Nuxt 3, TypeScript, and Pinia — with hands-on experience in backend, cloud, payments, and PWA architecture.
    </p>
    <div class="mt-5 flex w-full flex-col items-end gap-4">
      <div
        v-for="category in skillCategories"
        :key="category.name"
        class="w-full"
      >
        <h3 class="mb-2 font-semibold">
          {{ category.name }}
        </h3>
        <div class="flex flex-wrap justify-end gap-2">
          <UBadge
            v-for="skill in category.skills"
            :key="skill"
            variant="subtle"
            color="neutral"
          >
            {{ skill }}
          </UBadge>
        </div>
      </div>
    </div>
  </div>
</template>
