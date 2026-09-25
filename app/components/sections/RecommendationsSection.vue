<script setup lang="ts">
import { recommendations } from '~/data/recommendations'
</script>

<template>
  <div>
    <SectionHeading text="REFERENCES" />
    <div class="flex flex-col gap-4">
      <RecommendationCard
        v-for="rec in recommendations"
        :key="rec.id"
        :rec="rec"
      />
    </div>
  </div>
</template>
