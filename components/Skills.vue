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
          "Coding for a living is learning for a living." I do enjoy programming
          and honing my skills. I do have a comprehensive knowledge of Web
          Development from Front-End, Back-End, and up to DevOps.Through the
          years, I have been developing several PWA(Progressive Web App),
          SPA(Single Page App), AMP(Accelerated Mobile Pages) applications.
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
