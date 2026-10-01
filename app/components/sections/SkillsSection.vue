<script setup lang="ts">
import { ref } from 'vue'
import { skillCategories, skillProof } from '~/data/skills'

const openSkill = ref<string | null>(null)

function toggle(skill: string) {
  openSkill.value = openSkill.value === skill ? null : skill
}
</script>

<template>
  <div>
    <SectionHeading text="SKILLS" />
    <p class="mb-4 text-sm text-(--ui-text-muted)">
      Click a skill to see where I've used it.
    </p>

    <div class="flex flex-col gap-4">
      <div
        v-for="category in skillCategories"
        :key="category.name"
      >
        <h3 class="mb-2 font-semibold">
          {{ category.name }}
        </h3>
        <div class="flex flex-wrap gap-2">
          <SkillPill
            v-for="skill in category.skills"
            :key="skill"
            :skill="skill"
            :active="openSkill === skill"
            @select="toggle(skill)"
          />
        </div>

        <Transition
          name="proof"
          mode="out-in"
        >
          <div
            v-if="openSkill && category.skills.includes(openSkill)"
            :key="openSkill"
            class="proof-panel mt-3 rounded-md bg-ink p-3 text-sm text-paper"
            role="region"
            :aria-label="`Where I've used ${openSkill}`"
          >
            <div class="mb-2 flex items-center justify-between gap-2">
              <span class="text-xs font-semibold tracking-widest uppercase">
                {{ openSkill }}
              </span>
              <button
                type="button"
                class="cursor-pointer text-paper/70 hover:text-paper"
                aria-label="Close"
                @click="openSkill = null"
              >
                <UIcon
                  name="i-lucide-x"
                  class="size-4"
                />
              </button>
            </div>
            <ul class="space-y-1.5">
              <li
                v-for="proof in skillProof[openSkill]"
                :key="proof.where"
                class="proof-item"
              >
                <span class="font-semibold text-glitch-cyan">{{ proof.where }}</span>
                <span class="text-paper/80"> · {{ proof.detail }}</span>
              </li>
            </ul>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
.proof-panel {
  box-shadow: -3px 0 0 var(--color-glitch-pink), 3px 0 0 var(--color-glitch-cyan);
}

.proof-item {
  animation: proof-item-in 300ms ease-out backwards;
}

.proof-item:nth-child(2) {
  animation-delay: 80ms;
}

.proof-enter-active,
.proof-leave-active {
  transition: opacity 200ms ease, transform 200ms ease;
}

.proof-enter-from,
.proof-leave-to {
  opacity: 0;
  transform: translateY(-6px) scaleY(0.9);
}

@keyframes proof-item-in {
  from {
    opacity: 0;
    transform: translateX(-8px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .proof-item {
    animation: none;
  }

  .proof-enter-active,
  .proof-leave-active {
    transition: none;
  }
}
</style>
