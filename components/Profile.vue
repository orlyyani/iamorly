<style scoped>
.profile-header h2 {
  border-left: 3px solid #020403;
  padding-left: 10px;
  letter-spacing: 0.5em;
}

.profile-image {
  position: absolute;
  max-width: 500px;
  bottom: -135px;
  z-index: -1;
  right: -180px;
  opacity: 0.2;
  overflow: hidden;
}
</style>

<template>
  <div class="profile">
    <div class="profile-holder relative glitch-parent">
      <div v-scroll-reveal.reset class="profile-header m-bottom-10">
        <h2 class="glitch pointer" data-text="PROFILE">PROFILE</h2>
      </div>
      <div v-scroll-reveal.reset class="profile-info">
        <p>
          Hello, I'm Orly and I make a living as a coder. I've been working in the tech industry for approximately six years and have extensive experience in developing a variety of web applications, including CMS (Content Management System), commercial sites, static websites, e-commerce applications, and more. In my free time, I enjoy playing video games, and occasionally play solo. If you're interested in gaming with me, feel free to reach out. If you have any questions or would like to get in touch, simply send me an email, and I'll be happy to chat.
        </p>
      </div>
      <div v-scroll-reveal.reset class="profile-back m-top-40 profile-image">
        <v-img :src="ProfileBack" aspect-ratio></v-img>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileBack from '@/assets/images/profile-back.jpg'

export default {
  name: 'Profile',
  data() {
    return {
      ProfileBack,
    }
  },
}
</script>
