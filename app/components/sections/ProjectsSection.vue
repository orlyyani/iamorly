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
    <UCarousel
      v-slot="{ item: project }"
      :items="projects"
      :arrows="false"
      :dots="projects.length > 1"
      loop
      align="center"
      class-names
      :ui="{
        container: 'ms-0',
        item: 'basis-[74%] sm:basis-[68%] lg:basis-[64%] py-6 ps-2 pe-2',
        controls: 'mt-1',
        dots: 'gap-1.5',
        dot: 'size-1.5'
      }"
    >
      <UCard class="h-full origin-center scale-[0.9] opacity-45 blur-[0.5px] transition-all duration-500 ease-out [.is-snapped_&]:scale-100 [.is-snapped_&]:opacity-100 [.is-snapped_&]:blur-0">
        <template #header>
          <div class="flex flex-wrap items-baseline justify-between gap-x-3">
            <component
              :is="project.href ? 'a' : 'h4'"
              v-bind="project.href
                ? { href: project.href, target: '_blank', rel: 'noopener noreferrer' }
                : {}"
              class="font-semibold"
              :class="project.href && 'hover-underline'"
            >
              {{ project.title }}
            </component>
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
        <a
          v-if="project.image"
          :href="project.href"
          target="_blank"
          rel="noopener noreferrer"
          class="group mb-4 block overflow-hidden rounded-lg p-3 sm:p-4"
          :style="{ background: project.gradient }"
        >
          <NuxtImg
            :src="project.image"
            :alt="`${project.title} screenshot`"
            loading="lazy"
            width="1440"
            height="900"
            sizes="sm:100vw md:640px"
            class="w-full rounded-md shadow-lg ring-1 ring-black/10 transition-transform duration-500 ease-out group-hover:scale-[1.12]"
          />
        </a>
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
    </UCarousel>
  </div>
</template>
