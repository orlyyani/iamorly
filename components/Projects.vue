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
  margin-bottom: 200px;
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
      <div v-scroll-reveal.reset class="projects-info">
        <div class="project m-top-40">
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
        </div>
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
  },
}
</script>
