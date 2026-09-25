<script setup lang="ts">
import { projects } from '~/data/projects'
import { companyLinks } from '~/data/companies'

// The first few projects are shown up front; the rest sit behind "Show all".
// Every project is rendered and the extras are hidden with v-show (not v-if), so
// `nuxi generate` sees their <NuxtImg> and prerenders the /_ipx/ image variants.
const FEATURED_COUNT = 6

const showAll = ref(false)

function toggleShowAll() {
  showAll.value = !showAll.value
}
</script>

<template>
  <div>
    <SectionHeading text="PROJECTS" />
    <div class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
      <div
        v-for="(project, index) in projects"
        v-show="showAll || index < FEATURED_COUNT"
        :key="project.title"
      >
        <a
          v-if="project.image"
          :href="project.href"
          target="_blank"
          rel="noopener noreferrer"
          class="group block overflow-hidden rounded-lg p-2.5"
          :style="{ background: project.gradient }"
        >
          <NuxtImg
            :src="project.image"
            :alt="`${project.title} screenshot`"
            loading="lazy"
            width="1440"
            height="900"
            sizes="sm:100vw md:320px"
            class="w-full rounded-md shadow-lg ring-1 ring-black/10 transition-transform duration-500 ease-out group-hover:scale-[1.06]"
          />
        </a>
        <component
          :is="project.href ? 'a' : 'h3'"
          v-bind="project.href
            ? { href: project.href, target: '_blank', rel: 'noopener noreferrer' }
            : {}"
          class="mt-3 block font-semibold"
          :class="project.href && 'hover:underline'"
        >
          {{ project.title }}
        </component>
        <a
          :href="companyLinks[project.company]"
          target="_blank"
          rel="noopener noreferrer"
          class="text-sm text-(--ui-text-muted) hover:underline"
        >
          {{ project.company }}<span v-if="project.period"> · {{ project.period }}</span>
        </a>
        <p class="mt-1.5 text-sm">
          {{ project.description }}
        </p>
      </div>
    </div>
    <UButton
      v-if="projects.length > FEATURED_COUNT"
      color="neutral"
      variant="outline"
      class="mt-8"
      :icon="showAll ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
      :label="showAll ? 'Show fewer projects' : `Show all ${projects.length} projects`"
      @click="toggleShowAll"
    />
  </div>
</template>
