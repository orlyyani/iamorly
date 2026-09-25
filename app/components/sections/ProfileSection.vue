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
  <div>
    <SectionHeading text="PROFILE" />
    <p>
      I'm Orly, a front-end and game developer with {{ yearsOfExperience }} years of experience building web apps, full products, and casino games for teams in Australia, the US, and the Philippines.
    </p>
    <p class="mt-4">
      At Play'n GO I develop casino slots, serve as Scrum Master, and built Mega Don Triple Threat from the ground up. For eight years at Appetiser I led front-end work on the platform council: architecture, code review, hiring, and onboarding.
    </p>
    <p class="mt-4">
      I also design UI/UX and build websites for freelance clients. What you get working with me: clear scope, maintainable code, documented handover, and direct communication.
    </p>
  </div>
</template>
