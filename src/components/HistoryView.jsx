import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './Header'
import { UI_THEMES } from '../data/themes'
import TaskImage from './TaskImage'

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T12:00:00')
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
}

function addDays(dateStr, days) {
  const d = new Date(dateStr + 'T12:00:00')
  d.setDate(d.getDate() + days)
  return d.toISOString().split('T')[0]
}

function today() {
  return new Date().toISOString().split('T')[0]
}

export default function HistoryView({ kid, routines, getTasksForRoutine, getProgressForDate, onBack, onHome }) {
  const [selectedDate, setSelectedDate] = useState(today())
  const [expandedRoutineId, setExpandedRoutineId] = useState(null)
  const theme = UI_THEMES[kid.uiTheme] || UI_THEMES.cartoonish

  const dayProgress = getProgressForDate(kid.id, selectedDate)
  const starsEarned = dayProgress.reduce((sum, p) => sum + (p.completedTaskIds?.length || 0) + (p.fullyCompleted ? 3 : 0), 0)

  const card = 'bg-white/8 backdrop-blur-sm border border-white/12 rounded-2xl'

  return (
    <div className="min-h-screen flex flex-col lg:max-w-3xl lg:mx-auto lg:shadow-2xl" style={{ fontFamily: theme.fontFamily }}>
      <Header onBack={onBack} onHome={onHome} title={`${kid.avatar} History`} theme={theme} />

      {/* Date picker */}
      <div className="bg-black/30 border-b border-white/10 px-4 py-4">
        <div className="flex items-center justify-between max-w-sm mx-auto">
          <button
            onClick={() => setSelectedDate((d) => addDays(d, -1))}
            className="w-11 h-11 rounded-xl bg-white/10 hover:bg-white/20 text-white text-2xl flex items-center justify-center transition-all"
          >‹</button>
          <div className="text-center">
            <input
              type="date"
              value={selectedDate}
              max={today()}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-transparent text-white font-bold text-center border-none outline-none text-sm cursor-pointer"
            />
            <div className="text-white/50 text-xs mt-0.5">{formatDate(selectedDate)}</div>
          </div>
          <button
            onClick={() => { const n = addDays(selectedDate, 1); if (n <= today()) setSelectedDate(n) }}
            disabled={selectedDate >= today()}
            className="w-11 h-11 rounded-xl bg-white/10 hover:bg-white/20 text-white text-2xl flex items-center justify-center disabled:opacity-30 transition-all"
          >›</button>
        </div>
        {starsEarned > 0 && (
          <div className="flex justify-center mt-3">
            <span className="bg-yellow-500/20 border border-yellow-400/30 text-yellow-300 rounded-full px-4 py-1 text-sm font-bold">
              ⭐ {starsEarned} stars earned
            </span>
          </div>
        )}
      </div>

      {/* Progress entries */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {routines.map((routine) => {
          const progress = dayProgress.find((p) => p.routineId === routine.id)
          if (!progress || !progress.completedTaskIds?.length) return null
          const routineTasks = getTasksForRoutine(routine.id)
          const completedTasks = routineTasks.filter((t) => progress.completedTaskIds.includes(t.id))
          const isExpanded = expandedRoutineId === routine.id

          return (
            <div key={routine.id} className={card + ' overflow-hidden'}>
              <button
                onClick={() => setExpandedRoutineId(isExpanded ? null : routine.id)}
                className="w-full flex items-center gap-3 p-4 text-left"
              >
                <div className="flex-1">
                  <div className="font-bold text-white text-lg">{routine.name}</div>
                  <div className="text-sm text-white/50">
                    {completedTasks.length}/{routineTasks.length} tasks {progress.fullyCompleted && '✅'}
                  </div>
                </div>
                <span className="text-white/40 text-lg">{isExpanded ? '▲' : '▼'}</span>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                    <div className="px-4 pb-4 space-y-2 border-t border-white/10 pt-3">
                      {completedTasks.map((task) => (
                        <div key={task.id} className="flex items-center gap-3">
                          <div className="w-10 h-10 flex-shrink-0">
                            <TaskImage imageKey={task.imageKey} className="w-full h-full" />
                          </div>
                          <span className="text-white/80 font-medium">{task.label}</span>
                          <span className="ml-auto text-emerald-400 text-xl">✓</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}

        {dayProgress.filter((p) => p.completedTaskIds?.length > 0).length === 0 && (
          <div className="text-center text-white/40 mt-16">
            <div className="text-5xl mb-3">📅</div>
            <p className="font-medium">No tasks completed on this day.</p>
          </div>
        )}
      </div>
    </div>
  )
}
