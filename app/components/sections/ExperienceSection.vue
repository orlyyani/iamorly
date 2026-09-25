<script setup lang="ts">
import { experience } from '~/data/experience'
</script>

<template>
  <div>
    <SectionHeading text="EXPERIENCE" />
    <div class="flex flex-col gap-4">
      <ExperienceCard
        v-for="entry in experience"
        :key="entry.id"
        :entry="entry"
      />
    </div>
  </div>
</template>
