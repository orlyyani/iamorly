<template>
  <div class="flex flex-col gap-16 px-5 py-10 md:gap-20 md:px-10 md:py-16">
    <SocialLinks />

    <IntroSection />

    <div
      v-motion-slide-visible-once-bottom
      :duration="1000"
    >
      <ProfileSection />
    </div>

    <div
      v-motion-slide-visible-once-bottom
      :duration="1000"
    >
      <ProjectsSection />
    </div>

    <div
      v-motion-slide-visible-once-bottom
      :duration="1000"
    >
      <GamesSection />
    </div>

    <div
      v-motion-slide-visible-once-bottom
      :duration="1000"
    >
      <ExperienceSection />
    </div>

    <div
      v-motion-slide-visible-once-bottom
      :duration="1000"
    >
      <SkillsSection />
    </div>

    <div
      v-motion-slide-visible-once-bottom
      :duration="1000"
    >
      <RecommendationsSection />
    </div>

    <div
      v-motion-slide-visible-once-bottom
      :duration="1000"
    >
      <ContactSection />
    </div>
  </div>
</template>
