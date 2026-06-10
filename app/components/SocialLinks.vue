<script setup lang="ts">
import { socialLinks } from '~/data/socialLinks'
</script>

<template>
  <div class="flex justify-end font-medium">
    <template
      v-for="(link, index) in socialLinks"
      :key="link.label"
    >
      <a
        :href="link.href"
        :target="link.href.startsWith('mailto:') ? undefined : '_blank'"
        :rel="link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'"
        class="hover-underline mr-2.5 text-ink no-underline"
      >{{ link.label }}</a>
      <span
        v-if="index < socialLinks.length - 1"
        class="mr-2.5"
      >/</span>
    </template>
  </div>
</template>
