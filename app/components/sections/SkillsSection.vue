<script setup lang="ts">
import { skillCategories } from '~/data/skills'
</script>

<template>
  <div>
    <SectionHeading text="SKILLS" />
    <div class="flex flex-col gap-4">
      <div
        v-for="category in skillCategories"
        :key="category.name"
      >
        <h3 class="mb-2 font-semibold">
          {{ category.name }}
        </h3>
        <div class="flex flex-wrap gap-2">
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
