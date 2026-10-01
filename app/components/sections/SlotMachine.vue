<script setup lang="ts">
import { computed, ref, onBeforeUnmount } from 'vue'
import { games } from '~/data/games'

// Only released games have art to put on a reel. The extra last symbol is the FREE SPINS scatter.
const gameSymbols = games.filter(game => game.image)
const GAME_COUNT = gameSymbols.length
const SCATTER = GAME_COUNT
const count = GAME_COUNT + 1

// Each reel strip is the symbol list with one extra symbol before and two after,
// so the window (two cells tall, payline in the middle) never shows a gap while wrapping.
const strip = Array.from({ length: count + 3 }, (_, j) => (j - 1 + count) % count)

const SPEED = 22 // cells per second at full speed
const ACCEL_MS = 260
const WINDUP_MS = 140
const FIRST_STOP_MS = 900
const STOP_GAP_MS = 380
const SUSPENSE_SPIN_MS = 900 // extra full-speed time on the last reel when the first two match
const SUSPENSE_STOP_MS = 2400 // then a long, slow crawl to a stop
const FREE_SPINS_CHANCE = 0.1
const FREE_SPINS_AWARD = 3
const BIG_WIN_CHANCE = 0.15
const BONUS_BIG_WIN_CHANCE = 0.35
const TEASE_CHANCE = 0.25 // force the first two reels to match so the suspense plays
const NEAR_MISS_CHANCE = 0.7 // on a losing tease, land one symbol short of the match

// easeOutBack: lands a little past the target and settles back, like a real reel stop.
const BACK = 1.2
const easeOutBack = (x: number) => 1 + (BACK + 1) * (x - 1) ** 3 + BACK * (x - 1) ** 2
const BACK_START_VELOCITY = 3 * (BACK + 1) - 2 * BACK
// easeOutQuint: a long tail, so the suspense reel crawls the last few symbols.
const easeOutQuint = (x: number) => 1 - (1 - x) ** 5
const QUINT_START_VELOCITY = 5

const mod = (n: number, m: number) => ((n % m) + m) % m

// A reel position p shows symbol mod(-p, count) on the payline. As p grows the strip
// moves down, so symbol s+1 is the one that slid past just before s landed.
const positionFor = (symbol: number) => mod(-symbol, count)

type Outcome = 'none' | 'pair' | 'big' | 'near' | 'free'
interface Banner { id: number, title: string, subtitle?: string, blocks: number }
interface Bonus { total: number, played: number, wins: number }

// Start with Mega Don (the game Orly led) in the middle.
const positions = ref([positionFor(1), positionFor(0), positionFor(2)])
const results = ref([1, 0, 2])
const pending = ref<number[] | null>(null)
const featuredIndex = ref(0)
const spinning = ref(false)
const suspense = ref(false)
const stopped = ref([true, true, true])
const outcome = ref<Outcome>('none')
const spins = ref(0)
const bonus = ref<Bonus | null>(null)
const bonusSummary = ref<Bonus | null>(null)
const banner = ref<Banner | null>(null)
const glitching = ref(false)
const rebooting = ref(false)

const matchedGame = ref<number | null>(null)

const featured = computed(() => gameSymbols[featuredIndex.value]!)
const suspenseIsScatter = computed(() => pending.value?.[0] === SCATTER)

const sfx = useSlotSounds()
let stopSuspenseSound: (() => void) | null = null

const timers: ReturnType<typeof setTimeout>[] = []
const later = (ms: number, fn: () => void) => timers.push(setTimeout(fn, ms))
let frame = 0
let bannerId = 0

function isWinningCell(reel: number) {
  if (spinning.value) return false
  const symbol = results.value[reel]
  if (outcome.value === 'free') return symbol === SCATTER
  if (outcome.value === 'big' || outcome.value === 'pair' || outcome.value === 'near') {
    return symbol === featuredIndex.value && matchedGame.value !== null
  }
  return false
}

// Scatters light up the moment their reel lands, before the spin is over.
function isLandedScatter(reel: number) {
  return spinning.value && stopped.value[reel] && pending.value?.[reel] === SCATTER
}

