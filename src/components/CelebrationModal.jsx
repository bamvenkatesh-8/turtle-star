import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CELEBRATION_THEMES } from '../data/celebrationThemes'

function Particle({ color, shape, delay, startX, startY }) {
  return (
    <motion.div
      className="absolute pointer-events-none text-2xl"
      style={{ left: `${startX}%`, top: `${startY}%`, color }}
      initial={{ opacity: 1, scale: 0.5, y: 0, x: 0, rotate: 0 }}
      animate={{
        opacity: 0,
        scale: 1.5,
        y: Math.random() * -200 - 50,
        x: (Math.random() - 0.5) * 200,
        rotate: Math.random() * 720 - 360,
      }}
      transition={{ duration: 1.5 + Math.random(), delay, ease: 'easeOut' }}
    >
      {shape}
    </motion.div>
  )
}

function generateParticles(theme) {
  const count = 30
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    color: theme.particleColors[i % theme.particleColors.length],
    shape: theme.particleShapes[i % theme.particleShapes.length],
    delay: Math.random() * 0.5,
    startX: Math.random() * 100,
    startY: 40 + Math.random() * 40,
  }))
}

export default function CelebrationModal({ kidName, celebrationThemeId, onClose, playFanfare }) {
  const theme = CELEBRATION_THEMES[celebrationThemeId] || CELEBRATION_THEMES.classic
  const [particles] = useState(() => generateParticles(theme))
  const timerRef = useRef(null)

  useEffect(() => {
    playFanfare?.(celebrationThemeId)
    timerRef.current = setTimeout(onClose, 4000)
    return () => clearTimeout(timerRef.current)
  }, [])

  const bgClass = `bg-gradient-to-b ${theme.bgGradient}`

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center ${bgClass} overflow-hidden`}
      onClick={onClose}
    >
      {/* Particles */}
      {particles.map((p) => (
        <Particle key={p.id} {...p} />
      ))}

      {/* Content */}
      <motion.div
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
        className="text-center px-6 z-10"
      >
        {/* Big mascot */}
        <motion.div
          animate={{ y: [0, -20, 0, -15, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="text-8xl mb-4"
        >
          {theme.mascot}
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-2xl font-bold text-white drop-shadow-lg" style={{ fontFamily: "'Fredoka One', cursive" }}>
            You did it,
          </p>
          <p className="text-4xl font-bold text-white drop-shadow-lg mt-1" style={{ fontFamily: "'Fredoka One', cursive" }}>
            {kidName}! 🎉
          </p>
          <p className="text-xl text-white/90 mt-2">Amazing job today!</p>
        </motion.div>

        {/* Stars burst */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: 'spring' }}
          className="flex justify-center gap-3 mt-6 text-4xl"
        >
          {['⭐', '🌟', '✨', '🌟', '⭐'].map((s, i) => (
            <motion.span
              key={i}
              animate={{ rotate: [0, 20, -20, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 1, delay: i * 0.1, repeat: Infinity }}
            >
              {s}
            </motion.span>
          ))}
        </motion.div>

        <p className="text-white/70 text-sm mt-6">Tap anywhere to continue</p>
      </motion.div>
    </motion.div>
  )
}
