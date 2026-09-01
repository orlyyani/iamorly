<script setup lang="ts">
definePageMeta({
  colorMode: 'light'
})

const description = 'Lead Front-End Developer specializing in Vue 3, Nuxt 3 & TypeScript · Web/UI Designer · Remote from the Philippines'

useSeoMeta({
  title: 'Orly John Yanson',
  description,
  ogSiteName: 'iamorly',
  ogUrl: 'https://iamorly.com/',
  ogType: 'website',
  ogTitle: 'iamorly',
  ogDescription: description,
  ogImage: 'https://iamorly.com/pp.jpg',
  twitterCard: 'summary',
  twitterSite: '@orlyyani',
  twitterTitle: 'iamorly',
  twitterDescription: description,
  twitterImage: 'https://iamorly.com/pp.jpg'
})
</script>

<template>
  <AppShell />
</template>
