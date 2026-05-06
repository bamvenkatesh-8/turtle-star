import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Header from './Header'
import ProgressBar from './ProgressBar'
import RoutineFilter from './RoutineFilter'
import ViewModeToggle from './ViewModeToggle'
import TaskListView from './TaskListView'
import TaskCardSwipeView from './TaskCardSwipeView'
import { UI_THEMES } from '../data/themes'
import { getEarnedBadges } from '../data/badges'

const ROUTINE_ICONS = { morning: '🌅', bedtime: '🌙', afterschool: '🎒', custom: '⚡' }

export default function RoutineView({
  kid,
  routines,
  getTasksForRoutine,
  todayProgress,
  onToggleTask,
  onBack,
  onHome,
  onOpenSettings,
  onOpenHistory,
}) {
  const theme = UI_THEMES[kid.uiTheme] || UI_THEMES.cartoonish
  const accentColor = theme.accentColor
  const [filterRoutineId, setFilterRoutineId] = useState(routines[0]?.id || null)
  const [viewMode, setViewMode] = useState(kid.taskViewMode || 'card')
  const [showDropdown, setShowDropdown] = useState(false)

  const badges = getEarnedBadges(kid.totalStars)
  const latestBadge = badges[badges.length - 1]

  const filteredTasks = filterRoutineId
    ? getTasksForRoutine(filterRoutineId)
    : routines.flatMap((r) => getTasksForRoutine(r.id))

  const allCompletedIds = todayProgress.flatMap((p) => p.completedTaskIds || [])
  const completedCount = filteredTasks.filter((t) => allCompletedIds.includes(t.id)).length

  const selectedRoutine = routines.find((r) => r.id === filterRoutineId)
  const dropdownLabel = selectedRoutine ? selectedRoutine.name : 'All Tasks'

  function handleToggle(taskId) {
    const task = filteredTasks.find((t) => t.id === taskId)
    if (!task) return
    const routine = routines.find((r) => r.id === task.routineId)
    if (!routine) return
    onToggleTask(kid.id, routine.id, taskId, getTasksForRoutine(routine.id).length)
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row" style={{ fontFamily: theme.fontFamily }}>

      {/* MOBILE HEADER */}
      <div className="lg:hidden">
        <Header
          onBack={onBack}
          onHome={onHome}
          title=""
          theme={theme}
          rightSlot={
            <div className="flex items-center gap-1">
              <ViewModeToggle mode={viewMode} onChange={setViewMode} />
              <button
                onClick={onOpenHistory}
                className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 active:scale-95 transition-all duration-150 flex items-center justify-center text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
                aria-label="History"
              >
                📅
              </button>
              <button
                onClick={onOpenSettings}
                className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 active:scale-95 transition-all duration-150 flex items-center justify-center text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
                aria-label="Settings"
              >
                ⚙️
              </button>
            </div>
          }
        />
      </div>

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden lg:flex lg:flex-col lg:w-72 xl:w-80 lg:flex-shrink-0 bg-white border-r border-gray-200">
        {/* Kid profile */}
        <div className="px-6 py-6 border-b border-gray-100">
          <button
            onClick={onHome}
            className="flex items-center gap-2 text-gray-400 hover:text-gray-700 text-sm mb-5 transition-colors duration-150 focus-visible:outline-none"
          >
            🏠 <span className="font-medium">Home</span>
          </button>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{kid.avatar}</span>
            <div>
              <div className="font-bold text-xl text-gray-900 tracking-tight">{kid.name}</div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-yellow-500">⭐</span>
                <span className="font-semibold text-gray-700">{kid.totalStars}</span>
                {latestBadge && <span className="text-base ml-1">{latestBadge.emoji}</span>}
              </div>
            </div>
          </div>
          {kid.currentStreak > 0 && (
            <div className="flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-xl px-3 py-2 text-sm font-semibold text-orange-600 w-fit">
              🔥 {kid.currentStreak} day{kid.currentStreak !== 1 ? 's' : ''} streak!
            </div>
          )}
        </div>

        {/* Routines list */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-3 px-2">Routines</div>
          {routines.map((r) => {
            const progress = todayProgress.find((p) => p.routineId === r.id)
            const done = progress?.completedTaskIds?.length || 0
            const total = getTasksForRoutine(r.id).length
            const selected = filterRoutineId === r.id
            return (
              <button
                key={r.id}
                onClick={() => setFilterRoutineId(r.id)}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-xl mb-1 text-left transition-all duration-150 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2"
                style={{
                  backgroundColor: selected ? `${accentColor}12` : 'transparent',
                  borderLeft: selected ? `3px solid ${accentColor}` : '3px solid transparent',
                  '--tw-ring-color': accentColor,
                }}
              >
                <span className="text-xl">{ROUTINE_ICONS[r.type] || '⚡'}</span>
                <div className="flex-1 min-w-0">
                  <div className={`font-semibold truncate text-sm ${selected ? 'text-gray-900' : 'text-gray-600'}`}
                    style={selected ? { color: accentColor } : {}}
                  >
                    {r.name}
                  </div>
                  {done > 0 && <div className="text-xs text-gray-400">{done}/{total} done</div>}
                </div>
                {progress?.fullyCompleted && <span className="text-base flex-shrink-0">✅</span>}
              </button>
            )
          })}
          <button
            onClick={() => setFilterRoutineId(null)}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all duration-150 hover:bg-gray-50 focus-visible:outline-none"
            style={{
              backgroundColor: filterRoutineId === null ? `${accentColor}12` : 'transparent',
              borderLeft: filterRoutineId === null ? `3px solid ${accentColor}` : '3px solid transparent',
            }}
          >
            <span className="text-xl">📋</span>
            <span className={`font-semibold text-sm ${filterRoutineId === null ? 'text-gray-900' : 'text-gray-500'}`}
              style={filterRoutineId === null ? { color: accentColor } : {}}
            >
              All Tasks
            </span>
          </button>
        </div>

        {/* Bottom nav */}
        <div className="px-4 py-4 border-t border-gray-100 space-y-1">
          <button
            onClick={onOpenHistory}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-800 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
          >
            <span className="text-xl">📅</span><span className="font-medium text-sm">History</span>
          </button>
          <button
            onClick={onOpenSettings}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-gray-800 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
          >
            <span className="text-xl">⚙️</span><span className="font-medium text-sm">Settings</span>
          </button>
          <div className="flex items-center gap-3 px-3 py-2">
            <span className="text-gray-400 text-xs font-medium">View:</span>
            <ViewModeToggle mode={viewMode} onChange={setViewMode} />
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-h-0 bg-gray-50">
        {/* Mobile: dropdown routine selector */}
        <div className="lg:hidden px-4 py-3 bg-white border-b border-gray-100">
          <div className="relative">
            <button
              onClick={() => setShowDropdown((v) => !v)}
              className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl shadow-sm text-gray-900 font-medium text-sm hover:bg-gray-100 active:scale-95 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 w-full justify-between"
            >
              <span>{dropdownLabel}</span>
              <span className="text-gray-400 text-xs">{showDropdown ? '▲' : '▽'}</span>
            </button>

            <AnimatePresence>
              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full mt-1 left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg z-10 overflow-hidden"
                >
                  <button
                    onClick={() => { setFilterRoutineId(null); setShowDropdown(false) }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm text-left transition-colors hover:bg-gray-50 ${!filterRoutineId ? 'font-semibold' : 'text-gray-700 font-medium'}`}
                    style={!filterRoutineId ? { color: accentColor } : {}}
                  >
                    <span>📋</span>
                    <span>All Tasks</span>
                    {!filterRoutineId && <span className="ml-auto text-xs">✓</span>}
                  </button>
                  {routines.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => { setFilterRoutineId(r.id); setShowDropdown(false) }}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-sm text-left border-t border-gray-100 transition-colors hover:bg-gray-50 ${filterRoutineId === r.id ? 'font-semibold' : 'text-gray-700 font-medium'}`}
                      style={filterRoutineId === r.id ? { color: accentColor } : {}}
                    >
                      <span>{ROUTINE_ICONS[r.type] || '⚡'}</span>
                      <span>{r.name}</span>
                      {filterRoutineId === r.id && <span className="ml-auto text-xs">✓</span>}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Kid identity — compact bar, mobile only */}
        <div className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border-b border-gray-100">
          <span className="text-2xl">{kid.avatar}</span>
          <span className="font-semibold text-base text-gray-900 tracking-tight">{kid.name}</span>
          {kid.totalStars > 0 && (
            <span className="ml-auto text-sm text-gray-500">⭐ {kid.totalStars}</span>
          )}
        </div>

        {viewMode === 'list' ? (
          <TaskListView tasks={filteredTasks} completedIds={allCompletedIds} onToggle={handleToggle} theme={theme} />
        ) : (
          <TaskCardSwipeView tasks={filteredTasks} completedIds={allCompletedIds} onToggle={handleToggle} theme={theme} />
        )}

        <ProgressBar completed={completedCount} total={filteredTasks.length} theme={theme} />
      </div>
    </div>
  )
}
