<script setup lang="ts">
import { recommendations } from '~/data/recommendations'
</script>

<template>
  <div>
    <div class="mb-2.5 flex flex-col items-end text-right">
      <GlitchHeading
        text="REFERENCES"
        border="right"
        tag="h2"
      />
      <h3 class="mt-1 cursor-pointer tracking-[0.5em]">
        Recommendations
      </h3>
    </div>
    <div class="flex flex-col gap-4">
      <RecommendationCard
        v-for="rec in recommendations"
        :key="rec.id"
        :rec="rec"
      />
    </div>
  </div>
</template>
