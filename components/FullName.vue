<style scoped>
.full-name-header h2 {
  border-left: 3px solid #020403;
  padding-left: 10px;
  letter-spacing: 0.5em;
}

.full-name-holder {
  flex-direction: column;
  text-align: right;
  margin-top: 100px;
}
</style>

<template>
  <div class="full-name">
    <div class="full-name-holder base-glitch align-right">
      <h1 class="glitch" data-text="ORLY">ORLY</h1>
      <br />
      <h1 class="glitch" data-text="JOHN">JOHN</h1>
      <br />
      <h1 class="glitch" data-text="YANSON">YANSON</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FullName',
}
</script>
