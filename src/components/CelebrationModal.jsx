import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CELEBRATION_THEMES } from '../data/celebrationThemes'

// All random values pre-computed once at particle creation time.
// If Math.random() is inside animate={}, every parent re-render resets the animation.
function generateParticles(theme) {
  const particles = []
  // 40 falling confetti pieces (rain from the top)
  for (let i = 0; i < 40; i++) {
    particles.push({
      id: `fall-${i}`,
      type: 'fall',
      color: theme.particleColors[i % theme.particleColors.length],
      shape: theme.particleShapes[i % theme.particleShapes.length],
      startX: Math.random() * 110 - 5,   // -5% to 105%
      driftX: (Math.random() - 0.5) * 120,
      rotate: Math.random() * 900 - 450,
      duration: 2.5 + Math.random() * 2,
      delay: Math.random() * 2.0,
      size: 16 + Math.floor(Math.random() * 16),
    })
  }
  // 25 burst pieces (explode outward from center)
  for (let i = 0; i < 25; i++) {
    const angle = (i / 25) * 360 + Math.random() * 15
    const dist = 180 + Math.random() * 220
    const rad = (angle * Math.PI) / 180
    particles.push({
      id: `burst-${i}`,
      type: 'burst',
      color: theme.particleColors[i % theme.particleColors.length],
      shape: theme.particleShapes[i % theme.particleShapes.length],
      targetX: Math.cos(rad) * dist,
      targetY: Math.sin(rad) * dist,
      rotate: Math.random() * 720 - 360,
      duration: 1.0 + Math.random() * 0.6,
      delay: Math.random() * 0.3,
      size: 18 + Math.floor(Math.random() * 14),
    })
  }
  return particles
}

function FallParticle({ color, shape, startX, driftX, rotate, duration, delay, size }) {
  return (
    <motion.div
      className="absolute pointer-events-none select-none"
      style={{ left: `${startX}%`, top: '-8%', color, fontSize: size }}
      initial={{ y: 0, x: 0, rotate: 0, opacity: 1 }}
      animate={{
        y: 900,
        x: driftX,
        rotate,
        opacity: [1, 1, 1, 0.7, 0],
      }}
      transition={{ duration, delay, ease: 'linear' }}
    >
      {shape}
    </motion.div>
  )
}

function BurstParticle({ color, shape, targetX, targetY, rotate, duration, delay, size }) {
  return (
    <motion.div
      className="absolute pointer-events-none select-none"
      style={{ left: '50%', top: '42%', color, fontSize: size }}
      initial={{ x: 0, y: 0, rotate: 0, scale: 0, opacity: 1 }}
      animate={{
        x: targetX,
        y: targetY,
        rotate,
        scale: [0, 1.4, 0.8, 0],
        opacity: [1, 1, 0.6, 0],
      }}
      transition={{ duration, delay, ease: 'easeOut' }}
    >
      {shape}
    </motion.div>
  )
}

export default function CelebrationModal({ kidName, celebrationThemeId, onClose, playFanfare }) {
  const theme = CELEBRATION_THEMES[celebrationThemeId] || CELEBRATION_THEMES.classic
  const [particles] = useState(() => generateParticles(theme))
  const timerRef = useRef(null)

  useEffect(() => {
    playFanfare?.(celebrationThemeId)
    timerRef.current = setTimeout(onClose, 5500)
    return () => clearTimeout(timerRef.current)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b ${theme.bgGradient} overflow-hidden`}
      onClick={onClose}
    >
      {/* Expanding pulse rings from center */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border-4 border-white/25 pointer-events-none"
          style={{ width: 80, height: 80 }}
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ scale: 8, opacity: 0 }}
          transition={{ duration: 1.8, delay: i * 0.4, ease: 'easeOut' }}
        />
      ))}

      {/* Particles */}
      {particles.map((p) =>
        p.type === 'fall' ? (
          <FallParticle key={p.id} {...p} />
        ) : (
          <BurstParticle key={p.id} {...p} />
        )
      )}

      {/* Main content */}
      <motion.div
        initial={{ scale: 0, rotate: -12 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.05 }}
        className="text-center px-8 z-10 relative"
      >
        {/* Mascot */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{
            scale: [0, 1.4, 0.85, 1.15, 1],
            y: [0, 0, 0, 0, 0, -18, 0, -14, 0],
          }}
          transition={{
            scale: { duration: 0.5, times: [0, 0.3, 0.55, 0.75, 1] },
            y: { duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 },
          }}
          className="text-9xl mb-4 leading-none"
        >
          {theme.mascot}
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, type: 'spring', stiffness: 180 }}
        >
          <p
            className="text-3xl font-bold text-white drop-shadow-lg"
            style={{ fontFamily: "'Fredoka One', cursive" }}
          >
            You did it,
          </p>
          <p
            className="text-5xl font-bold text-white drop-shadow-lg mt-1"
            style={{ fontFamily: "'Fredoka One', cursive" }}
          >
            {kidName}! 🎉
          </p>
          <p className="text-xl text-white/90 mt-2 font-semibold">
            Amazing job today! ✨
          </p>
        </motion.div>

        {/* Spinning stars row */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.55, type: 'spring' }}
          className="flex justify-center gap-3 mt-6 text-5xl"
        >
          {['⭐', '🌟', '✨', '🌟', '⭐'].map((s, i) => (
            <motion.span
              key={i}
              animate={{
                rotate: [0, 18, -18, 0],
                scale: [1, 1.35, 1],
                y: [0, -10, 0],
              }}
              transition={{
                duration: 0.9,
                delay: i * 0.12,
                repeat: Infinity,
                repeatType: 'loop',
              }}
            >
              {s}
            </motion.span>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="text-white/60 text-sm mt-8"
        >
          Tap anywhere to continue
        </motion.p>
      </motion.div>
    </motion.div>
  )
}
