<script setup lang="ts">
import { careerStartDate } from '~/data/experience'

const yearsOfExperience = computed(() => {
  const now = new Date()
  let years = now.getFullYear() - careerStartDate.getFullYear()

  const reachedAnniversary = now.getMonth() > careerStartDate.getMonth()
    || (now.getMonth() === careerStartDate.getMonth() && now.getDate() >= careerStartDate.getDate())

  if (!reachedAnniversary) years--

  return years
})
</script>

<template>
  <div class="relative">
    <GlitchHeading
      text="PROFILE"
      border="left"
      tag="h2"
      class="mb-2.5"
    />
    <p>
      I'm Orly, a lead front-end developer with {{ yearsOfExperience }} years of experience building web applications and full products for clients in Australia, the US, and the Philippines. My core stack is Vue 3, Nuxt 3, TypeScript, and Pinia, with practical experience across Laravel, MySQL, AWS, Docker, Stripe, and PWA architecture.
    </p>
    <p class="mt-4">
      At Appetiser I sit on the platform council and lead front-end technical direction: architecture and code review, developer skill assessment and task assignment, candidate evaluation, and onboarding. Alongside that, I design UI/UX and deliver CMS-based sites for freelance clients, and I keep current by building personal projects with AI-assisted development tools.
    </p>
    <p class="mt-4">
      What you get working with me: clear scope, maintainable code, documented handover, and direct communication. If you have a project in mind, send me an email.
    </p>
    <UButton
      to="/Orly-John-Yanson-Resume.pdf"
      external
      download
      icon="i-lucide-download"
      color="neutral"
      variant="outline"
      size="lg"
      label="Download Resume"
      class="mt-6"
    />
    <div class="absolute -right-[180px] -bottom-[135px] -z-10 hidden max-w-[360px] opacity-20 overflow-hidden pointer-events-none md:block">
      <NuxtImg
        src="/images/profile-back.jpg"
        alt=""
        width="500"
        format="webp"
        loading="lazy"
      />
    </div>
  </div>
</template>
