import Vue from 'vue'
import ScrollReveal from 'vue-scroll-reveal'

Vue.use(ScrollReveal, {
  class: 'v-scroll-reveal',
  duration: 800,
  scale: 1,
  distance: '40px',
  easing: 'cubic-bezier(0.5, 0, 0, 1)',
})
