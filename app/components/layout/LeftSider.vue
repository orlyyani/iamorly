<script setup lang="ts">
const backdropStyle = {
  backgroundImage: 'linear-gradient(rgba(15,12,43,0.9), rgba(15,12,43,0.9)), url(\'/images/back-img.jpeg\')'
}
</script>

<template>
  <div
    class="flex h-[500px] items-center justify-center bg-cover bg-center md:sticky md:top-0 md:h-screen md:bg-none!"
    :style="backdropStyle"
  >
    <div class="flex items-center justify-center gap-10 px-5">
      <div class="text-right">
        <div
          v-motion-slide-visible-once-left
          class="inline-block bg-paper p-1.5"
        >
          <p class="inline border-l-[7px] border-ink pl-1.5 text-[1.2em] text-ink">
            iamorly
          </p>
        </div>
        <div class="mt-2 flex flex-col gap-1">
          <p
            v-motion-slide-visible-once-right
            :delay="100"
            class="text-[1.8em] text-paper"
          >
            Programmer
          </p>
          <p
            v-motion-slide-visible-once-right
            :delay="200"
            class="text-[1.8em] text-paper"
          >
            / Developer
          </p>
          <p
            v-motion-slide-visible-once-right
            :delay="300"
            class="text-[1.8em] text-paper"
          >
            & Designer
          </p>
        </div>
      </div>

      <div
        v-motion-pop-visible-once
        class="relative h-[300px] w-[150px] after:absolute after:top-[-17px] after:left-0 after:z-[11] after:h-[335px] after:w-[150px] after:border-l-[3px] after:border-paper after:content-[''] md:h-[400px] md:w-[200px] md:after:top-[-45px] md:after:h-[500px] md:after:w-[200px]"
      >
        <div class="h-full w-full overflow-hidden rounded-tr-[200px] rounded-br-[200px]">
          <img
            src="/images/profile-image.webp"
            alt="Orly John Yanson"
            class="h-full w-full object-cover"
          >
        </div>
      </div>
    </div>
  </div>
</template>