function stripStyle(reel: number) {
  // Payline cell index in the strip; the window's top edge sits half a cell above it.
  const center = count + 1 - mod(positions.value[reel]!, count)
  return { transform: `translateY(${-(center - 0.5) * (100 / strip.length)}%)` }
}

function pickResults(): number[] {
  const randomGame = () => Math.floor(Math.random() * GAME_COUNT)
  const randomSymbol = () => Math.floor(Math.random() * count)
  const roll = Math.random()

  if (roll < FREE_SPINS_CHANCE) return [SCATTER, SCATTER, SCATTER]
  if (roll < FREE_SPINS_CHANCE + (bonus.value ? BONUS_BIG_WIN_CHANCE : BIG_WIN_CHANCE)) {
    const game = randomGame()
    return [game, game, game]
  }

  const next = [randomSymbol(), randomSymbol(), randomSymbol()]
  if (Math.random() < TEASE_CHANCE) next[1] = next[0]!
  if (next[0] === next[1] && next[2] !== next[0] && Math.random() < NEAR_MISS_CHANCE) {
    next[2] = mod(next[0]! - 1, count)
  }
  return next
}

/** Overlay text plus a glitch burst; `blocks` sets how much digital noise flickers over the machine. */
function showBanner(title: string, blocks: number, subtitle?: string) {
  const id = ++bannerId
  banner.value = { id, title, subtitle, blocks }
  glitching.value = false
  requestAnimationFrame(() => {
    glitching.value = true
  })
  later(900, () => {
    if (banner.value?.id === id) glitching.value = false
  })
  later(2600, () => {
    if (banner.value?.id === id) banner.value = null
  })
}

function spin() {
  if (spinning.value) return
  const next = pickResults()
  spins.value++
  if (bonus.value) bonus.value.played++
  else bonusSummary.value = null
  outcome.value = 'none'
  banner.value = null
  pending.value = next

  spinning.value = true
  stopped.value = [false, false, false]
  sfx.spinStart()
  const teaseThird = next[0] === next[1]
  const stopAt = [0, 1, 2].map(i => FIRST_STOP_MS + i * STOP_GAP_MS + (i === 2 && teaseThird ? SUSPENSE_SPIN_MS : 0))

  interface Reel {
    phase: 'spin' | 'stop' | 'done'
    from: number
    to: number
    start: number
    duration: number
    ease: (x: number) => number
  }
  const reels: Reel[] = positions.value.map(p => ({ phase: 'spin', from: p, to: p, start: 0, duration: 0, ease: easeOutBack }))
  const startPositions = [...positions.value]
  const t0 = performance.now()
  let last = t0

  const tick = (now: number) => {
    const elapsed = now - t0
    // Clamp so a backgrounded tab doesn't teleport the reels when it comes back.
    const dt = Math.min(0.05, (now - last) / 1000)
    last = now
    const nextPositions = [...positions.value]

    reels.forEach((reel, i) => {
      if (reel.phase === 'spin') {
        if (elapsed < WINDUP_MS) {
          // Small pull back against the spin direction before letting go.
          nextPositions[i] = startPositions[i]! - 0.18 * Math.sin((elapsed / WINDUP_MS) * Math.PI)
          return
        }
        const speed = SPEED * Math.min(1, (elapsed - WINDUP_MS) / ACCEL_MS)
        nextPositions[i] = nextPositions[i]! + speed * dt

        if (elapsed >= stopAt[i]!) {
          // Pick the first landing spot far enough ahead that the ease starts at full speed.
          const crawl = i === 2 && teaseThird
          const startVelocity = crawl ? QUINT_START_VELOCITY : BACK_START_VELOCITY
          const from = nextPositions[i]!
          const minDistance = crawl
            ? (SPEED * SUSPENSE_STOP_MS / 1000) / startVelocity
            : (SPEED * 0.7) / startVelocity
          let to = Math.ceil(from + minDistance)
          while (mod(to, count) !== positionFor(next[i]!)) to++
          Object.assign(reel, {
            phase: 'stop',
            from,
            to,
            start: now,
            duration: ((to - from) * startVelocity / SPEED) * 1000,
            ease: crawl ? easeOutQuint : easeOutBack
          })
        }
      } else if (reel.phase === 'stop') {
        const x = Math.min(1, (now - reel.start) / reel.duration)
        nextPositions[i] = reel.from + (reel.to - reel.from) * reel.ease(x)
        if (x >= 1) {
          nextPositions[i] = reel.to
          reel.phase = 'done'
          stopped.value = stopped.value.map((s, k) => (k === i ? true : s))
          sfx.reelStop()
          if (next[i] === SCATTER) sfx.scatter()
          if (i === 1 && teaseThird) {
            suspense.value = true
            stopSuspenseSound = sfx.suspense((STOP_GAP_MS + SUSPENSE_SPIN_MS + SUSPENSE_STOP_MS) / 1000)
          }
          if (i === 2) {
            stopSuspenseSound?.()
            stopSuspenseSound = null
          }
        }
      }
    })

    // Tick whenever a moving reel carries a new symbol onto the payline.
    if (nextPositions.some((p, i) => reels[i]!.phase !== 'done' && Math.floor(p) !== Math.floor(positions.value[i]!))) {
      sfx.tick()
    }
    positions.value = nextPositions

    if (reels.every(reel => reel.phase === 'done')) finish(next, teaseThird)
    else frame = requestAnimationFrame(tick)
  }

  frame = requestAnimationFrame(tick)
}

