<script setup lang="ts">
definePageMeta({
  colorMode: 'light'
})

const description = 'Front-End & Game Developer · Vue 3, Nuxt 3 & TypeScript · Casino games at Play\'n GO · Web/UI Designer · Remote from the Philippines'

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
