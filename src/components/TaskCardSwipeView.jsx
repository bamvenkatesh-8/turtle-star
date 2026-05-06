import { useState, useRef } from 'react'
import TaskCard from './TaskCard'

export default function TaskCardSwipeView({ tasks, completedIds, onToggle, theme }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const accentColor = theme?.accentColor || '#007AFF'
  const dragStart = useRef(null)

  function goTo(i) {
    if (i >= 0 && i < tasks.length) setCurrentIndex(i)
  }

  // Pointer-based swipe
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

  return (
    <div className="flex-1 flex flex-col px-4 pt-4 pb-2 overflow-hidden bg-gray-50">
      <div className="flex-1 flex flex-col items-center justify-center">

        {/* CSS carousel — all cards in a flex row, container clips overflow */}
        <div
          className="w-full max-w-sm lg:max-w-lg overflow-hidden rounded-2xl select-none cursor-grab active:cursor-grabbing"
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

        {/* Nav arrows + dots */}
        <div className="flex items-center justify-between w-full max-w-sm lg:max-w-lg mt-4">
          <button
            onClick={() => goTo(currentIndex - 1)}
            disabled={currentIndex === 0}
            className="w-12 h-12 rounded-full bg-white shadow-md text-gray-600 text-2xl disabled:opacity-30 hover:bg-gray-50 active:scale-95 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
          >
            ‹
          </button>

          <div className="flex gap-2 items-center">
            {tasks.map((t, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
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
            onClick={() => goTo(currentIndex + 1)}
            disabled={currentIndex === tasks.length - 1}
            className="w-12 h-12 rounded-full bg-white shadow-md text-gray-600 text-2xl disabled:opacity-30 hover:bg-gray-50 active:scale-95 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
          >
            ›
          </button>
        </div>

        <p className="text-gray-400 text-xs mt-2">Swipe left or right to navigate</p>
      </div>
    </div>
  )
}
