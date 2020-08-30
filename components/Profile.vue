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
          Hi there, I am Orly and I do coding for a living. I'm in the tech
          industry for almost four years and I have been developing different
          web applications such as CMS(Content Management System), Commercial
          sites, Static web sites, E-commerce apps, etc. Outside of programming
          I do enjoy playing video games and sometimes, I play alone so hit me
          up if you wanted to play. If you have any questions or inquiries, just
          do send me an email and let's have a chat.
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