function finish(next: number[], teased: boolean) {
  spinning.value = false
  suspense.value = false
  stopped.value = [true, true, true]
  pending.value = null
  results.value = next

  const scatters = next.filter(symbol => symbol === SCATTER).length
  const reelGames = next.filter(symbol => symbol !== SCATTER)
  const matched = reelGames.find((game, i) => reelGames.indexOf(game) !== i)
  const matches = matched === undefined ? 0 : reelGames.filter(game => game === matched).length

  // Feature the matching game, else the middle reel, else any game on the payline.
  if (matched !== undefined) featuredIndex.value = matched
  else if (next[1] !== SCATTER) featuredIndex.value = next[1]!
  else if (reelGames.length) featuredIndex.value = reelGames[0]!

  matchedGame.value = matched ?? null

  // A tease that the third reel doesn't complete is a near miss (it still pays a game pair).
  if (scatters === 3) outcome.value = 'free'
  else if (matches === 3) outcome.value = 'big'
  else if (teased) outcome.value = 'near'
  else if (matches === 2) outcome.value = 'pair'
  else outcome.value = 'none'

  if (outcome.value === 'big') {
    showBanner('BIG WIN', 26, `3× ${featured.value.title}`)
    sfx.bigWin()
  }
  if (outcome.value === 'pair' || (outcome.value === 'near' && matches === 2)) showBanner('', 8)
  if (outcome.value === 'pair') sfx.pair()
  if (outcome.value === 'near') sfx.nearMiss()

  if (outcome.value === 'free') {
    if (bonus.value) {
      bonus.value.total += FREE_SPINS_AWARD
      showBanner(`+${FREE_SPINS_AWARD} SPINS`, 30, 'Retrigger!')
      sfx.pair()
    } else {
      bonus.value = { total: FREE_SPINS_AWARD, played: 0, wins: 0 }
      rebooting.value = true
      later(900, () => {
        rebooting.value = false
      })
      showBanner('FREE SPINS', 40, `${FREE_SPINS_AWARD} spins · better odds`)
      sfx.freeSpins()
    }
    later(2600, spin)
    return
  }

  if (!bonus.value) return
  if (matches >= 2) bonus.value.wins++

  if (bonus.value.played < bonus.value.total) {
    later(outcome.value === 'big' ? 2600 : 1400, spin)
  } else {
    const done = bonus.value
    later(outcome.value === 'big' ? 2600 : 900, () => {
      bonus.value = null
      bonusSummary.value = done
      rebooting.value = true
      later(900, () => {
        rebooting.value = false
      })
      sfx.bonusOver()
      showBanner('BONUS OVER', 20, `${done.wins} win${done.wins === 1 ? '' : 's'} in ${done.total} free spins`)
    })
  }
}

