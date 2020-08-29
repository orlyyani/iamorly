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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
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
