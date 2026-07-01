<template>
  <div class="flex flex-col gap-25 px-5 py-10 md:px-10 md:py-25">
    <SocialLinks />

    <FullName />

    <div
      v-motion-slide-visible-once-bottom
      :duration="1000"
      class="md:mr-25"
    >
      <ProfileSection />
    </div>

    <div
      v-motion-slide-visible-once-bottom
      :duration="1000"
      class="md:ml-25"
    >
      <SkillsSection />
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
      class="md:mr-25"
    >
      <ExperienceSection />
    </div>

    <div
      v-motion-slide-visible-once-bottom
      :duration="1000"
      class="md:ml-25"
    >
      <RecommendationsSection />
    </div>
  </div>
</template>
