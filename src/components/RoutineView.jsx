import { useState } from 'react'
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
  const [filterRoutineId, setFilterRoutineId] = useState(routines[0]?.id || null)
  const [viewMode, setViewMode] = useState(kid.taskViewMode || 'card')

  const badges = getEarnedBadges(kid.totalStars)
  const latestBadge = badges[badges.length - 1]

  const filteredTasks = filterRoutineId
    ? getTasksForRoutine(filterRoutineId)
    : routines.flatMap((r) => getTasksForRoutine(r.id))

  const allCompletedIds = todayProgress.flatMap((p) => p.completedTaskIds || [])
  const completedCount = filteredTasks.filter((t) => allCompletedIds.includes(t.id)).length

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
          title={`${kid.avatar} ${kid.name}`}
          theme={theme}
          rightSlot={
            <div className="flex items-center gap-1">
              <ViewModeToggle mode={viewMode} onChange={setViewMode} />
              <button onClick={onOpenHistory} className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-lg" aria-label="History">📅</button>
              <button onClick={onOpenSettings} className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-lg" aria-label="Settings">⚙️</button>
            </div>
          }
        />
      </div>

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden lg:flex lg:flex-col lg:w-72 xl:w-80 lg:flex-shrink-0 bg-black/40 backdrop-blur-md border-r border-white/10">
        {/* Kid profile */}
        <div className="px-6 py-6 border-b border-white/10">
          <button onClick={onHome} className="flex items-center gap-2 text-white/50 hover:text-white text-sm mb-5 transition-colors">
            🏠 <span>Home</span>
          </button>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-6xl">{kid.avatar}</span>
            <div>
              <div className="font-bold text-2xl text-white" style={{ fontFamily: theme.fontFamily }}>{kid.name}</div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-yellow-400 text-lg">⭐</span>
                <span className="font-bold text-white text-lg">{kid.totalStars}</span>
                {latestBadge && <span className="text-lg ml-1">{latestBadge.emoji}</span>}
              </div>
            </div>
          </div>
          {kid.currentStreak > 0 && (
            <div className="flex items-center gap-2 bg-orange-500/15 border border-orange-400/30 rounded-xl px-3 py-2 text-sm font-bold text-orange-300 w-fit">
              🔥 {kid.currentStreak} day{kid.currentStreak !== 1 ? 's' : ''} streak!
            </div>
          )}
        </div>

        {/* Routines */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="text-white/40 text-xs font-bold uppercase tracking-wider mb-3 px-2">Routines</div>
          {routines.map((r) => {
            const progress = todayProgress.find((p) => p.routineId === r.id)
            const done = progress?.completedTaskIds?.length || 0
            const total = getTasksForRoutine(r.id).length
            const selected = filterRoutineId === r.id
            return (
              <button
                key={r.id}
                onClick={() => setFilterRoutineId(r.id)}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-xl mb-1 text-left transition-all"
                style={{
                  background: selected ? `${theme.accentColor}25` : 'transparent',
                  borderLeft: selected ? `3px solid ${theme.accentColor}` : '3px solid transparent',
                }}
              >
                <span className="text-xl">{ROUTINE_ICONS[r.type] || '⚡'}</span>
                <div className="flex-1 min-w-0">
                  <div className={`font-semibold truncate ${selected ? 'text-white' : 'text-white/60'}`}>{r.name}</div>
                  {done > 0 && <div className="text-xs text-white/40">{done}/{total} done</div>}
                </div>
                {progress?.fullyCompleted && <span className="text-base flex-shrink-0">✅</span>}
              </button>
            )
          })}
          <button
            onClick={() => setFilterRoutineId(null)}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all"
            style={{
              background: filterRoutineId === null ? `${theme.accentColor}25` : 'transparent',
              borderLeft: filterRoutineId === null ? `3px solid ${theme.accentColor}` : '3px solid transparent',
            }}
          >
            <span className="text-xl">📋</span>
            <span className={`font-semibold ${filterRoutineId === null ? 'text-white' : 'text-white/60'}`}>All Tasks</span>
          </button>
        </div>

        {/* Bottom nav */}
        <div className="px-4 py-4 border-t border-white/10 space-y-1">
          <button onClick={onOpenHistory} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/50 hover:bg-white/8 hover:text-white transition-all">
            <span className="text-xl">📅</span><span className="font-medium">History</span>
          </button>
          <button onClick={onOpenSettings} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/50 hover:bg-white/8 hover:text-white transition-all">
            <span className="text-xl">⚙️</span><span className="font-medium">Settings</span>
          </button>
          <div className="flex items-center gap-3 px-3 py-2">
            <span className="text-white/40 text-sm">View:</span>
            <ViewModeToggle mode={viewMode} onChange={setViewMode} />
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Mobile filter chips */}
        <div className="lg:hidden">
          <RoutineFilter routines={routines} selectedId={filterRoutineId} onSelect={setFilterRoutineId} theme={theme} />
        </div>

        <ProgressBar completed={completedCount} total={filteredTasks.length} theme={theme} />

        {viewMode === 'list' ? (
          <TaskListView tasks={filteredTasks} completedIds={allCompletedIds} onToggle={handleToggle} theme={theme} />
        ) : (
          <TaskCardSwipeView tasks={filteredTasks} completedIds={allCompletedIds} onToggle={handleToggle} theme={theme} />
        )}
      </div>
    </div>
  )
}
