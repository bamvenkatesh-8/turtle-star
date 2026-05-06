import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TaskCard from './TaskCard'

export default function TaskCardSwipeView({ tasks, completedIds, onToggle, theme }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const accentColor = theme?.accentColor || '#007AFF'
  const dragStart = useRef(null)

  function goTo(i) {
    if (i >= 0 && i < tasks.length) setCurrentIndex(i)
  }

  function onPointerDown(e) {
    dragStart.current = e.clientX
  }
  function onPointerUp(e) {
    if (dragStart.current === null) return
    const delta = dragStart.current - e.clientX
    if (delta > 60) goTo(currentIndex + 1)
    else if (delta < -60) goTo(currentIndex - 1)
    dragStart.current = null
  }

  if (!tasks.length) return null

  const currentTask = tasks[currentIndex]
  const isCompleted = completedIds.includes(currentTask.id)

  const navBtnClass = theme?.isDark
    ? 'bg-white/10 hover:bg-white/20 text-white focus-visible:ring-white/40'
    : 'bg-white shadow-md text-gray-600 hover:bg-gray-50 focus-visible:ring-gray-300'

  const centerBtnHover = theme?.isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'

  return (
    <div className="flex-1 flex flex-col px-4 pt-4 pb-2 overflow-hidden" style={{ background: theme?.pageBg }}>
      <div className="flex-1 flex flex-col items-center justify-center">

        {/* CSS carousel — all cards in a flex row, container clips overflow */}
        <div
          className="w-full max-w-sm lg:max-w-lg overflow-hidden rounded-2xl select-none cursor-grab active:cursor-grabbing"
          style={{ touchAction: 'none' }}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
        >
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {tasks.map((task) => (
              <div key={task.id} className="w-full flex-shrink-0">
                <TaskCard
                  task={task}
                  completed={completedIds.includes(task.id)}
                  onToggle={onToggle}
                  theme={theme}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Nav row: ‹  [check] [title]  › */}
        <div className="flex items-center justify-between w-full max-w-sm lg:max-w-lg mt-3">
          <button
            onClick={() => goTo(currentIndex - 1)}
            disabled={currentIndex === 0}
            className={`w-12 h-12 rounded-full text-2xl disabled:opacity-30 active:scale-95 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 flex-shrink-0 ${navBtnClass}`}
          >
            ‹
          </button>

          {/* Check + title replacing dots */}
          <button
            onClick={() => onToggle(currentTask.id)}
            className={`flex items-center gap-2 flex-1 justify-center px-3 py-2 rounded-xl active:scale-95 transition-all duration-150 focus-visible:outline-none ${centerBtnHover}`}
          >
            <AnimatePresence mode="wait">
              {isCompleted ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="w-5 h-5 flex-shrink-0 rounded-full bg-green-500 flex items-center justify-center text-white font-bold"
                  style={{ fontSize: 11 }}
                >
                  ✓
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  className="w-5 h-5 flex-shrink-0 rounded-full border-2 border-gray-300 bg-white"
                />
              )}
            </AnimatePresence>
            <span
              className="text-sm font-semibold truncate"
              style={{ color: theme?.textPrimary }}
            >
              {currentTask.label}
            </span>
          </button>

          <button
            onClick={() => goTo(currentIndex + 1)}
            disabled={currentIndex === tasks.length - 1}
            className={`w-12 h-12 rounded-full text-2xl disabled:opacity-30 active:scale-95 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 flex-shrink-0 ${navBtnClass}`}
          >
            ›
          </button>
        </div>
      </div>
    </div>
  )
}
