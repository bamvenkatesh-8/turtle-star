import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TaskCard from './TaskCard'

export default function TaskCardSwipeView({ tasks, completedIds, onToggle, theme }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const task = tasks[currentIndex]

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

  // Swipe handling via drag end
  function handleDragEnd(_, info) {
    if (info.offset.x < -60) goNext()
    else if (info.offset.x > 60) goPrev()
  }

  if (!task) return null

  return (
    <div className="flex-1 flex flex-col px-4 pt-4 pb-2 overflow-hidden">
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
            className="w-12 h-12 rounded-full bg-white/80 shadow text-2xl disabled:opacity-30 active:scale-95 transition-transform"
          >
            ‹
          </button>

          {/* Dot indicators */}
          <div className="flex gap-2">
            {tasks.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > currentIndex ? 1 : -1); setCurrentIndex(i) }}
                className={`rounded-full transition-all ${
                  i === currentIndex
                    ? 'w-6 h-3 bg-white'
                    : completedIds.includes(tasks[i].id)
                    ? 'w-3 h-3 bg-green-400'
                    : 'w-3 h-3 bg-white/40'
                }`}
              />
            ))}
          </div>

          <button
            onClick={goNext}
            disabled={currentIndex === tasks.length - 1}
            className="w-12 h-12 rounded-full bg-white/80 shadow text-2xl disabled:opacity-30 active:scale-95 transition-transform"
          >
            ›
          </button>
        </div>

        {/* Swipe hint */}
        <p className="text-white/60 text-xs mt-2">Swipe left or right to navigate</p>
      </div>
    </div>
  )
}
