<style scoped>
.hover-underline {
  position: relative;
}
.hover-underline:after {
  content: '';
  position: absolute;
  width: 0;
  left: 0;
  border-bottom: 3px solid #020403;
  bottom: -5px;
  -webkit-transition: 0.3s ease;
  transition: 0.3s ease;
}

.hover-underline:hover:after {
  width: 100%;
}
</style>

<template>
  <div class="right-sider">
    <div class="right-sider__holder">
      <div class="affiliations f-500 align-right">
        <a
          href="https://github.com/orlyyani"
          target="_blank"
          class="f-black decore-none f-500 hover-underline m-right-10"
          >GitHub</a
        >
        <p class="m-right-10">/</p>
        <a
          href="https://twitter.com/orlyyani"
          target="_blank"
          class="f-black decore-none f-500 hover-underline m-right-10"
          >Twitter</a
        >
        <p class="m-right-10">/</p>
        <a
          href="https://www.linkedin.com/in/orly-yanson/"
          target="_blank"
          class="f-black decore-none f-500 hover-underline m-right-10"
          >LinkedIn</a
        >
        <p class="m-right-10">/</p>
        <a
          href="mailto:orlyjohnyanson@gmail.com"
          class="f-black decore-none f-500 hover-underline"
          >Mail</a
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RightSider',
}
</script>
