<script setup lang="ts">
import { projects } from '~/data/projects'
import { companyLinks } from '~/data/companies'
</script>

<template>
  <div>
    <div class="mb-2.5 flex flex-col items-end text-right">
      <GlitchHeading
        text="PROJECTS"
        border="right"
        tag="h2"
      />
      <h3 class="mt-1 cursor-pointer tracking-[0.5em]">
        Selected Work
      </h3>
    </div>
    <div class="flex flex-col gap-4">
      <UCard
        v-for="project in projects"
        :key="project.title"
      >
        <template #header>
          <div class="flex flex-wrap items-baseline justify-between gap-x-3">
            <h4 class="font-semibold">
              {{ project.title }}
            </h4>
            <span
              v-if="project.period"
              class="text-sm text-(--ui-text-muted)"
            >{{ project.period }}</span>
          </div>
          <a
            :href="companyLinks[project.company]"
            target="_blank"
            rel="noopener noreferrer"
            class="text-sm text-(--ui-text-muted) hover:underline"
          >
            Associated with {{ project.company }}
          </a>
        </template>
        <p class="text-left">
          {{ project.description }}
        </p>
        <div
          v-if="project.skills?.length"
          class="mt-2 flex flex-wrap gap-2"
        >
          <UBadge
            v-for="skill in project.skills"
            :key="skill"
            variant="subtle"
            color="neutral"
          >
            {{ skill }}
          </UBadge>
          <UBadge
            v-if="project.skillsMore"
            variant="subtle"
            color="neutral"
          >
            +{{ project.skillsMore }} skills
          </UBadge>
        </div>
      </UCard>
    </div>
  </div>
</template>