// Digital-noise blocks that flicker over the machine on a win, regenerated per banner
// so each burst looks different.
const BLOCK_COLORS = ['var(--color-glitch-pink)', 'var(--color-glitch-cyan)', '#ffffff']
const glitchBlocks = computed(() => {
  if (!banner.value) return []
  const { id, blocks } = banner.value
  return Array.from({ length: blocks }, (_, i) => ({
    id: `${id}-${i}`,
    style: {
      'left': `${-5 + Math.random() * 95}%`,
      'top': `${Math.random() * 95}%`,
      'width': `${8 + Math.random() * 40}%`,
      'height': `${2 + Math.random() * 14}px`,
      'background': BLOCK_COLORS[i % BLOCK_COLORS.length],
      '--shift': `${(Math.random() - 0.5) * 40}px`,
      'animationDelay': `${Math.random() * 500}ms`,
      'animationDuration': `${400 + Math.random() * 500}ms`
    }
  }))
})

onBeforeUnmount(() => {
  cancelAnimationFrame(frame)
  timers.forEach(clearTimeout)
  stopSuspenseSound?.()
})
</script>

<template>
  <div class="mt-5">
    <div
      class="slot-machine relative rounded-xl bg-ink p-3 sm:p-4"
      :class="{
        'is-big-win': outcome === 'big',
        'is-bonus': bonus,
        'is-suspense': suspense,
        'is-rebooting': rebooting
      }"
    >
      <div
        v-if="bonus"
        class="scanlines pointer-events-none absolute inset-0 rounded-xl"
        aria-hidden="true"
      />

      <div class="mb-3 flex items-center justify-between text-[0.65rem] font-semibold tracking-[0.3em] text-paper/60 sm:text-xs">
        <span
          v-if="bonus"
          class="bonus-label text-paper"
        >FREE SPINS</span>
        <span v-else>PLAY'N GO · ORLY'S REELS</span>
        <span class="flex items-center gap-2">
          <span v-if="bonus">{{ bonus.played }}/{{ bonus.total }}</span>
          <span v-else>SPINS {{ spins }}</span>
          <button
            type="button"
            class="sound-toggle -my-1 rounded p-1 text-paper/70 hover:text-paper"
            :aria-label="sfx.muted.value ? 'Turn sound on' : 'Turn sound off'"
            :aria-pressed="!sfx.muted.value"
            :title="sfx.muted.value ? 'Sound off' : 'Sound on'"
            @click="sfx.toggle"
          >
            <UIcon
              :name="sfx.muted.value ? 'i-lucide-volume-x' : 'i-lucide-volume-2'"
              class="block size-4"
            />
          </button>
        </span>
      </div>

      <div
        class="reels relative grid grid-cols-3 gap-2"
        :class="{ 'is-glitching': glitching }"
      >
        <div
          v-for="reel in 3"
          :key="reel"
          class="reel-window relative aspect-[5/8] overflow-hidden rounded-md bg-paper/5"
          :class="{
            'is-suspense-reel': suspense && reel === 3,
            'is-dimmed': suspense && reel !== 3,
            'is-near-miss': outcome === 'near' && reel === 3
          }"
        >
          <div
            class="reel-strip will-change-transform"
            :class="{ 'is-spinning': spinning && !stopped[reel - 1] }"
            :style="stripStyle(reel - 1)"
          >
            <div
              v-for="(symbol, j) in strip"
              :key="j"
              class="aspect-[5/4] p-1"
            >
              <div
                v-if="symbol === SCATTER"
                class="scatter-symbol flex h-full flex-col items-center justify-center rounded"
              >
                <span class="scatter-text text-base leading-none font-black text-paper sm:text-lg">FREE</span>
                <span class="mt-0.5 text-[0.5rem] font-semibold tracking-[0.3em] text-glitch-cyan sm:text-[0.6rem]">SPINS</span>
              </div>
              <!-- Every key art has the game's logo in its bottom-left corner;
                   scale the art up and pin that corner so the symbol is the logo. -->
              <div
                v-else
                class="relative h-full overflow-hidden rounded"
              >
                <NuxtImg
                  :src="gameSymbols[symbol]!.image"
                  :alt="gameSymbols[symbol]!.title"
                  width="960"
                  height="393"
                  sizes="xs:50vw md:320px"
                  class="absolute bottom-0 left-0 w-[320%] max-w-none"
                  draggable="false"
                />
              </div>
            </div>
          </div>
          <div
            class="reel-payline pointer-events-none absolute inset-x-0 top-1/4 h-1/2 rounded"
            :class="{ 'is-win': isWinningCell(reel - 1), 'is-scatter': isLandedScatter(reel - 1) }"
          />
        </div>

        <!-- Payline markers -->
        <span
          class="pointer-events-none absolute top-1/2 -left-3 -translate-y-1/2 border-y-[6px] border-l-[8px] border-y-transparent border-l-glitch-pink sm:-left-4"
          aria-hidden="true"
        />
        <span
          class="pointer-events-none absolute top-1/2 -right-3 -translate-y-1/2 border-y-[6px] border-r-[8px] border-y-transparent border-r-glitch-cyan sm:-right-4"
          aria-hidden="true"
        />
      </div>

      <div
        v-if="banner"
        :key="banner.id"
        class="pointer-events-none absolute inset-y-0 -inset-x-3 z-10 overflow-hidden"
        aria-hidden="true"
      >
        <!-- Noise may bleed a little past the cabinet, but stays inside the page gutter. -->
        <span
          v-for="block in glitchBlocks"
          :key="block.id"
          class="glitch-block"
          :style="block.style"
        />
        <div
          v-if="banner.title"
          class="banner absolute inset-x-3 top-1/2 flex -translate-y-1/2 flex-col items-center bg-ink/80 py-3"
        >
          <span
            class="banner-title text-3xl font-black tracking-[0.2em] text-paper sm:text-4xl"
            :data-text="banner.title"
          >{{ banner.title }}</span>
          <span
            v-if="banner.subtitle"
            class="mt-1 text-xs font-semibold tracking-[0.2em] text-glitch-cyan uppercase"
          >{{ banner.subtitle }}</span>
        </div>
      </div>

      <UButton
        block
        size="lg"
        color="primary"
        class="spin-button relative mt-3 justify-center font-black tracking-[0.3em]"
        :disabled="spinning || !!bonus"
        :icon="spinning ? 'i-lucide-loader' : 'i-lucide-dices'"
        :ui="{ leadingIcon: spinning ? 'animate-spin' : '' }"
        @click="spin"
      >
        <template v-if="bonus">
          FREE SPIN {{ bonus.played }}/{{ bonus.total }}
        </template>
        <template v-else>
          {{ spinning ? 'SPINNING' : 'SPIN' }}
        </template>
      </UButton>
    </div>

    <p
      class="mt-3 mb-2 text-xs font-semibold tracking-[0.3em] text-(--ui-text-muted)"
      aria-live="polite"
    >
      <template v-if="suspense">
        {{ suspenseIsScatter ? 'ONE MORE SCATTER...' : 'COME ON...' }}
      </template>
      <template v-else-if="spinning">
        {{ bonus ? `FREE SPIN ${bonus.played} OF ${bonus.total}` : 'GOOD LUCK...' }}
      </template>
      <template v-else-if="bonusSummary">
        BONUS OVER · {{ bonusSummary.wins }} WIN{{ bonusSummary.wins === 1 ? '' : 'S' }} IN {{ bonusSummary.total }} FREE SPINS
      </template>
      <template v-else-if="outcome === 'free'">
        FREE SPINS TRIGGERED!
      </template>
      <template v-else-if="outcome === 'big'">
        BIG WIN · 3× {{ featured.title.toUpperCase() }}
      </template>
      <template v-else-if="outcome === 'pair'">
        2× MATCH · {{ featured.title.toUpperCase() }}
      </template>
      <template v-else-if="outcome === 'near'">
        SO CLOSE!{{ matchedGame !== null ? ` · 2× ${featured.title.toUpperCase()}` : '' }}
      </template>
      <template v-else-if="spins">
        YOU LANDED
      </template>
      <template v-else>
        FEATURED · HIT SPIN FOR ANOTHER
      </template>
    </p>

    <Transition
      name="featured"
      mode="out-in"
    >
      <a
        :key="featured.title"
        :href="featured.href"
        target="_blank"
        rel="noopener noreferrer"
        class="group flex items-center gap-3"
        :class="{ 'opacity-40': spinning }"
      >
        <div class="aspect-[960/393] w-1/2 shrink-0 overflow-hidden rounded-md bg-ink ring-1 ring-black/10">
          <NuxtImg
            :src="featured.image"
            :alt="`${featured.title} key art`"
            width="960"
            height="393"
            sizes="xs:50vw md:320px"
            class="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
          />
        </div>
        <div>
          <p class="font-semibold group-hover:underline">
            {{ featured.title }}
          </p>
          <p
            v-if="featured.role"
            class="text-sm text-(--ui-text-muted)"
          >
            {{ featured.role }}
          </p>
          <p class="mt-1 inline-flex items-center gap-1 text-sm">
            Play it <UIcon
              name="i-lucide-arrow-up-right"
              class="size-4"
            />
          </p>
        </div>
      </a>
    </Transition>
  </div>
