import { useState } from 'react'
import Header from './Header'
import ProgressBar from './ProgressBar'
import RoutineFilter from './RoutineFilter'
import ViewModeToggle from './ViewModeToggle'
import TaskListView from './TaskListView'
import TaskCardSwipeView from './TaskCardSwipeView'
import { UI_THEMES } from '../data/themes'
import { getEarnedBadges } from '../data/badges'

const ROUTINE_ICONS = {
  morning: '🌅',
  bedtime: '🌙',
  afterschool: '🎒',
  custom: '⚡',
}

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
  const [filterRoutineId, setFilterRoutineId] = useState(routines[0]?.id || null)
  const [viewMode, setViewMode] = useState(kid.taskViewMode || 'card')

  const badges = getEarnedBadges(kid.totalStars)
  const latestBadge = badges[badges.length - 1]

  const filteredTasks = filterRoutineId
    ? getTasksForRoutine(filterRoutineId)
    : routines.flatMap((r) => getTasksForRoutine(r.id))

  const allCompletedIds = todayProgress.flatMap((p) => p.completedTaskIds || [])
  const completedCount = filteredTasks.filter((t) => allCompletedIds.includes(t.id)).length

  const gradientClass = filterRoutineId ? 'from-purple-400 to-blue-500' : 'from-indigo-400 to-purple-500'

  function handleToggle(taskId) {
    const task = filteredTasks.find((t) => t.id === taskId)
    if (!task) return
    const routine = routines.find((r) => r.id === task.routineId)
    if (!routine) return
    const routineTasks = getTasksForRoutine(routine.id)
    onToggleTask(kid.id, routine.id, taskId, routineTasks.length)
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row" style={{ fontFamily: theme.fontFamily }}>

      {/* ── MOBILE HEADER (hidden on desktop) ── */}
      <div className="lg:hidden">
        <Header
          onBack={onBack}
          onHome={onHome}
          title={`${kid.avatar} ${kid.name}`}
          theme={theme}
          rightSlot={
            <div className="flex items-center gap-1">
              <ViewModeToggle mode={viewMode} onChange={setViewMode} />
              <button
                onClick={onOpenHistory}
                className="w-10 h-10 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center text-lg"
                aria-label="History"
              >
                📅
              </button>
              <button
                onClick={onOpenSettings}
                className="w-10 h-10 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center text-lg"
                aria-label="Settings"
              >
                ⚙️
              </button>
            </div>
          }
        />
      </div>

      {/* ── DESKTOP SIDEBAR (hidden on mobile) ── */}
      <aside className={`hidden lg:flex lg:flex-col lg:w-72 xl:w-80 lg:flex-shrink-0 ${theme.header} text-white`}>
        {/* Kid profile section */}
        <div className="px-6 py-6 border-b border-white/20">
          <button
            onClick={onHome}
            className="flex items-center gap-2 text-white/70 hover:text-white text-sm mb-5 transition-colors"
          >
            🏠 <span>Home</span>
          </button>
          <div className="flex items-center gap-4 mb-3">
            <span className="text-6xl">{kid.avatar}</span>
            <div>
              <div className="font-bold text-2xl" style={{ fontFamily: theme.fontFamily }}>
                {kid.name}
              </div>
              <div className="flex items-center gap-2 mt-1 text-white/90">
                <span className="text-xl">⭐</span>
                <span className="font-bold text-lg">{kid.totalStars}</span>
                {latestBadge && <span className="text-xl ml-1">{latestBadge.emoji}</span>}
              </div>
            </div>
          </div>
          {kid.currentStreak > 0 && (
            <div className="flex items-center gap-2 bg-white/20 rounded-xl px-3 py-2 text-sm font-bold w-fit">
              🔥 {kid.currentStreak} day{kid.currentStreak !== 1 ? 's' : ''} streak!
            </div>
          )}
        </div>

        {/* Routine list */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="text-white/60 text-xs font-bold uppercase tracking-wider mb-3 px-3">
            Routines
          </div>
          {routines.map((r) => {
            const progress = todayProgress.find((p) => p.routineId === r.id)
            const isFullyDone = progress?.fullyCompleted
            const done = progress?.completedTaskIds?.length || 0
            const total = getTasksForRoutine(r.id).length
            return (
              <button
                key={r.id}
                onClick={() => setFilterRoutineId(r.id)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl mb-1 text-left transition-colors ${
                  filterRoutineId === r.id
                    ? 'bg-white/25 text-white font-bold'
                    : 'text-white/70 hover:bg-white/15 hover:text-white'
                }`}
              >
                <span className="text-xl">{ROUTINE_ICONS[r.type] || '⚡'}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{r.name}</div>
                  {done > 0 && (
                    <div className="text-xs text-white/60">{done}/{total} done</div>
                  )}
                </div>
                {isFullyDone && <span className="text-lg flex-shrink-0">✅</span>}
              </button>
            )
          })}
          <button
            onClick={() => setFilterRoutineId(null)}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-colors ${
              filterRoutineId === null
                ? 'bg-white/25 text-white font-bold'
                : 'text-white/70 hover:bg-white/15 hover:text-white'
            }`}
          >
            <span className="text-xl">📋</span>
            <span className="font-medium">All Tasks</span>
          </button>
        </div>

        {/* Bottom navigation */}
        <div className="px-4 py-4 border-t border-white/20 space-y-1">
          <button
            onClick={onOpenHistory}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/70 hover:bg-white/15 hover:text-white transition-colors"
          >
            <span className="text-xl">📅</span>
            <span className="font-medium">History</span>
          </button>
          <button
            onClick={onOpenSettings}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/70 hover:bg-white/15 hover:text-white transition-colors"
          >
            <span className="text-xl">⚙️</span>
            <span className="font-medium">Settings</span>
          </button>
          <div className="flex items-center gap-3 px-3 py-2">
            <span className="text-white/60 text-sm">View:</span>
            <ViewModeToggle mode={viewMode} onChange={setViewMode} />
          </div>
        </div>
      </aside>

      {/* ── MAIN CONTENT PANEL ── */}
      <div className={`flex-1 flex flex-col bg-gradient-to-b ${gradientClass}`}>
        {/* Mobile: routine filter chips (hidden on desktop, sidebar handles this) */}
        <div className="lg:hidden">
          <RoutineFilter
            routines={routines}
            selectedId={filterRoutineId}
            onSelect={setFilterRoutineId}
            theme={theme}
          />
        </div>

        {/* Progress bar */}
        <div className="text-white">
          <ProgressBar completed={completedCount} total={filteredTasks.length} theme={theme} />
        </div>

        {/* Task views */}
        {viewMode === 'list' ? (
          <TaskListView
            tasks={filteredTasks}
            completedIds={allCompletedIds}
            onToggle={handleToggle}
            theme={theme}
          />
        ) : (
          <TaskCardSwipeView
            tasks={filteredTasks}
            completedIds={allCompletedIds}
            onToggle={handleToggle}
            theme={theme}
          />
        )}
      </div>
    </div>
  )
}
