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

.informations {
  padding: 20px;
}

.info-left {
  margin-top: 40px;
  margin-right: 100px;
}

.info-right {
  margin-top: 40px;
  margin-left: 100px;
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
      <div class="informations">
        <v-lazy
          :options="{
            threshold: 0.5,
          }"
          transition="slide-y-reverse-transition"
          hide-on-leave
        >
          <div class="info-left">
            <Profile />
          </div>
        </v-lazy>
        <v-lazy
          :options="{
            threshold: 0.5,
          }"
          transition="slide-y-reverse-transition"
          hide-on-leave
        >
          <div class="info-right">
            <Skills />
          </div>
        </v-lazy>
      </div>
    </div>
  </div>
</template>

<script>
import Profile from '@/components/Profile';
import Skills from '@/components/Skills';

export default {
  name: 'RightSider',
  components: {
    Profile,
    Skills,
  }
}
</script>
