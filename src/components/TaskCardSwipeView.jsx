import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TaskCard from './TaskCard'

export default function TaskCardSwipeView({ tasks, completedIds, onToggle, theme }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const task = tasks[currentIndex]
  const accentColor = theme?.accentColor || '#007AFF'

  function goNext() {
    if (currentIndex < tasks.length - 1) {
      setDirection(1)
      setCurrentIndex((i) => i + 1)
    }
  }

  function goPrev() {
    if (currentIndex > 0) {
      setDirection(-1)
      setCurrentIndex((i) => i - 1)
    }
  }

  function handleDragEnd(_, info) {
    if (info.offset.x < -60) goNext()
    else if (info.offset.x > 60) goPrev()
  }

  if (!task) return null

  return (
    <div className="flex-1 flex flex-col px-4 pt-4 pb-2 overflow-hidden bg-gray-50">
      {/* Card area */}
      <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={task.id}
            initial={{ x: direction * 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction * -300, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            className="w-full max-w-sm lg:max-w-lg cursor-grab active:cursor-grabbing"
          >
            <TaskCard
              task={task}
              completed={completedIds.includes(task.id)}
              onToggle={onToggle}
              theme={theme}
            />
          </motion.div>
        </AnimatePresence>

        {/* Nav arrows */}
        <div className="flex items-center justify-between w-full max-w-sm lg:max-w-lg mt-4">
          <button
            onClick={goPrev}
            disabled={currentIndex === 0}
            className="w-12 h-12 rounded-full bg-white shadow-md text-gray-600 text-2xl disabled:opacity-30 hover:bg-gray-50 active:scale-95 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
          >
            ‹
          </button>

          {/* Dot indicators */}
          <div className="flex gap-2">
            {tasks.map((t, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > currentIndex ? 1 : -1); setCurrentIndex(i) }}
                className="rounded-full transition-all duration-200"
                style={{
                  width: i === currentIndex ? 24 : 12,
                  height: 12,
                  backgroundColor: i === currentIndex
                    ? accentColor
                    : completedIds.includes(tasks[i].id)
                    ? '#4ade80'
                    : '#D1D5DB',
                }}
              />
            ))}
          </div>

          <button
            onClick={goNext}
            disabled={currentIndex === tasks.length - 1}
            className="w-12 h-12 rounded-full bg-white shadow-md text-gray-600 text-2xl disabled:opacity-30 hover:bg-gray-50 active:scale-95 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
          >
            ›
          </button>
        </div>

        {/* Swipe hint */}
        <p className="text-gray-400 text-xs mt-2">Swipe left or right to navigate</p>
      </div>
    </div>
  )
}