</template>

<style scoped>
.slot-machine {
  box-shadow: -4px 0 0 var(--color-glitch-pink), 4px 0 0 var(--color-glitch-cyan);
  transition: box-shadow 300ms ease, background 600ms ease;
}

.slot-machine.is-big-win {
  animation: machine-flash 900ms steps(2) 3;
}

.slot-machine.is-suspense {
  animation: heartbeat 700ms ease-in-out infinite;
}

/* Bonus mode: tinted cabinet, chromatic border drift, and scrolling scanlines. */
.slot-machine.is-bonus {
  background: linear-gradient(160deg, #020403 10%, #2a0029 55%, #00232b);
  animation: bonus-border 1.6s steps(4) infinite;
}

.scanlines {
  background: repeating-linear-gradient(0deg, rgb(255 255 255 / 0.05) 0 1px, transparent 1px 3px);
  animation: scanlines 8s linear infinite;
}

.bonus-label {
  text-shadow: -1px 0 var(--color-glitch-pink), 1px 0 var(--color-glitch-cyan);
}

/* CRT power-off / power-on when free spins start and end. */
.slot-machine.is-rebooting {
  animation: crt-reboot 900ms ease-in-out;
}

.reel-window {
  mask-image: linear-gradient(transparent, #000 20%, #000 80%, transparent);
  transition: opacity 300ms ease;
}

.reel-window.is-dimmed {
  opacity: 0.35;
}

.reel-window.is-suspense-reel {
  animation: anticipation 350ms ease-in-out infinite alternate;
}

.reel-window.is-near-miss {
  animation: signal-drop 550ms steps(1);
}

.reel-strip.is-spinning {
  filter: blur(1.5px) brightness(1.15);
}

/* Win: the reels tear into slices and split into pink/cyan. */
.reels.is-glitching {
  animation: screen-tear 900ms steps(1);
}

.scatter-symbol {
  background:
    linear-gradient(135deg, rgb(255 0 193 / 0.45), transparent 60%),
    linear-gradient(315deg, rgb(0 255 249 / 0.35), transparent 60%),
    var(--color-ink);
  box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.25);
}

.scatter-text {
  text-shadow: -2px 0 var(--color-glitch-pink), 2px 0 var(--color-glitch-cyan);
}

.reel-payline {
  box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.15);
}

