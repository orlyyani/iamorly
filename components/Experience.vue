<style scoped>
.experience-header h2 {
  border-left: 3px solid #020403;
  padding-left: 10px;
  letter-spacing: 0.5em;
}
.experience-holder {
  margin-bottom: 40px;
}
</style>

<template>
  <div class="experience">
    <div class="experience-holder glitch-parent">
      <div v-scroll-reveal.reset class="experience-header m-bottom-10">
        <h2 class="glitch pointer" data-text="EXPERIENCE">EXPERIENCE</h2>
      </div>
      <div v-scroll-reveal.reset class="experience-info">
        <h3 class="m-top-40">Front-End Web Developer / UI/UX</h3>
        <h3>Mynd Consulting - 2 yrs 5 mos</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat..
        </p>
        <h3 class="m-top-40">Full Stack Web Developer</h3>
        <h3>Appetiser Pty Ltd - Present</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat..
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Experience',
}
</script>
