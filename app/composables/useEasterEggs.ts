/** Eggs the page can detect being found (the console greeting can't be). */
export type EggId = 'terminal' | 'konami'

export interface SlotRequest {
  id: number
  kind: 'spin' | 'super-bonus'
}

const GLITCH_MODE_MS = 2600

/**
 * Shared state for the portfolio's easter eggs: the hidden terminal, Konami-code
 * GLITCH MODE, and requests that drive the slot machine from outside it.
 */
export function useEasterEggs() {
  const terminalOpen = useState('egg:terminal', () => false)
  const glitchMode = useState('egg:glitch', () => false)
  const slotRequest = useState<SlotRequest | null>('egg:slot', () => null)
  const found = useState<EggId[]>('egg:found', () => [])

  const { track } = useAnalytics()

  function markFound(egg: EggId) {
    if (found.value.includes(egg)) return
    found.value = [...found.value, egg]
    track('easter-egg-found', { egg })
  }

  /** Open the hidden terminal, recording how it was found ("typed" or "badge"). */
  function openTerminal(via: 'typed' | 'badge') {
    if (terminalOpen.value) return
    terminalOpen.value = true
    track('terminal-open', { via })
  }

  function requestSlot(kind: SlotRequest['kind']) {
    slotRequest.value = { id: Date.now(), kind }
  }

  /** Tear the whole page for a moment, then hand the slot machine a super bonus. */
  function triggerGlitchMode() {
    if (glitchMode.value) return
    markFound('konami')
    glitchMode.value = true
    setTimeout(() => {
      glitchMode.value = false
    }, GLITCH_MODE_MS)
    requestSlot('super-bonus')
  }

  return { terminalOpen, glitchMode, slotRequest, found, markFound, openTerminal, requestSlot, triggerGlitchMode }
}
