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
      Hello, I'm Orly and I make a living as a coder. I've been working in the tech industry for approximately {{ yearsOfExperience }} years and have extensive experience in developing a variety of web applications, including CMS (Content Management System), commercial sites, static websites, e-commerce applications, and more. In my free time, I enjoy playing video games, and occasionally play solo. If you're interested in gaming with me, feel free to reach out. If you have any questions or would like to get in touch, simply send me an email, and I'll be happy to chat.
    </p>
    <div class="absolute -right-[180px] -bottom-[135px] -z-10 hidden max-w-[500px] opacity-20 overflow-hidden pointer-events-none md:block">
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
