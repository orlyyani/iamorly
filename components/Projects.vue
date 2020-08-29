<style scoped>
.projects-header h2 {
  border-right: 3px solid #020403;
  padding-right: 10px;
  letter-spacing: 0.5em;
}
.projects-holder {
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  text-align: right;
}
.m-top-100 {
  margin-top: 100px;
}
</style>

<template>
  <div class="projects">
    <div class="projects-holder glitch-parent">
      <div v-scroll-reveal.reset class="projects-header m-bottom-10">
        <h2 class="glitch pointer" data-text="PROJECTS">PROJECTS</h2>
        <h3 class="pointer">Open Source</h3>
      </div>
      <div class="projects-info">
        <div v-scroll-reveal.reset class="project m-top-40">
          <blockquote class="embedly-card" data-card-controls="0">
            <h4>
              <a href="https://github.com/orlyyani/read-more"
                >orlyyani/read-more</a
              >
            </h4>
            <p>
              Read-More is a simple plugin fo vue.js that has been created with
              ❤️ by a bored developer. For examples, refer to the demo page. npm
              install vue-read-more --save Add read more length Add read more
              link Custom read more string Custom read less string import
              ReadMore from 'vue-read-more'; Vue.use(ReadMore); You can use
              either the Component approach or the Directive approach.
            </p>
          </blockquote>
        </div>
        <div v-scroll-reveal.reset class="project m-top-40">
          <blockquote class="embedly-card" data-card-controls="0">
            <h4>
              <a href="https://github.com/orlyyani/photo-grid"
                >orlyyani/photo-grid</a
              >
            </h4>
            <p>
              This component let you automatically arrange the photos depending
              on their clusters. - orlyyani/photo-grid
            </p>
          </blockquote>
        </div>
        <!-- <div class="project m-top-40">
          <div
            class="github-card"
            data-github="orlyyani/read-more"
            data-width="400"
            data-height="150"
            data-theme="default"
          ></div>
        </div>
        <div class="project m-top-40">
          <div
            class="github-card"
            data-github="orlyyani/photo-grid"
            data-width="400"
            data-height="153"
            data-theme="default"
          ></div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Projects',
  mounted() {
    const githubScript = document.createElement('script')
    githubScript.setAttribute(
      'src',
      'https://cdn.jsdelivr.net/github-cards/latest/widget.js'
    )
    document.head.appendChild(githubScript)
    const githubScript2 = document.createElement('script')
    githubScript2.setAttribute('src', '//cdn.embedly.com/widgets/platform.js')
    document.head.appendChild(githubScript2)
  },
}
</script>