.reel-payline.is-win {
  animation: payline-win 600ms ease-in-out infinite alternate;
}

.reel-payline.is-scatter {
  animation: scatter-land 500ms steps(2) 2;
}

.glitch-block {
  position: absolute;
  opacity: 0;
  mix-blend-mode: screen;
  animation-name: glitch-block;
  animation-timing-function: steps(1);
  animation-fill-mode: forwards;
}

.banner {
  animation: banner-in 2.6s ease-out forwards;
}

/* The banner title glitches like the name heading: offset pink/cyan copies cut into slices. */
.banner-title {
  position: relative;
}

.banner-title::before,
.banner-title::after {
  content: attr(data-text);
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.banner-title::before {
  color: var(--color-glitch-pink);
  transform: translateX(-3px);
  animation: glitch-slice-a 700ms steps(1) infinite;
}

.banner-title::after {
  color: var(--color-glitch-cyan);
  transform: translateX(3px);
  animation: glitch-slice-b 600ms steps(1) infinite;
}

.spin-button:not(:disabled):hover {
  animation: spin-button-nudge 500ms ease-in-out;
}

.featured-enter-active,
.featured-leave-active {
  transition: opacity 200ms ease, transform 200ms ease;
}

.featured-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.featured-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@keyframes machine-flash {
  0% { box-shadow: -4px 0 0 var(--color-glitch-pink), 4px 0 0 var(--color-glitch-cyan); }
  100% { box-shadow: 0 0 0 4px var(--color-glitch-cyan), 0 0 28px var(--color-glitch-pink); }
}

@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  15% { transform: scale(1.015); }
  30% { transform: scale(1); }
  45% { transform: scale(1.01); }
}

