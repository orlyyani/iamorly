<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue'

defineProps<{
  skill: string
  /** True while this pill's proof panel is open. */
  active: boolean
}>()

const emit = defineEmits<{ select: [] }>()

interface Particle {
  id: number
  dx: string
  dy: string
  color: string
}

const particles = ref<Particle[]>([])
const popping = ref(false)
const timers: ReturnType<typeof setTimeout>[] = []
let nextId = 0

function burst() {
  popping.value = false
  // Force the class to re-apply so the animation restarts on repeat clicks.
  requestAnimationFrame(() => {
    popping.value = true
  })

  particles.value = Array.from({ length: 10 }, (_, i) => {
    const angle = (i / 10) * Math.PI * 2 + Math.random() * 0.5
    const distance = 28 + Math.random() * 22
    return {
      id: nextId++,
      dx: `${Math.cos(angle) * distance}px`,
      dy: `${Math.sin(angle) * distance}px`,
      color: i % 2 ? 'var(--color-glitch-pink)' : 'var(--color-glitch-cyan)'
    }
  })

  timers.push(setTimeout(() => {
    particles.value = []
    popping.value = false
  }, 700))
}

function onClick() {
  burst()
  emit('select')
}

onBeforeUnmount(() => timers.forEach(clearTimeout))
</script>

<template>
  <button
    type="button"
    class="skill-pill relative inline-flex cursor-pointer items-center gap-1 rounded-md px-2 py-1 text-xs font-medium ring ring-inset select-none"
    :class="[
      active ? 'bg-ink text-paper ring-ink' : 'bg-elevated text-default ring-accented',
      { 'is-popping': popping }
    ]"
    :aria-expanded="active"
    @click="onClick"
  >
    <span class="skill-pill-label">{{ skill }}</span>

    <span
      v-for="p in particles"
      :key="p.id"
      class="skill-pill-particle"
      :style="{ '--dx': p.dx, '--dy': p.dy, 'background': p.color }"
      aria-hidden="true"
    />
  </button>
</template>

<style scoped>
.skill-pill {
  transition: transform 150ms ease, box-shadow 150ms ease, background-color 200ms ease, color 200ms ease;
}

.skill-pill:hover,
.skill-pill:focus-visible {
  transform: translateY(-2px) rotate(-1.5deg);
  box-shadow: -2px 0 0 var(--color-glitch-pink), 2px 0 0 var(--color-glitch-cyan);
}

.skill-pill:hover .skill-pill-label {
  animation: pill-jitter 300ms steps(2) infinite;
}

.skill-pill:active {
  transform: scale(0.92);
}

.skill-pill.is-popping {
  animation: pill-pop 450ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

.skill-pill-particle {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 5px;
  height: 5px;
  margin: -2.5px 0 0 -2.5px;
  pointer-events: none;
  animation: pill-particle 650ms ease-out forwards;
}

@keyframes pill-pop {
  0% { transform: scale(1); }
  30% { transform: scale(1.25, 0.8); }
  55% { transform: scale(0.9, 1.15); }
  75% { transform: scale(1.05, 0.95); }
  100% { transform: scale(1); }
}

@keyframes pill-jitter {
  0% { text-shadow: -1px 0 var(--color-glitch-pink), 1px 0 var(--color-glitch-cyan); }
  100% { text-shadow: 1px 0 var(--color-glitch-pink), -1px 0 var(--color-glitch-cyan); }
}

@keyframes pill-particle {
  0% { transform: translate(0, 0) scale(1); opacity: 1; }
  100% { transform: translate(var(--dx), var(--dy)) scale(0) rotate(180deg); opacity: 0; }
}

/* The click pop is a one-shot response to the visitor, so it always plays; the
   looping hover jitter respects reduced motion. */
@media (prefers-reduced-motion: reduce) {
  .skill-pill:hover .skill-pill-label {
    animation: none;
  }
}
</style>
