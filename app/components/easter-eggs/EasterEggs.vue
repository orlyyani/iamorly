<script setup lang="ts">
import { computed, ref, watch, onMounted, onBeforeUnmount } from 'vue'

// Three easter eggs, from easiest to hardest to find:
//   #1  a greeting in the browser console
//   #2  a hidden terminal: type "orly" anywhere, or double-click the "iamorly" badge
//   #3  the Konami code: GLITCH MODE + a super bonus on the slot machine
const { terminalOpen, glitchMode, triggerGlitchMode } = useEasterEggs()

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']
const SECRET_WORD = 'orly'
let keys: string[] = []

function isTyping(target: EventTarget | null) {
  const el = target as HTMLElement | null
  return !!el && (el.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName))
}

function onKeydown(event: KeyboardEvent) {
  if (isTyping(event.target) || event.metaKey || event.ctrlKey || event.altKey) return
  const key = event.key.length === 1 ? event.key.toLowerCase() : event.key
  keys = [...keys, key].slice(-KONAMI.length)

  if (KONAMI.every((k, i) => keys[i] === k)) {
    keys = []
    triggerGlitchMode()
  } else if (keys.slice(-SECRET_WORD.length).join('') === SECRET_WORD && !terminalOpen.value) {
    keys = []
    terminalOpen.value = true
  }
}

function greetConsole() {
  const art = [
    '  ___  ____  _  __   __',
    ' / _ \\|  _ \\| | \\ \\ / /',
    '| | | | |_) | |  \\ V / ',
    '| |_| |  _ <| |___| |  ',
    ' \\___/|_| \\_\\_____|_|  '
  ].join('\n')
  console.log(`%c${art}`, 'color:#ff00c1;font-family:monospace;font-weight:bold;text-shadow:2px 0 #00fff9')
  console.log(
    '%cHey, fellow dev 👋 you found easter egg #1 of 3.\n%cThe next one is hiding in plain sight: try typing my name on the page.',
    'color:#00fff9;font-family:monospace;font-size:13px',
    'color:inherit;font-family:monospace'
  )
}

// GLITCH MODE: the whole page tears (see .glitch-mode in main.css) under a noise overlay.
const BLOCK_COLORS = ['var(--color-glitch-pink)', 'var(--color-glitch-cyan)', '#ffffff']
const burstId = ref(0)
const noiseBlocks = computed(() => Array.from({ length: glitchMode.value ? 40 : 0 }, (_, i) => ({
  id: `${burstId.value}-${i}`,
  style: {
    'left': `${Math.random() * 90}%`,
    'top': `${Math.random() * 100}%`,
    'width': `${5 + Math.random() * 35}%`,
    'height': `${2 + Math.random() * 18}px`,
    'background': BLOCK_COLORS[i % BLOCK_COLORS.length],
    '--shift': `${(Math.random() - 0.5) * 80}px`,
    'animationDelay': `${Math.random() * 1400}ms`,
    'animationDuration': `${300 + Math.random() * 500}ms`
  }
})))

watch(glitchMode, (on) => {
  if (on) burstId.value++
  document.documentElement.classList.toggle('glitch-mode', on)
})

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
  greetConsole()
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  document.documentElement.classList.remove('glitch-mode')
})
</script>

<template>
  <!-- Teleported: GLITCH MODE transforms #__nuxt, which would break position: fixed inside it. -->
  <Teleport to="body">
    <EggTerminal />

    <div
      v-if="glitchMode"
      class="pointer-events-none fixed inset-0 z-[60] overflow-hidden"
      aria-hidden="true"
    >
      <div class="glitch-scanlines absolute inset-0" />
      <span
        v-for="block in noiseBlocks"
        :key="block.id"
        class="glitch-noise absolute"
        :style="block.style"
      />
      <div class="absolute inset-x-0 top-1/3 flex flex-col items-center bg-ink/85 py-4">
        <span
          class="glitch-mode-title text-3xl font-black tracking-[0.25em] text-paper sm:text-5xl"
          data-text="GLITCH MODE"
        >GLITCH MODE</span>
        <span class="mt-2 text-xs font-semibold tracking-[0.3em] text-glitch-cyan sm:text-sm">
          EASTER EGG #3 · SUPER BONUS UNLOCKED
        </span>
      </div>
    </div>

    <p
      class="sr-only"
      aria-live="polite"
    >
      {{ glitchMode ? 'Glitch mode unlocked. Super bonus on the slot machine.' : '' }}
    </p>
  </Teleport>
</template>

<style scoped>
.glitch-scanlines {
  background: repeating-linear-gradient(0deg, rgb(255 255 255 / 0.06) 0 1px, transparent 1px 3px);
  animation: glitch-flicker 120ms steps(2) infinite;
}

.glitch-noise {
  opacity: 0;
  mix-blend-mode: difference;
  animation-name: glitch-noise;
  animation-timing-function: steps(1);
  animation-fill-mode: forwards;
}

.glitch-mode-title {
  position: relative;
  animation: glitch-title-in 2.6s ease-out forwards;
}

.glitch-mode-title::before,
.glitch-mode-title::after {
  content: attr(data-text);
  position: absolute;
  inset: 0;
}

.glitch-mode-title::before {
  color: var(--color-glitch-pink);
  transform: translateX(-4px);
  animation: title-slice-a 500ms steps(1) infinite;
}

.glitch-mode-title::after {
  color: var(--color-glitch-cyan);
  transform: translateX(4px);
  animation: title-slice-b 420ms steps(1) infinite;
}

@keyframes glitch-flicker {
  50% { opacity: 0.4; }
}

@keyframes glitch-noise {
  0% { opacity: 0; }
  10% { opacity: 0.9; transform: translateX(0); }
  35% { opacity: 0.8; transform: translateX(var(--shift)); }
  50% { opacity: 0; }
  65% { opacity: 0.9; transform: translateX(calc(var(--shift) * -1)) scaleY(2); }
  85%, 100% { opacity: 0; }
}

@keyframes glitch-title-in {
  0% { opacity: 0; transform: scaleY(0.05); }
  8% { opacity: 1; transform: scaleY(1.3) skewX(-10deg); }
  14% { transform: none; }
  85% { opacity: 1; }
  100% { opacity: 0; }
}

@keyframes title-slice-a {
  0% { clip-path: inset(10% 0 70% 0); transform: translateX(-4px); }
  25% { clip-path: inset(55% 0 20% 0); transform: translateX(-8px); }
  50% { clip-path: inset(30% 0 45% 0); transform: translateX(-2px); }
  75% { clip-path: inset(80% 0 5% 0); transform: translateX(-6px); }
}

@keyframes title-slice-b {
  0% { clip-path: inset(65% 0 15% 0); transform: translateX(4px); }
  33% { clip-path: inset(5% 0 75% 0); transform: translateX(8px); }
  66% { clip-path: inset(40% 0 35% 0); transform: translateX(3px); }
}
</style>
