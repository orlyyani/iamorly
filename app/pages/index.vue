<script setup lang="ts">
import { profileJsonLd } from '~~/shared/recruiterProfile'

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

// Structured profile for search engines and recruiter tools; not visible on the page
useHead({
  link: [
    { rel: 'canonical', href: 'https://iamorly.com/' },
    { rel: 'alternate', type: 'application/json', href: '/resume.json', title: 'Resume (JSON Resume)' }
  ],
  script: [
    { type: 'application/ld+json', innerHTML: JSON.stringify(profileJsonLd()) }
  ]
})
</script>

<template>
  <AppShell />
</template>
