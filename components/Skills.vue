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
.skills {
  text-align: left;
  margin-top: 20px;
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
          "Programming is a continuous process of learning." I find great joy in coding and improving my abilities. I have a thorough understanding of Web Development, covering the front-end, back-end, and DevOps aspects. Over the years, I have been involved in the creation of various Progressive Web Apps (PWA), Single Page Apps (SPA), and Accelerated Mobile Pages (AMP) applications.
        </p>
        <!-- <div class="skills">
          <h3 class="m-top-20">Front-End</h3>
          <p>
            HTML, CSS, Javascript, Vue JS, Nuxt JS, SEO (Search Engine
            Optimization), Angular JS
          </p>
          <hr />
          <h3 class="m-top-20">Back-End</h3>
          <p>PHP, Python, Laravel, MySQL, DJango, GraphQL, REST</p>
          <hr />
          <h3 class="m-top-20">Server</h3>
          <p>AWS, Heroku, Digital Ocean, Nginx, Apache, Docker</p>
          <hr />
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Skills',
}
</script>
