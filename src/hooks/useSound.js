import { useRef, useEffect } from 'react'

const MUTE_KEY = 'turtlestar_muted'

function isMuted() {
  return localStorage.getItem(MUTE_KEY) === 'true'
}

// Generate simple tones using Web Audio API - no external files needed
function createAudioContext() {
  try {
    return new (window.AudioContext || window.webkitAudioContext)()
  } catch {
    return null
  }
}

function playTone(ctx, frequency, duration, type = 'sine', gainVal = 0.3) {
  if (!ctx) return
  const oscillator = ctx.createOscillator()
  const gainNode = ctx.createGain()
  oscillator.connect(gainNode)
  gainNode.connect(ctx.destination)
  oscillator.type = type
  oscillator.frequency.setValueAtTime(frequency, ctx.currentTime)
  gainNode.gain.setValueAtTime(gainVal, ctx.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)
  oscillator.start(ctx.currentTime)
  oscillator.stop(ctx.currentTime + duration)
}

export function useSound() {
  const ctxRef = useRef(null)

  function ensureCtx() {
    if (!ctxRef.current) {
      ctxRef.current = createAudioContext()
    }
    if (ctxRef.current?.state === 'suspended') {
      ctxRef.current.resume()
    }
    return ctxRef.current
  }

  function playDing() {
    if (isMuted()) return
    const ctx = ensureCtx()
    playTone(ctx, 880, 0.15, 'sine', 0.3)
    setTimeout(() => playTone(ctx, 1100, 0.1, 'sine', 0.2), 80)
  }

  function playFanfare(themeId = 'classic') {
    if (isMuted()) return
    const ctx = ensureCtx()
    const sequences = {
      unicorn: [523, 659, 784, 1047, 784, 1047, 1319],
      cars: [440, 494, 523, 587, 523, 659, 880],
      animals: [392, 494, 587, 698, 587, 784, 880],
      space: [330, 415, 523, 622, 784, 880, 1047],
      classic: [523, 587, 659, 698, 784, 880, 1047],
    }
    const notes = sequences[themeId] || sequences.classic
    notes.forEach((freq, i) => {
      setTimeout(() => {
        playTone(ctx, freq, 0.2, 'sine', 0.25)
      }, i * 120)
    })
  }

  function setMuted(muted) {
    localStorage.setItem(MUTE_KEY, muted ? 'true' : 'false')
  }

  function getMuted() {
    return isMuted()
  }

  return { playDing, playFanfare, setMuted, getMuted }
}
