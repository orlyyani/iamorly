<script setup lang="ts">
import { contactEmail } from '~/data/socialLinks'

const year = new Date().getFullYear()
</script>

<template>
  <div>
    <SectionHeading text="CONTACT" />
    <p>
      Have a project or a role in mind? Send me an email and I'll get back to you.
    </p>
    <div class="mt-5 flex flex-wrap gap-3">
      <UButton
        :to="`mailto:${contactEmail}`"
        external
        icon="i-lucide-mail"
        color="neutral"
        size="lg"
        :label="contactEmail"
      />
      <UButton
        to="https://www.linkedin.com/in/orly-yanson/"
        target="_blank"
        icon="i-simple-icons-linkedin"
        color="neutral"
        variant="outline"
        size="lg"
        label="LinkedIn"
      />
    </div>
    <p class="mt-16 text-sm text-(--ui-text-muted)">
      © {{ year }} Orly John Yanson
    </p>
  </div>
</template>
