<script setup lang="ts">
definePageMeta({
  colorMode: 'light'
})

const description = 'Web Developer, UI/UX Designer, Gamer, Artist, Frustrated GameDev 🎮'

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