@keyframes bonus-border {
  0% { box-shadow: -4px 0 0 var(--color-glitch-pink), 4px 0 0 var(--color-glitch-cyan), 0 0 24px rgb(255 0 193 / 0.35); }
  25% { box-shadow: -5px 1px 0 var(--color-glitch-cyan), 5px -1px 0 var(--color-glitch-pink), 0 0 24px rgb(0 255 249 / 0.35); }
  50% { box-shadow: -3px 0 0 var(--color-glitch-pink), 3px 0 0 var(--color-glitch-cyan), 0 0 30px rgb(255 0 193 / 0.4); }
  75% { box-shadow: -6px -1px 0 var(--color-glitch-cyan), 6px 1px 0 var(--color-glitch-pink), 0 0 24px rgb(0 255 249 / 0.35); }
}

@keyframes scanlines {
  to { background-position: 0 120px; }
}

@keyframes crt-reboot {
  0% { transform: scale(1); filter: brightness(1); }
  20% { transform: scale(1.02, 0.02); filter: brightness(4); }
  40% { transform: scale(0.2, 0.02); filter: brightness(4); }
  55% { transform: scale(1.02, 0.02); filter: brightness(3); }
  75% { transform: scale(1, 1.03); filter: brightness(1.6) saturate(2); }
  100% { transform: scale(1); filter: brightness(1); }
}

@keyframes anticipation {
  from { box-shadow: 0 0 0 2px var(--color-glitch-pink); filter: none; }
  to { box-shadow: 0 0 0 2px var(--color-glitch-cyan), 0 0 18px var(--color-glitch-cyan); filter: drop-shadow(-2px 0 var(--color-glitch-pink)) drop-shadow(2px 0 var(--color-glitch-cyan)); }
}

@keyframes signal-drop {
  0% { transform: translateX(-5px); filter: drop-shadow(-3px 0 var(--color-glitch-pink)) drop-shadow(3px 0 var(--color-glitch-cyan)); }
  20% { transform: translateX(4px) skewX(-4deg); clip-path: inset(0 0 40% 0); }
  40% { transform: translateX(-2px); clip-path: inset(30% 0 0 0); filter: hue-rotate(90deg); }
  60% { transform: translateX(3px); clip-path: none; filter: drop-shadow(2px 0 var(--color-glitch-pink)); }
  80% { transform: translateX(-1px); filter: none; }
  100% { transform: none; }
}

