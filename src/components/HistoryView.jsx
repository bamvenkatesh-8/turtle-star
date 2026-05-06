import { useState } from 'react'
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
  const [filterRoutineId, setFilterRoutineId] = useState(null)
  const theme = UI_THEMES[kid.uiTheme] || UI_THEMES.cartoonish
  const accentColor = theme.accentColor

  const dayProgress = getProgressForDate(kid.id, selectedDate)
  const starsEarned = dayProgress.reduce((sum, p) => sum + (p.completedTaskIds?.length || 0) + (p.fullyCompleted ? 3 : 0), 0)

  // Build flat list of completed tasks across all routines (or filtered routine)
  const allCompletedTasks = routines.flatMap((routine) => {
    if (filterRoutineId && routine.id !== filterRoutineId) return []
    const progress = dayProgress.find((p) => p.routineId === routine.id)
    if (!progress || !progress.completedTaskIds?.length) return []
    const routineTasks = getTasksForRoutine(routine.id)
    return routineTasks
      .filter((t) => progress.completedTaskIds.includes(t.id))
      .map((t) => ({ ...t, routineName: routine.name }))
  })

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 lg:max-w-3xl lg:mx-auto lg:shadow-xl">
      <Header onBack={onBack} onHome={onHome} title={`${kid.avatar} History`} theme={theme} />

      {/* Kid info row */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3">
        <span className="text-3xl">{kid.avatar}</span>
        <div>
          <div className="font-semibold text-gray-900 text-base tracking-tight">{kid.name}</div>
          <div className="text-sm text-gray-500">⭐ {kid.totalStars} total stars</div>
        </div>
      </div>

      {/* Date picker */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSelectedDate((d) => addDays(d, -1))}
            className="w-9 h-9 rounded-lg bg-gray-100 text-gray-600 text-lg flex items-center justify-center hover:bg-gray-200 active:scale-95 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
          >
            ‹
          </button>

          <div className="flex-1 relative">
            <label className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 font-medium text-sm hover:bg-gray-100 transition-colors cursor-pointer">
              <span>📅</span>
              <span>{formatDate(selectedDate)}</span>
              <input
                type="date"
                value={selectedDate}
                max={today()}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="absolute inset-0 opacity-0 cursor-pointer w-full"
              />
            </label>
          </div>

          <button
            onClick={() => { const n = addDays(selectedDate, 1); if (n <= today()) setSelectedDate(n) }}
            disabled={selectedDate >= today()}
            className="w-9 h-9 rounded-lg bg-gray-100 text-gray-600 text-lg flex items-center justify-center hover:bg-gray-200 active:scale-95 disabled:opacity-30 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
          >
            ›
          </button>
        </div>

        {starsEarned > 0 && (
          <div className="flex mt-2">
            <span className="bg-yellow-50 border border-yellow-200 text-yellow-700 text-xs font-semibold rounded-full px-3 py-1">
              ⭐ {starsEarned} stars earned this day
            </span>
          </div>
        )}
      </div>

      {/* Routine filter chips */}
      <div className="flex gap-2 overflow-x-auto px-4 py-2 bg-white border-b border-gray-100 scrollbar-none">
        <button
          onClick={() => setFilterRoutineId(null)}
          className="flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-150 focus-visible:outline-none"
          style={!filterRoutineId
            ? { backgroundColor: accentColor, color: '#fff' }
            : { backgroundColor: '#F3F4F6', color: '#4B5563', border: '1px solid #E5E7EB' }
          }
        >
          All
        </button>
        {routines.map((r) => (
          <button
            key={r.id}
            onClick={() => setFilterRoutineId(r.id)}
            className="flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-150 focus-visible:outline-none"
            style={filterRoutineId === r.id
              ? { backgroundColor: accentColor, color: '#fff' }
              : { backgroundColor: '#F3F4F6', color: '#4B5563', border: '1px solid #E5E7EB' }
            }
          >
            {r.name}
          </button>
        ))}
      </div>

      {/* Task grid — 2 columns per mock */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {allCompletedTasks.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {allCompletedTasks.map((task) => (
              <div
                key={task.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center gap-2 p-4 hover:shadow-md transition-shadow duration-150"
              >
                <div className="w-16 h-16">
                  <TaskImage imageKey={task.imageKey} className="w-full h-full" />
                </div>
                <span className="text-gray-700 font-medium text-sm text-center leading-tight">{task.label}</span>
                <span className="text-xs text-gray-400">{task.routineName}</span>
                <span className="text-green-500 text-base">✓</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 mt-16">
            <div className="text-5xl mb-3">📅</div>
            <p className="font-medium">No tasks completed on this day.</p>
          </div>
        )}
      </div>
    </div>
  )
}
