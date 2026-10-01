import { ref, onMounted } from 'vue'

const STORAGE_KEY = 'iamorly:slot-sound'
const MASTER_VOLUME = 0.22

/**
 * Slot machine sound effects, synthesized with the Web Audio API (no audio files).
 * On by default; muting is remembered per browser. The AudioContext is only created
 * on the first spin (a click), so browsers' autoplay rules are satisfied.
 */
export function useSlotSounds() {
  const muted = ref(false)
  let ctx: AudioContext | null = null
  let master: GainNode | null = null
  let noiseBuffer: AudioBuffer | null = null
  let lastTick = 0

  onMounted(() => {
    try {
      muted.value = localStorage.getItem(STORAGE_KEY) === 'off'
    } catch {
      // Storage blocked (private mode etc.): keep the default.
    }
  })

  function audio() {
    if (muted.value || typeof window === 'undefined') return null
    if (!ctx) {
      ctx = new AudioContext()
      master = ctx.createGain()
      master.gain.value = MASTER_VOLUME
      master.connect(ctx.destination)
      noiseBuffer = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate)
      const data = noiseBuffer.getChannelData(0)
      for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1
    }
    if (ctx.state === 'suspended') void ctx.resume()
    return { ctx, out: master!, now: ctx.currentTime }
  }

  function toggle() {
    muted.value = !muted.value
    try {
      localStorage.setItem(STORAGE_KEY, muted.value ? 'off' : 'on')
    } catch {
      // Not persisted; the toggle still works for this visit.
    }
    if (!muted.value) chime([660, 990], 0.06, 0.12)
  }

  /** One enveloped oscillator note. */
  function tone(
    freq: number,
    start: number,
    duration: number,
    {
      type = 'sine',
      volume = 0.5,
      endFreq = freq,
      attack = 0.005
    }: { type?: OscillatorType, volume?: number, endFreq?: number, attack?: number } = {}
  ) {
    const a = audio()
    if (!a) return
    const osc = a.ctx.createOscillator()
    const gain = a.ctx.createGain()
    osc.type = type
    osc.frequency.setValueAtTime(freq, a.now + start)
    if (endFreq !== freq) osc.frequency.exponentialRampToValueAtTime(endFreq, a.now + start + duration)
    gain.gain.setValueAtTime(0.0001, a.now + start)
    gain.gain.exponentialRampToValueAtTime(volume, a.now + start + attack)
    gain.gain.exponentialRampToValueAtTime(0.0001, a.now + start + duration)
    osc.connect(gain).connect(a.out)
    osc.start(a.now + start)
    osc.stop(a.now + start + duration + 0.02)
  }

  /** A filtered burst of white noise. */
  function noise(
    start: number,
    duration: number,
    {
      volume = 0.4,
      filter = 'bandpass',
      freq = 1000,
      endFreq = freq,
      q = 1
    }: { volume?: number, filter?: BiquadFilterType, freq?: number, endFreq?: number, q?: number } = {}
  ) {
    const a = audio()
    if (!a || !noiseBuffer) return
    const src = a.ctx.createBufferSource()
    src.buffer = noiseBuffer
    const biquad = a.ctx.createBiquadFilter()
    biquad.type = filter
    biquad.Q.value = q
    biquad.frequency.setValueAtTime(freq, a.now + start)
    if (endFreq !== freq) biquad.frequency.exponentialRampToValueAtTime(endFreq, a.now + start + duration)
    const gain = a.ctx.createGain()
    gain.gain.setValueAtTime(0.0001, a.now + start)
    gain.gain.exponentialRampToValueAtTime(volume, a.now + start + duration * 0.15)
    gain.gain.exponentialRampToValueAtTime(0.0001, a.now + start + duration)
    src.connect(biquad).connect(gain).connect(a.out)
    src.start(a.now + start, Math.random() * 0.5)
    src.stop(a.now + start + duration + 0.02)
  }

  function chime(freqs: number[], gap: number, length: number, type: OscillatorType = 'triangle', volume = 0.35, start = 0) {
    freqs.forEach((freq, i) => tone(freq, start + i * gap, length, { type, volume }))
  }

  /** Random square blips jumping around in pitch: the audio version of the screen glitch. */
  function glitchBurst(start: number, blips: number, volume = 0.18) {
    for (let i = 0; i < blips; i++) {
      const at = start + i * (0.02 + Math.random() * 0.03)
      tone(150 + Math.random() * 1800, at, 0.03, { type: 'square', volume })
      if (Math.random() < 0.4) noise(at, 0.04, { volume: volume * 1.5, filter: 'highpass', freq: 3000 })
    }
  }

  return {
    muted,
    toggle,

    spinStart() {
      noise(0, 0.35, { volume: 0.35, freq: 400, endFreq: 2500, q: 2 })
      tone(220, 0, 0.12, { type: 'square', volume: 0.12, endFreq: 440 })
    },

    /** A symbol passing the payline; throttled so a fast reel doesn't buzz. */
    tick() {
      const a = audio()
      if (!a || a.now - lastTick < 0.04) return
      lastTick = a.now
      tone(1800 + Math.random() * 300, 0, 0.025, { type: 'square', volume: 0.05 })
    },

    reelStop() {
      tone(140, 0, 0.18, { type: 'sine', volume: 0.6, endFreq: 55 })
      noise(0, 0.05, { volume: 0.25, filter: 'lowpass', freq: 900 })
    },

    /** Rising, wobbling tone while the last reel crawls. Returns a function that stops it. */
    suspense(seconds: number) {
      const a = audio()
      if (!a) return () => {}
      const osc = a.ctx.createOscillator()
      const lfo = a.ctx.createOscillator()
      const lfoGain = a.ctx.createGain()
      const filter = a.ctx.createBiquadFilter()
      const gain = a.ctx.createGain()
      osc.type = 'sawtooth'
      osc.frequency.setValueAtTime(160, a.now)
      osc.frequency.exponentialRampToValueAtTime(720, a.now + seconds)
      lfo.frequency.setValueAtTime(5, a.now)
      lfo.frequency.linearRampToValueAtTime(14, a.now + seconds)
      lfoGain.gain.value = 0.06
      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(600, a.now)
      filter.frequency.exponentialRampToValueAtTime(3000, a.now + seconds)
      gain.gain.setValueAtTime(0.0001, a.now)
      gain.gain.exponentialRampToValueAtTime(0.1, a.now + 0.3)
      lfo.connect(lfoGain).connect(gain.gain)
      osc.connect(filter).connect(gain).connect(a.out)
      osc.start()
      lfo.start()
      return () => {
        const t = a.ctx.currentTime
        gain.gain.cancelScheduledValues(t)
        gain.gain.setValueAtTime(gain.gain.value, t)
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.12)
        osc.stop(t + 0.15)
        lfo.stop(t + 0.15)
      }
    },

    scatter() {
      chime([1047, 1568, 2093], 0.05, 0.25, 'sine', 0.3)
    },

    pair() {
      chime([523, 659, 784], 0.07, 0.16, 'square', 0.12)
    },

    bigWin() {
      glitchBurst(0, 10)
      chime([523, 659, 784, 1047, 1319], 0.08, 0.3, 'sawtooth', 0.12)
      chime([262, 330, 392, 523], 0.08, 0.35, 'square', 0.1)
      glitchBurst(0.5, 8, 0.14)
      tone(1047, 0.45, 0.6, { type: 'triangle', volume: 0.3 })
    },

    nearMiss() {
      tone(392, 0, 0.3, { type: 'triangle', volume: 0.3, endFreq: 370 })
      tone(330, 0.3, 0.55, { type: 'triangle', volume: 0.3, endFreq: 247 })
    },

    /** CRT power-down then power-up, then a fanfare. */
    freeSpins() {
      tone(900, 0, 0.3, { type: 'sine', volume: 0.35, endFreq: 40 })
      noise(0, 0.25, { volume: 0.2, filter: 'highpass', freq: 4000 })
      tone(40, 0.45, 0.35, { type: 'sine', volume: 0.35, endFreq: 1200 })
      glitchBurst(0.4, 6, 0.12)
      chime([523, 659, 784, 1047], 0.09, 0.3, 'square', 0.12, 0.85)
      chime([784, 1047, 1319, 1568], 0.09, 0.4, 'triangle', 0.25, 1.25)
    },

    bonusOver() {
      tone(700, 0, 0.3, { type: 'sine', volume: 0.3, endFreq: 40 })
      tone(40, 0.35, 0.3, { type: 'sine', volume: 0.3, endFreq: 900 })
      chime([784, 659, 784, 1047], 0.12, 0.25, 'triangle', 0.25, 0.7)
    }
  }
}
