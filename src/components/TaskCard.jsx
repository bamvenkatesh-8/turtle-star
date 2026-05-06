import { motion, AnimatePresence } from 'framer-motion'
import TaskImage from './TaskImage'

export default function TaskCard({ task, completed, onToggle, theme, compact = false }) {
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      onClick={() => onToggle(task.id)}
      className={`w-full flex ${compact ? 'flex-row items-center gap-3 p-3' : 'flex-col items-center gap-4 p-6'}
        rounded-2xl border transition-all select-none backdrop-blur-sm
        ${completed
          ? 'bg-emerald-500/20 border-emerald-400/50'
          : 'bg-white/10 border-white/15 hover:bg-white/15 hover:border-white/25'
        }
      `}
      style={{ fontFamily: theme?.fontFamily, minHeight: compact ? 72 : undefined }}
    >
      {/* Image */}
      <div className={compact ? 'w-14 h-14 flex-shrink-0' : 'w-36 h-36 mx-auto'}>
        <TaskImage imageKey={task.imageKey} completed={completed} className="w-full h-full" />
      </div>

      {/* Label */}
      <div className={`${compact ? 'flex-1 text-left' : 'text-center'}`}>
        <span
          className={`font-bold ${compact ? 'text-base' : 'text-xl'} ${
            completed ? 'line-through text-white/40' : 'text-white'
          }`}
        >
          {task.label}
        </span>
      </div>

      {/* Check indicator */}
      <AnimatePresence mode="wait">
        {completed ? (
          <motion.div
            key="check"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className={`${compact ? 'w-10 h-10 flex-shrink-0' : 'w-14 h-14'} rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold ${compact ? 'text-xl' : 'text-3xl'}`}
          >
            ✓
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            className={`${compact ? 'w-10 h-10 flex-shrink-0' : 'w-14 h-14'} rounded-full border-2 border-white/30`}
          />
        )}
      </AnimatePresence>
    </motion.button>
  )
}
