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
          Mynd Consulting was a great company. It allows me to develop my
          Front-End and UI/UX skills. I have been into this company for almost
          two years and five months. I started to join in 2016 as a Junior Dev
          and I have been to different teams and learned a lot. Mynd was behind
          the official Dr. Oz app, published by Sharecare Inc.
        </p>
        <h3 class="m-top-40">Full Stack Web Developer</h3>
        <h3>Appetiser Pty Ltd - Present</h3>
        <p>
          I improved my skills by joining Appetiser Apps—one of the most leading
          companies in Australia, founded by Michael MacRae and Jamie Shostak. I
          started to grow as a developer since I joined this company by working
          flexibly.
        </p>
        <p>
          I joined this company in 2018 and developed several web applications
          with different teams. Appetiser Apps have generated millions of
          downloads and its clients are worth billions.
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
