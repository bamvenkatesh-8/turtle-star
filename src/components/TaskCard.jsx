import { motion, AnimatePresence } from 'framer-motion'
import TaskImage from './TaskImage'

export default function TaskCard({ task, completed, onToggle, theme, compact = false }) {
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      onClick={() => onToggle(task.id)}
      className={`w-full flex ${compact ? 'flex-row items-center gap-3 p-3' : 'flex-col items-center gap-3 p-5'}
        rounded-3xl transition-all shadow-md select-none
        ${completed
          ? 'bg-green-100 border-4 border-green-400'
          : 'bg-white border-4 border-gray-200 hover:border-purple-300'
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
            completed ? 'line-through text-gray-400' : 'text-gray-800'
          }`}
        >
          {task.label}
        </span>
      </div>

      {/* Check indicator */}
      <AnimatePresence>
        {completed ? (
          <motion.div
            key="check"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className={`${compact ? 'w-10 h-10 flex-shrink-0' : 'w-14 h-14'} rounded-full bg-green-500 flex items-center justify-center text-white font-bold ${compact ? 'text-xl' : 'text-3xl'}`}
          >
            ✓
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            className={`${compact ? 'w-10 h-10 flex-shrink-0' : 'w-14 h-14'} rounded-full border-4 border-gray-300`}
          />
        )}
      </AnimatePresence>
    </motion.button>
  )
}
