<script setup lang="ts">
import { computed } from 'vue'
import type { Recommendation } from '~/data/recommendations'

const props = defineProps<{ rec: Recommendation }>()

const initials = computed(() => props.rec.name
  .split(' ')
  .slice(0, 2)
  .map(word => word.charAt(0))
  .join('')
  .toUpperCase())
</script>

<template>
  <UCard>
    <div class="text-left">
      <div class="flex items-center gap-3">
        <UAvatar
          :alt="rec.name"
          :text="initials"
          size="md"
        />
        <div class="min-w-0">
          <h3 class="font-semibold leading-tight">
            <a
              v-if="rec.href"
              :href="rec.href"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:underline"
            >{{ rec.name }}</a>
            <template v-else>
              {{ rec.name }}
            </template>
          </h3>
          <p class="text-sm text-(--ui-text-muted)">
            {{ rec.title }}
          </p>
        </div>
      </div>
      <p class="mt-2 text-sm text-(--ui-text-muted)">
        {{ rec.date }} · {{ rec.relationship }}
      </p>
      <blockquote class="mt-3 border-l-2 border-ink/15 pl-3 italic">
        &ldquo;{{ rec.text }}&rdquo;
      </blockquote>
    </div>
  </UCard>
</template>
