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
          Mynd Consulting was an excellent company that provided me with ample opportunities to refine my front-end and UI/UX abilities. I spent nearly two years and five months with the company, starting as a Junior Developer in 2016. Through working with various teams, I was able to gain a wealth of knowledge and experience. Mynd was responsible for the development of the official Dr. Oz app, which was published by Sharecare Inc.
        </p>
        <h3 class="m-top-40">Full Stack Web Developer</h3>
        <h3>Appetiser Pty Ltd - Present</h3>
        <p>
          By joining Appetiser Apps, a prominent company founded by Michael MacRae and Jamie Shostak, based in Australia, I was able to enhance my skills as a developer.
        </p>
        <p>
          Since joining the company in 2018, I have had the opportunity to work on a flexible basis and have made significant progress as a developer. I have collaborated with various teams to develop several web applications. Appetiser Apps has seen millions of downloads and boasts clients with billions in value.
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
