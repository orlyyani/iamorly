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
.projects-info {
  display: flex;
  overflow: auto;
  width: 100%;
}
</style>

<template>
  <div class="projects">
    <div class="projects-holder glitch-parent">
      <div v-scroll-reveal.reset class="projects-header m-bottom-10">
        <h2 class="glitch pointer" data-text="PROJECTS">PROJECTS</h2>
        <h3 class="pointer">Open Source</h3>
      </div>
      <div v-scroll-reveal.reset class="projects-info">
        <div class="project m-top-40">
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
        <div class="project m-top-40">
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
        <div class="project m-top-40">
          <blockquote class="embedly-card" data-card-controls="0">
            <h4>
              <a
                href="https://www.behance.net/orlyyani?fbclid=IwAR3rgkx_AsIFZpmUqhuvbO5fKSSeBF1dEA6M9Pqzcy7XsYt7yDAI8mHOazQ"
                >Orly John Yanson on Behance</a
              >
            </h4>
            <p>
              Web Developer, UI/UX Designer, Gamer, Artist, Frustrated GameDev
              ⚡
            </p>
          </blockquote>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Projects',
  mounted() {
    const embedScript = document.createElement('script')
    embedScript.setAttribute('src', '//cdn.embedly.com/widgets/platform.js')
    document.head.appendChild(embedScript)
  },
}
</script>
