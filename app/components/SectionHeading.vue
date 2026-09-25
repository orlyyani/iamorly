<script setup lang="ts">
defineProps<{ text: string }>()
</script>

<template>
  <h2 class="mb-5 border-l-[3px] border-ink pl-2.5 text-lg font-bold tracking-[0.3em]">
    {{ text }}
  </h2>
</template>
