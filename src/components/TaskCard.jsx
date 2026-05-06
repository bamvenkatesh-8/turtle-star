import { motion, AnimatePresence } from 'framer-motion'
import TaskImage from './TaskImage'

export default function TaskCard({ task, completed, onToggle, theme, compact = false }) {
  const accentColor = theme?.accentColor || '#007AFF'

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={() => onToggle(task.id)}
      className={`w-full flex ${compact ? 'flex-row items-center gap-3 p-3' : 'flex-col items-center gap-4 p-6'}
        rounded-2xl border transition-all duration-150 select-none
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
        ${completed
          ? 'bg-green-50 border-green-200'
          : 'bg-white border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200'
        }
      `}
      style={{
        minHeight: compact ? 72 : undefined,
        '--tw-ring-color': accentColor,
      }}
    >
      {/* Image */}
      <div className={compact ? 'w-14 h-14 flex-shrink-0' : 'w-36 h-36 mx-auto'}>
        <TaskImage imageKey={task.imageKey} completed={completed} className="w-full h-full" />
      </div>

      {/* Label */}
      <div className={`${compact ? 'flex-1 text-left' : 'text-center'}`}>
        <span
          className={`font-semibold tracking-tight ${compact ? 'text-base' : 'text-xl'} ${
            'text-gray-900'
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
            className={`${compact ? 'w-10 h-10 flex-shrink-0' : 'w-14 h-14'} rounded-full bg-green-500 flex items-center justify-center text-white font-bold shadow-sm ${compact ? 'text-xl' : 'text-3xl'}`}
          >
            ✓
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            className={`${compact ? 'w-10 h-10 flex-shrink-0' : 'w-14 h-14'} rounded-full border-2 border-gray-200 bg-white`}
          />
        )}
      </AnimatePresence>
    </motion.button>
  )
}
