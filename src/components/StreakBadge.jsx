export default function StreakBadge({ streak, theme }) {
  if (!streak) return null
  return (
    <div
      className="flex items-center gap-1.5 bg-orange-500/20 border border-orange-400/40 rounded-xl px-3 py-1.5"
      style={{ fontFamily: theme?.fontFamily }}
    >
      <span className="text-xl">🔥</span>
      <span className="font-bold text-orange-300 text-sm">{streak} day{streak !== 1 ? 's' : ''}!</span>
    </div>
  )
}
