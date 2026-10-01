<script setup lang="ts">
import { nextTick, ref, watch, onBeforeUnmount } from 'vue'
import { careerStartDate, experience } from '~/data/experience'
import { skillCategories } from '~/data/skills'
import { games } from '~/data/games'
import { contactEmail, socialLinks } from '~/data/socialLinks'
import { openToWork, workPreferences } from '~/data/availability'

interface Line {
  kind: 'input' | 'output' | 'accent' | 'error' | 'muted'
  text: string
  href?: string
}

const { terminalOpen, found, markFound, requestSlot, triggerGlitchMode } = useEasterEggs()

const PROMPT = 'guest@iamorly:~$'
const RESUME = '/Orly-John-Yanson-Resume.pdf'

const lines = ref<Line[]>([])
const input = ref('')
const history: string[] = []
let historyIndex = 0
const inputEl = ref<HTMLInputElement | null>(null)
const bodyEl = ref<HTMLElement | null>(null)
const matrix = ref(false)
const timers: ReturnType<typeof setTimeout>[] = []
let clueLevel = 0

// Each `clue` run gets more direct: riddle -> hint -> answer.
const CLUES: { id: string, title: string, foundAs?: 'terminal' | 'konami', levels: string[] }[] = [
  {
    id: '#1',
    title: 'the dev window',
    levels: [
      'Every developer has a secret window. Look where the errors go.',
      'Open your browser\'s DevTools and check the Console tab.',
      'Press F12 (or Cmd+Option+J on a Mac), then open Console.'
    ]
  },
  {
    id: '#2',
    title: 'the terminal',
    foundAs: 'terminal',
    levels: ['You\'re standing in it.']
  },
  {
    id: '#3',
    title: 'the code',
    foundAs: 'konami',
    levels: [
      'Old-school gamers know a code that gives you 30 extra lives.',
      'Up, up, down, down... you know the rest. Type it on the page, not in here.',
      '↑ ↑ ↓ ↓ ← → ← → B A, pressed on the page itself (close this first).'
    ]
  }
]

const out = (text: string, kind: Line['kind'] = 'output', href?: string): Line => ({ kind, text, href })

function yearsOfExperience() {
  return Math.floor((Date.now() - careerStartDate.getTime()) / (365.25 * 24 * 3600 * 1000))
}

const BANNER: Line[] = [
  out('iamorly terminal v1.0 · you found easter egg #2', 'accent'),
  out('type `help` to see what you can do here, or `clue` if you\'re hunting eggs.', 'muted'),
  out('')
]

