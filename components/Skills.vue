<style scoped>
.skills-header h2 {
  border-right: 3px solid #020403;
  padding-right: 10px;
  letter-spacing: 0.5em;
}
.skills-holder {
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  text-align: right;
  margin-bottom: 100px;
}
</style>

<template>
  <div class="skills">
    <div class="skills-holder glitch-parent">
      <div v-scroll-reveal.reset class="skills-header m-bottom-10">
        <h2 class="glitch pointer" data-text="SKILLS">SKILLS</h2>
      </div>
      <div v-scroll-reveal.reset class="skills-info">
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
    </div>
  </div>
</template>

<script>
export default {
  name: 'Skills',
}
</script>