@keyframes screen-tear {
  0% { transform: translateX(-6px) skewX(5deg); clip-path: inset(0 0 55% 0); filter: drop-shadow(-4px 0 var(--color-glitch-pink)) drop-shadow(4px 0 var(--color-glitch-cyan)); }
  12% { transform: translateX(7px); clip-path: inset(35% 0 0 0); }
  24% { transform: none; clip-path: none; filter: drop-shadow(-3px 0 var(--color-glitch-pink)) drop-shadow(3px 0 var(--color-glitch-cyan)) hue-rotate(60deg); }
  36% { transform: translateX(-4px); clip-path: inset(15% 0 40% 0); }
  48% { transform: translateX(3px) skewX(-3deg); clip-path: inset(60% 0 5% 0); filter: drop-shadow(3px 0 var(--color-glitch-pink)) drop-shadow(-3px 0 var(--color-glitch-cyan)); }
  60% { transform: none; clip-path: none; filter: drop-shadow(-2px 0 var(--color-glitch-pink)) drop-shadow(2px 0 var(--color-glitch-cyan)); }
  80% { transform: translateX(2px); filter: drop-shadow(-1px 0 var(--color-glitch-pink)) drop-shadow(1px 0 var(--color-glitch-cyan)); }
  100% { transform: none; clip-path: none; filter: none; }
}

@keyframes payline-win {
  from { box-shadow: inset 0 0 0 2px var(--color-glitch-pink); }
  to { box-shadow: inset 0 0 0 3px var(--color-glitch-cyan), inset 0 0 18px var(--color-glitch-cyan); }
}

@keyframes scatter-land {
  0% { box-shadow: inset 0 0 0 3px var(--color-glitch-cyan), inset 0 0 24px var(--color-glitch-pink); }
  100% { box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.15); }
}

@keyframes glitch-block {
  0% { opacity: 0; transform: none; }
  10% { opacity: 0.9; transform: translateX(0); }
  30% { opacity: 0.7; transform: translateX(var(--shift)); }
  45% { opacity: 0; }
  60% { opacity: 0.85; transform: translateX(calc(var(--shift) * -1)) scaleY(1.6); }
  80% { opacity: 0; }
  100% { opacity: 0; }
}

@keyframes banner-in {
  0% { opacity: 0; transform: translateY(-50%) scaleY(0.05); }
  8% { opacity: 1; transform: translateY(-50%) scaleY(1.2); }
  14% { transform: translateY(-50%) scaleY(1); }
  85% { opacity: 1; }
  100% { opacity: 0; transform: translateY(-50%); }
}

@keyframes glitch-slice-a {
  0% { clip-path: inset(10% 0 75% 0); transform: translateX(-3px); }
  20% { clip-path: inset(60% 0 15% 0); transform: translateX(-6px); }
  40% { clip-path: inset(30% 0 50% 0); transform: translateX(-2px); }
  60% { clip-path: inset(85% 0 2% 0); transform: translateX(-5px); }
  80% { clip-path: inset(0 0 85% 0); transform: translateX(-3px); }
}

@keyframes glitch-slice-b {
  0% { clip-path: inset(70% 0 10% 0); transform: translateX(3px); }
  25% { clip-path: inset(5% 0 80% 0); transform: translateX(6px); }
  50% { clip-path: inset(45% 0 35% 0); transform: translateX(2px); }
  75% { clip-path: inset(20% 0 60% 0); transform: translateX(5px); }
}

@keyframes spin-button-nudge {
  30% { transform: rotate(-1.5deg); }
  60% { transform: rotate(1.5deg); }
}

/* The roll, banners, reboot, and one-shot glitch bursts respond to a spin and end on
   their own, so they always play. Only the continuous loops respect reduced motion. */
@media (prefers-reduced-motion: reduce) {
  .slot-machine.is-big-win,
  .slot-machine.is-suspense,
  .slot-machine.is-bonus,
  .scanlines,
  .reel-window.is-suspense-reel,
  .reel-payline.is-win,
  .spin-button:not(:disabled):hover {
    animation: none;
  }
}
</style>