const commands: Record<string, { help?: string, run: (args: string[]) => Line[] }> = {
  help: {
    run: () => [
      out('available commands:', 'accent'),
      ...Object.entries(commands)
        .filter(([, command]) => command.help)
        .map(([name, command]) => out(`  ${name.padEnd(10)} ${command.help}`)),
      out(''),
      out('psst: some commands are not on this list.', 'muted')
    ]
  },
  clue: {
    help: 'stuck? get a hint for the easter eggs',
    run: () => {
      const level = Math.min(clueLevel, 2)
      clueLevel++
      const clueLines = CLUES.flatMap((clue) => {
        const isFound = clue.foundAs && found.value.includes(clue.foundAs)
        const text = clue.levels[Math.min(level, clue.levels.length - 1)]!
        return [
          out(`${clue.id}  ${clue.title}${isFound ? '  ✓ found' : ''}`, isFound ? 'muted' : 'accent'),
          out(`    ${isFound && clue.foundAs !== 'terminal' ? 'nice work.' : text}`, isFound ? 'muted' : 'output')
        ]
      })
      const footer = level < 2
        ? 'still stuck? run `clue` again for a bigger hint.'
        : 'that\'s every answer. `cat .secrets` has the cheat sheet.'
      return [...clueLines, out(''), out(footer, 'muted')]
    }
  },
  whoami: {
    help: 'who is this guy',
    run: () => [
      out('Orly John Yanson', 'accent'),
      out('Front-End & Game Developer · Remote from the Philippines (UTC+8)'),
      out(`${yearsOfExperience()}+ years shipping web apps; now building casino slots at Play'n GO.`),
      out('Vue 3 · Nuxt 3 · TypeScript · Laravel · and whatever this terminal is.')
    ]
  },
  skills: {
    help: 'what I work with',
    run: () => skillCategories.flatMap(category => [
      out(category.name, 'accent'),
      out(`  ${category.skills.join(' · ')}`)
    ])
  },
  experience: {
    help: 'where I have worked',
    run: () => experience.map(entry => out(`${`${entry.startDate} – ${entry.endDate}`.padEnd(22)} ${entry.role} @ ${entry.company}`))
  },
  games: {
    help: 'slots I have worked on',
    run: () => [
      ...games.map(game => out(`  ${game.title}${game.role ? ` (${game.role.toLowerCase()})` : ''}`, 'output', game.href)),
      out(''),
      out('try `spin` to play them.', 'muted')
    ]
  },
  spin: {
    help: 'pull the slot machine',
    run: () => {
      timers.push(setTimeout(() => {
        terminalOpen.value = false
        requestSlot('spin')
      }, 400))
      return [out('closing terminal... good luck.', 'accent')]
    }
  },
  hire: {
    help: 'work with me',
    run: () => [
      ...(openToWork
        ? [out(workPreferences.summary, 'accent'), out(`roles: ${workPreferences.roles.join(' · ')}`)]
        : [out('Always happy to talk about interesting projects.', 'accent')]),
      out(`email:  ${contactEmail}`, 'output', `mailto:${contactEmail}`),
      out(`resume: ${RESUME}`, 'output', RESUME),
      out(''),
      out('or, if you have the right permissions: `sudo hire orly`', 'muted')
    ]
  },
  social: {
    help: 'find me elsewhere',
    run: () => socialLinks.map(link => out(`  ${link.label.padEnd(9)} ${link.href.replace(/^mailto:/, '')}`, 'output', link.href))
  },
  resume: {
    help: 'open my resume',
    run: () => {
      window.open(RESUME, '_blank', 'noopener')
      return [out('opening resume.pdf...', 'accent', RESUME)]
    }
  },
  ls: {
    run: () => [out('projects/  games/  skills.txt  resume.pdf  .secrets/')]
  },
  cat: {
    run: ([file]) => {
      if (!file) return [out('usage: cat <file>', 'error')]
      if (file.includes('secret')) {
        return [
          out('easter eggs on this site:', 'accent'),
          out('  #1  open the browser console'),
          out('  #2  you are here'),
          out('  #3  ↑ ↑ ↓ ↓ ← → ← → B A  (on the page, not in here)')
        ]
      }
      if (file.startsWith('skills')) return commands.skills!.run([])
      if (file.startsWith('resume')) return commands.resume!.run([])
      return [out(`cat: ${file}: Is a directory, or just not that kind of file`, 'error')]
    }
  },
  cd: {
    run: ([dir]) => (dir?.includes('secret')
      ? [out('cd: .secrets: Permission denied. Maybe try reading it instead?', 'error')]
      : [out('you are already where the fun is.', 'muted')])
  },
  sudo: {
    run: (args) => {
      if (args.join(' ') === 'hire orly') {
        timers.push(setTimeout(() => {
          window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent('sudo hire orly')}`
        }, 1200))
        return [
          out('[sudo] password for recruiter: ********', 'muted'),
          out('access granted. opening your mail client...', 'accent')
        ]
      }
      return [out('guest is not in the sudoers file. This incident will be reported.', 'error')]
    }
  },
  rm: {
    run: () => [out('nice try. this site is static, there is nothing to delete.', 'error')]
  },
  glitch: {
    run: () => {
      timers.push(setTimeout(() => {
        terminalOpen.value = false
        triggerGlitchMode()
      }, 400))
      return [out('you know the code, huh. engaging GLITCH MODE...', 'accent')]
    }
  },
  matrix: {
    run: () => {
      matrix.value = true
      timers.push(setTimeout(() => {
        matrix.value = false
      }, 4000))
      return [out('wake up, recruiter...', 'accent')]
    }
  },
  coffee: {
    run: () => [
      out('    ( (', 'muted'),
      out('     ) )', 'muted'),
      out('  ........'),
      out('  |      |]'),
      out('  \\      /'),
      out('   `----\''),
      out('brewing. this is how the slots get built.', 'accent')
    ]
  },
  clear: {
    help: 'clear the screen',
    run: () => {
      lines.value = []
      return []
    }
  },
  exit: {
    help: 'close the terminal',
    run: () => {
      terminalOpen.value = false
      return []
    }
  }
}
commands.hint = commands.clue!
commands.clues = commands.clue!
commands.quit = commands.exit!
commands.about = commands.whoami!
commands.contact = commands.hire!

function scrollToBottom() {
  void nextTick(() => {
    if (bodyEl.value) bodyEl.value.scrollTop = bodyEl.value.scrollHeight
  })
}

function submit() {
  const raw = input.value.trim()
  input.value = ''
  lines.value.push(out(`${PROMPT} ${raw}`, 'input'))
  if (raw) {
    history.push(raw)
    historyIndex = history.length
    const [name = '', ...args] = raw.split(/\s+/)
    const command = commands[name.toLowerCase()]
    lines.value.push(...(command
      ? command.run(args)
      : [out(`command not found: ${name}. type \`help\` for a list.`, 'error')]))
  }
  scrollToBottom()
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'ArrowUp' && history.length) {
    event.preventDefault()
    historyIndex = Math.max(0, historyIndex - 1)
    input.value = history[historyIndex]!
  } else if (event.key === 'ArrowDown' && history.length) {
    event.preventDefault()
    historyIndex = Math.min(history.length, historyIndex + 1)
    input.value = history[historyIndex] ?? ''
  } else if (event.key === 'Tab') {
    event.preventDefault()
    const matches = Object.keys(commands).filter(name => commands[name]!.help && name.startsWith(input.value.trim()))
    if (matches.length === 1) input.value = `${matches[0]} `
  } else if (event.key === 'Escape') {
    terminalOpen.value = false
  }
}

function focusInput() {
  if (!window.getSelection()?.toString()) inputEl.value?.focus()
}

watch(terminalOpen, (open) => {
  if (!open) return
  markFound('terminal')
  if (!lines.value.length) lines.value = [...BANNER]
  void nextTick(() => inputEl.value?.focus())
  scrollToBottom()
})

// Pink/cyan code rain for `matrix`.
const RAIN_CHARS = 'アイウエオカキクケコ01ORLY<>/{}'
const matrixColumns = Array.from({ length: 24 }, (_, i) => ({
  left: `${(i / 24) * 100 + Math.random() * 2}%`,
  delay: `${-Math.random() * 3}s`,
  duration: `${1.6 + Math.random() * 2}s`,
  text: Array.from({ length: 18 }, () => RAIN_CHARS[Math.floor(Math.random() * RAIN_CHARS.length)]).join('\n'),
  color: i % 3 ? 'var(--color-glitch-cyan)' : 'var(--color-glitch-pink)'
}))

onBeforeUnmount(() => timers.forEach(clearTimeout))
</script>

<template>
  <Transition name="terminal">
    <div
      v-if="terminalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-ink/70 p-4 backdrop-blur-sm"
      @click.self="terminalOpen = false"
    >
      <div
        class="egg-terminal relative flex h-[min(480px,80vh)] w-full max-w-[680px] flex-col overflow-hidden rounded-lg bg-ink text-sm text-paper"
        role="dialog"
        aria-modal="true"
        aria-label="Hidden terminal"
      >
        <div class="flex items-center gap-2 border-b border-paper/10 px-3 py-2 text-xs text-paper/60">
          <span class="size-3 rounded-full bg-glitch-pink" />
          <span class="size-3 rounded-full bg-paper/30" />
          <span class="size-3 rounded-full bg-glitch-cyan" />
          <span class="ml-2 flex-1 truncate">guest@iamorly: ~</span>
          <button
            type="button"
            class="rounded p-0.5 hover:text-paper"
            aria-label="Close terminal"
            @click="terminalOpen = false"
          >
            <UIcon
              name="i-lucide-x"
              class="block size-4"
            />
          </button>
        </div>

        <div
          ref="bodyEl"
          class="relative flex-1 overflow-y-auto p-3 leading-relaxed"
          @click="focusInput"
        >
          <div
            v-for="(line, i) in lines"
            :key="i"
            class="min-h-[1.5em] break-words whitespace-pre-wrap"
            :class="{
              'text-paper/90': line.kind === 'output',
              'text-paper': line.kind === 'input',
              'text-glitch-cyan': line.kind === 'accent',
              'text-glitch-pink': line.kind === 'error',
              'text-paper/50': line.kind === 'muted'
            }"
          >
            <a
              v-if="line.href"
              :href="line.href"
              target="_blank"
              rel="noopener noreferrer"
              class="underline decoration-paper/30 underline-offset-2 hover:decoration-glitch-cyan"
            >{{ line.text }}</a>
            <template v-else>
              {{ line.text }}
            </template>
          </div>

          <form
            class="flex items-center gap-2"
            @submit.prevent="submit"
          >
            <label
              for="egg-terminal-input"
              class="shrink-0 text-glitch-pink"
            >{{ PROMPT }}</label>
            <input
              id="egg-terminal-input"
              ref="inputEl"
              v-model="input"
              class="min-w-0 flex-1 bg-transparent text-paper caret-glitch-cyan outline-none"
              autocomplete="off"
              autocapitalize="off"
              spellcheck="false"
              @keydown="onKeydown"
            >
          </form>
        </div>

        <div
          v-if="matrix"
          class="pointer-events-none absolute inset-0 overflow-hidden bg-ink/60"
          aria-hidden="true"
        >
          <span
            v-for="(column, i) in matrixColumns"
            :key="i"
            class="matrix-column absolute top-0 text-xs leading-tight whitespace-pre"
            :style="{ left: column.left, color: column.color, animationDelay: column.delay, animationDuration: column.duration }"
          >{{ column.text }}</span>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.egg-terminal {
  box-shadow: -4px 0 0 var(--color-glitch-pink), 4px 0 0 var(--color-glitch-cyan), 0 20px 60px rgb(0 0 0 / 0.5);
}

.terminal-enter-active {
  transition: opacity 150ms ease;
}

.terminal-enter-active .egg-terminal {
  animation: terminal-on 450ms ease-out;
}

.terminal-leave-active {
  transition: opacity 200ms ease;
}

.terminal-enter-from,
.terminal-leave-to {
  opacity: 0;
}

.matrix-column {
  animation-name: matrix-fall;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  text-shadow: 0 0 6px currentcolor;
}

@keyframes terminal-on {
  0% { transform: scale(1, 0.01); filter: brightness(3); }
  45% { transform: scale(1, 0.01); filter: brightness(3); }
  70% { transform: scale(1, 1.04); filter: brightness(1.5) drop-shadow(-4px 0 var(--color-glitch-pink)) drop-shadow(4px 0 var(--color-glitch-cyan)); }
  100% { transform: none; filter: none; }
}

@keyframes matrix-fall {
  from { transform: translateY(-100%); }
  to { transform: translateY(110%); }
}
</style>
