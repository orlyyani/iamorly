<script setup lang="ts">
import { experience } from '~/data/experience'
</script>

<template>
  <div>
    <GlitchHeading
      text="EXPERIENCE"
      border="left"
      tag="h2"
      class="mb-2.5"
    />
    <div class="flex flex-col gap-4">
      <ExperienceCard
        v-for="entry in experience"
        :key="entry.id"
        :entry="entry"
      />
    </div>
  </div>
</template>
