import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Header from './Header'
import ProgressBar from './ProgressBar'
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

  const iconBtnClass = theme.isDark
    ? 'bg-white/10 hover:bg-white/20 active:scale-95 transition-all duration-150 flex items-center justify-center text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40'
    : 'bg-gray-100 hover:bg-gray-200 active:scale-95 transition-all duration-150 flex items-center justify-center text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400'

  return (
    <div className="min-h-screen flex flex-col lg:flex-row" style={{ background: theme.pageBg, fontFamily: theme.fontFamily }}>

      {/* MOBILE HEADER */}
      <div className="lg:hidden">
        <Header
          onBack={onBack}
          onHome={onHome}
          title=""
          theme={theme}
          rightSlot={
            <div className="flex items-center gap-1">
              <ViewModeToggle mode={viewMode} onChange={setViewMode} theme={theme} />
              <button
                onClick={onOpenHistory}
                className={`w-10 h-10 rounded-xl ${iconBtnClass}`}
                aria-label="History"
              >
                📅
              </button>
              <button
                onClick={onOpenSettings}
                className={`w-10 h-10 rounded-xl ${iconBtnClass}`}
                aria-label="Settings"
              >
                ⚙️
              </button>
            </div>
          }
        />
      </div>

      {/* DESKTOP SIDEBAR */}
      <aside
        className="hidden lg:flex lg:flex-col lg:w-72 xl:w-80 lg:flex-shrink-0 border-r"
        style={{ background: theme.sectionBg, borderColor: theme.headerBorder }}
      >
        {/* Kid profile */}
        <div className="px-6 py-6 border-b" style={{ borderColor: theme.separatorColor }}>
          <button
            onClick={onHome}
            className="flex items-center gap-2 text-sm mb-5 transition-colors duration-150 focus-visible:outline-none"
            style={{ color: theme.textSecondary }}
          >
            🏠 <span className="font-medium">Home</span>
          </button>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{kid.avatar}</span>
            <div>
              <div className="font-bold text-xl tracking-tight" style={{ color: theme.textPrimary }}>{kid.name}</div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-yellow-500">⭐</span>
                <span className="font-semibold" style={{ color: theme.textSecondary }}>{kid.totalStars}</span>
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
          <div
            className="text-xs font-semibold tracking-widest uppercase mb-3 px-2"
            style={{ color: theme.textMuted }}
          >
            Routines
          </div>
          {routines.map((r) => {
            const progress = todayProgress.find((p) => p.routineId === r.id)
            const done = progress?.completedTaskIds?.length || 0
            const total = getTasksForRoutine(r.id).length
            const selected = filterRoutineId === r.id
            return (
              <button
                key={r.id}
                onClick={() => setFilterRoutineId(r.id)}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-xl mb-1 text-left transition-all duration-150 focus-visible:outline-none focus-visible:ring-2"
                style={{
                  backgroundColor: selected ? `${accentColor}18` : 'transparent',
                  borderLeft: selected ? `3px solid ${accentColor}` : '3px solid transparent',
                  '--tw-ring-color': accentColor,
                }}
              >
                <span className="text-xl">{ROUTINE_ICONS[r.type] || '⚡'}</span>
                <div className="flex-1 min-w-0">
                  <div
                    className="font-semibold truncate text-sm"
                    style={{ color: selected ? accentColor : theme.textSecondary }}
                  >
                    {r.name}
                  </div>
                  {done > 0 && (
                    <div className="text-xs" style={{ color: theme.textMuted }}>{done}/{total} done</div>
                  )}
                </div>
                {progress?.fullyCompleted && <span className="text-base flex-shrink-0">✅</span>}
              </button>
            )
          })}
          <button
            onClick={() => setFilterRoutineId(null)}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all duration-150 focus-visible:outline-none"
            style={{
              backgroundColor: filterRoutineId === null ? `${accentColor}18` : 'transparent',
              borderLeft: filterRoutineId === null ? `3px solid ${accentColor}` : '3px solid transparent',
            }}
          >
            <span className="text-xl">📋</span>
            <span
              className="font-semibold text-sm"
              style={{ color: filterRoutineId === null ? accentColor : theme.textSecondary }}
            >
              All Tasks
            </span>
          </button>
        </div>

        {/* Bottom nav */}
        <div className="px-4 py-4 border-t space-y-1" style={{ borderColor: theme.separatorColor }}>
          <button
            onClick={onOpenHistory}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
            style={{ color: theme.textSecondary }}
          >
            <span className="text-xl">📅</span><span className="font-medium text-sm">History</span>
          </button>
          <button
            onClick={onOpenSettings}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
            style={{ color: theme.textSecondary }}
          >
            <span className="text-xl">⚙️</span><span className="font-medium text-sm">Settings</span>
          </button>
          <div className="flex items-center gap-3 px-3 py-2">
            <span className="text-xs font-medium" style={{ color: theme.textMuted }}>View:</span>
            <ViewModeToggle mode={viewMode} onChange={setViewMode} theme={theme} />
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-h-0" style={{ background: theme.pageBg }}>
        {/* Kid identity — compact bar, mobile only */}
        <div
          className="lg:hidden flex items-center gap-2 px-4 py-2 border-b"
          style={{ background: theme.sectionBg, borderColor: theme.headerBorder }}
        >
          <span className="text-2xl">{kid.avatar}</span>
          <span className="font-semibold text-base tracking-tight" style={{ color: theme.textPrimary }}>{kid.name}</span>
          {kid.totalStars > 0 && (
            <span className="ml-auto text-sm" style={{ color: theme.textSecondary }}>⭐ {kid.totalStars}</span>
          )}
        </div>

        {/* Mobile: dropdown routine selector */}
        <div className="lg:hidden px-4 py-3 border-b" style={{ background: theme.sectionBg, borderColor: theme.headerBorder }}>
          <div className="relative">
            <button
              onClick={() => setShowDropdown((v) => !v)}
              className="flex items-center gap-2 px-4 py-2.5 border rounded-xl shadow-sm font-medium text-sm active:scale-95 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 w-full justify-between"
              style={{ background: theme.sectionBg, borderColor: theme.surfaceBorder, color: theme.textPrimary }}
            >
              <span>{dropdownLabel}</span>
              <span className="text-xs" style={{ color: theme.textMuted }}>{showDropdown ? '▲' : '▽'}</span>
            </button>

            <AnimatePresence>
              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full mt-1 left-0 right-0 border rounded-xl shadow-lg z-10 overflow-hidden"
                  style={{ background: theme.sectionBg, borderColor: theme.surfaceBorder }}
                >
                  <button
                    onClick={() => { setFilterRoutineId(null); setShowDropdown(false) }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm text-left transition-colors ${!filterRoutineId ? 'font-semibold' : 'font-medium'}`}
                    style={{ color: !filterRoutineId ? accentColor : theme.textSecondary }}
                  >
                    <span>📋</span>
                    <span>All Tasks</span>
                    {!filterRoutineId && <span className="ml-auto text-xs">✓</span>}
                  </button>
                  {routines.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => { setFilterRoutineId(r.id); setShowDropdown(false) }}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-sm text-left border-t transition-colors ${filterRoutineId === r.id ? 'font-semibold' : 'font-medium'}`}
                      style={{
                        color: filterRoutineId === r.id ? accentColor : theme.textSecondary,
                        borderColor: theme.separatorColor,
                      }}
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
