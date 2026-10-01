<script setup lang="ts">
import { games } from '~/data/games'

// The slot machine is the main view; the full grid sits behind a toggle. v-show (not
// v-if) so `nuxi generate` still sees the grid's <NuxtImg> and prerenders its images.
const showAll = ref(false)
</script>

<template>
  <div>
    <SectionHeading text="GAMES" />
    <p>
      Casino slots I've developed at Play'n GO, from core gameplay and collect trails to respins and audio.
    </p>
    <SlotMachine />
    <UButton
      color="neutral"
      variant="outline"
      class="mt-6"
      :icon="showAll ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
      :label="showAll ? 'Hide games list' : `Show all ${games.length} games`"
      :aria-expanded="showAll"
      aria-controls="games-grid"
      @click="showAll = !showAll"
    />
    <div
      v-show="showAll"
      id="games-grid"
      class="mt-4 grid grid-cols-2 gap-x-3 gap-y-4 sm:gap-x-4"
    >
      <component
        :is="game.href ? 'a' : 'div'"
        v-for="game in games"
        :key="game.title"
        v-bind="game.href
          ? { href: game.href, target: '_blank', rel: 'noopener noreferrer' }
          : {}"
        class="group block"
      >
        <div class="aspect-[960/393] overflow-hidden rounded-md bg-ink ring-1 ring-black/10">
          <NuxtImg
            v-if="game.image"
            :src="game.image"
            :alt="`${game.title} key art`"
            loading="lazy"
            width="960"
            height="393"
            sizes="xs:50vw md:320px"
            class="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
          />
          <div
            v-else
            class="flex h-full items-center justify-center text-sm tracking-[0.3em] text-paper/60"
          >
            SOON
          </div>
        </div>
        <p
          class="mt-2 text-sm font-semibold sm:text-base"
          :class="game.href && 'group-hover:underline'"
        >
          {{ game.title }}
        </p>
        <p
          v-if="game.role"
          class="text-sm text-(--ui-text-muted)"
        >
          {{ game.role }}
        </p>
      </component>
    </div>
  </div>
</template>
