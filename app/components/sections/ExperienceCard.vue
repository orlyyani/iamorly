<script setup lang="ts">
import { computed } from 'vue'
import type { ExperienceEntry } from '~/data/experience'
import { companyLinks } from '~/data/companies'

const props = defineProps<{ entry: ExperienceEntry }>()

const initials = computed(() => props.entry.company
  .split(' ')
  .slice(0, 2)
  .map(word => word.charAt(0))
  .join('')
  .toUpperCase())
</script>

<template>
  <UCard>
    <div class="flex gap-4 text-left">
      <UAvatar
        :src="entry.logo"
        :alt="entry.company"
        :text="initials"
        size="lg"
      />
      <div class="flex-1">
        <h3 class="font-semibold">
          <a
            v-if="companyLinks[entry.company]"
            :href="companyLinks[entry.company]"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:underline"
          >{{ entry.company }}</a>
          <template v-else>
            {{ entry.company }}
          </template>
        </h3>
        <p>
          {{ entry.role }}<span v-if="entry.employmentType"> · {{ entry.employmentType }}</span>
        </p>
        <p
          v-if="entry.roleDetail"
          class="text-sm text-(--ui-text-muted)"
        >
          {{ entry.roleDetail }}
        </p>
        <p class="text-sm text-(--ui-text-muted)">
          {{ entry.startDate }} - {{ entry.endDate }} · {{ entry.duration }}
        </p>
        <p class="text-sm text-(--ui-text-muted)">
          {{ entry.location }}
        </p>
        <p class="mt-2">
          {{ entry.description }}
        </p>
        <div
          v-if="entry.skills?.length"
          class="mt-2 flex flex-wrap gap-2"
        >
          <UBadge
            v-for="skill in entry.skills"
            :key="skill"
            variant="subtle"
            color="neutral"
          >
            {{ skill }}
          </UBadge>
          <UBadge
            v-if="entry.skillsMore"
            variant="subtle"
            color="neutral"
          >
            +{{ entry.skillsMore }} skills
          </UBadge>
        </div>
      </div>
    </div>
  </UCard>
</template>
