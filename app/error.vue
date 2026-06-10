<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

useSeoMeta({
  title: props.error.statusCode === 404 ? '404 Not Found' : 'An error occurred'
})
</script>

<template>
  <UApp>
    <div class="flex min-h-screen items-center justify-center bg-ink p-5 text-center text-paper">
      <UError
        :error="error"
        :clear="{ label: 'Home page', color: 'neutral', variant: 'outline' }"
      />
    </div>
  </UApp>
</template>
