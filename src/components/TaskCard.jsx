import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import TaskImage from './TaskImage'

const CONFETTI_COLORS = ['#007AFF', '#FF9F0A', '#34C759', '#FF3B30', '#AF52DE', '#FFD60A']

function burst() {
  confetti({
    particleCount: 35,
    spread: 100,
    origin: { x: Math.random(), y: Math.random() * 0.6 + 0.1 },
    colors: CONFETTI_COLORS,
    scalar: 0.9,
    gravity: 0.7,
    drift: (Math.random() - 0.5) * 0.5,
    ticks: 220,
  })
}

function fireConfetti() {
  burst()
  setTimeout(burst, 700)
  setTimeout(burst, 1400)
  setTimeout(burst, 2100)
  setTimeout(burst, 2800)
  setTimeout(burst, 3500)
  setTimeout(burst, 4200)
}

export default function TaskCard({ task, completed, onToggle, theme, compact = false }) {
  const accentColor = theme?.accentColor || '#007AFF'

  function handleToggle() {
    if (!completed) fireConfetti()
    onToggle(task.id)
  }

  if (compact) {
    return (
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={handleToggle}
        className={`w-full flex flex-row items-center gap-3 p-3 rounded-2xl border transition-all duration-150 select-none
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
          ${completed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200'}
        `}
        style={{ minHeight: 72, '--tw-ring-color': accentColor }}
      >
        <div className="w-14 h-14 flex-shrink-0">
          <TaskImage imageKey={task.imageKey} className="w-full h-full" />
        </div>
        <div className="flex-1 text-left">
          <span className="font-semibold tracking-tight text-base text-gray-900">{task.label}</span>
        </div>
        <AnimatePresence mode="wait">
          {completed ? (
            <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
              className="w-10 h-10 flex-shrink-0 rounded-full bg-green-500 flex items-center justify-center text-white font-bold shadow-sm text-xl">
              ✓
            </motion.div>
          ) : (
            <motion.div key="empty" className="w-10 h-10 flex-shrink-0 rounded-full border-2 border-gray-200 bg-white" />
          )}
        </AnimatePresence>
      </motion.button>
    )
  }

  // Card mode: image fills the full card, no title/check (those live in the nav row)
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={handleToggle}
      className={`w-full block rounded-2xl border overflow-hidden transition-all duration-150 select-none
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
        ${completed ? 'border-green-200' : 'border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200'}
      `}
      style={{ '--tw-ring-color': accentColor }}
    >
      <div className="w-full h-64">
        <TaskImage imageKey={task.imageKey} objectFit="cover" className="w-full h-full" />
      </div>
    </motion.button>
  )
}
