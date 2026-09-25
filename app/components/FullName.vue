<script setup lang="ts">
const lines = ['ORLY', 'JOHN', 'YANSON']
</script>

<template>
  <h1
    class="glitch-always flex flex-col items-start"
    aria-label="Orly John Yanson"
  >
    <span
      v-for="line in lines"
      :key="line"
      class="glitch-text"
      :data-text="line"
      aria-hidden="true"
    >{{ line }}</span>
  </h1>
</template>
