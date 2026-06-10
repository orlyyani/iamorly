<script setup lang="ts">
const backdropStyle = {
  backgroundImage: 'linear-gradient(rgba(15,12,43,0.9), rgba(15,12,43,0.9)), url(\'/images/back-img.jpeg\')'
}
</script>

<template>
  <div class="min-h-screen text-ink">
    <div
      class="fixed inset-y-0 left-0 -z-10 hidden w-1/2 bg-[#0f0c2b] bg-cover bg-center md:block"
      :style="backdropStyle"
    />
    <div class="mx-auto grid max-w-[1110px] grid-cols-1 md:grid-cols-2">
      <LeftSider />
      <RightSider />
    </div>
  </div>
</template>
